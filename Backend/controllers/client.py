from fastapi import APIRouter, HTTPException, Query, Depends, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, List
import logging
from models.client_model import ClientModel
from services.client_service import ClientService
from datetime import datetime
from rag_engine import search_all_sources

# Import from client_service properly
try:
    # Try importing the new class-based approach
    from services.client_service import ClientService
    # Also import legacy functions if needed
    from services.client_service import submit_client_info_async, get_clients_info_async
except ImportError as e:
    # Fallback or error handling
    logger = logging.getLogger(__name__)
    logger.error(f"Import error in client.py: {e}")
    raise

router = APIRouter()
logger = logging.getLogger(__name__)

# Pydantic models with validation
class ClientRequest(BaseModel):
    clientfname: Optional[str] = None
    clientlname: Optional[str] = None
    email: EmailStr
    countrycode: Optional[str] = None
    mobile: Optional[str] = None
    website_source: Optional[str] = "default"
    query: str
    
    @field_validator('clientfname', 'clientlname')
    @classmethod
    def validate_name(cls, v):
        if v is not None and len(v.strip()) > 100:
            raise ValueError('Name too long (max 100 characters)')
        return v.strip() if v else v
    
    @field_validator('query')
    @classmethod
    def validate_query(cls, v):
        if not v or len(v.strip()) < 5:
            raise ValueError('Query must be at least 5 characters')
        if len(v) > 2000:
            raise ValueError('Query too long (max 2000 characters)')
        return v.strip()
    
    @field_validator('website_source')
    @classmethod
    def validate_website_source(cls, v):
        if v and len(v) > 100:
            raise ValueError('Website source too long (max 100 characters)')
        return v.strip() if v else "default"

class QueryRequest(BaseModel):
    email: EmailStr
    query: str
    website_source: Optional[str] = "default"

class ClientResponse(BaseModel):
    status: str
    message: str
    database: Optional[str] = None
    email_sent: Optional[bool] = None
    is_new_client: Optional[bool] = None
    timestamp: Optional[str] = None

# Also add response models for other endpoints
class EmailCheckResponse(BaseModel):
    exists: bool
    database: Optional[str] = None
    email: str
    valid: bool
    error: Optional[str] = None

class ClientsListResponse(BaseModel):
    status: str
    message: Optional[str] = None
    database: str
    clients: List[dict]
    total: int
    limit: int
    offset: int
    has_more: bool
    timestamp: str



@router.get("/check-email/{email}", response_model=dict)
async def check_email_exists(
    email: EmailStr,
    website_source: Optional[str] = Query(None, description="Website source for database selection")
):
    """Check if email exists in the appropriate database"""
    try:
        
        result = await ClientModel.check_email_exists(email, website_source)
        if 'error' in result:
            raise HTTPException(status_code=500, detail=result['error'])
        
        return {
            "exists": result['exists'],
            "database": result['database'],
            "email": result['email'],
            "valid": True
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error checking email: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/clients", response_model=dict)
async def get_clients(
    database: Optional[str] = Query('guidance', description="Database key"),
    limit: int = Query(100, ge=1, le=1000, description="Number of records"),
    offset: int = Query(0, ge=0, description="Offset for pagination"),
    email: Optional[EmailStr] = Query(None, description="Filter by email"),
    website_source: Optional[str] = Query(None, description="Filter by website source")
):
    """Get clients with filtering and pagination"""
    try:
        filters = {}
        if email:
            filters['email'] = email
        if website_source:
            filters['website_source'] = website_source
        
        result = await ClientService.get_clients_info(database, filters, limit, offset)
        
        if result['status'] == 'error':
            raise HTTPException(status_code=400, detail=result['message'])
        
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting clients: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/chat")
async def chat(request:Request):
    """Chat endpoint using OpenAI client"""
    
    from app import client  # Import the OpenAI client from app.py
    try:
        data=await request.json()
        user_message = data.get("message","")
        if not user_message:
            raise HTTPException(status_code=400, detail="Message is required")

        # ---- RAG Search ----
        # Use search_all_sources instead of get_best_match
        match = search_all_sources(user_message, threshold=0.65)
        
        if match:
        
            return match["text"]
            # {
            #         match["text"],
            #         match["source"],
            #         round(match["score"], 2)
            #     }
            
            
        # Fallback to GPT
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant for Nordisk Support Solutions."},
                {"role": "user", "content": user_message}
                ],
            max_tokens=100,
            temperature=0.7
        )
        reply = response.choices[0].message.content
        
        return reply
        # {
        #     "reply": reply,
        #     "source": "gpt",
        #     "confidence": 1.0
        # }
    
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/client", response_model=ClientResponse)
async def create_client(client: ClientRequest):
    """Create a new client or add query to existing client"""
    logger.info(f"Creating client/query for: {client.email}")
    
    try:
        
        result = await ClientService.submit_client_info(client.model_dump())
        
        if result['status'] == 'error':
            raise HTTPException(status_code=400, detail=result['message'])
        elif result['status'] == 'duplicate':
            raise HTTPException(status_code=409, detail=result['message'])
        elif result['status'] == 'partial_success':
            return ClientResponse(**result)  # Still return 200 but with warning
        
        return ClientResponse(**result)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating client: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/query", response_model=ClientResponse)
async def create_query(query: QueryRequest):
    """Add a query for an existing client"""
    logger.info(f"Adding query for: {query.email}")
    
    try:
        # Convert to client request format
        client_data = {
            'email': query.email,
            'query': query.query,
            'website_source': query.website_source
        }
        
        result = await ClientService.submit_client_info(client_data)
        
        if result['status'] == 'error':
            raise HTTPException(status_code=400, detail=result['message'])
        elif result['status'] == 'partial_success':
            return ClientResponse(**result)
        
        return ClientResponse(**result)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating query: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/databases")
async def list_databases():
    """List available databases"""
    from db.config import dbconfigs
    
    return {
        "databases": [
            {
                "key": key,
                "name": config['db'],
                "host": config['host'],
                "port": config['port']
            }
            for key, config in dbconfigs.items()
        ],
        "default": "guidance"
    }

