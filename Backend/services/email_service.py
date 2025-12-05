# services/email_service.py
import os
import sendgrid
from sendgrid.helpers.mail import Mail, Content
from dotenv import load_dotenv
import logging
from datetime import datetime

load_dotenv()
logger = logging.getLogger(__name__)

async def process_contact_email_async(data, is_new_client=False, database="unknown"):
    print("=" * 50)
    
    # Extract SendGrid credentials
    sendgrid_api_key = os.getenv("sendgrid_api_key")
    from_email = os.getenv("from_email_user")
    to_email = os.getenv("to_email_user")
    
    
    if not sendgrid_api_key:
        error_msg = "SendGrid API key is missing. Check your .env file"
        print(f"ERROR: {error_msg}")
        logger.error(error_msg)
        return {
            "success": False,
            "email_sent": False,
            "error": error_msg
        }
    
    if not from_email or not to_email:
        error_msg = "Email addresses are not configured in .env file"
        print(f"ERROR: {error_msg}")
        logger.error(error_msg)
        return {
            "success": False,
            "email_sent": False,
            "error": error_msg
        }
    
    try:
        # Initialize SendGrid client
        sg = sendgrid.SendGridAPIClient(api_key=sendgrid_api_key)
        
        # Extract all possible field names
        fname = data.get('clientfname', data.get('fname', data.get('client_fname', 'N/A')))
        lname = data.get('clientlname', data.get('lname', data.get('client_lname', 'N/A')))
        email = data.get('email', 'N/A')
        country_code = data.get('countrycode', data.get('country_code', data.get('CountryCode', 'N/A')))
        mobile = data.get('mobile', data.get('phone', data.get('Phone', 'N/A')))
        query = data.get('query', 'No query provided')
        website_source = data.get('website_source', database)
        
        #print(f"Extracted values: fname={fname}, lname={lname}, email={email}")
        
        # Create subject and content
        client_type = "NEW CLIENT REGISTRATION" if is_new_client else "ADDITIONAL QUERY FROM EXISTING CLIENT"
        subject = f"{client_type} - {website_source.upper()}"
        
        # Create email content
        content_text = f"""
        {'='*60}
        NEW CONTACT FORM SUBMISSION
        {'='*60}
        
        WEBSITE SOURCE: {website_source}
        CLIENT STATUS: {client_type}
        DATABASE: {database}
        TIMESTAMP: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        
        {'='*60}
        CLIENT DETAILS:
        {'='*60}
        Name: {fname} {lname}
        Email: {email}
        Phone: {country_code} {mobile}
        
        {'='*60}
        QUERY:
        {'='*60}
        {query}
        
        {'='*60}
        """
        
        content_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .header {{ background-color: #f8f9fa; padding: 20px; border-left: 4px solid #007bff; }}
                .section {{ margin: 20px 0; padding: 15px; border: 1px solid #dee2e6; border-radius: 5px; }}
                .label {{ font-weight: bold; color: #495057; }}
                .query {{ background-color: #e9ecef; padding: 15px; border-radius: 5px; white-space: pre-wrap; }}
                .status-new {{ color: #28a745; font-weight: bold; }}
                .status-existing {{ color: #17a2b8; font-weight: bold; }}
            </style>
        </head>
        <body>
            <div class="header">
                <h2>New Contact Form Submission</h2>
            </div>
            
            <div class="section">
                <p><span class="label">Website Source:</span> {website_source}</p>
                <p><span class="label">Status:</span> 
                    <span class="{'status-new' if is_new_client else 'status-existing'}">
                        {client_type}
                    </span>
                </p>
                
                <p><span class="label">Timestamp:</span> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
            </div>
            
            <div class="section">
                <h3>Client Details</h3>
                <p><span class="label">Name:</span> {fname} {lname}</p>
                <p><span class="label">Email:</span> <a href="mailto:{email}">{email}</a></p>
                <p><span class="label">Phone:</span> {country_code} {mobile}</p>
            </div>
            
            <div class="section">
                <h3> Query</h3>
                <div class="query">{query}</div>
            </div>
        </body>
        </html>
        """
        
        # Create the email message
        print(f"Creating email message to {to_email}...")
        message = Mail(
            from_email=from_email,
            to_emails=to_email,
            subject=subject,
            html_content=content_html
        )
        
        # Add plain text version
        message.content = Content("text/plain", content_text)
        
        # Send the email
        response = sg.send(message)
                       
        if response.status_code in [200, 202]:
            
            return {
                "success": True,
                "email_sent": True,
                "recipient": to_email,
                "status_code": response.status_code,
                "message": "Email notification sent successfully"
            }
        else:
            error_msg = f"SendGrid returned status {response.status_code}"
            print(f"{error_msg}")
            print(f"Response body: {response.body}")
            return {
                "success": False,
                "email_sent": False,
                "error": error_msg,
                "status_code": response.status_code,
                "response_body": response.body.decode('utf-8') if response.body else None
            }
            
    except Exception as e:
        error_msg = f"Exception in SendGrid process: {str(e)}"
        print(f"{error_msg}")
        import traceback
        traceback.print_exc()
        logger.error(error_msg, exc_info=True)
        return {
            "success": False,
            "email_sent": False,
            "error": error_msg
        }