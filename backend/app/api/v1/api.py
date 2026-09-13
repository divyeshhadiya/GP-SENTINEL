from fastapi import APIRouter
from app.api.v1.endpoints import auth, cameras, alerts, vehicle, watchlists, gap_analysis, ingest

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication & Access Control"])
api_router.include_router(cameras.router, prefix="/cameras", tags=["Unified GIS Camera Registry"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["Live Incident Alerts & PCR Dispatch"])
api_router.include_router(vehicle.router, prefix="/vehicle", tags=["ANPR Vehicle Traversal Tracking"])
api_router.include_router(watchlists.router, prefix="/watchlists", tags=["VAHAN & eGujCop Watchlists"])
api_router.include_router(gap_analysis.router, prefix="/gap-analysis", tags=["Statewide Surveillance Gap Analysis"])
api_router.include_router(ingest.router, prefix="/ingest", tags=["Sandbox Video Streaming Catalog"])
