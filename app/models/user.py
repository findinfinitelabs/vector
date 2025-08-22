from pydantic import BaseModel

class User(BaseModel):
    id: str
    provider: str
    token: str = None
    username: str = None
    password: str = None
    progress: dict = {}

class UserCreate(BaseModel):
    provider: str
    token: str = None
    username: str = None
    password: str = None
