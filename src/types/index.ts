export type DepartmentType =
  | "Gujarat Police"
  | "GSRTC"
  | "RTO Gujarat"
  | "Food & Civil Supplies"
  | "Health & Family Welfare"
  | "Ahmedabad Municipal Corp (AMC)"
  | "Surat Municipal Corp (SMC)"
  | "Vadodara Municipal Corp (VMC)"
  | "Rajkot Municipal Corp (RMC)"
  | "Panchayat & Rural"
  | "Private Commercial / Mall"
  | "Residential Society";

export type CameraType = "ANPR" | "PTZ Speed Dome" | "Fixed Bullet" | "Panoramic 360" | "Thermal Border";

export type CameraStatus = "Online" | "Degraded" | "Offline" | "Maintenance";

export type VideoCodec = "H.264" | "H.265";

export interface Camera {
  id: string;
  name: string;
  department: DepartmentType;
  locationName: string;
  district: string;
  coordinates: [number, number]; // [lat, lng]
  status: CameraStatus;
  cameraType: CameraType;
  vendor: string;
  vmsVendor: "Milestone" | "Genetec" | "Hikvision" | "Dahua" | "Matrix" | "Honeywell" | "Direct RTSP";
  resolution: "1080p (FHD)" | "4K (UHD)" | "720p (HD)";
  fps: number;
  codec: VideoCodec;
  storageDays: number;
  storageType: "Local NVR" | "Department Cloud" | "Hybrid SAN";
  rtspUrl: string;
  hlsUrl: string;
  ipAddress: string;
  installationYear: number;
  amcActive: boolean;
  fovAngle: number; // heading in degrees
  coverageRadiusMeters: number;
  lastHeartbeat: string;
  pingMs: number;
  departmentPoc: string;
}

export type WatchlistSource = "VAHAN" | "eGujCop" | "SARTHI" | "AFIS/NAFIS" | "Police Hotlist";

export type WatchlistCategory =
  | "Stolen Vehicle"
  | "Blacklisted RC"
  | "Wanted Criminal"
  | "Missing Person"
  | "Absconder"
  | "Suspect Vehicle";

export interface WatchlistEntry {
  id: string;
  identifier: string; // e.g., "GJ-01-AB-1234" or Criminal Name
  source: WatchlistSource;
  category: WatchlistCategory;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  details: string;
  firNumber?: string;
  policeStation?: string;
  registeredOwner?: string;
  vehicleMakeModel?: string;
  photoUrl?: string;
  dateAdded: string;
  status: "ACTIVE" | "APPREHENDED" | "RESOLVED";
}

export interface VehicleSighting {
  id: string;
  registrationNumber: string;
  cameraId: string;
  cameraName: string;
  locationName: string;
  district: string;
  coordinates: [number, number];
  timestamp: string; // ISO string
  ptsMs: number; // Presentation timestamp in ms per Integrator's Guide
  speedKmh: number;
  heading: string; // "Northbound", "Southbound", etc.
  confidence: number;
  vehicleMakeModel: string;
  color: string;
  plateCropUrl?: string;
  sceneCropUrl?: string;
  sha256Hash?: string;
  watchlistMatch?: WatchlistEntry;
}

export interface AlertEvent {
  id: string;
  timestamp: string;
  sightingId: string;
  registrationNumber: string;
  watchlistEntry: WatchlistEntry;
  cameraId: string;
  cameraName: string;
  locationName: string;
  coordinates: [number, number];
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "NEW" | "ACKNOWLEDGED" | "DISPATCHED" | "RESOLVED" | "FALSE_POSITIVE";
  dispatchedUnit?: {
    unitId: string;
    unitName: string;
    etaMinutes: number;
    dispatchedAt: string;
  };
  notes?: string;
}

export interface VMSAdapterConfig {
  id: string;
  vendorName: string;
  department: DepartmentType;
  endpoint: string;
  protocol: "REST API" | "ONVIF Profile S/G/T" | "Proprietary SDK" | "WebRTC Gateway";
  authType: "OAuth2" | "API Key" | "Digest Auth" | "mTLS";
  connectedCameras: number;
  status: "Connected" | "Syncing" | "Degraded" | "Disconnected";
  latencyMs: number;
  eventBusTopic: string;
  lastSync: string;
}

export interface GapAnalysisReport {
  district: string;
  totalCameras: number;
  blindspotCount: number;
  agingCamerasCount: number; // > 5 years
  lowRetentionCount: number; // < 15 days
  anprCoveragePct: number;
  riskScore: "HIGH" | "MEDIUM" | "LOW";
  criticalGaps: string[];
}
