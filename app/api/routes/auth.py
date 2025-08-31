from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from models.user import User, UserCreate
from models.db import get_db
from bson import ObjectId
from passlib.context import CryptContext

router = APIRouter()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class LoginRequest(BaseModel):
    provider: str  # google, apple, x, username, email
    email: str = None
    token: str = None
    username: str = None
    password: str = None

class RegisterRequest(BaseModel):
    provider: str  # username or email
    email: str = None
    username: str = None
    password: str

@router.post("/login")
def login(request: LoginRequest, db=Depends(get_db)):
    users_collection = db["users"]
    user = None
    if request.provider in ['google', 'apple', 'x']:
        if not request.token:
            raise HTTPException(status_code=400, detail="Token required for OAuth providers")
        query = {"provider": request.provider, "token": request.token}
        if request.email:
            query["email"] = request.email
        user = users_collection.find_one(query)
        if not user and request.email:
            new_user_data = {
                "provider": request.provider,
                "email": request.email,
                "token": request.token,
                "progress": {},
                "hashed_password": None
            }
            inserted_id = users_collection.insert_one(new_user_data).inserted_id
            user = users_collection.find_one({"_id": inserted_id})
    elif request.provider == 'username':
        if not request.username or not request.password:
            raise HTTPException(status_code=400, detail="Username and password required")
        user = users_collection.find_one({"username": request.username})
        if not user or not pwd_context.verify(request.password, user.get("hashed_password")):
            raise HTTPException(status_code=401, detail="Invalid username or password")
    elif request.provider == 'email':
        if not request.email or not request.password:
            raise HTTPException(status_code=400, detail="Email and password required")
        user = users_collection.find_one({"email": request.email})
        if not user or not pwd_context.verify(request.password, user.get("hashed_password")):
            raise HTTPException(status_code=401, detail="Invalid email or password")
    else:
        raise HTTPException(status_code=400, detail="Unsupported provider")

    if user:
        users_collection.update_one({"_id": user["_id"]}, {"$set": {"last_login": "now"}})
        user_dict = {k: v for k, v in user.items() if k != "_id"}
        user_dict["id"] = str(user["_id"])
        return {"success": True, "user": user_dict}
    else:
        raise HTTPException(status_code=401, detail="Login failed")

@router.post("/register")
def register(request: RegisterRequest, db=Depends(get_db)):
    users_collection = db["users"]
    if request.provider not in ["username", "email"]:
        raise HTTPException(status_code=400, detail="Registration only supported for username or email providers")
    
    # Check if email or username already exists
    if request.email and users_collection.find_one({"email": request.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    if request.username and users_collection.find_one({"username": request.username}):
        raise HTTPException(status_code=400, detail="Username already taken")

    # Hash the password
    hashed_password = pwd_context.hash(request.password)

    # Prepare user data
    user_data = {
        "provider": request.provider,
        "email": request.email,
        "username": request.username,
        "hashed_password": hashed_password,
        "progress": {},
        "last_login": "now"
    }
    inserted_id = users_collection.insert_one(user_data).inserted_id
    user = users_collection.find_one({"_id": inserted_id})
    user_dict = {k: v for k, v in user.items() if k != "_id"}
    user_dict["id"] = str(user["_id"])
    return {"success": True, "user": user_dict}