from fastapi import FastAPI
from app.auth import router as auth_router
from app.tasks import router as task_router
from app.database import init_db
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],  # allow POST, OPTIONS, etc.
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(auth_router, prefix="/auth")
app.include_router(task_router, prefix="/tasks")
