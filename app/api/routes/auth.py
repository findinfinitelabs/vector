from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from models.user import User, UserCreate
from models.db import get_db
from fastapi.responses import RedirectResponse

router = APIRouter()

class LoginRequest(BaseModel):
    provider: str  # google, apple, x, username
    token: str = None
    username: str = None
    password: str = None

@router.post("/login")
def login(request: LoginRequest, db=Depends(get_db)):
    # Authentication bypassed for demo/testing
    demo_user = {
        "_id": "demo-user-id",
        "provider": request.provider,
        "username": request.username,
        "progress": {"level": 1, "points": 0}
    }
    return {"success": True, "user": demo_user}
