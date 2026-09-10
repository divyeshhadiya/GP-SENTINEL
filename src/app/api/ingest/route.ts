import { NextResponse } from "next/server";
import { initialCameras } from "@/data/cameras";

// Conforms to Gujarat Police SENTINEL Integrator's Guide Section 1:
// "curl -s http://<host>/api/ingest - returns every camera with its id, location, codec, live status, stream properties, and all three URLs"
export async function GET() {
  const catalogue = initialCameras.map((cam, idx) => ({
    id: cam.id,
    stream_index: idx + 1,
    name: cam.name,
    department: cam.department,
    district: cam.district,
    location: cam.locationName,
    coordinates: {
      latitude: cam.coordinates[0],
      longitude: cam.coordinates[1]
    },
    live_status: cam.status === "Online" ? "STREAMING" : cam.status === "Degraded" ? "HIGH_LATENCY" : "OFFLINE",
    stream_properties: {
      codec: cam.codec,
      resolution: cam.resolution,
      advertised_fps: cam.fps,
      pts_mode: "monotonic_presentation_timestamp_ms",
      pixel_format: "yuv420p",
      gop_size: 60,
      transport_recommended: "TCP (rtsp_transport;tcp)",
      decoder_recommendation: cam.codec === "H.265" ? "rtph265depay ! h265parse ! avdec_h265" : "rtph264depay ! h264parse ! avdec_h264"
    },
    urls: {
      rtsp_tcp: `rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/${idx + 1}`,
      rtsp_udp_fallback: `rtsp://sandbox.sentinel.gujarat.gov.in:8554/stream/${idx + 1}?transport=udp`,
      hls_live: `https://sandbox.sentinel.gujarat.gov.in/hls/stream_${idx + 1}/index.m3u8`,
      http_fallback: `https://sandbox.sentinel.gujarat.gov.in/stream/${idx + 1}`
    },
    metadata: {
      storage_retention_days: cam.storageDays,
      vms_source: cam.vmsVendor,
      amc_active: cam.amcActive,
      fov_angle_deg: cam.fovAngle,
      coverage_radius_meters: cam.coverageRadiusMeters,
      health: {
        latency_ms: cam.pingMs,
        last_heartbeat: cam.lastHeartbeat
      }
    }
  }));

  return NextResponse.json({
    platform: "Gujarat Police SENTINEL CCTV Sandbox Ingestion Gateway",
    version: "2026.4.1-LTS",
    schema_spec: "SENTINEL-GRID-INGEST-V1",
    timestamp_utc: new Date().toISOString(),
    total_cameras: catalogue.length,
    active_streams: catalogue.filter(c => c.live_status === "STREAMING").length,
    cameras: catalogue
  }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store, max-age=0"
    }
  });
}
