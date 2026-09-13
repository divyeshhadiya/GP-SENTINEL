from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timezone
from app.db.session import get_db
from app.models.camera import Camera

router = APIRouter()

@router.get("")
async def get_ingest_catalog(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Camera))
    cams = result.scalars().all()

    catalogue = [
        {
            "id": cam.id,
            "stream_index": idx + 1,
            "name": cam.name,
            "department": cam.department,
            "district": cam.district,
            "location": cam.location_name,
            "coordinates": {
                "latitude": cam.latitude,
                "longitude": cam.longitude
            },
            "live_status": "STREAMING" if cam.status == "Online" else "HIGH_LATENCY" if cam.status == "Degraded" else "OFFLINE",
            "stream_properties": {
                "codec": cam.codec,
                "resolution": cam.resolution,
                "advertised_fps": cam.fps,
                "pts_mode": "monotonic_presentation_timestamp_ms",
                "pixel_format": "yuv420p",
                "gop_size": 60,
                "transport_recommended": "TCP (rtsp_transport;tcp)",
                "decoder_recommendation": "rtph265depay ! h265parse ! avdec_h265" if cam.codec == "H.265" else "rtph264depay ! h264parse ! avdec_h264"
            },
            "urls": {
                "rtsp_tcp": f"rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/{idx + 1}",
                "rtsp_udp_fallback": f"rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/{idx + 1}?transport=udp",
                "hls_live": f"https://sandbox.sentinel.gujarat.gov.in/hls/stream_{idx + 1}/index.m3u8",
                "http_fallback": f"https://sandbox.sentinel.gujarat.gov.in/stream/{idx + 1}"
            },
            "metadata": {
                "storage_retention_days": cam.storage_days,
                "vms_source": cam.vms_vendor,
                "amc_active": cam.amc_active,
                "fov_angle_deg": cam.fov_angle,
                "coverage_radius_meters": cam.coverage_radius_meters,
                "health": {
                    "latency_ms": cam.ping_ms,
                    "last_heartbeat": cam.last_heartbeat
                }
            }
        }
        for idx, cam in enumerate(cams)
    ]

    return {
        "platform": "Gujarat Police SENTINEL CCTV Sandbox Ingestion Gateway",
        "version": "2026.4.1-LTS",
        "schema_spec": "SENTINEL-GRID-INGEST-V1",
        "timestamp_utc": datetime.now(timezone.utc).isoformat(),
        "total_cameras": len(catalogue),
        "active_streams": sum(1 for c in catalogue if c["live_status"] == "STREAMING"),
        "cameras": catalogue
    }
