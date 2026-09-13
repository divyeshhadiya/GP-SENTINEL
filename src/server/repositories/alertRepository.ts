import { AlertEvent } from "@/types";
import { initialWatchlist } from "@/data/watchlists";

class AlertRepository {
  private alerts: AlertEvent[] = [
    {
      id: "ALT-2026-001",
      timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
      sightingId: "SIGHT-010",
      registrationNumber: "GJ-01-AB-1234",
      watchlistEntry: initialWatchlist[0],
      cameraId: "CAM-SRT-001",
      cameraName: "Ring Road Sahara Darwaja Flyover",
      locationName: "Sahara Darwaja Junction, Surat",
      coordinates: [21.1969, 72.8424],
      severity: "CRITICAL",
      status: "NEW",
      notes: "Stolen vehicle tracked entering dense textile market corridor. Immediate intercept recommended."
    },
    {
      id: "ALT-2026-002",
      timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
      sightingId: "SIGHT-205",
      registrationNumber: "GJ-05-CD-5678",
      watchlistEntry: initialWatchlist[1],
      cameraId: "CAM-RJK-002",
      cameraName: "Madhapar Chokdi Jamnagar Highway Bypass",
      locationName: "Madhapar Chowk Ring Road, Rajkot",
      coordinates: [22.3276, 70.7698],
      severity: "HIGH",
      status: "DISPATCHED",
      dispatchedUnit: {
        unitId: "PCR-RJK-07",
        unitName: "Rajkot West Highway Patrol 7",
        etaMinutes: 4,
        dispatchedAt: new Date(Date.now() - 1000 * 60 * 8).toISOString()
      },
      notes: "Impound warrant active. Unit en-route to intercept at junction."
    },
    {
      id: "ALT-2026-003",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      sightingId: "SIGHT-303",
      registrationNumber: "GJ-27-XY-9012",
      watchlistEntry: initialWatchlist[2],
      cameraId: "CAM-SRT-005",
      cameraName: "Kamrej Toll Plaza NH-48 Surat Inbound",
      locationName: "NH-48 Kamrej Gateway, Surat",
      coordinates: [21.2687, 72.9554],
      severity: "CRITICAL",
      status: "ACKNOWLEDGED",
      notes: "Crossed Kamrej toll gate. Surat Netram monitoring next toll exit."
    }
  ];

  public async findAll(filters?: { status?: string; severity?: string }): Promise<AlertEvent[]> {
    let list = [...this.alerts];
    if (filters?.status && filters.status !== "ALL") {
      list = list.filter((a) => a.status === filters.status);
    }
    if (filters?.severity && filters.severity !== "ALL") {
      list = list.filter((a) => a.severity === filters.severity);
    }
    return list;
  }

  public async findById(id: string): Promise<AlertEvent | null> {
    return this.alerts.find((a) => a.id === id) || null;
  }

  public async update(
    id: string,
    updates: Partial<AlertEvent>
  ): Promise<AlertEvent | null> {
    const alert = this.alerts.find((a) => a.id === id);
    if (!alert) return null;
    Object.assign(alert, updates);
    return alert;
  }

  public async create(alertData: Partial<AlertEvent>): Promise<AlertEvent> {
    const newAlert: AlertEvent = {
      id: alertData.id || `ALT-2026-${Date.now().toString().slice(-4)}`,
      timestamp: alertData.timestamp || new Date().toISOString(),
      sightingId: alertData.sightingId || `SIGHT-${Date.now().toString().slice(-3)}`,
      registrationNumber: alertData.registrationNumber || "UNKNOWN",
      watchlistEntry: alertData.watchlistEntry || initialWatchlist[0],
      cameraId: alertData.cameraId || "CAM-GNR-001",
      cameraName: alertData.cameraName || "State Checkpost",
      locationName: alertData.locationName || "Gujarat Highway",
      coordinates: alertData.coordinates || [23.22, 72.65],
      severity: alertData.severity || "HIGH",
      status: alertData.status || "NEW",
      notes: alertData.notes || "Automated AI detection trigger"
    };

    this.alerts.unshift(newAlert);
    return newAlert;
  }
}

export const alertRepository = new AlertRepository();
