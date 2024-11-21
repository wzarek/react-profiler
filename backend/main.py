from typing import List
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from utils.database import engine, Base, get_db
from utils.crud import create_event, get_outliers
from models.schemas import AnalyticsEventCreate, AnalyticsEventResponse, Outlier

app = FastAPI()

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
