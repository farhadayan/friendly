#from models.client_model import save_query_data
from models.client_model import save_query_data_async
from services.email_service import process_contact_email_async
import aiomysql

async def submit_query_info_async(data):
    required_fields = ['email', 'query']
    for field in required_fields:
        if field not in data or data[field].strip() == '':
            return f"{field} is required.", 400
    
    success = await save_query_data_async(data)

    if not success:
        return {"error": "Error inserting query"}, 500   

    #send email asynchronously
    await process_contact_email_async(data)

    return {"message": "Query submitted succesfully"}, 201


