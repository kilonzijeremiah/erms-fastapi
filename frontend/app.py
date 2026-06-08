# ==================== USER REGISTRATION ====================
class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    role: str = "TEACHER"

@router.post("/register")
async def register(data: RegisterRequest):
    prisma = Prisma()
    await prisma.connect()

    try:
        # Check if user already exists
        existing = await prisma.user.find_unique(
            where={"email": data.email}
        )

        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists"
            )

        # Hash password
        hashed_password = bcrypt.hashpw(
            data.password.encode('utf-8'), 
            bcrypt.gensalt()
        ).decode('utf-8')

        new_user = await prisma.user.create(
            data={
                "email": data.email,
                "password": hashed_password,
                "name": data.name,
                "role": data.role.upper()
            }
        )

        return {
            "success": True,
            "message": "User registered successfully",
            "user": {
                "id": new_user.id,
                "email": new_user.email,
                "name": new_user.name,
                "role": new_user.role
            }
        }

    finally:
        await prisma.disconnect()
