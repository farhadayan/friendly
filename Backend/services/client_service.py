# services/client_service.py
import logging
from typing import Dict, Any
from models.client_model import ClientModel, get_clients_data_async
from services.email_service import process_contact_email_async
from datetime import datetime

logger = logging.getLogger(__name__)

class ClientService:
    """Service layer for client operations"""
    
    @staticmethod
    async def submit_client_info(data: Dict[str, Any]) -> Dict[str, Any]:
        """Process client submission with email notification"""
        logger.info(f"Processing client submission: {data.get('email')}")
        
        try:
            # Save client data
            save_result = await ClientModel.save_client(data)
            logger.info(f"Database save result: {save_result}")
            
            if save_result['status'] != 'success':
                logger.error(f"Database save failed: {save_result}")
                return {
                    'status': 'error',
                    'message': save_result.get('message', 'Failed to save client data'),
                    'database': save_result.get('database', 'unknown'),
                    'client_saved': False,
                    'timestamp': datetime.now().isoformat()
                }
            

            email_result = await process_contact_email_async(
                data, 
                is_new_client=save_result.get('is_new_client', False),
                database=save_result.get('database', 'unknown')
            )
            
            # Check if email was sent successfully
            email_sent = email_result.get('email_sent', False) 
            email_success = email_result.get('success', False) 
            
            logger.info(f"email_sent: {email_sent}, email_success: {email_success}")

            # Use either email_sent or success field
            email_actually_sent = email_sent or email_success
            
            if not email_actually_sent:
                email_error = email_result.get('error', email_result.get('message', 'Unknown email error'))
                logger.warning(f"Email notification failed: {email_error}")
                
                # Still return success for database, but indicate email failure
                return {
                    'status': 'partial_success',
                    'message': 'Client data saved but email notification failed',
                    'database': save_result.get('database', 'unknown'),
                    'email_sent': False,
                    'client_saved': True,
                    'is_new_client': save_result.get('is_new_client', False),
                    'email_error': str(email_error),
                    'timestamp': datetime.now().isoformat(),
                    'email_result': email_result  # Include full email result for debugging
                }
            
            # Both database and email succeeded
            logger.info(f"Email sent successfully to: {email_result.get('recipient', 'unknown')}")
            return {
                'status': 'success',
                'message': 'Client information submitted successfully',
                'database': save_result.get('database', 'unknown'),
                'email_sent': True,
                'client_saved': True,
                'is_new_client': save_result.get('is_new_client', False),
                'recipient': email_result.get('recipient', 'unknown'),
                'timestamp': datetime.now().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error in submit_client_info: {e}", exc_info=True)
            return {
                'status': 'error',
                'message': f'Internal server error: {str(e)}',
                'timestamp': datetime.now().isoformat()
            }
    
    @staticmethod
    async def get_clients_info(db_key: str = 'guidance', 
        filters: Dict[str, Any] = None,
        limit: int = 100,
        offset: int = 0) -> Dict[str, Any]:
        """Get clients with pagination"""
        logger.info(f"Fetching clients from {db_key}")
        
        try:
            result = await ClientModel.get_clients(db_key, filters, limit, offset)
            
            
            if result['status'] != 'success':
                return result
            
            return result
            
        except Exception as e:
            logger.error(f"Error getting clients info: {e}", exc_info=True)
            return {
                'status': 'error',
                'message': str(e),
                'clients': [],
                'total': 0,
                'timestamp': datetime.now().isoformat()
            }

# Legacy functions for backward compatibility
async def submit_client_info_async(data: Dict[str, Any], email_exists: bool = False) -> Dict[str, Any]:
    """Legacy function for backward compatibility"""
    # Note: email_exists parameter is now handled in the model
    return await ClientService.submit_client_info(data)

async def get_clients_info_async() -> Dict[str, Any]:
    """Legacy function for backward compatibility"""
    return await ClientService.get_clients_info()