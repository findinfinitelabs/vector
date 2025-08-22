from fastapi import APIRouter, Depends
from models.db import get_db

router = APIRouter()

@router.post("/start/{user_id}")
def start_game(user_id: str, db=Depends(get_db)):
    # Initialize game state for new user
    db.progress.insert_one({"user_id": user_id, "points": 0, "level": 1, "history": []})
    return {"success": True, "message": "Game started!"}

@router.post("/reward/{user_id}")
def reward_user(user_id: str, points: int, db=Depends(get_db)):
    db.progress.update_one({"user_id": user_id}, {"$inc": {"points": points}})
    return {"success": True, "points": points}
