import { initialCameras } from "@/data/cameras";

export class IngestService {
  public async getStreamCatalogue() {
    const activeStreams = initialCameras.map((cam) => ({
      cameraId: cam.id,
      name: cam.name,
      department: cam.department,
      district: cam.district,
      status: cam.status,
      codec: cam.codec,
      resolution: cam.resolution,
      fps: cam.fps,
      vmsVendor: cam.vmsVendor,
      streamEndpoints: {
        rtsp: cam.rtspUrl,
        hls: `https://streams.sentinel.gujarat.gov.in/hls/${cam.id.toLowerCase()}/live.m3u8`,
        webrtc: `wss://webrtc.sentinel.gujarat.gov.in/live/${cam.id.toLowerCase()}`,
        snapshotJpeg: `https://sandbox.sentinel.gujarat.gov.in/api/v1/snapshot/${cam.id}.jpg`
      },
      telemetry: {
        pingMs: cam.pingMs,
        lastHeartbeat: cam.lastHeartbeat,
        transport: "RTSP over TCP (RFC 2326)",
        ptsSync: "Monotonic Hardware Clock"
      }
    }));

    return {
      protocol: "RTSP / HLS / WebRTC Unified Gateway",
      environment: "Gujarat Police SCRB State Video Ingestion Hub",
      totalActiveFeeds: activeStreams.length,
      streams: activeStreams
    };
  }
}

export const ingestService = new IngestService();
