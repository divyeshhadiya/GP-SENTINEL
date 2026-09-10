import { NextRequest, NextResponse } from "next/server";
import { initialCameras } from "@/data/cameras";
import { Camera } from "@/types";

// In-memory store initialized with statewide cameras
let cameraStore: Camera[] = [...initialCameras];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const department = searchParams.get("department");
  const district = searchParams.get("district");
  const status = searchParams.get("status");
  const cameraType = searchParams.get("cameraType");
  const query = searchParams.get("q")?.toLowerCase();

  let results = [...cameraStore];

  if (department && department !== "ALL") {
    results = results.filter(c => c.department === department);
  }
  if (district && district !== "ALL") {
    results = results.filter(c => c.district.toLowerCase() === district.toLowerCase());
  }
  if (status && status !== "ALL") {
    results = results.filter(c => c.status === status);
  }
  if (cameraType && cameraType !== "ALL") {
    results = results.filter(c => c.cameraType === cameraType);
  }
  if (query) {
    results = results.filter(c =>
      c.id.toLowerCase().includes(query) ||
      c.name.toLowerCase().includes(query) ||
      c.locationName.toLowerCase().includes(query) ||
      c.district.toLowerCase().includes(query) ||
      c.vendor.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    cameras: results
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.coordinates || !body.department) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (name, coordinates, department)" },
        { status: 400 }
      );
    }

    const newCam: Camera = {
      id: body.id || `CAM-GUJ-${Date.now().toString().slice(-4)}`,
      name: body.name,
      department: body.department,
      locationName: body.locationName || "Onboarded Location",
      district: body.district || "Gandhinagar",
      coordinates: body.coordinates,
      status: body.status || "Online",
      cameraType: body.cameraType || "ANPR",
      vendor: body.vendor || "Standard ONVIF Camera",
      vmsVendor: body.vmsVendor || "Direct RTSP",
      resolution: body.resolution || "1080p (FHD)",
      fps: body.fps || 25,
      codec: body.codec || "H.264",
      storageDays: body.storageDays || 15,
      storageType: body.storageType || "Local NVR",
      rtspUrl: body.rtspUrl || "rtsp://10.0.0.1:8554/live",
      hlsUrl: body.hlsUrl || "",
      ipAddress: body.ipAddress || "10.18.5.50",
      installationYear: body.installationYear || 2026,
      amcActive: body.amcActive ?? true,
      fovAngle: body.fovAngle || 0,
      coverageRadiusMeters: body.coverageRadiusMeters || 100,
      lastHeartbeat: "Just now",
      pingMs: Math.floor(Math.random() * 20) + 10,
      departmentPoc: body.departmentPoc || "Field Incharge"
    };

    cameraStore.unshift(newCam);

    return NextResponse.json({
      success: true,
      message: "Camera onboarded successfully",
      camera: newCam
    }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
