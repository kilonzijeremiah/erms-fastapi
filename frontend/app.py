@app.post("/login")
def login(data: dict):
    return {
        "access_token": "demo-token",
        "token_type": "bearer"
    }