import { cameraRepository } from "../repositories/cameraRepository";
import { Camera, CameraStatus } from "@/types";
import { BadRequestError, NotFoundError } from "../utils/errors";

export class CameraService {
  public async listCameras(filters?: {
    department?: string;
    district?: string;
    status?: string;
    cameraType?: string;
    query?: string;
  }) {
    return await cameraRepository.findAll(filters);
  }

  public async getCameraById(id: string): Promise<Camera> {
    const cam = await cameraRepository.findById(id);
    if (!cam) {
      throw new NotFoundError(`Camera node '${id}' does not exist in registry`);
    }
    return cam;
  }

  public async registerCamera(data: Partial<Camera>): Promise<Camera> {
    if (!data.name || !data.locationName) {
      throw new BadRequestError("Camera 'name' and 'locationName' are required for onboarding");
    }
    return await cameraRepository.create(data);
  }

  public async updateHealth(id: string, status: CameraStatus): Promise<Camera> {
    const cam = await cameraRepository.updateStatus(id, status);
    if (!cam) {
      throw new NotFoundError(`Camera '${id}' not found`);
    }
    return cam;
  }
}

export const cameraService = new CameraService();
