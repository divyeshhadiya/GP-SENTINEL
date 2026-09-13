from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import datetime

class AlertBase(BaseModel):
    registrationNumber: str
    cameraId: str
    cameraName: str
    locationName: str
    coordinates: List[float]
    severity: Optional[str] = "HIGH"
    status: Optional[str] = "NEW"
    notes: Optional[str] = ""
    sightingId: Optional[str] = None
    watchlistEntry: Optional[Any] = None
    dispatchedUnit: Optional[Any] = None

class AlertCreate(AlertBase):
    pass

class AlertUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None
    dispatchedUnit: Optional[Any] = None

class AlertResponse(AlertBase):
    id: str
    timestamp: str

    class Config:
        from_attributes = True

class AlertListResponse(BaseModel):
    success: bool = True
    total: int
    alerts: List[AlertResponse]
