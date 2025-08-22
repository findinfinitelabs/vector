from fastapi import APIRouter, Depends
from models.user import User
from models.db import get_db

router = APIRouter()

@router.get("/progress/{user_id}")
def get_progress(user_id: str, db=Depends(get_db)):
    user = db.users.find_one({"_id": user_id})
    if not user:
        return {"error": "User not found"}
    return {"progress": user.get("progress", {})}
