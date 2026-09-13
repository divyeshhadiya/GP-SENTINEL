from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from typing import Optional, List
from app.db.session import get_db
from app.models.camera import Camera
from app.schemas.camera import CameraResponse, CameraCreate, CameraListResponse

router = APIRouter()

@router.get("", response_model=CameraListResponse)
async def list_cameras(
    department: Optional[str] = Query(None),
    district: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    cameraType: Optional[str] = Query(None),
    q: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    query = select(Camera)

    if department and department != "ALL":
        query = query.where(Camera.department == department)
    if district and district != "ALL":
        query = query.where(Camera.district.ilike(district))
    if status and status != "ALL":
        query = query.where(Camera.status == status)
    if cameraType and cameraType != "ALL":
        query = query.where(Camera.camera_type == cameraType)
    if q:
        search = f"%{q}%"
        query = query.where(
            or_(
                Camera.id.ilike(search),
                Camera.name.ilike(search),
                Camera.location_name.ilike(search),
                Camera.district.ilike(search),
                Camera.vendor.ilike(search)
            )
        )

    result = await db.execute(query)
    cams = result.scalars().all()

    camera_responses = [
        CameraResponse(
            id=c.id,
            name=c.name,
            department=c.department,
            locationName=c.location_name,
            district=c.district,
            coordinates=[c.latitude, c.longitude],
            status=c.status,
            cameraType=c.camera_type,
            vendor=c.vendor,
            vmsVendor=c.vms_vendor,
            resolution=c.resolution,
            fps=c.fps,
            codec=c.codec,
            storageDays=c.storage_days,
            storageType=c.storage_type,
            rtspUrl=c.rtsp_url,
            hlsUrl=c.hls_url or "",
            ipAddress=c.ip_address,
            installationYear=c.installation_year,
            amcActive=c.amc_active,
            fovAngle=c.fov_angle,
            coverageRadiusMeters=c.coverage_radius_meters,
            lastHeartbeat=c.last_heartbeat,
            pingMs=c.ping_ms,
            departmentPoc=c.department_poc
        )
        for c in cams
    ]

    return CameraListResponse(
        success=True,
        total=len(camera_responses),
        cameras=camera_responses
    )

@router.post("", response_model=CameraResponse, status_code=201)
async def onboard_camera(cam_in: CameraCreate, db: AsyncSession = Depends(get_db)):
    cam_id = cam_in.id or f"CAM-GUJ-{abs(hash(cam_in.name)) % 10000:04d}"
    
    new_cam = Camera(
        id=cam_id,
        name=cam_in.name,
        department=cam_in.department,
        location_name=cam_in.locationName,
        district=cam_in.district,
        latitude=cam_in.coordinates[0] if len(cam_in.coordinates) > 0 else 23.22,
        longitude=cam_in.coordinates[1] if len(cam_in.coordinates) > 1 else 72.65,
        status=cam_in.status or "Online",
        camera_type=cam_in.cameraType or "ANPR",
        vendor=cam_in.vendor or "Standard ONVIF Camera",
        vms_vendor=cam_in.vmsVendor or "Direct RTSP",
        resolution=cam_in.resolution or "1080p (FHD)",
        fps=cam_in.fps or 25,
        codec=cam_in.codec or "H.264",
        storage_days=cam_in.storageDays or 15,
        storage_type=cam_in.storageType or "Local NVR",
        rtsp_url=cam_in.rtspUrl or "rtsp://10.0.0.1:8554/live",
        hls_url=cam_in.hlsUrl or "",
        ip_address=cam_in.ipAddress or "10.18.5.50",
        installation_year=cam_in.installationYear or 2026,
        amc_active=cam_in.amcActive if cam_in.amcActive is not None else True,
        fov_angle=cam_in.fovAngle or 0,
        coverage_radius_meters=cam_in.coverageRadiusMeters or 100,
        last_heartbeat="Just now",
        ping_ms=cam_in.pingMs or 15,
        department_poc=cam_in.departmentPoc or "Field Incharge"
    )

    db.add(new_cam)
    await db.commit()
    await db.refresh(new_cam)

    return CameraResponse(
        id=new_cam.id,
        name=new_cam.name,
        department=new_cam.department,
        locationName=new_cam.location_name,
        district=new_cam.district,
        coordinates=[new_cam.latitude, new_cam.longitude],
        status=new_cam.status,
        cameraType=new_cam.camera_type,
        vendor=new_cam.vendor,
        vmsVendor=new_cam.vms_vendor,
        resolution=new_cam.resolution,
        fps=new_cam.fps,
        codec=new_cam.codec,
        storageDays=new_cam.storage_days,
        storageType=new_cam.storage_type,
        rtspUrl=new_cam.rtsp_url,
        hlsUrl=new_cam.hls_url or "",
        ipAddress=new_cam.ip_address,
        installationYear=new_cam.installation_year,
        amcActive=new_cam.amc_active,
        fovAngle=new_cam.fov_angle,
        coverageRadiusMeters=new_cam.coverage_radius_meters,
        lastHeartbeat=new_cam.last_heartbeat,
        pingMs=new_cam.ping_ms,
        departmentPoc=new_cam.department_poc
    )
