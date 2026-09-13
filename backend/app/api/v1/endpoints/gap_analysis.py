from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.camera import Camera

router = APIRouter()

@router.get("")
async def get_gap_analysis(db: AsyncSession = Depends(get_db)):
    districts = [
        "Ahmedabad", "Gandhinagar", "Surat", "Vadodara", "Rajkot",
        "Jamnagar", "Bhavnagar", "Dahod", "Valsad", "Gir Somnath", "Devbhumi Dwarka"
    ]
    current_year = 2026

    result = await db.execute(select(Camera))
    cams = result.scalars().all()

    reports = []
    for district in districts:
        dist_cams = [c for c in cams if c.district.lower() == district.lower()]
        total = len(dist_cams)
        aging = sum(1 for c in dist_cams if (current_year - c.installation_year) >= 5)
        low_retention = sum(1 for c in dist_cams if c.storage_days < 15)
        anpr_count = sum(1 for c in dist_cams if c.camera_type == "ANPR")
        anpr_pct = round((anpr_count / total) * 100) if total > 0 else 0

        blindspots = 1
        critical_gaps = []

        if district == "Dahod":
            blindspots = 3
            critical_gaps = [
                "Interstate rural bypass trails lack ANPR checkposts",
                "Legacy analog CP Plus cameras require IP migration"
            ]
        elif district == "Valsad":
            blindspots = 2
            critical_gaps = ["High-tide coastal road blindspot between Tithal and Daman border"]
        elif district in ["Gir Somnath", "Devbhumi Dwarka"]:
            blindspots = 2
            critical_gaps = ["Deep-sea fishing harbor night-vision thermal camera density is low"]
        elif district == "Ahmedabad":
            blindspots = 4
            critical_gaps = [
                "Naroda PDS food godown cluster lacks 4K ANPR perimeter coverage",
                "Civil hospital trauma entry camera retention period is only 7 days (policy requires >=15 days)"
            ]
        else:
            critical_gaps = ["Peripheral service roads require additional automated speed/ANPR traps"]

        risk_score = "HIGH" if (aging > 1 or blindspots >= 3) else "MEDIUM" if low_retention > 1 else "LOW"

        reports.append({
            "district": district,
            "totalCameras": total,
            "blindspotCount": blindspots,
            "agingCamerasCount": aging,
            "lowRetentionCount": low_retention,
            "anprCoveragePct": anpr_pct,
            "riskScore": risk_score,
            "criticalGaps": critical_gaps
        })

    return {
        "success": True,
        "statewideSummary": {
            "totalDistrictsAssessed": len(districts),
            "highRiskDistricts": sum(1 for r in reports if r["riskScore"] == "HIGH"),
            "totalBlindspotsIdentified": sum(r["blindspotCount"] for r in reports),
            "totalAgingCamerasNeedingReplacement": sum(r["agingCamerasCount"] for r in reports),
            "totalLowRetentionCams": sum(r["lowRetentionCount"] for r in reports)
        },
        "reports": reports
    }
