import { NextRequest, NextResponse } from "next/server";
import { AlertEvent } from "@/types";
import { initialWatchlist } from "@/data/watchlists";

let activeAlerts: AlertEvent[] = [
  {
    id: "ALT-2026-001",
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(), // 3 mins ago
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

export async function GET() {
  return NextResponse.json({
    success: true,
    total: activeAlerts.length,
    alerts: activeAlerts
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { alertId, status, dispatchedUnit, notes } = body;

    const alert = activeAlerts.find(a => a.id === alertId);
    if (!alert) {
      return NextResponse.json({ success: false, error: "Alert not found" }, { status: 404 });
    }

    if (status) alert.status = status;
    if (dispatchedUnit) alert.dispatchedUnit = dispatchedUnit;
    if (notes) alert.notes = notes;

    return NextResponse.json({
      success: true,
      message: `Alert ${alertId} updated to ${alert.status}`,
      alert
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newAlert: AlertEvent = {
      id: `ALT-2026-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      sightingId: body.sightingId || `SIGHT-${Date.now().toString().slice(-3)}`,
      registrationNumber: body.registrationNumber,
      watchlistEntry: body.watchlistEntry,
      cameraId: body.cameraId,
      cameraName: body.cameraName,
      locationName: body.locationName,
      coordinates: body.coordinates,
      severity: body.severity || "HIGH",
      status: "NEW",
      notes: body.notes || "Automated AI detection trigger"
    };

    activeAlerts.unshift(newAlert);

    return NextResponse.json({
      success: true,
      alert: newAlert
    }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
