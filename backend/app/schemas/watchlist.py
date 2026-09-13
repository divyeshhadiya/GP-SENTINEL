from pydantic import BaseModel
from typing import List, Optional

class WatchlistBase(BaseModel):
    identifier: str
    source: str
    category: str
    severity: Optional[str] = "HIGH"
    details: Optional[str] = ""
    firNumber: Optional[str] = ""
    policeStation: Optional[str] = ""
    registeredOwner: Optional[str] = ""
    vehicleMakeModel: Optional[str] = ""
    dateAdded: Optional[str] = ""
    status: Optional[str] = "ACTIVE"

class WatchlistCreate(WatchlistBase):
    pass

class WatchlistResponse(WatchlistBase):
    id: str

    class Config:
        from_attributes = True

class WatchlistListResponse(BaseModel):
    success: bool = True
    total: int
    watchlists: List[WatchlistResponse]
