import { getVehicleSightings } from "@/data/vehicleSightings";
import { watchlistRepository } from "../repositories/watchlistRepository";
import { BadRequestError } from "../utils/errors";
import { VehicleSighting, WatchlistEntry } from "@/types";

export interface TraversalSummary {
  totalSightings: number;
  firstSeen?: string;
  lastSeen?: string;
  lastLocation?: string;
  lastDistrict?: string;
  lastCoordinates?: [number, number];
  avgSpeedKmh: number;
  durationMinutes: number;
  primaryHeading?: string;
  evidentiaryHash: string;
}

export class VehicleService {
  public async trackVehicle(plate: string) {
    if (!plate || !plate.trim()) {
      throw new BadRequestError("License plate parameter is required (e.g., 'GJ-01-AB-1234')");
    }

    const clean = plate.toUpperCase().trim();
    const sightings = getVehicleSightings(clean);
    const watchlistMatch = await watchlistRepository.findByIdentifier(clean);

    const firstSighting = sightings[0];
    const lastSighting = sightings[sightings.length - 1];

    const durationMinutes =
      sightings.length > 1
        ? Math.round(
            (new Date(lastSighting.timestamp).getTime() - new Date(firstSighting.timestamp).getTime()) / 60000
          )
        : 0;

    const avgSpeed = Math.round(
      sightings.reduce((acc, curr) => acc + curr.speedKmh, 0) / (sightings.length || 1)
    );

    const evidentiaryHash =
      lastSighting?.sha256Hash ||
      "8f4c2e6b1a9d0f3c5e7b8a9d0f1e2c3b4a5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f";

    const summary: TraversalSummary = {
      totalSightings: sightings.length,
      firstSeen: firstSighting?.timestamp,
      lastSeen: lastSighting?.timestamp,
      lastLocation: lastSighting?.locationName,
      lastDistrict: lastSighting?.district,
      lastCoordinates: lastSighting?.coordinates,
      avgSpeedKmh: avgSpeed,
      durationMinutes,
      primaryHeading: lastSighting?.heading,
      evidentiaryHash
    };

    return {
      registrationNumber: clean,
      isWatchlistMatch: !!watchlistMatch,
      watchlistAlert: watchlistMatch,
      summary,
      sightings
    };
  }
}

export const vehicleService = new VehicleService();
