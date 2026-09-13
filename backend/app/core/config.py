import os
from typing import List
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl, field_validator

class Settings(BaseSettings):
    PROJECT_NAME: str = "GP-SENTINEL Backend API"
    VERSION: str = "2026.4.1-LTS"
    DESCRIPTION: str = "Unified Video Intelligence & Multi-Department CCTV Federation Platform"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "gujarat-police-sentinel-scrb-secret-2026-secure-key")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    
    # Dual-Engine Database Support: PostgreSQL with SQLite fallback
    # Example PostgreSQL URL: postgresql+asyncpg://postgres:postgres@localhost:5432/sentinel_db
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite+aiosqlite:///./sentinel.db"
    )

    # CORS settings
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000"
    ]

    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "allow"

settings = Settings()
