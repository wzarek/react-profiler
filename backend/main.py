from typing import List
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from utils.database import engine, Base, get_db
from utils.crud import create_event, get_outliers
from models.schemas import AnalyticsEventCreate, AnalyticsEventResponse, Outlier
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.post("/events", response_model=AnalyticsEventResponse)
async def create_event_endpoint(event: AnalyticsEventCreate, db: AsyncSession = Depends(get_db)):
    return await create_event(db, event)

@app.get("/outliers", response_model=List[Outlier])
async def get_outliers_endpoint(db: AsyncSession = Depends(get_db)):
    return await get_outliers(db)
