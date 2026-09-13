from sqlalchemy import Column, String, Float, Integer, Boolean
from app.db.base import Base

class Camera(Base):
    __tablename__ = "cameras"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    department = Column(String, nullable=False, index=True)
    location_name = Column(String, nullable=False)
    district = Column(String, nullable=False, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    status = Column(String, default="Online", index=True)
    camera_type = Column(String, default="ANPR", index=True)
    vendor = Column(String, default="Standard ONVIF Camera")
    vms_vendor = Column(String, default="Direct RTSP")
    resolution = Column(String, default="1080p (FHD)")
    fps = Column(Integer, default=25)
    codec = Column(String, default="H.264")
    storage_days = Column(Integer, default=15)
    storage_type = Column(String, default="Local NVR")
    rtsp_url = Column(String, nullable=False)
    hls_url = Column(String, default="")
    ip_address = Column(String, default="10.18.5.50")
    installation_year = Column(Integer, default=2026)
    amc_active = Column(Boolean, default=True)
    fov_angle = Column(Integer, default=0)
    coverage_radius_meters = Column(Integer, default=100)
    last_heartbeat = Column(String, default="Just now")
    ping_ms = Column(Integer, default=15)
    department_poc = Column(String, default="Field Incharge")
