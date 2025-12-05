# db/mysql_pool.py
import aiomysql
import logging
from typing import Dict, Optional, Tuple
from contextlib import asynccontextmanager
from db.config import dbconfigs, DEFAULT_DB_KEY

logger = logging.getLogger(__name__)

# Store multiple connection pools
_connection_pools: Dict[str, aiomysql.Pool] = {}

async def init_database_pools():
    """Initialize connection pools for all configured databases"""
    logger.info("Initializing database connection pools...")
    
    for db_key, config in dbconfigs.items():
        try:
            if db_key in _connection_pools:
                logger.debug(f"Pool for '{db_key}' already initialized")
                continue
            
            pool = await aiomysql.create_pool(
                minsize=config.get('minsize', 1),
                maxsize=config.get('maxsize', 10),
                host=config['host'],
                port=config['port'],
                user=config['user'],
                password=config['password'],
                db=config['db'],
                charset='utf8mb4',
                autocommit=False,
                cursorclass=aiomysql.DictCursor
            )
            
            _connection_pools[db_key] = pool
            logger.info(f"Connection pool initialized for database: {db_key} ({config['db']})")
            
        except Exception as e:
            logger.error(f"Failed to initialize pool for '{db_key}': {e}")
            if db_key == DEFAULT_DB_KEY:
                raise
    
    logger.info(f"Initialized {len(_connection_pools)} database pools")

async def get_pool(db_key: str = DEFAULT_DB_KEY) -> aiomysql.Pool:
    """Get connection pool for specific database"""
    if db_key not in _connection_pools:
        raise ValueError(f"Database '{db_key}' not initialized or not in config")
    
    return _connection_pools[db_key]

@asynccontextmanager
async def get_db_connection(db_key: str = DEFAULT_DB_KEY):
    """
    Context manager for database connections.
    Usage:
        async with get_db_connection('guidance') as (conn, cur):
            await cur.execute("SELECT ...")
    """
    conn = None
    cur = None
    
    try:
        pool = await get_pool(db_key)
        conn = await pool.acquire()
        cur = await conn.cursor(aiomysql.DictCursor)
        yield conn, cur
        
    except Exception as e:
        logger.error(f"Database connection error for '{db_key}': {e}")
        raise
    finally:
        if cur:
            await cur.close()
        if conn:
            await pool.release(conn)

# Legacy functions for backward compatibility
async def get_async_connection(database: str = DEFAULT_DB_KEY):
    """Legacy function - Get connection for specific database"""
    pool = await get_pool(database)
    conn = await pool.acquire()
    cursor = await conn.cursor(aiomysql.DictCursor)
    return conn, cursor

async def release_connection(conn, cursor, database: str = DEFAULT_DB_KEY):
    """Legacy function - Release connection back to pool"""
    try:
        if cursor:
            await cursor.close()
        if conn and database in _connection_pools:
            await _connection_pools[database].release(conn)
    except Exception as e:
        logger.error(f"Error releasing connection: {e}")

async def execute_query(db_key: str, query: str, params: Tuple = None, 
    fetch: bool = True, commit: bool = True):
    """
    Execute a query with automatic connection management.
    
    Args:
        db_key: Database key from config
        query: SQL query with %s placeholders
        params: Parameters for the query
        fetch: Whether to fetch results (for SELECT)
        commit: Whether to commit transaction
    
    Returns:
        Query results or row count
    """
    async with get_db_connection(db_key) as (conn, cur):
        
        try:
            await cur.execute(query, params or ())
            
            if fetch and query.strip().upper().startswith('SELECT'):
                result = await cur.fetchall()
                if commit:
                    await conn.commit()
                return result
            else:
                if commit:
                    await conn.commit()
                return cur.rowcount
                
        except Exception as e:
            if conn:
                await conn.rollback()
            logger.error(f"Query execution error: {e}")
            raise

async def close_all_pools():
    """Close all database connection pools"""
    logger.info("Closing all database connection pools...")
    
    for db_key, pool in list(_connection_pools.items()):
        try:
            pool.close()
            await pool.wait_closed()
            logger.info(f"Closed pool for '{db_key}'")
        except Exception as e:
            logger.error(f"Error closing pool for '{db_key}': {e}")
    
    _connection_pools.clear()