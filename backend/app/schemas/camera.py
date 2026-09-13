from pydantic import BaseModel
from typing import List, Optional, Tuple

class CameraBase(BaseModel):
    name: str
    department: str
    locationName: str
    district: str
    coordinates: List[float]
    status: Optional[str] = "Online"
    cameraType: Optional[str] = "ANPR"
    vendor: Optional[str] = "Standard ONVIF Camera"
    vmsVendor: Optional[str] = "Direct RTSP"
    resolution: Optional[str] = "1080p (FHD)"
    fps: Optional[int] = 25
    codec: Optional[str] = "H.264"
    storageDays: Optional[int] = 15
    storageType: Optional[str] = "Local NVR"
    rtspUrl: Optional[str] = "rtsp://10.0.0.1:8554/live"
    hlsUrl: Optional[str] = ""
    ipAddress: Optional[str] = "10.18.5.50"
    installationYear: Optional[int] = 2026
    amcActive: Optional[bool] = True
    fovAngle: Optional[int] = 0
    coverageRadiusMeters: Optional[int] = 100
    lastHeartbeat: Optional[str] = "Just now"
    pingMs: Optional[int] = 15
    departmentPoc: Optional[str] = "Field Incharge"

class CameraCreate(CameraBase):
    id: Optional[str] = None

class CameraResponse(CameraBase):
    id: str

    class Config:
        from_attributes = True

class CameraListResponse(BaseModel):
    success: bool = True
    total: int
    cameras: List[CameraResponse]
