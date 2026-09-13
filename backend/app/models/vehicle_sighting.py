from sqlalchemy import Column, String, Float, Integer
from app.db.base import Base

class VehicleSighting(Base):
    __tablename__ = "vehicle_sightings"

    id = Column(String, primary_key=True, index=True)
    registration_number = Column(String, nullable=False, index=True)
    camera_id = Column(String, nullable=False, index=True)
    camera_name = Column(String, nullable=False)
    location_name = Column(String, nullable=False)
    district = Column(String, nullable=False, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    timestamp = Column(String, nullable=False, index=True)
    speed_kmh = Column(Integer, default=60)
    heading = Column(String, default="Southbound")
    confidence = Column(Float, default=0.98)
    vehicle_color = Column(String, default="White")
    vehicle_type = Column(String, default="SUV")
    image_url = Column(String, default="")
    plate_crop_url = Column(String, default="")
    lane = Column(Integer, default=1)
    forensic_hash = Column(String, default="")
