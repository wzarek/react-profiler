from typing import List
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from utils.database import engine, Base, get_db
from utils.crud import create_event, get_all_events_mad, get_all_events_isolation_forest, get_all_events_lof
from models.schemas import AnalyticsEventCreate, AnalyticsEventResponse, EventResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

@app.get("/events/all/isolation-forest", response_model=List[EventResponse])
async def get_all_events_isolation_endpoint(db: AsyncSession = Depends(get_db)):
    return await get_all_events_isolation_forest(db)

@app.get("/events/all/lof", response_model=List[EventResponse])
async def get_all_events_lof_endpoint(db: AsyncSession = Depends(get_db)):
    return await get_all_events_lof(db)

@app.get("/events/all/mad", response_model=List[EventResponse])
async def get_all_events_mad_endpoint(db: AsyncSession = Depends(get_db)):
    return await get_all_events_mad(db)
