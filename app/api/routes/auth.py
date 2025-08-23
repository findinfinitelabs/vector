from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from models.user import User, UserCreate
from models.db import get_db
from fastapi.responses import RedirectResponse

router = APIRouter()


class LoginRequest(BaseModel):
    provider: str  # google, apple, x, username, email
    email: str = None
    token: str = None
    username: str = None
    password: str = None


@router.post("/login")
def login(request: LoginRequest, db=Depends(get_db)):
    users_collection = db["users"]
    # Only support email/password login for now
    if request.email and request.password:
        user = users_collection.find_one({"email": request.email})
        if not user or user.get("password") != request.password:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        # Log successful login (update last_login field)
        users_collection.update_one({"email": request.email}, {"$set": {"last_login": "now"}})
        return {"success": True, "user": user}
    else:
        raise HTTPException(status_code=400, detail="Email and password required")
