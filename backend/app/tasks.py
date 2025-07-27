from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.models import Task
from app.schemas import TaskCreate, TaskUpdate
from app.auth import get_current_user
from app.database import get_session
from app.models import User

router = APIRouter()

@router.get("/", response_model=list[Task])
def get_tasks(user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    return session.exec(select(Task).where(Task.owner_id == user.id)).all()

@router.post("/", response_model=Task)
def create_task(data: TaskCreate, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    task = Task(**data.dict(), owner_id=user.id)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.put("/{task_id}", response_model=Task)
def update_task(task_id: int, data: TaskUpdate, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task or task.owner_id != user.id:
        raise HTTPException(status_code=404, detail="Task not found")
    task_data = data.dict(exclude_unset=True)
    for k, v in task_data.items():
        setattr(task, k, v)
    session.commit()
    session.refresh(task)
    return task

@router.delete("/{task_id}")
def delete_task(task_id: int, user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    task = session.get(Task, task_id)
    if not task or task.owner_id != user.id:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(task)
    session.commit()
    return {"ok": True}
