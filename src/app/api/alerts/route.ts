import { NextRequest, NextResponse } from "next/server";
import { alertService } from "@/server/services/alertService";
import { apiError } from "@/server/utils/response";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || undefined;
    const severity = searchParams.get("severity") || undefined;

    const data = await alertService.getAlerts({ status, severity });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      total: data.total,
      unresolvedCritical: data.unresolvedCritical,
      alerts: data.alerts
    });
  } catch (err) {
    return apiError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const alert = await alertService.createAlert(body);

    return NextResponse.json(
      {
        success: true,
        timestamp: new Date().toISOString(),
        message: "Incident alert created successfully",
        alert
      },
      { status: 201 }
    );
  } catch (err) {
    return apiError(err);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { alertId, status, dispatchedUnit, notes } = body;

    const updated = await alertService.updateAlertStatus(alertId, status, dispatchedUnit, notes);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: `Incident ${alertId} updated to ${status}`,
      alert: updated
    });
  } catch (err) {
    return apiError(err);
  }
}
