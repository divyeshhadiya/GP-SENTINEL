import { NextRequest, NextResponse } from "next/server";
import { cameraService } from "@/server/services/cameraService";
import { apiError } from "@/server/utils/response";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const department = searchParams.get("department") || undefined;
    const district = searchParams.get("district") || undefined;
    const status = searchParams.get("status") || undefined;
    const cameraType = searchParams.get("cameraType") || undefined;
    const query = searchParams.get("q") || undefined;

    const result = await cameraService.listCameras({
      department,
      district,
      status,
      cameraType,
      query
    });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      total: result.total,
      cameras: result.cameras
    });
  } catch (err) {
    return apiError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const camera = await cameraService.registerCamera(body);

    return NextResponse.json(
      {
        success: true,
        timestamp: new Date().toISOString(),
        message: "Camera node registered successfully",
        camera
      },
      { status: 201 }
    );
  } catch (err) {
    return apiError(err);
  }
}
