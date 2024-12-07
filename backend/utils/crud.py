from statistics import mean, stdev
from typing import List
from models.schemas import EventResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.models import AnalyticsEvent
from sklearn.ensemble import IsolationForest
import pandas as pd
import numpy as np
from sklearn.neighbors import LocalOutlierFactor

async def create_event(db: AsyncSession, event_data) -> AnalyticsEvent:
    new_event = AnalyticsEvent(**event_data.dict())
    db.add(new_event)
    await db.commit()
    await db.refresh(new_event)
    return new_event
    
async def get_all_events_mad(db: AsyncSession) -> List[EventResponse]:
    query = select(AnalyticsEvent)
    result = await db.execute(query)
    events = result.scalars().all()

    df = pd.DataFrame([{
        "session_id": event.session_id,
        "user_id": event.user_id,
        "title": event.title,
        "event_type": event.event_type,
        "os_name": event.os_name,
        "os_version": event.os_version,
        "browser_name": event.browser_name,
        "browser_version": event.browser_version,
        "timestamp": event.timestamp,
        "location": event.location,
        "time_taken": event.time_taken,
        "description": event.description
    } for event in events])

    if not df.empty and "time_taken" in df:
        median = np.median(df["time_taken"])
        mad = np.median(np.abs(df["time_taken"] - median))
        threshold = 3 * mad
        df["is_outlier"] = np.abs(df["time_taken"] - median) > threshold
    else:
        df["is_outlier"] = False

    flagged_events = [
        EventResponse(
            session_id=row["session_id"],
            user_id=row["user_id"],
            title=row["title"],
            event_type=row["event_type"],
            os_name=row["os_name"],
            os_version=row["os_version"],
            browser_name=row["browser_name"],
            browser_version=row["browser_version"],
            timestamp=row["timestamp"],
            location=row["location"],
            time_taken=row["time_taken"],
            description=row["description"],
            is_outlier=row["is_outlier"]
        )
        for _, row in df.iterrows()
    ]

    return flagged_events


async def get_all_events_lof(db: AsyncSession) -> List[EventResponse]:
    query = select(AnalyticsEvent)
    result = await db.execute(query)
    events = result.scalars().all()

    df = pd.DataFrame([{
        "session_id": event.session_id,
        "user_id": event.user_id,
        "title": event.title,
        "event_type": event.event_type,
        "os_name": event.os_name,
        "os_version": event.os_version,
        "browser_name": event.browser_name,
        "browser_version": event.browser_version,
        "timestamp": event.timestamp,
        "location": event.location,
        "time_taken": event.time_taken,
        "description": event.description
    } for event in events])

    if not df.empty and "time_taken" in df:
        model = LocalOutlierFactor(n_neighbors=20, contamination=0.05)
        df["is_outlier"] = model.fit_predict(df[["time_taken"]]) == -1
    else:
        df["is_outlier"] = False

    flagged_events = [
        EventResponse(
            session_id=row["session_id"],
            user_id=row["user_id"],
            title=row["title"],
            event_type=row["event_type"],
            os_name=row["os_name"],
            os_version=row["os_version"],
            browser_name=row["browser_name"],
            browser_version=row["browser_version"],
            timestamp=row["timestamp"],
            location=row["location"],
            time_taken=row["time_taken"],
            description=row["description"],
            is_outlier=row["is_outlier"]
        )
        for _, row in df.iterrows()
    ]

    return flagged_events


async def get_all_events_isolation_forest(db: AsyncSession) -> List[EventResponse]:
    query = select(AnalyticsEvent)
    result = await db.execute(query)
    events = result.scalars().all()

    df = pd.DataFrame([{
        "session_id": event.session_id,
        "user_id": event.user_id,
        "title": event.title,
        "event_type": event.event_type,
        "os_name": event.os_name,
        "os_version": event.os_version,
        "browser_name": event.browser_name,
        "browser_version": event.browser_version,
        "timestamp": event.timestamp,
        "location": event.location,
        "time_taken": event.time_taken,
        "description": event.description
    } for event in events])

    if not df.empty and "time_taken" in df:
        model = IsolationForest(contamination=0.05, random_state=42)
        df["is_outlier"] = model.fit_predict(df[["time_taken"]]) == -1
    else:
        df["is_outlier"] = False

    flagged_events = [
        EventResponse(
            session_id=row["session_id"],
            user_id=row["user_id"],
            title=row["title"],
            event_type=row["event_type"],
            os_name=row["os_name"],
            os_version=row["os_version"],
            browser_name=row["browser_name"],
            browser_version=row["browser_version"],
            timestamp=row["timestamp"],
            location=row["location"],
            time_taken=row["time_taken"],
            description=row["description"],
            is_outlier=row["is_outlier"]
        )
        for _, row in df.iterrows()
    ]

    return flagged_events
