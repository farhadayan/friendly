# app.py - Update startup event
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse
from openai import OpenAI

import uvicorn
from controllers.client import router as client_router
from dotenv import load_dotenv
from db.mysql_pool import init_database_pools, close_all_pools
import os
import logging
import traceback
from datetime import datetime  # Add this import

load_dotenv()
api_key = os.getenv("openai_api_key")

if not api_key:
    raise ValueError("Please set the environment variable 'openai_api_key' with your OpenAI API key.")

# Initialize OpenAI client
client = OpenAI(api_key=api_key)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)



# Create FastAPI app
app = FastAPI(title="Nordisk Support API", version="1.0.0")

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception handler: {exc}")
    logger.error(traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal server error: {str(exc)}"}
    )

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000", 
        "http://localhost:3001",
        "https://website1.com",
        "https://website2.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register /api routes
app.include_router(client_router, prefix="/api")

# app.py - Update startup event
@app.on_event("startup")
async def startup_event():
    try:
        from db.mysql_pool import init_database_pools
        await init_database_pools()
        logger.info("MySQL connection pools initialized successfully")
        
        # Verify pools were created
        from db.mysql_pool import _connection_pools
        logger.info(f"Initialized pools: {list(_connection_pools.keys())}")
        
    except Exception as e:
        logger.error(f"Error initializing MySQL pools: {e}")
        import traceback
        traceback.print_exc()
        raise

# Shutdown event - close database pool
@app.on_event("shutdown")
async def shutdown_event():
    try:
        await close_all_pools()
        logger.info("MySQL connection pools closed")
    except Exception as e:
        logger.error(f"Error closing MySQL pools: {e}")

# Add to app.py
@app.get("/debug/databases")
async def debug_databases():
    """Debug endpoint to check database status"""
    from db.mysql_pool import _connection_pools
    from db.config import dbconfigs
    
    result = {
        "configured_databases": list(dbconfigs.keys()),
        "initialized_pools": list(_connection_pools.keys()),
        "config_details": {}
    }
    
    for db_key, config in dbconfigs.items():
        result["config_details"][db_key] = {
            "host": config['host'],
            "database": config['db'],
            "user": config['user'],
            "port": config['port'],
            "pool_initialized": db_key in _connection_pools
        }
    
    return result

# Health check endpoint
@app.get("/")
async def root():
    return {"message": "Nordisk Support API is running", "status": "healthy"}

@app.get("/health")
async def health_check():
    from db.mysql_pool import _connection_pools
    
    db_status = {}
    for db_key in _connection_pools.keys():
        try:
            async with _connection_pools[db_key].acquire() as conn:
                async with conn.cursor() as cur:
                    await cur.execute("SELECT 1 as test")
                    result = await cur.fetchone()
                    db_status[db_key] = "healthy" if result and result['test'] == 1 else "unhealthy"
        except Exception as e:
            db_status[db_key] = f"error: {str(e)}"
    
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "databases": db_status
    }

# Debug endpoint to see all routes
@app.get("/routes")
async def list_routes():
    """List all available API routes"""
    routes = []
    for route in app.routes:
        routes.append({
            "path": route.path,
            "name": route.name,
            "methods": list(route.methods) if hasattr(route, 'methods') else []
        })
    return routes

# Run server
if __name__ == "__main__":
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=5000,
        reload=True,
        log_level="info"
    )