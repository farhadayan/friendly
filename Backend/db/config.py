# db/config.py
from dotenv import load_dotenv
import os 
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

load_dotenv()

# Database Configuration
dbconfigs: Dict[str, Dict[str, Any]] = {
    'guidance': {
        'host': os.getenv('db_host', 'localhost'),
        'db': os.getenv('db_name', 'friendlyguidance'),
        'user': os.getenv('db_user', 'root'),
        'password': os.getenv('db_psw', ''),
        'port': int(os.getenv('db_port', 3306)),
        'minsize': 1,
        'maxsize': 10
    },
    'itsupport': {
        'host': os.getenv('dbit_host', 'localhost'),
        'db': os.getenv('dbit_name', 'friendlyitsupport'),
        'user': os.getenv('dbit_user', 'root'),
        'password': os.getenv('dbit_psw', ''),
        'port': int(os.getenv('dbit_port', 3306)),
        'minsize': 1,
        'maxsize': 10
    },
    'software': {
        'host': os.getenv('dbsw_host', 'localhost'),
        'port': int(os.getenv('dbsw_port', 3306)),
        'user': os.getenv('dbsw_user', 'root'),
        'password': os.getenv('dbsw_psw', ''),
        'db': os.getenv('dbsw_name', 'friendlysoftware'),
        'minsize': 1,
        'maxsize': 10
    }
}

# Security validation
def validate_db_configs():
    """Validate database configurations for security"""
    required_keys = ['host', 'db', 'user', 'password', 'port']
    
    for db_name, config in dbconfigs.items():
        for key in required_keys:
            if key not in config:
                logger.error(f"Missing '{key}' in database config '{db_name}'")
                raise ValueError(f"Invalid database configuration for '{db_name}'")
        
        # Validate database name format (security)
        if not isinstance(config['db'], str) or not config['db'].replace('_', '').isalnum():
            logger.error(f"Invalid database name format in '{db_name}': {config['db']}")
            raise ValueError(f"Invalid database name format in '{db_name}'")

# Run validation on import
try:
    validate_db_configs()
except ValueError as e:
    logger.critical(f"Database configuration error: {e}")
    raise

# Default database key (for backward compatibility)
DEFAULT_DB_KEY = 'guidance'
dbconfig = dbconfigs[DEFAULT_DB_KEY]  # For backward compatibility

# Get database by website source mapping
def get_database_by_website_source(source: str) -> str:
    """Map website source to database key"""

    
    if not source:
        return DEFAULT_DB_KEY
    
    """Map website source to database key"""
    if not source:
        return 'guidance'
    
    source_lower = source.lower().strip()
    
    # Mapping logic - can be extended
    mappings = {
        'itsupport':'itsupport',
        'guidance': 'guidance',
        'software': 'software',
        'default': 'itsupport'
    }
    
    # Check direct mapping
    if source in mappings:
        return mappings[source]
    
    for key, db_key in mappings.items():
        if key in source_lower:
            return db_key
    
    return DEFAULT_DB_KEY

# For backward compatibility - keeps original dbconfig variable
__all__ = ['dbconfigs', 'dbconfig', 'get_database_by_website_source', 'DEFAULT_DB_KEY']