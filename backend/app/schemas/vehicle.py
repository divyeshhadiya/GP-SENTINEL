from pydantic import BaseModel
from typing import List, Optional, Any

class VehicleSightingResponse(BaseModel):
    id: str
    registrationNumber: str
    cameraId: str
    cameraName: str
    locationName: str
    district: str
    coordinates: List[float]
    timestamp: str
    speedKmh: int
    heading: str
    confidence: float
    vehicleColor: str
    vehicleType: str
    imageUrl: str
    plateCropUrl: str
    lane: int
    forensicHash: str

class TrajectorySummary(BaseModel):
    totalSightings: int
    firstSeen: Optional[str] = None
    lastSeen: Optional[str] = None
    lastLocation: Optional[str] = None
    lastDistrict: Optional[str] = None
    lastCoordinates: Optional[List[float]] = None
    avgSpeedKmh: int = 0
    durationMinutes: int = 0
    primaryHeading: Optional[str] = None

class VehicleTrackResponse(BaseModel):
    success: bool = True
    registrationNumber: str
    isWatchlistMatch: bool
    watchlistAlert: Optional[Any] = None
    summary: TrajectorySummary
    sightings: List[VehicleSightingResponse]
