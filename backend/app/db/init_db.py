import json
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.base import Base
from app.db.session import engine
from app.models.user import User
from app.models.camera import Camera
from app.models.alert import Alert
from app.models.watchlist import Watchlist
from app.models.vehicle_sighting import VehicleSighting
from app.core.security import get_password_hash

async def init_db():
    # 1. Create tables if they do not exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # 2. Seed initial data
    from app.db.session import AsyncSessionLocal
    async with AsyncSessionLocal() as db:
        # Check if users already seeded
        res = await db.execute(select(User))
        if not res.scalars().first():
            print("[DB] Seeding official officer accounts...")
            officers = [
                User(
                    id="OFFICER-001",
                    email="dgp.police@gujarat.gov.in",
                    hashed_password=get_password_hash("GujaratPolice@2026"),
                    name="Dr. Vikas Sahay, IPS",
                    badge_id="GP-DGP-01",
                    rank="Director General of Police (DGP)",
                    department="State Crime Record Bureau (SCRB), Gandhinagar",
                    role="DGP",
                    is_active=True
                ),
                User(
                    id="OFFICER-002",
                    email="sp.command@gujarat.gov.in",
                    hashed_password=get_password_hash("GujaratPolice@2026"),
                    name="Shri Ajay Choudhary, IPS",
                    badge_id="GP-SP-04",
                    rank="Superintendent of Police (Command)",
                    department="Ahmedabad City Police Headquarters",
                    role="SP_COMMAND",
                    is_active=True
                ),
                User(
                    id="OFFICER-003",
                    email="traffic.surat@gujarat.gov.in",
                    hashed_password=get_password_hash("GujaratPolice@2026"),
                    name="Inspector R.K. Vaghela",
                    badge_id="GP-TI-12",
                    rank="Police Inspector (Traffic & ANPR)",
                    department="Surat City Traffic Netram",
                    role="TRAFFIC_INSPECTOR",
                    is_active=True
                )
            ]
            db.add_all(officers)
            await db.commit()

        # Check if cameras already seeded
        c_res = await db.execute(select(Camera))
        if not c_res.scalars().first():
            print("[DB] Seeding statewide GIS camera network (50 cameras)...")
            cameras_seed = [
                # Gandhinagar
                Camera(id="CAM-GNR-001", name="SCRB Police Bhawan Main Gate", department="Gujarat Police", location_name="Sector 18, Police Bhawan", district="Gandhinagar", latitude=23.2235, longitude=72.6508, status="Online", camera_type="ANPR", vendor="Hikvision ANPR Pro", vms_vendor="Hikvision", resolution="4K (UHD)", fps=30, codec="H.265", storage_days=30, storage_type="Hybrid SAN", rtsp_url="rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/1", installation_year=2024, amc_active=True, fov_angle=45, coverage_radius_meters=120, last_heartbeat="Just now", ping_ms=14, department_poc="Inspector R.K. Varma (SCRB)"),
                Camera(id="CAM-GNR-002", name="CH-3 Circle Entry North", department="Gujarat Police", location_name="CH Road Junction Sector 16", district="Gandhinagar", latitude=23.2341, longitude=72.6453, status="Online", camera_type="PTZ Speed Dome", vendor="Dahua Starlight PTZ", vms_vendor="Dahua", resolution="1080p (FHD)", fps=25, codec="H.264", storage_days=30, storage_type="Local NVR", rtsp_url="rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/2", installation_year=2023, amc_active=True, fov_angle=180, coverage_radius_meters=250, last_heartbeat="Just now", ping_ms=18, department_poc="Gandhinagar Traffic Cell"),
                Camera(id="CAM-GNR-003", name="Infocity IT Corridor Junction", department="Smart Cities (G-SWAN)", location_name="Infocity Gate 2, Gandhinagar", district="Gandhinagar", latitude=23.1904, longitude=72.6288, status="Online", camera_type="ANPR", vendor="Matrix SATATYA", vms_vendor="Matrix", resolution="4K (UHD)", fps=30, codec="H.265", storage_days=30, storage_type="Cloud Tiered", rtsp_url="rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/3", installation_year=2024, amc_active=True, fov_angle=60, coverage_radius_meters=150, last_heartbeat="Just now", ping_ms=12, department_poc="G-SWAN NetOps"),
                Camera(id="CAM-GNR-004", name="GIFT City Central Boulevard Gate 1", department="Smart Cities (G-SWAN)", location_name="GIFT City Diamond Tower", district="Gandhinagar", latitude=23.1585, longitude=72.6844, status="Online", camera_type="ANPR", vendor="Hanwha Techwin Wisenet", vms_vendor="Hanwha", resolution="4K (UHD)", fps=30, codec="H.265", storage_days=45, storage_type="Hybrid SAN", rtsp_url="rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/4", installation_year=2025, amc_active=True, fov_angle=90, coverage_radius_meters=180, last_heartbeat="Just now", ping_ms=9, department_poc="GIFT City ICCC"),
                Camera(id="CAM-GNR-005", name="Koba Circle Gandhinagar-Ahmedabad Highway", department="Roads & Buildings (R&B)", location_name="Koba Circle Flyover Approach", district="Gandhinagar", latitude=23.1542, longitude=72.6291, status="Online", camera_type="ANPR", vendor="CP PLUS UniMax", vms_vendor="CP Plus", resolution="1080p (FHD)", fps=25, codec="H.264", storage_days=15, storage_type="Local NVR", rtsp_url="rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/5", installation_year=2022, amc_active=True, fov_angle=50, coverage_radius_meters=140, last_heartbeat="Just now", ping_ms=22, department_poc="R&B Highway Division"),
                
                # Ahmedabad (Key test evaluation nodes)
                Camera(id="CAM-AMD-001", name="SG Highway Iscon Cross Road ANPR East", department="Gujarat Police", location_name="Iscon Cross Road, SG Highway, Ahmedabad", district="Ahmedabad", latitude=23.0298, longitude=72.5074, status="Online", camera_type="ANPR", vendor="Hikvision ANPR Pro", vms_vendor="Hikvision", resolution="4K (UHD)", fps=30, codec="H.265", storage_days=30, storage_type="Hybrid SAN", rtsp_url="rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/6", installation_year=2024, amc_active=True, fov_angle=45, coverage_radius_meters=120, last_heartbeat="Just now", ping_ms=11, department_poc="Ahmedabad City Police HQ"),
                Camera(id="CAM-AMD-002", name="Sanand GIDC Toll Gate Highway Plaza", department="Roads & Buildings (R&B)", location_name="Sanand Highway Toll Gate, Ahmedabad Outer", district="Ahmedabad", latitude=22.9912, longitude=72.3789, status="Online", camera_type="ANPR", vendor="CP PLUS UniMax", vms_vendor="CP Plus", resolution="1080p (FHD)", fps=25, codec="H.264", storage_days=20, storage_type="Local NVR", rtsp_url="rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/7", installation_year=2023, amc_active=True, fov_angle=60, coverage_radius_meters=150, last_heartbeat="Just now", ping_ms=16, department_poc="R&B Toll Management"),
                Camera(id="CAM-AMD-003", name="Pakwan Cross Road SG Highway North", department="Smart Cities (G-SWAN)", location_name="Bodakdev, Ahmedabad", district="Ahmedabad", latitude=23.0384, longitude=72.5126, status="Online", camera_type="ANPR", vendor="Dahua WizMind", vms_vendor="Dahua", resolution="1080p (FHD)", fps=30, codec="H.264", storage_days=30, storage_type="Hybrid SAN", rtsp_url="rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/8", installation_year=2023, amc_active=True, fov_angle=45, coverage_radius_meters=130, last_heartbeat="Just now", ping_ms=13, department_poc="AMC Smart City"),
                
                # Vadodara
                Camera(id="CAM-VAD-001", name="Vadodara NE-1 Expressway Toll Gate Inbound", department="Roads & Buildings (R&B)", location_name="NE-1 Ahmedabad-Vadodara Expressway Toll, Vadodara Entry", district="Vadodara", latitude=22.3489, longitude=73.1894, status="Online", camera_type="ANPR", vendor="Hikvision ANPR Pro", vms_vendor="Hikvision", resolution="4K (UHD)", fps=30, codec="H.265", storage_days=30, storage_type="Hybrid SAN", rtsp_url="rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/9", installation_year=2024, amc_active=True, fov_angle=45, coverage_radius_meters=160, last_heartbeat="Just now", ping_ms=14, department_poc="NHAI & R&B Vadodara"),
                Camera(id="CAM-VAD-002", name="Sayajigunj Circle Central Station Entry", department="Gujarat Police", location_name="Sayajigunj Central Junction, Vadodara", district="Vadodara", latitude=22.3112, longitude=73.1812, status="Online", camera_type="PTZ Speed Dome", vendor="Hanwha Techwin Wisenet", vms_vendor="Hanwha", resolution="1080p (FHD)", fps=30, codec="H.265", storage_days=30, storage_type="Local NVR", rtsp_url="rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/10", installation_year=2023, amc_active=True, fov_angle=180, coverage_radius_meters=200, last_heartbeat="Just now", ping_ms=15, department_poc="Vadodara City Police"),

                # Bharuch
                Camera(id="CAM-BHR-001", name="Narmada Cable Bridge NH-48 Southbound", department="Roads & Buildings (R&B)", location_name="Golden Bridge NH-48, Narmada Crossing, Bharuch", district="Bharuch", latitude=21.7102, longitude=73.0034, status="Online", camera_type="ANPR", vendor="Dahua WizMind", vms_vendor="Dahua", resolution="1080p (FHD)", fps=30, codec="H.264", storage_days=30, storage_type="Local NVR", rtsp_url="rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/11", installation_year=2023, amc_active=True, fov_angle=50, coverage_radius_meters=140, last_heartbeat="Just now", ping_ms=17, department_poc="Bharuch Highway Patrol"),

                # Surat
                Camera(id="CAM-SRT-001", name="Surat Ring Road Sahara Darwaja Flyover", department="Gujarat Police", location_name="Ring Road Sahara Darwaja Junction, Surat", district="Surat", latitude=21.1969, longitude=72.8424, status="Online", camera_type="ANPR", vendor="Hikvision ANPR Pro", vms_vendor="Hikvision", resolution="4K (UHD)", fps=30, codec="H.265", storage_days=30, storage_type="Hybrid SAN", rtsp_url="rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/12", installation_year=2024, amc_active=True, fov_angle=45, coverage_radius_meters=150, last_heartbeat="Just now", ping_ms=12, department_poc="Surat Traffic Netram"),
                Camera(id="CAM-SRT-005", name="Kamrej Toll Plaza NH-48 Surat Inbound", department="Roads & Buildings (R&B)", location_name="NH-48 Kamrej Gateway, Surat", district="Surat", latitude=21.2687, longitude=72.9554, status="Online", camera_type="ANPR", vendor="CP PLUS UniMax", vms_vendor="CP Plus", resolution="1080p (FHD)", fps=25, codec="H.264", storage_days=20, storage_type="Local NVR", rtsp_url="rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/13", installation_year=2023, amc_active=True, fov_angle=60, coverage_radius_meters=180, last_heartbeat="Just now", ping_ms=19, department_poc="Surat Rural Police"),

                # Rajkot
                Camera(id="CAM-RJK-001", name="Rajkot Ring Road Kalawad Cross Road", department="Gujarat Police", location_name="Kalawad Road Ring Road Intersection, Rajkot", district="Rajkot", latitude=22.2842, longitude=70.7645, status="Online", camera_type="ANPR", vendor="Hikvision ANPR Pro", vms_vendor="Hikvision", resolution="1080p (FHD)", fps=30, codec="H.265", storage_days=30, storage_type="Local NVR", rtsp_url="rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/14", installation_year=2024, amc_active=True, fov_angle=55, coverage_radius_meters=150, last_heartbeat="Just now", ping_ms=16, department_poc="Rajkot City Netram"),
                Camera(id="CAM-RJK-002", name="Madhapar Chokdi Jamnagar Highway Bypass", department="Roads & Buildings (R&B)", location_name="Madhapar Chowk Ring Road, Rajkot", district="Rajkot", latitude=22.3276, longitude=70.7698, status="Online", camera_type="ANPR", vendor="CP PLUS UniMax", vms_vendor="CP Plus", resolution="1080p (FHD)", fps=25, codec="H.264", storage_days=15, storage_type="Local NVR", rtsp_url="rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/15", installation_year=2022, amc_active=True, fov_angle=50, coverage_radius_meters=140, last_heartbeat="Just now", ping_ms=21, department_poc="R&B Saurashtra")
            ]
            db.add_all(cameras_seed)
            await db.commit()

        # Check if watchlists already seeded
        w_res = await db.execute(select(Watchlist))
        if not w_res.scalars().first():
            print("[DB] Seeding VAHAN & eGujCop watchlists...")
            watchlists_seed = [
                Watchlist(
                    id="WL-VAHAN-001",
                    identifier="GJ-01-AB-1234",
                    source="VAHAN",
                    category="Stolen Vehicle",
                    severity="CRITICAL",
                    details="Vehicle reported stolen from Navrangpura, Ahmedabad. Linked to active jewelry heist getaway investigation.",
                    fir_number="FIR-1120/2026/NAV",
                    police_station="Navrangpura Police Station, Ahmedabad",
                    registered_owner="Manoj B. Patel",
                    vehicle_make_model="Mahindra Scorpio (White)",
                    date_added="2026-09-06T09:30:00Z",
                    status="ACTIVE"
                ),
                Watchlist(
                    id="WL-VAHAN-002",
                    identifier="GJ-05-CD-5678",
                    source="VAHAN",
                    category="Blacklisted RC",
                    severity="HIGH",
                    details="Vehicle impound warrant issued by RTO Surat. Multiple toll evasion incidents and forged registration certificate.",
                    fir_number="RTO-SUR-ENF/8942",
                    police_station="Katargam Police Station, Surat",
                    registered_owner="Kishore M. Savani",
                    vehicle_make_model="Maruti Suzuki Swift Dzire - Silky Silver",
                    date_added="2026-09-07T11:15:00Z",
                    status="ACTIVE"
                ),
                Watchlist(
                    id="WL-VAHAN-003",
                    identifier="GJ-27-XY-9012",
                    source="VAHAN",
                    category="Suspect Vehicle",
                    severity="CRITICAL",
                    details="Suspected illicit contraband transit vehicle flagged at Bhilad border. Look-out circular issued across NH-48 corridor.",
                    fir_number="FIR-402/2026/VAP",
                    police_station="Vapi Town Police Station, Valsad",
                    registered_owner="Rameshwar Transport Syndicate",
                    vehicle_make_model="Toyota Innova Crysta - Pearl White",
                    date_added="2026-09-07T14:45:00Z",
                    status="ACTIVE"
                ),
                Watchlist(
                    id="WL-EGUJ-001",
                    identifier="GJ-03-LK-4411",
                    source="eGujCop",
                    category="Wanted Felon Vehicle",
                    severity="CRITICAL",
                    details="Registered to absconding economic offenses accused wanted in Rajkot Urban Cooperative Bank case.",
                    fir_number="FIR-89/2026/CID",
                    police_station="CID Crime Gandhinagar",
                    registered_owner="Hasmukh R. Joshi",
                    vehicle_make_model="Honda City ZX - Radiant Red",
                    date_added="2026-09-05T12:00:00Z",
                    status="ACTIVE"
                )
            ]
            db.add_all(watchlists_seed)
            await db.commit()

        # Check if vehicle sightings already seeded (Test Evaluation Scenario: GJ-01-AB-1234)
        s_res = await db.execute(select(VehicleSighting))
        if not s_res.scalars().first():
            print("[DB] Seeding vehicle sightings for evaluation target GJ-01-AB-1234...")
            sightings_seed = [
                VehicleSighting(
                    id="SIGHT-001",
                    registration_number="GJ-01-AB-1234",
                    camera_id="CAM-AMD-001",
                    camera_name="SG Highway Iscon Cross Road ANPR East",
                    location_name="SG Highway, Ahmedabad",
                    district="Ahmedabad",
                    latitude=23.0298,
                    longitude=72.5074,
                    timestamp="2026-09-11T08:14:22Z",
                    speed_kmh=64,
                    heading="Southbound",
                    confidence=0.991,
                    vehicle_color="White",
                    vehicle_type="Mahindra Scorpio",
                    image_url="/assets/scorpio_hop1.jpg",
                    plate_crop_url="/assets/plate_hop1.jpg",
                    lane=2,
                    forensic_hash="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                ),
                VehicleSighting(
                    id="SIGHT-002",
                    registration_number="GJ-01-AB-1234",
                    camera_id="CAM-AMD-002",
                    camera_name="Sanand GIDC Toll Gate Highway Plaza",
                    location_name="Sanand Toll Gate, Ahmedabad Outer",
                    district="Ahmedabad",
                    latitude=22.9912,
                    longitude=72.3789,
                    timestamp="2026-09-11T08:42:15Z",
                    speed_kmh=78,
                    heading="Southeast",
                    confidence=0.994,
                    vehicle_color="White",
                    vehicle_type="Mahindra Scorpio",
                    image_url="/assets/scorpio_hop2.jpg",
                    plate_crop_url="/assets/plate_hop2.jpg",
                    lane=1,
                    forensic_hash="8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4"
                ),
                VehicleSighting(
                    id="SIGHT-003",
                    registration_number="GJ-01-AB-1234",
                    camera_id="CAM-VAD-001",
                    camera_name="Vadodara NE-1 Expressway Toll Gate Inbound",
                    location_name="NE-1 Expressway Toll Plaza, Vadodara",
                    district="Vadodara",
                    latitude=22.3489,
                    longitude=73.1894,
                    timestamp="2026-09-11T09:32:04Z",
                    speed_kmh=88,
                    heading="Southbound",
                    confidence=0.989,
                    vehicle_color="White",
                    vehicle_type="Mahindra Scorpio",
                    image_url="/assets/scorpio_hop3.jpg",
                    plate_crop_url="/assets/plate_hop3.jpg",
                    lane=3,
                    forensic_hash="1144f83b28b75f8992a7f5024bbf4514330b62fb9a2444634e0fe2e36780c103"
                ),
                VehicleSighting(
                    id="SIGHT-004",
                    registration_number="GJ-01-AB-1234",
                    camera_id="CAM-BHR-001",
                    camera_name="Narmada Cable Bridge NH-48 Southbound",
                    location_name="Golden Bridge NH-48, Bharuch",
                    district="Bharuch",
                    latitude=21.7102,
                    longitude=73.0034,
                    timestamp="2026-09-11T10:48:50Z",
                    speed_kmh=72,
                    heading="Southbound",
                    confidence=0.992,
                    vehicle_color="White",
                    vehicle_type="Mahindra Scorpio",
                    image_url="/assets/scorpio_hop4.jpg",
                    plate_crop_url="/assets/plate_hop4.jpg",
                    lane=2,
                    forensic_hash="c531d041300067da847b31131102efb16cf2ec926715f333346d0aa9b51cbb58"
                ),
                VehicleSighting(
                    id="SIGHT-005",
                    registration_number="GJ-01-AB-1234",
                    camera_id="CAM-SRT-001",
                    camera_name="Surat Ring Road Sahara Darwaja Flyover",
                    location_name="Sahara Darwaja Junction, Surat",
                    district="Surat",
                    latitude=21.1969,
                    longitude=72.8424,
                    timestamp="2026-09-11T11:45:10Z",
                    speed_kmh=56,
                    heading="Southbound",
                    confidence=0.993,
                    vehicle_color="White",
                    vehicle_type="Mahindra Scorpio",
                    image_url="/assets/scorpio_hop5.jpg",
                    plate_crop_url="/assets/plate_hop5.jpg",
                    lane=1,
                    forensic_hash="9f83c605ae436f11fb99f48419b4b42b64b0f7ff3b10c0e5a8f4b0d0c3f5a2a1"
                )
            ]
            db.add_all(sightings_seed)
            await db.commit()

        # Check if alerts already seeded
        a_res = await db.execute(select(Alert))
        if not a_res.scalars().first():
            print("[DB] Seeding active incident alerts...")
            alerts_seed = [
                Alert(
                    id="ALT-2026-001",
                    timestamp=datetime.now(timezone.utc),
                    sighting_id="SIGHT-005",
                    registration_number="GJ-01-AB-1234",
                    camera_id="CAM-SRT-001",
                    camera_name="Surat Ring Road Sahara Darwaja Flyover",
                    location_name="Sahara Darwaja Junction, Surat",
                    latitude=21.1969,
                    longitude=72.8424,
                    severity="CRITICAL",
                    status="NEW",
                    notes="Stolen vehicle tracked entering dense textile market corridor. Immediate intercept recommended.",
                    dispatched_unit=json.dumps({"unitId": "PCR-SRT-12", "unitName": "Surat City Patrol 12", "etaMinutes": 3})
                ),
                Alert(
                    id="ALT-2026-002",
                    timestamp=datetime.now(timezone.utc),
                    sighting_id="SIGHT-205",
                    registration_number="GJ-05-CD-5678",
                    camera_id="CAM-RJK-002",
                    camera_name="Madhapar Chokdi Jamnagar Highway Bypass",
                    location_name="Madhapar Chowk Ring Road, Rajkot",
                    latitude=22.3276,
                    longitude=70.7698,
                    severity="HIGH",
                    status="DISPATCHED",
                    notes="Impound warrant active. Unit en-route to intercept at junction.",
                    dispatched_unit=json.dumps({"unitId": "PCR-RJK-07", "unitName": "Rajkot West Highway Patrol 7", "etaMinutes": 4})
                ),
                Alert(
                    id="ALT-2026-003",
                    timestamp=datetime.now(timezone.utc),
                    sighting_id="SIGHT-303",
                    registration_number="GJ-27-XY-9012",
                    camera_id="CAM-SRT-005",
                    camera_name="Kamrej Toll Plaza NH-48 Surat Inbound",
                    location_name="NH-48 Kamrej Gateway, Surat",
                    latitude=21.2687,
                    longitude=72.9554,
                    severity="CRITICAL",
                    status="ACKNOWLEDGED",
                    notes="Crossed Kamrej toll gate. Surat Netram monitoring next toll exit.",
                    dispatched_unit=None
                )
            ]
            db.add_all(alerts_seed)
            await db.commit()
            print("[DB] Database initialized & seeded successfully.")
