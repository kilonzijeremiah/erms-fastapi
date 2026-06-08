from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
import bcrypt
import jwt
from datetime import datetime, timedelta
from prisma import Prisma

router = APIRouter()

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login(data: LoginRequest):
    prisma = Prisma()
    await prisma.connect()

    try:
        # Find user
        user = await prisma.user.find_unique(
            where={"email": data.email}
        )

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )

        # Check password
        if not bcrypt.checkpw(data.password.encode('utf-8'), user.password.encode('utf-8')):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )

        # Generate JWT token
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
                "name": user.name,
                "role": user.role
            }
        }

    finally:
        await prisma.disconnect()
