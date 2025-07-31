from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext
from typing import Optional
from app.services.db import users_collection
from app.services.otp_email_sender import send_otp_email
from app.services.otp_store import verify_otp
import uuid

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 📦 Input model for signup
class SignupInput(BaseModel):
    name: str
    email: str
    password: str
    phone: str
    otp: str

# 📦 Input model for login
class LoginInput(BaseModel):
    email_or_phone: str
    password: str

# 📦 Email-only model
class EmailRequest(BaseModel):
    email: str

# 📦 OTP verification model
class OtpVerification(BaseModel):
    email: str
    otp: str

# 🚀 Signup route
@router.post("/auth/signup")
async def signup(payload: SignupInput):
    if not verify_otp(payload.email, payload.otp):
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    existing_user = await users_collection.find_one({"email": payload.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pwd = pwd_context.hash(payload.password)

    user = {
        "id": str(uuid.uuid4()),
        "name": payload.name,
        "email": payload.email,
        "password": hashed_pwd,
        "phone": payload.phone
    }

    result = await users_collection.insert_one(user)

    # 📌 Add Mongo _id as string for traceability
    user["_id"] = str(result.inserted_id)

    # 🛡️ Don't expose password in response
    user.pop("password", None)

    return {"message": "Signup successful", "user": user}

# 🔐 Login route
@router.post("/auth/login")
async def login(payload: LoginInput):
    print("📩 Incoming request body:", payload.email_or_phone)

    user = await users_collection.find_one({"email": payload.email_or_phone})
    if not user or not pwd_context.verify(payload.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user["_id"] = str(user["_id"])
    user.pop("password", None)

    return {"message": "Login successful", "user": user}

# 📨 Send OTP route
@router.post("/auth/send-otp")
async def send_otp(payload: EmailRequest):
    print("📩 Incoming request body:", payload.email)
    otp = send_otp_email(payload.email)
    return {"message": "OTP sent", "otp": otp}

# ✅ Verify OTP route
@router.post("/auth/verify-otp")
async def verify_otp_api(data: OtpVerification):
    if verify_otp(data.email, data.otp):
        return {"verified": True}
    else:
        return {"verified": False}
