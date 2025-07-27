from sqlmodel import SQLModel
from typing import Optional

class UserCreate(SQLModel):
    email: str
    password: str

class Token(SQLModel):
    access_token: str
    token_type: str

class TaskCreate(SQLModel):
    title: str
    description: str

class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
