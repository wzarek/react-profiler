from statistics import mean, stdev
from typing import List
from models.schemas import EventResponse, Outlier
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

async def get_outliers(db: AsyncSession) -> List[Outlier]:
    stmt = select(AnalyticsEvent)
    result = await db.execute(stmt)
    events = result.scalars().all()

    time_taken_values = [event.time_taken for event in events]

    avg_time_taken = mean(time_taken_values)
    stddev_time_taken = stdev(time_taken_values)

    outliers = [
        Outlier(
            title = event.title,
            location = event.location,
            session_id=event.session_id,
            event_type=event.event_type,
            time_taken=event.time_taken,
        )
        for event in events
        if abs(event.time_taken - avg_time_taken) > 2 * stddev_time_taken
    ]

    return outliers

# async def get_mad_outliers(db: AsyncSession):
#     query = select(AnalyticsEvent.title, AnalyticsEvent.location, AnalyticsEvent.time_taken, AnalyticsEvent.session_id)
#     result = await db.execute(query)
#     data = pd.DataFrame(result.fetchall(), columns=["title", "location", "time_taken"])

#     if data.empty or "time_taken" not in data:
#         return []

#     median = np.median(data["time_taken"])
#     mad = np.median(np.abs(data["time_taken"] - median))
#     threshold = 3 * mad 

#     data["is_outlier"] = np.abs(data["time_taken"] - median) > threshold

#     outliers = data[data["is_outlier"]]
#     return outliers.to_dict(orient="records")

# async def get_lof_outliers(db: AsyncSession):
#     query = select(AnalyticsEvent.title, AnalyticsEvent.location, AnalyticsEvent.time_taken)
#     result = await db.execute(query)
#     data = pd.DataFrame(result.fetchall(), columns=["title", "location", "time_taken"])

#     if data.empty or "time_taken" not in data:
#         return []

#     model = LocalOutlierFactor(n_neighbors=20, contamination=0.05) 
#     data["is_outlier"] = model.fit_predict(data[["time_taken"]])

#     outliers = data[data["is_outlier"] == -1]
#     return outliers.to_dict(orient="records")

# async def get_isolation_forest_outliers(db: AsyncSession):
#     query = select(AnalyticsEvent.title, AnalyticsEvent.location, AnalyticsEvent.time_taken)
#     result = await db.execute(query)
#     data = pd.DataFrame(result.fetchall(), columns=["title", "location", "time_taken"])

#     if data.empty or "time_taken" not in data:
#         return []

#     model = IsolationForest(contamination=0.05, random_state=42)
#     data["is_outlier"] = model.fit_predict(data[["time_taken"]])

#     outliers = data[data["is_outlier"] == -1]
#     return outliers.to_dict(orient="records")

async def get_all_events(db: AsyncSession) -> List[EventResponse]:
    query = select(AnalyticsEvent)
    result = await db.execute(query)
    events = result.scalars().all()

    df = pd.DataFrame([{
        "session_id": event.session_id,
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
