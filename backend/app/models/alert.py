from sqlalchemy import Column, String, Float, Text, DateTime
from datetime import datetime, timezone
from app.db.base import Base

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True, index=True)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc), index=True)
    sighting_id = Column(String, nullable=True)
    registration_number = Column(String, nullable=False, index=True)
    camera_id = Column(String, nullable=False)
    camera_name = Column(String, nullable=False)
    location_name = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    severity = Column(String, default="HIGH", index=True)
    status = Column(String, default="NEW", index=True)  # NEW, ACKNOWLEDGED, DISPATCHED, RESOLVED
    notes = Column(Text, default="")
    dispatched_unit = Column(Text, nullable=True)  # JSON string
