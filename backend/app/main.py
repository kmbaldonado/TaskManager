from fastapi import FastAPI
from app.auth import router as auth_router
from app.tasks import router as task_router
from app.database import init_db

app = FastAPI()

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(auth_router, prefix="/auth")
app.include_router(task_router, prefix="/tasks")
