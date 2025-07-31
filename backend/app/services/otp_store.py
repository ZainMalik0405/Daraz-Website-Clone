from datetime import datetime, timedelta

otp_db = {}

def save_otp(email: str, otp: str):
    expiry = datetime.utcnow() + timedelta(minutes=5)
    otp_db[email] = {"otp": otp, "expires": expiry}

def verify_otp(email: str, submitted_otp: str):
    entry = otp_db.get(email)
    if not entry:
        return False
    if datetime.utcnow() > entry["expires"]:
        del otp_db[email]
        return False
    if entry["otp"] != submitted_otp:
        return False
    del otp_db[email]
    return True
