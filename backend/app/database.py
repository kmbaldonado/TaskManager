import os
import time
from sqlmodel import SQLModel, create_engine, Session

DATABASE_URL = os.getenv("DATABASE_URL")
RETRIES = 10

for i in range(RETRIES):
    try:
        engine = create_engine(DATABASE_URL, echo=True)
        with engine.connect():
            print("✅ Connected to database.")
            break
    except Exception as e:
        print(f"❌ DB connection failed: {e}")
        time.sleep(3)
else:
    raise RuntimeError("Database connection failed after retries")

def get_session():
    with Session(engine) as session:
        yield session

def init_db():
    import app.models
    SQLModel.metadata.create_all(engine)
