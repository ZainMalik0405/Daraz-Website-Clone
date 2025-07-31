import smtplib, ssl, random, os
from email.message import EmailMessage
from dotenv import load_dotenv
import os
from app.services.otp_store import save_otp

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../.env'))

print("📧 Email:", os.getenv("SMTP_EMAIL"))
print("🔑 Password:", os.getenv("SMTP_PASSWORD"))

def send_otp_email(receiver_email: str) -> str:
    otp = str(random.randint(100000, 999999))

    email_sender = os.getenv("SMTP_EMAIL")
    email_password = os.getenv("SMTP_PASSWORD")

    msg = EmailMessage()
    msg['Subject'] = "Your OTP Code for Daraz Clone"
    msg['From'] = email_sender
    msg['To'] = receiver_email
    msg.set_content(f"Hello 👋\n\nYour OTP is: {otp}\nIt expires in 5 minutes.\n\nThanks!")

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(email_sender, email_password)
        server.send_message(msg)
    save_otp(receiver_email, otp)
    return otp
