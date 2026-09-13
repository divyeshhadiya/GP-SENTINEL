from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from typing import Optional, List
from datetime import datetime, timezone
from app.db.session import get_db
from app.models.watchlist import Watchlist
from app.schemas.watchlist import WatchlistResponse, WatchlistCreate, WatchlistListResponse

router = APIRouter()

@router.get("", response_model=WatchlistListResponse)
async def list_watchlists(
    source: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    severity: Optional[str] = Query(None),
    q: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    query = select(Watchlist)

    if source and source != "ALL":
        query = query.where(Watchlist.source == source)
    if category and category != "ALL":
        query = query.where(Watchlist.category == category)
    if severity and severity != "ALL":
        query = query.where(Watchlist.severity == severity)
    if q:
        search = f"%{q}%"
        query = query.where(
            or_(
                Watchlist.identifier.ilike(search),
                Watchlist.details.ilike(search),
                Watchlist.registered_owner.ilike(search),
                Watchlist.fir_number.ilike(search)
            )
        )

    result = await db.execute(query)
    entries = result.scalars().all()

    responses = [
        WatchlistResponse(
            id=w.id,
            identifier=w.identifier,
            source=w.source,
            category=w.category,
            severity=w.severity,
            details=w.details or "",
            firNumber=w.fir_number or "",
            policeStation=w.police_station or "",
            registeredOwner=w.registered_owner or "",
            vehicleMakeModel=w.vehicle_make_model or "",
            dateAdded=w.date_added or "",
            status=w.status or "ACTIVE"
        )
        for w in entries
    ]

    return WatchlistListResponse(
        success=True,
        total=len(responses),
        watchlists=responses
    )

@router.post("", response_model=WatchlistResponse, status_code=201)
async def add_watchlist_entry(entry_in: WatchlistCreate, db: AsyncSession = Depends(get_db)):
    wid = f"WL-{entry_in.source[:4].upper()}-{abs(hash(entry_in.identifier)) % 10000:04d}"

    db_entry = Watchlist(
        id=wid,
        identifier=entry_in.identifier.upper().strip(),
        source=entry_in.source,
        category=entry_in.category,
        severity=entry_in.severity or "HIGH",
        details=entry_in.details or "Added by State Command Center Operator",
        fir_number=entry_in.firNumber or f"FIR-{abs(hash(entry_in.identifier)) % 900 + 100}/2026",
        police_station=entry_in.policeStation or "State Cyber Crime Cell, Gandhinagar",
        registered_owner=entry_in.registeredOwner or "N/A",
        vehicle_make_model=entry_in.vehicleMakeModel or "Unspecified",
        date_added=datetime.now(timezone.utc).isoformat(),
        status="ACTIVE"
    )

    db.add(db_entry)
    await db.commit()
    await db.refresh(db_entry)

    return WatchlistResponse(
        id=db_entry.id,
        identifier=db_entry.identifier,
        source=db_entry.source,
        category=db_entry.category,
        severity=db_entry.severity,
        details=db_entry.details,
        firNumber=db_entry.fir_number,
        policeStation=db_entry.police_station,
        registeredOwner=db_entry.registered_owner,
        vehicleMakeModel=db_entry.vehicle_make_model,
        dateAdded=db_entry.date_added,
        status=db_entry.status
    )
