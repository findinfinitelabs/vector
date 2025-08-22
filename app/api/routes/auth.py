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
    # Placeholder for OAuth and username/password logic
    if request.provider in ["google", "apple", "x"]:
        # Validate token with provider (pseudo-code)
        user = db.users.find_one({"provider": request.provider, "token": request.token})
        if not user:
            # Create new user
            user = UserCreate(provider=request.provider, token=request.token)
            db.users.insert_one(user.dict())
        return {"success": True, "user": user}
    elif request.provider == "username":
        user = db.users.find_one({"username": request.username})
        if user and user["password"] == request.password:
            return {"success": True, "user": user}
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    else:
        raise HTTPException(status_code=400, detail="Unknown provider")
