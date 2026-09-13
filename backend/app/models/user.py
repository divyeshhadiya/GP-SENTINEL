from sqlalchemy import Column, String, Boolean, DateTime
from datetime import datetime, timezone
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    badge_id = Column(String, nullable=False)
    rank = Column(String, nullable=False)
    department = Column(String, nullable=False)
    role = Column(String, nullable=False)  # DGP, SP_COMMAND, TRAFFIC_INSPECTOR, RTO_OFFICER, ADMIN
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
