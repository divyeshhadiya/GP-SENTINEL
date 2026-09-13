from sqlalchemy import Column, String, Text
from app.db.base import Base

class Watchlist(Base):
    __tablename__ = "watchlists"

    id = Column(String, primary_key=True, index=True)
    identifier = Column(String, unique=True, nullable=False, index=True)  # Plate number or person ID
    source = Column(String, nullable=False, index=True)  # VAHAN, eGujCop, Challan, Border
    category = Column(String, nullable=False, index=True)  # STOLEN_VEHICLE, WANTED_FELON, etc.
    severity = Column(String, default="HIGH", index=True)
    details = Column(Text, default="")
    fir_number = Column(String, default="")
    police_station = Column(String, default="")
    registered_owner = Column(String, default="")
    vehicle_make_model = Column(String, default="")
    date_added = Column(String, default="")
    status = Column(String, default="ACTIVE", index=True)
