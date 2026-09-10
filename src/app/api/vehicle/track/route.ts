import { NextRequest, NextResponse } from "next/server";
import { getVehicleSightings } from "@/data/vehicleSightings";
import { initialWatchlist } from "@/data/watchlists";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const plate = searchParams.get("plate");

  if (!plate) {
    return NextResponse.json(
      { success: false, error: "Please provide a 'plate' query parameter, e.g. GJ-01-AB-1234" },
      { status: 400 }
    );
  }

  const normalizedPlate = plate.toUpperCase().trim();
  const sightings = getVehicleSightings(normalizedPlate);

  // Look up watchlist correlation
  const watchlistMatch = initialWatchlist.find(
    w => w.identifier.toUpperCase().replace(/[^A-Z0-9]/g, "") === normalizedPlate.replace(/[^A-Z0-9]/g, "")
  );

  // Calculate trajectory analytics
  const firstSighting = sightings[0];
  const lastSighting = sightings[sightings.length - 1];
  const durationMinutes = sightings.length > 1
    ? Math.round((new Date(lastSighting.timestamp).getTime() - new Date(firstSighting.timestamp).getTime()) / 60000)
    : 0;

  const avgSpeed = Math.round(
    sightings.reduce((acc, curr) => acc + curr.speedKmh, 0) / (sightings.length || 1)
  );

  return NextResponse.json({
    success: true,
    registrationNumber: normalizedPlate,
    isWatchlistMatch: !!watchlistMatch,
    watchlistAlert: watchlistMatch || null,
    summary: {
      totalSightings: sightings.length,
      firstSeen: firstSighting?.timestamp,
      lastSeen: lastSighting?.timestamp,
      lastLocation: lastSighting?.locationName,
      lastDistrict: lastSighting?.district,
      lastCoordinates: lastSighting?.coordinates,
      avgSpeedKmh: avgSpeed,
      durationMinutes,
      primaryHeading: lastSighting?.heading
    },
    sightings
  });
}
