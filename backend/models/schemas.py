from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AnalyticsEventCreate(BaseModel):
    session_id: str
    title: str
    event_type: str
    os_name: str
    os_version: str
    browser_name: str
    browser_version: str
    timestamp: datetime
    location: Optional[str] = None
    time_taken: Optional[float] = None
    description: Optional[str] = None

class AnalyticsEventResponse(AnalyticsEventCreate):
    id: int

    class Config:
        orm_mode = True

class Outlier(BaseModel):
    id: int
    session_id: str
    event_type: str
    time_taken: float
    avg_time_taken: float
    stddev_time_taken: float
