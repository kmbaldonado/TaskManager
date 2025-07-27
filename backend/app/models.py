from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import date

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True)
    hashed_password: str

    tasks: List["Task"] = Relationship(back_populates="owner")

class Task(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str
    completed: bool = False
    owner_id: int = Field(foreign_key="user.id")
    deadline: Optional[date] = None

    owner: Optional[User] = Relationship(back_populates="tasks")
