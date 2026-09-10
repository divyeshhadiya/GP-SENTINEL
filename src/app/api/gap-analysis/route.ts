import { NextResponse } from "next/server";
import { initialCameras } from "@/data/cameras";
import { GapAnalysisReport } from "@/types";

export async function GET() {
  const districts = [
    "Ahmedabad",
    "Gandhinagar",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Jamnagar",
    "Bhavnagar",
    "Dahod",
    "Valsad",
    "Gir Somnath",
    "Devbhumi Dwarka"
  ];

  const currentYear = 2026;

  const reports: GapAnalysisReport[] = districts.map(district => {
    const districtCams = initialCameras.filter(c => c.district.toLowerCase() === district.toLowerCase());
    const total = districtCams.length;
    const aging = districtCams.filter(c => currentYear - c.installationYear >= 5).length;
    const lowRetention = districtCams.filter(c => c.storageDays < 15).length;
    const anprCount = districtCams.filter(c => c.cameraType === "ANPR").length;
    const anprPct = total > 0 ? Math.round((anprCount / total) * 100) : 0;

    let blindspots = 0;
    const criticalGaps: string[] = [];

    if (district === "Dahod") {
      blindspots = 3;
      criticalGaps.push("Interstate rural bypass trails lack ANPR checkposts");
      criticalGaps.push("Legacy analog CP Plus cameras require IP migration");
    } else if (district === "Valsad") {
      blindspots = 2;
      criticalGaps.push("High-tide coastal road blindspot between Tithal and Daman border");
    } else if (district === "Gir Somnath" || district === "Devbhumi Dwarka") {
      blindspots = 2;
      criticalGaps.push("Deep-sea fishing harbor night-vision thermal camera density is low");
    } else if (district === "Ahmedabad") {
      blindspots = 4;
      criticalGaps.push("Naroda PDS food godown cluster lacks 4K ANPR perimeter coverage");
      criticalGaps.push("Civil hospital trauma entry camera retention period is only 7 days (policy requires >=15 days)");
    } else {
      blindspots = 1;
      criticalGaps.push("Peripheral service roads require additional automated speed/ANPR traps");
    }

    const riskScore: "HIGH" | "MEDIUM" | "LOW" =
      aging > 1 || blindspots >= 3 ? "HIGH" : lowRetention > 1 ? "MEDIUM" : "LOW";

    return {
      district,
      totalCameras: total,
      blindspotCount: blindspots,
      agingCamerasCount: aging,
      lowRetentionCount: lowRetention,
      anprCoveragePct: anprPct,
      riskScore,
      criticalGaps
    };
  });

  return NextResponse.json({
    success: true,
    statewideSummary: {
      totalDistrictsAssessed: districts.length,
      highRiskDistricts: reports.filter(r => r.riskScore === "HIGH").length,
      totalBlindspotsIdentified: reports.reduce((acc, r) => acc + r.blindspotCount, 0),
      totalAgingCamerasNeedingReplacement: reports.reduce((acc, r) => acc + r.agingCamerasCount, 0),
      totalLowRetentionCams: reports.reduce((acc, r) => acc + r.lowRetentionCount, 0)
    },
    reports
  });
}
