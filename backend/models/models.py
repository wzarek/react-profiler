from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from utils.database import Base

class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True)
    title = Column(String)
    event_type = Column(String, index=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    location = Column(String, nullable=True)
    time_taken = Column(Float, nullable=True)
    description = Column(String, nullable=True)
