# test_sendgrid_simple.py
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv('sendgrid_api_key')
from_email = os.getenv('from_email_user')
to_email = os.getenv('to_email_user')

if not api_key:
    print("ERROR: No API key found!")
    exit(1)

try:
    message = Mail(
        from_email=from_email,
        to_emails=to_email,
        subject='Test Email',
        html_content='<strong>Test email content</strong>'
    )
    
    print("\nSending test email...")
    sg = SendGridAPIClient(api_key)
    response = sg.send(message)
       
except Exception as e:
    print(f"\n✗ Error sending email: {type(e).__name__}: {e}")