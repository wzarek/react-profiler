from typing import List
from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from utils.database import engine, Base, get_db
from utils.crud import create_event, get_all_events
from models.schemas import AnalyticsEventCreate, AnalyticsEventResponse, EventResponse, Outlier
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
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

# @app.get("/outliers/mad", response_model=List[Outlier])
# async def get_mad_outliers_endpoint(db: AsyncSession = Depends(get_db)):
#     return await get_mad_outliers(db)

# @app.get("/outliers/lof", response_model=List[Outlier])
# async def get_lof_outliers_endpoint(db: AsyncSession = Depends(get_db)):
#     return await get_lof_outliers(db)

# @app.get("/outliers/isolation", response_model=List[Outlier])
# async def get_isolation_forest_outliers_endpoint(db: AsyncSession = Depends(get_db)):
#     return await get_isolation_forest_outliers(db)

@app.get("/events/all", response_model=List[EventResponse])
async def get_all_events_endpoint(db: AsyncSession = Depends(get_db)):
    return await get_all_events(db)
