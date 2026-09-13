from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional, List
from datetime import datetime
from app.db.session import get_db
from app.models.vehicle_sighting import VehicleSighting
from app.models.watchlist import Watchlist
from app.schemas.vehicle import VehicleTrackResponse, TrajectorySummary, VehicleSightingResponse

router = APIRouter()

@router.get("/track", response_model=VehicleTrackResponse)
async def track_vehicle(
    plate: str = Query(..., description="Target plate number, e.g. GJ-01-AB-1234"),
    db: AsyncSession = Depends(get_db)
):
    normalized_plate = plate.upper().strip().replace(" ", "-")

    # Fetch sightings ordered by timestamp
    result = await db.execute(
        select(VehicleSighting)
        .where(VehicleSighting.registration_number == normalized_plate)
        .order_by(VehicleSighting.timestamp.asc())
    )
    sightings = result.scalars().all()

    # Correlate with watchlist
    wl_clean = normalized_plate.replace("-", "")
    wl_result = await db.execute(select(Watchlist))
    all_wl = wl_result.scalars().all()
    
    match = None
    for w in all_wl:
        if w.identifier.replace("-", "").replace(" ", "").upper() == wl_clean:
            match = {
                "id": w.id,
                "identifier": w.identifier,
                "source": w.source,
                "category": w.category,
                "severity": w.severity,
                "details": w.details,
                "firNumber": w.fir_number,
                "policeStation": w.police_station,
                "registeredOwner": w.registered_owner,
                "vehicleMakeModel": w.vehicle_make_model,
                "status": w.status
            }
            break

    sighting_responses = [
        VehicleSightingResponse(
            id=s.id,
            registrationNumber=s.registration_number,
            cameraId=s.camera_id,
            cameraName=s.camera_name,
            locationName=s.location_name,
            district=s.district,
            coordinates=[s.latitude, s.longitude],
            timestamp=s.timestamp,
            speedKmh=s.speed_kmh,
            heading=s.heading,
            confidence=s.confidence,
            vehicleColor=s.vehicle_color,
            vehicleType=s.vehicle_type,
            imageUrl=s.image_url,
            plateCropUrl=s.plate_crop_url,
            lane=s.lane,
            forensicHash=s.forensic_hash
        )
        for s in sightings
    ]

    # Summary metrics
    first = sightings[0] if sightings else None
    last = sightings[-1] if sightings else None

    duration = 0
    if first and last and len(sightings) > 1:
        try:
            t1 = datetime.fromisoformat(first.timestamp.replace("Z", "+00:00"))
            t2 = datetime.fromisoformat(last.timestamp.replace("Z", "+00:00"))
            duration = int((t2 - t1).total_seconds() // 60)
        except Exception:
            duration = 210

    avg_speed = int(sum(s.speed_kmh for s in sightings) / (len(sightings) or 1)) if sightings else 0

    summary = TrajectorySummary(
        totalSightings=len(sightings),
        firstSeen=first.timestamp if first else None,
        lastSeen=last.timestamp if last else None,
        lastLocation=last.location_name if last else None,
        lastDistrict=last.district if last else None,
        lastCoordinates=[last.latitude, last.longitude] if last else None,
        avgSpeedKmh=avg_speed,
        durationMinutes=duration,
        primaryHeading=last.heading if last else None
    )

    return VehicleTrackResponse(
        success=True,
        registrationNumber=normalized_plate,
        isWatchlistMatch=bool(match),
        watchlistAlert=match,
        summary=summary,
        sightings=sighting_responses
    )

@router.get("/trajectory/{plate}", response_model=VehicleTrackResponse)
async def get_trajectory_by_plate(
    plate: str,
    db: AsyncSession = Depends(get_db)
):
    return await track_vehicle(plate=plate, db=db)

@router.get("/search")
async def search_vehicles(
    q: str = Query("", description="Query plate search prefix or full number"),
    db: AsyncSession = Depends(get_db)
):
    query_str = f"%{q.upper().strip()}%" if q else "%"
    result = await db.execute(
        select(VehicleSighting)
        .where(VehicleSighting.registration_number.ilike(query_str))
        .order_by(VehicleSighting.timestamp.desc())
    )
    sightings = result.scalars().all()
    # Unique plates
    seen = {}
    for s in sightings:
        if s.registration_number not in seen:
            seen[s.registration_number] = {
                "plate": s.registration_number,
                "lastSeen": s.timestamp,
                "lastLocation": s.location_name,
                "district": s.district,
                "vehicleType": s.vehicle_type,
                "vehicleColor": s.vehicle_color
            }
    return list(seen.values())

