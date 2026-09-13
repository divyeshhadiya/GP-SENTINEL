import { NextRequest, NextResponse } from "next/server";
import { vehicleService } from "@/server/services/vehicleService";
import { apiError } from "@/server/utils/response";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const plate = searchParams.get("plate");
    const data = await vehicleService.trackVehicle(plate || "");

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...data
    });
  } catch (err) {
    return apiError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await vehicleService.trackVehicle(body.plate || "");

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...data
    });
  } catch (err) {
    return apiError(err);
  }
}
