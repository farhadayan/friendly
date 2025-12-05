# models/client_model.py
import logging
from typing import Dict, List, Optional, Any
from datetime import datetime
from db.mysql_pool import execute_query, get_db_connection, get_async_connection, release_connection
from db.config import get_database_by_website_source, dbconfigs

logger = logging.getLogger(__name__)

class ClientModel:
    """Secure client data model with input validation"""
    
    @staticmethod
    def sanitize_input(data: Dict[str, Any]) -> Dict[str, Any]:
        """Sanitize and validate input data"""
        sanitized = {}
        
        for key, value in data.items():
            if value is None:
                sanitized[key] = None
                continue
                
            if isinstance(value, str):
                # Trim and limit length
                value = value.strip()
                max_lengths = {
                    'email': 100,
                    'clientfname': 45,
                    'clientlname': 45,
                    'countrycode': 5,
                    'mobile': 15,
                    'query': 500,
                    'website_source': 50
                }
                
                max_len = max_lengths.get(key, 255)
                if len(value) > max_len:
                    value = value[:max_len]
                    logger.warning(f"Truncated field '{key}' to {max_len} characters")
            
            sanitized[key] = value
        
        return sanitized
    
    @staticmethod
    def validate_required_fields(data: Dict[str, Any], required_fields: List[str]) -> Optional[str]:
        """Validate required fields exist and are not empty"""
        for field in required_fields:
            if field not in data:
                return f"Missing required field: {field}"
            
            value = data.get(field)
            if value is None or (isinstance(value, str) and not value.strip()):
                return f"Field '{field}' cannot be empty"
        
        # Email format validation
        if 'email' in data and data['email']:
            email = data['email'].strip()
            if '@' not in email or '.' not in email.split('@')[-1]:
                return "Invalid email format"
        
        return None
    
    @classmethod
    async def check_email_exists(cls, email: str, website_source: Optional[str] = None) -> Dict[str, Any]:
        """Check if email exists in the appropriate database"""
        try:
            # Sanitize input
            email = email.strip().lower()[:255]
            
            # Determine database
            db_key = get_database_by_website_source(website_source)
            
            # Parameterized query
            query = """
            SELECT COUNT(*) as count
            FROM clientinfo 
            WHERE LOWER(email) = %s
            """
            
            result = await execute_query(db_key, query, (email,), fetch=True)
            
            exists = result[0]['count'] > 0 if result else False
            return {
                'exists': exists,
                'database': dbconfigs[db_key]['db'],
                'database_key': db_key,
                'email': email
            }
            
        except Exception as e:
            logger.error(f"Error checking email existence: {e}")
            return {
                'exists': False,
                'error': str(e),
                'database': 'unknown'
            }
    
    @classmethod
    async def save_client(cls, client_data: Dict[str, Any]) -> Dict[str, Any]:
        """Save client data with transaction support"""
        # Validate and sanitize
        
        sanitized_data = cls.sanitize_input(client_data)
        
        # Determine required fields based on whether email exists
        website_source = sanitized_data.get('website_source')
        email_check = await cls.check_email_exists(
            sanitized_data['email'], 
            website_source
        )
        
        required_fields = ['email', 'query']
        if not email_check['exists']:
            required_fields.extend(['clientfname', 'clientlname'])
        
        # Validate required fields
        validation_error = cls.validate_required_fields(sanitized_data, required_fields)
        if validation_error:
            return {'status': 'error', 'message': validation_error}
        
        # Get database key - use default if not in email_check
        db_key = email_check.get('database_key')
        if not db_key:
            # Fallback to website_source or default
            db_key = get_database_by_website_source(website_source)
    
        # Check if database configuration exists
        if db_key not in dbconfigs:
            logger.error(f"Database '{db_key}' not found in config. Available: {list(dbconfigs.keys())}")
            return {
                'status': 'error',
                'message': f"Database '{db_key}' not initialized or not in config",
                'database': 'unknown'
            }
        
        # Get database name
        db_name = dbconfigs.get(db_key, {}).get('db', 'unknown')
        
        async with get_db_connection(db_key) as (conn, cur):
            try:
                # Use transaction
                await conn.begin()
                
                if not email_check['exists']:
                    # Insert new client
                    insert_client = """
                        INSERT INTO clientinfo 
                        (clientfname, clientlname, email, countrycode, mobile, website_source, creationdate)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                    """
                    
                    client_params = (
                        sanitized_data.get('clientfname'),
                        sanitized_data.get('clientlname'),
                        sanitized_data['email'].lower(),
                        sanitized_data.get('countrycode'),
                        sanitized_data.get('mobile'),
                        website_source,
                        datetime.now()
                    )
                    
                    await cur.execute(insert_client, client_params)
                    client_id = cur.lastrowid
                    
                    logger.info(f"New client created with ID: {client_id}")
                else:
                    client_id = None
                    logger.info(f"Existing client: {sanitized_data['email']}")
                
                # Always save the query
                insert_query = """
                    INSERT INTO clientquery 
                    (email, query, website_source, creationdate)
                    VALUES (%s, %s, %s, %s)
                """
                
                query_params = (
                    sanitized_data['email'].lower(),
                    sanitized_data['query'],
                    website_source,
                    datetime.now()
                )
                
                await cur.execute(insert_query, query_params)
                query_id = cur.lastrowid
                
                await conn.commit()
                
                return {
                    'status': 'success',
                    'database': db_name,
                    'database_key': db_key,
                    'client_id': client_id,
                    'query_id': query_id,
                    'email': sanitized_data['email'],
                    'is_new_client': not email_check['exists'],
                    'message': 'Client data saved successfully'
                }
                
            except Exception as e:
                await conn.rollback()
                
                # Check for duplicate entry
                error_msg = str(e).lower()
                if 'duplicate' in error_msg or '1062' in error_msg:
                    return {
                        'status': 'duplicate',
                        'database': dbconfigs[db_key]['db'],
                        'message': 'Email already exists in this database'
                    }
                
                logger.error(f"Error saving client data: {e}")
                return {
                    'status': 'error',
                    'database': dbconfigs[db_key]['db'],
                    'message': f'Database error: {str(e)}'
                }

    
    @classmethod
    async def get_clients(cls, db_key: str = 'guidance', 
        filters: Dict[str, Any] = None,
        limit: int = 100,
        offset: int = 0) -> Dict[str, Any]:
        """Get clients with pagination and filtering"""
        try:
            # Validate database key
            if db_key not in dbconfigs:
                return {
                    'status': 'error',
                    'message': f'Invalid database key: {db_key}'
                }
            
            # Build WHERE clause for filters
            where_clauses = []
            params = []
            
            if filters:
                for key, value in filters.items():
                    if value:
                        if key == 'email':
                            where_clauses.append("LOWER(email) = LOWER(%s)")
                            params.append(value)
                        elif key == 'website_source':
                            where_clauses.append("website_source = %s")
                            params.append(value)
                        elif key == 'clientfname':
                            where_clauses.append("clientfname LIKE %s")
                            params.append(f"%{value}%")
                        elif key == 'clientlname':
                            where_clauses.append("clientlname LIKE %s")
                            params.append(f"%{value}%")
            
            # Build the query
            where_sql = "WHERE " + " AND ".join(where_clauses) if where_clauses else ""
            
            # Get total count
            count_query = f"SELECT COUNT(*) as total FROM clientinfo {where_sql}"
            count_result = await execute_query(db_key, count_query, tuple(params), fetch=True)
            total = count_result[0]['total'] if count_result else 0
            
            # Get paginated data
            params_with_pagination = params + [limit, offset]
            select_query = f"""
                SELECT 
                    clientfname, clientlname, email, countrycode, mobile, website_source, creationdate
                FROM clientinfo 
                {where_sql}
                ORDER BY creationdate DESC
                LIMIT %s OFFSET %s
            """
            
            clients = await execute_query(db_key, select_query, tuple(params_with_pagination), fetch=True)
            
            return {
                'status': 'success',
                'clients': clients,
                'total': total,
                
                
                
            }
            
        except Exception as e:
            logger.error(f"Error getting clients: {e}", exc_info=True)
            return {
                'status': 'error',
                'message': str(e),
                'clients': [],
                'total': 0,
                'limit': limit,
                'offset': offset,
                'has_more': False,
                'database': dbconfigs.get(db_key, {}).get('db', 'unknown')
            }

# Legacy functions for backward compatibility
async def check_client_email_exists_async(email: str, website_source: Optional[str] = None) -> bool:
    """Legacy function for backward compatibility"""
    result = await ClientModel.check_email_exists(email, website_source)
    return result.get('exists', False)

async def save_client_data_async(data: Dict[str, Any]) -> Any:
    """Legacy function for backward compatibility"""
    result = await ClientModel.save_client(data)
    
    if result['status'] == 'success':
        return True
    elif result['status'] == 'duplicate':
        return "duplicate"
    else:
        return False

async def get_clients_data_async(db_key: str = 'guidance') -> List[Dict]:
    """Legacy function for backward compatibility"""
    try:
        query = "SELECT * FROM clientinfo ORDER BY creationdate DESC LIMIT 100"
        results = await execute_query(db_key, query, fetch=True)
        return results
    except Exception as e:
        logger.error(f"Error getting clients: {e}")
        return []

async def save_query_data_async(data: Dict[str, Any]) -> bool:
    """Legacy function for backward compatibility"""
    result = await ClientModel.save_client(data)
    return result['status'] == 'success'