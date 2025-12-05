from dotenv import load_dotenv
import os
load_dotenv()

# Email Configuration
sendgrid_api_key = os.getenv('sendgrid_api_key')
from_email = os.getenv('from_email_user')
to_email = os.getenv('to_email_user')