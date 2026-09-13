import { initialCameras } from "@/data/cameras";

export interface DistrictGapMetrics {
  district: string;
  totalCameras: number;
  anprCount: number;
  ptzCount: number;
  fixedCount: number;
  coverageScorePct: number;
  blindspotRisk: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  priorityRecommendation: string;
}

export class GapAnalysisService {
  public async getAnalysis() {
    const districts = Array.from(new Set(initialCameras.map((c) => c.district))).sort();

    const districtBreakdown: DistrictGapMetrics[] = districts.map((district) => {
      const cams = initialCameras.filter((c) => c.district === district);
      const anprCount = cams.filter((c) => c.cameraType === "ANPR").length;
      const ptzCount = cams.filter((c) => c.cameraType === "PTZ Speed Dome").length;
      const fixedCount = cams.filter((c) => c.cameraType === "Fixed Bullet").length;

      const coverageScorePct = Math.min(100, Math.round((cams.length / 5) * 100));
      const blindspotRisk: DistrictGapMetrics["blindspotRisk"] =
        coverageScorePct > 80
          ? "LOW"
          : coverageScorePct > 50
          ? "MODERATE"
          : coverageScorePct > 30
          ? "HIGH"
          : "CRITICAL";

      return {
        district,
        totalCameras: cams.length,
        anprCount,
        ptzCount,
        fixedCount,
        coverageScorePct,
        blindspotRisk,
        priorityRecommendation:
          blindspotRisk === "CRITICAL"
            ? "Deploy 12 edge ANPR speed gates at state border crossings."
            : blindspotRisk === "HIGH"
            ? "Expand inter-district highway PTZ speed domes."
            : "Maintain current Netram surveillance coverage."
      };
    });

    const totalCameras = initialCameras.length;
    const onlineCameras = initialCameras.filter((c) => c.status === "Online").length;
    const degradedCameras = initialCameras.filter((c) => c.status === "Degraded").length;
    const offlineCameras = initialCameras.filter((c) => c.status === "Offline").length;

    return {
      statewideSummary: {
        totalMonitoredDistricts: districts.length,
        totalCameras,
        overallStateCoveragePct: 78.4,
        healthRatio: {
          online: onlineCameras,
          degraded: degradedCameras,
          offline: offlineCameras
        }
      },
      districtBreakdown
    };
  }
}

export const gapAnalysisService = new GapAnalysisService();
