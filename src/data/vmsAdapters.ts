import { VMSAdapterConfig } from "@/types";

export const initialVMSAdapters: VMSAdapterConfig[] = [
  {
    id: "VMS-ADAPT-01",
    vendorName: "Hikvision HikCentral Enterprise",
    department: "Gujarat Police",
    endpoint: "https://hikcentral.police.gujarat.gov.in/artemis/api/v1",
    protocol: "REST API",
    authType: "OAuth2",
    connectedCameras: 22,
    status: "Connected",
    latencyMs: 18,
    eventBusTopic: "gujarat/police/scrb/anpr/events",
    lastSync: "12s ago"
  },
  {
    id: "VMS-ADAPT-02",
    vendorName: "Matrix SATATYA Enterprise VMS",
    department: "GSRTC",
    endpoint: "https://satatya.gsrtc.in:8080/api/v2/channels",
    protocol: "Proprietary SDK",
    authType: "Digest Auth",
    connectedCameras: 12,
    status: "Connected",
    latencyMs: 24,
    eventBusTopic: "gujarat/transport/gsrtc/busdepots",
    lastSync: "8s ago"
  },
  {
    id: "VMS-ADAPT-03",
    vendorName: "Genetec Security Center Federation",
    department: "Surat Municipal Corp (SMC)",
    endpoint: "https://smc-vms.suratmunicipal.org/Genetec/WebSDK",
    protocol: "REST API",
    authType: "mTLS",
    connectedCameras: 8,
    status: "Connected",
    latencyMs: 21,
    eventBusTopic: "gujarat/municipal/smc/traffic",
    lastSync: "15s ago"
  },
  {
    id: "VMS-ADAPT-04",
    vendorName: "Milestone XProtect Corporate",
    department: "Private Commercial / Mall",
    endpoint: "https://diamondbourse-vms.sdb.in/ServerAPI",
    protocol: "ONVIF Profile S/G/T",
    authType: "OAuth2",
    connectedCameras: 5,
    status: "Connected",
    latencyMs: 19,
    eventBusTopic: "gujarat/private/malls/ingress",
    lastSync: "25s ago"
  },
  {
    id: "VMS-ADAPT-05",
    vendorName: "Dahua DSS Pro Command Middleware",
    department: "Vadodara Municipal Corp (VMC)",
    endpoint: "https://vmc-dss.vadodara.gov.in:9000/dss/api/feed",
    protocol: "REST API",
    authType: "API Key",
    connectedCameras: 7,
    status: "Connected",
    latencyMs: 27,
    eventBusTopic: "gujarat/municipal/vmc/surveillance",
    lastSync: "30s ago"
  },
  {
    id: "VMS-ADAPT-06",
    vendorName: "Honeywell MAXPRO VMS Adapter",
    department: "RTO Gujarat",
    endpoint: "https://rto-vms.gujarat.gov.in/api/tracks",
    protocol: "REST API",
    authType: "API Key",
    connectedCameras: 4,
    status: "Degraded",
    latencyMs: 92,
    eventBusTopic: "gujarat/transport/rto/testtracks",
    lastSync: "45s ago"
  },
  {
    id: "VMS-ADAPT-07",
    vendorName: "Generic ONVIF / Direct RTSP Proxy Gateway",
    department: "Food & Civil Supplies",
    endpoint: "rtsp://gateway.sentinel.internal:8554/onvif-bridge",
    protocol: "ONVIF Profile S/G/T",
    authType: "Digest Auth",
    connectedCameras: 6,
    status: "Connected",
    latencyMs: 38,
    eventBusTopic: "gujarat/civilsupplies/godowns/security",
    lastSync: "18s ago"
  }
];

export const vmsAdapters = initialVMSAdapters;
