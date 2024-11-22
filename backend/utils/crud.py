from statistics import mean, stdev
from typing import List
from models.schemas import Outlier
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.models import AnalyticsEvent

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
            id=event.id,
            session_id=event.session_id,
            event_type=event.event_type,
            time_taken=event.time_taken,
            avg_time_taken=avg_time_taken,
            stddev_time_taken=stddev_time_taken,
        )
        for event in events
        if abs(event.time_taken - avg_time_taken) > 2 * stddev_time_taken
    ]

    return outliers
