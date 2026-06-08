from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
import bcrypt
import jwt
from datetime import datetime, timedelta
from prisma import Prisma

router = APIRouter(prefix="/auth", tags=["auth"])

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login(data: LoginRequest):
    prisma = Prisma()
    await prisma.connect()

    try:
        user = await prisma.user.find_unique(
            where={"email": data.email}
        )

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )

        # Verify password
        if not bcrypt.checkpw(data.password.encode('utf-8'), user.password.encode('utf-8')):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )

        # Create JWT token
        JWT_SECRET = "your-super-secret-jwt-key-change-in-production-2026"
        
        access_token = jwt.encode(
            {
                "user_id": user.id,
                "email": user.email,
                "role": user.role,
                "exp": datetime.utcnow() + timedelta(hours=24)
            },
            JWT_SECRET,
            algorithm="HS256"
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name or "Admin User",
                "role": user.role
            }
        }

    finally:
        await prisma.disconnect()
