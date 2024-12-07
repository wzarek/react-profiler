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
    timestamp: int
    location: Optional[str] = None
    time_taken: Optional[float] = None
    description: Optional[str] = None

class AnalyticsEventResponse(AnalyticsEventCreate):
    id: int

    class Config:
        orm_mode = True

class Outlier(BaseModel):
    title: str
    session_id: str
    event_type: str
    time_taken: float
    location: Optional[str] = None

class EventResponse(AnalyticsEventCreate):
    is_outlier: bool
