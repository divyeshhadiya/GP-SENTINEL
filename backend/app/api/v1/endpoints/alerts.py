import json
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import List, Optional
from datetime import datetime, timezone
from app.db.session import get_db
from app.models.alert import Alert
from app.models.watchlist import Watchlist
from app.schemas.alert import AlertResponse, AlertCreate, AlertUpdate, AlertListResponse

router = APIRouter()

@router.get("", response_model=AlertListResponse)
async def get_alerts(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Alert).order_by(desc(Alert.timestamp)))
    alerts = result.scalars().all()

    alert_responses = []
    for a in alerts:
        dispatched_unit = None
        if a.dispatched_unit:
            try:
                dispatched_unit = json.loads(a.dispatched_unit)
            except Exception:
                dispatched_unit = a.dispatched_unit

        alert_responses.append(
            AlertResponse(
                id=a.id,
                timestamp=a.timestamp.isoformat() if a.timestamp else datetime.now(timezone.utc).isoformat(),
                sightingId=a.sighting_id,
                registrationNumber=a.registration_number,
                cameraId=a.camera_id,
                cameraName=a.camera_name,
                locationName=a.location_name,
                coordinates=[a.latitude, a.longitude],
                severity=a.severity,
                status=a.status,
                notes=a.notes or "",
                dispatchedUnit=dispatched_unit
            )
        )

    return AlertListResponse(
        success=True,
        total=len(alert_responses),
        alerts=alert_responses
    )

@router.patch("/{alert_id}", response_model=AlertResponse)
async def update_alert(alert_id: str, update_data: AlertUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Alert).where(Alert.id == alert_id))
    alert = result.scalars().first()

    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")

    if update_data.status:
        alert.status = update_data.status
    if update_data.notes:
        alert.notes = update_data.notes
    if update_data.dispatchedUnit is not None:
        alert.dispatched_unit = json.dumps(update_data.dispatchedUnit)

    await db.commit()
    await db.refresh(alert)

    dispatched = None
    if alert.dispatched_unit:
        try:
            dispatched = json.loads(alert.dispatched_unit)
        except Exception:
            dispatched = alert.dispatched_unit

    return AlertResponse(
        id=alert.id,
        timestamp=alert.timestamp.isoformat() if alert.timestamp else datetime.now(timezone.utc).isoformat(),
        sightingId=alert.sighting_id,
        registrationNumber=alert.registration_number,
        cameraId=alert.camera_id,
        cameraName=alert.camera_name,
        locationName=alert.location_name,
        coordinates=[alert.latitude, alert.longitude],
        severity=alert.severity,
        status=alert.status,
        notes=alert.notes or "",
        dispatchedUnit=dispatched
    )

@router.post("", response_model=AlertResponse, status_code=201)
async def create_alert(new_alert: AlertCreate, db: AsyncSession = Depends(get_db)):
    alert_id = f"ALT-2026-{abs(hash(new_alert.registrationNumber + str(datetime.now()))) % 1000:03d}"
    
    dispatched_str = json.dumps(new_alert.dispatchedUnit) if new_alert.dispatchedUnit else None

    db_alert = Alert(
        id=alert_id,
        timestamp=datetime.now(timezone.utc),
        sighting_id=new_alert.sightingId or f"SIGHT-{abs(hash(str(datetime.now()))) % 1000:03d}",
        registration_number=new_alert.registrationNumber,
        camera_id=new_alert.cameraId,
        camera_name=new_alert.cameraName,
        location_name=new_alert.locationName,
        latitude=new_alert.coordinates[0] if len(new_alert.coordinates) > 0 else 23.0,
        longitude=new_alert.coordinates[1] if len(new_alert.coordinates) > 1 else 72.5,
        severity=new_alert.severity or "HIGH",
        status=new_alert.status or "NEW",
        notes=new_alert.notes or "Automated AI detection trigger",
        dispatched_unit=dispatched_str
    )

    db.add(db_alert)
    await db.commit()
    await db.refresh(db_alert)

    return AlertResponse(
        id=db_alert.id,
        timestamp=db_alert.timestamp.isoformat(),
        sightingId=db_alert.sighting_id,
        registrationNumber=db_alert.registration_number,
        cameraId=db_alert.camera_id,
        cameraName=db_alert.camera_name,
        locationName=db_alert.location_name,
        coordinates=[db_alert.latitude, db_alert.longitude],
        severity=db_alert.severity,
        status=db_alert.status,
        notes=db_alert.notes or "",
        dispatchedUnit=new_alert.dispatchedUnit
    )
