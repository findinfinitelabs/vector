from fastapi import APIRouter, Depends
from bson import ObjectId
from models.db import get_db

router = APIRouter()

@router.post("/start/{user_id}")
def start_game(user_id: str, db=Depends(get_db)):
    # Initialize game state for user by updating the user document
    db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"progress": {"points": 0, "level": 1, "history": []}}}
    )
    return {"success": True, "message": "Game started!"}

@router.post("/reward/{user_id}")
def reward_user(user_id: str, points: int, db=Depends(get_db)):
    db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$inc": {"progress.points": points}}
    )
    return {"success": True, "points": points}