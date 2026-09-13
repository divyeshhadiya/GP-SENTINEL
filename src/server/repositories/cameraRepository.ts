import { Camera, DepartmentType, CameraType, CameraStatus } from "@/types";
import { initialCameras } from "@/data/cameras";

class CameraRepository {
  private cameras: Camera[] = [...initialCameras];

  public async findAll(filters?: {
    department?: string;
    district?: string;
    status?: string;
    cameraType?: string;
    query?: string;
  }): Promise<{ cameras: Camera[]; total: number }> {
    let list = [...this.cameras];

    if (filters?.department && filters.department !== "ALL") {
      list = list.filter((c) => c.department === filters.department);
    }
    if (filters?.district && filters.district !== "ALL") {
      list = list.filter((c) => c.district.toLowerCase() === filters.district!.toLowerCase());
    }
    if (filters?.status && filters.status !== "ALL") {
      list = list.filter((c) => c.status === filters.status);
    }
    if (filters?.cameraType && filters.cameraType !== "ALL") {
      list = list.filter((c) => c.cameraType === filters.cameraType);
    }
    if (filters?.query) {
      const q = filters.query.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q) ||
          c.locationName.toLowerCase().includes(q) ||
          c.district.toLowerCase().includes(q) ||
          c.vendor.toLowerCase().includes(q)
      );
    }

    return { cameras: list, total: list.length };
  }

  public async findById(id: string): Promise<Camera | null> {
    return this.cameras.find((c) => c.id === id) || null;
  }

  public async create(cameraData: Partial<Camera>): Promise<Camera> {
    const newCamera: Camera = {
      id: cameraData.id || `CAM-NEW-${Date.now().toString().slice(-4)}`,
      name: cameraData.name || "Onboarded Node",
      department: (cameraData.department as DepartmentType) || "Gujarat Police",
      district: cameraData.district || "Gandhinagar",
      locationName: cameraData.locationName || "State Checkpost",
      coordinates: cameraData.coordinates || [23.22, 72.65],
      status: (cameraData.status as CameraStatus) || "Online",
      cameraType: (cameraData.cameraType as CameraType) || "ANPR",
      vendor: cameraData.vendor || "Hikvision ANPR Pro",
      vmsVendor: (cameraData.vmsVendor as any) || "Hikvision",
      resolution: (cameraData.resolution as any) || "1080p (FHD)",
      fps: cameraData.fps || 30,
      codec: (cameraData.codec as any) || "H.265",
      storageDays: cameraData.storageDays || 30,
      storageType: (cameraData.storageType as any) || "Hybrid SAN",
      rtspUrl: cameraData.rtspUrl || "rtsp://sandbox.sentinel.gujarat.gov.in:8554/live",
      hlsUrl: cameraData.hlsUrl || "",
      ipAddress: cameraData.ipAddress || "10.18.9.100",
      installationYear: 2026,
      amcActive: cameraData.amcActive ?? true,
      fovAngle: cameraData.fovAngle || 90,
      coverageRadiusMeters: cameraData.coverageRadiusMeters || 100,
      lastHeartbeat: "Just now",
      pingMs: cameraData.pingMs || 15,
      departmentPoc: cameraData.departmentPoc || "Gujarat Police Command"
    };

    this.cameras.unshift(newCamera);
    return newCamera;
  }

  public async updateStatus(id: string, status: CameraStatus): Promise<Camera | null> {
    const cam = this.cameras.find((c) => c.id === id);
    if (!cam) return null;
    cam.status = status;
    return cam;
  }
}

export const cameraRepository = new CameraRepository();
