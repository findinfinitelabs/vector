from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from bson import ObjectId
from models.db import get_db

router = APIRouter()

class User(BaseModel):
    id: str = Field(alias="_id")
    provider: str
    email: str = None
    token: str = None
    username: str = None
    password: str = None
    progress: dict = {}

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class UserCreate(BaseModel):
    provider: str
    email: str = None
    token: str = None
    username: str = None
    password: str = None

@router.get("/progress/{user_id}")
def get_progress(user_id: str, db=Depends(get_db)):
    try:
        user = db.users.find_one({"_id": ObjectId(user_id)})
    except:
        return {"error": "Invalid user ID"}
    if not user:
        return {"error": "User not found"}
    user["id"] = str(user["_id"])
    del user["_id"]
    return {"progress": user.get("progress", {})}