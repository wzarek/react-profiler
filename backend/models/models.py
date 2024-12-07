from datetime import time
from sqlalchemy import Column, Integer, String, Float, BigInteger
from sqlalchemy.sql import func
from utils.database import Base

class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True)
    user_id = Column(String, index=True)
    title = Column(String)
    event_type = Column(String, index=True)
    os_name = Column(String)
    os_version = Column(String)
    browser_name = Column(String)
    browser_version = Column(String)
    timestamp = Column(BigInteger,
        nullable=False,
        default=lambda: int(time.time()))
    location = Column(String, nullable=True)
    time_taken = Column(Float, nullable=True)
    description = Column(String, nullable=True)
