import { VehicleSighting } from "@/types";
import { initialWatchlist } from "./watchlists";

export const testVehicle1Sightings: VehicleSighting[] = [
  {
    id: "SIGHT-001",
    registrationNumber: "GJ-01-AB-1234",
    cameraId: "CAM-GNR-001",
    cameraName: "SCRB Police Bhawan Main Gate",
    locationName: "Sector 18, Police Bhawan, Gandhinagar",
    district: "Gandhinagar",
    coordinates: [23.2235, 72.6508],
    timestamp: "2026-09-08T06:14:22.000Z",
    ptsMs: 1725776062000,
    speedKmh: 42,
    heading: "Southbound toward SG Highway",
    confidence: 0.98,
    vehicleMakeModel: "Hyundai Creta SX (O) Turbo",
    color: "Red",
    watchlistMatch: initialWatchlist[0]
  },
  {
    id: "SIGHT-002",
    registrationNumber: "GJ-01-AB-1234",
    cameraId: "CAM-AMD-009",
    cameraName: "Sindhu Bhavan Road Broadway Junction",
    locationName: "Sindhu Bhavan Marg, Bodakdev, Ahmedabad",
    district: "Ahmedabad",
    coordinates: [23.0454, 72.5023],
    timestamp: "2026-09-08T06:48:10.000Z",
    ptsMs: 1725778090000,
    speedKmh: 58,
    heading: "Eastbound toward SG Highway",
    confidence: 0.96,
    vehicleMakeModel: "Hyundai Creta SX (O) Turbo",
    color: "Red",
    watchlistMatch: initialWatchlist[0]
  },
  {
    id: "SIGHT-003",
    registrationNumber: "GJ-01-AB-1234",
    cameraId: "CAM-AMD-001",
    cameraName: "SG Highway Iskcon Flyover Inbound",
    locationName: "SG Highway, Iskcon Junction, Ahmedabad",
    district: "Ahmedabad",
    coordinates: [23.0278, 72.5074],
    timestamp: "2026-09-08T07:05:35.000Z",
    ptsMs: 1725779135000,
    speedKmh: 64,
    heading: "Southbound toward CTM Expressway",
    confidence: 0.99,
    vehicleMakeModel: "Hyundai Creta SX (O) Turbo",
    color: "Red",
    watchlistMatch: initialWatchlist[0]
  },
  {
    id: "SIGHT-004",
    registrationNumber: "GJ-01-AB-1234",
    cameraId: "CAM-HWY-003",
    cameraName: "NE-1 Ahmedabad-Vadodara Expressway CTM Toll Plaza",
    locationName: "CTM Char Rasta Inbound, Ahmedabad",
    district: "Ahmedabad",
    coordinates: [22.9898, 72.6341],
    timestamp: "2026-09-08T07:32:18.000Z",
    ptsMs: 1725780738000,
    speedKmh: 82,
    heading: "South-Eastbound entering NE-1 Expressway",
    confidence: 0.97,
    vehicleMakeModel: "Hyundai Creta SX (O) Turbo",
    color: "Red",
    watchlistMatch: initialWatchlist[0]
  },
  {
    id: "SIGHT-005",
    registrationNumber: "GJ-01-AB-1234",
    cameraId: "CAM-HWY-002",
    cameraName: "NE-1 Ahmedabad-Vadodara Expressway Toll Anand Plaza",
    locationName: "Anand Expressway Interchange, Anand",
    district: "Anand",
    coordinates: [22.5645, 72.9284],
    timestamp: "2026-09-08T08:14:50.000Z",
    ptsMs: 1725783290000,
    speedKmh: 96,
    heading: "Southbound toward Vadodara",
    confidence: 0.99,
    vehicleMakeModel: "Hyundai Creta SX (O) Turbo",
    color: "Red",
    watchlistMatch: initialWatchlist[0]
  },
  {
    id: "SIGHT-006",
    registrationNumber: "GJ-01-AB-1234",
    cameraId: "CAM-HWY-001",
    cameraName: "NE-1 Ahmedabad-Vadodara Expressway Toll Baroda End",
    locationName: "NE-1 Toll Plaza Vadodara, Vadodara",
    district: "Vadodara",
    coordinates: [22.3789, 73.1541],
    timestamp: "2026-09-08T08:42:15.000Z",
    ptsMs: 1725784935000,
    speedKmh: 75,
    heading: "Southbound exiting Expressway onto NH-48",
    confidence: 0.98,
    vehicleMakeModel: "Hyundai Creta SX (O) Turbo",
    color: "Red",
    watchlistMatch: initialWatchlist[0]
  },
  {
    id: "SIGHT-007",
    registrationNumber: "GJ-01-AB-1234",
    cameraId: "CAM-BDQ-001",
    cameraName: "Sayajigunj Kalaghoda Circle South",
    locationName: "Sayajigunj Heritage Junction, Vadodara",
    district: "Vadodara",
    coordinates: [22.3108, 73.1812],
    timestamp: "2026-09-08T09:05:40.000Z",
    ptsMs: 1725786340000,
    speedKmh: 45,
    heading: "Southbound toward Makarpura / NH-48",
    confidence: 0.95,
    vehicleMakeModel: "Hyundai Creta SX (O) Turbo",
    color: "Red",
    watchlistMatch: initialWatchlist[0]
  },
  {
    id: "SIGHT-008",
    registrationNumber: "GJ-01-AB-1234",
    cameraId: "CAM-HWY-004",
    cameraName: "NH-48 Bharuch Narmada Cable Bridge Northbound",
    locationName: "Narmada Bridge Bharuch, Bharuch",
    district: "Bharuch",
    coordinates: [21.7051, 73.0034],
    timestamp: "2026-09-08T10:18:22.000Z",
    ptsMs: 1725790702000,
    speedKmh: 78,
    heading: "Southbound toward Surat / Mumbai",
    confidence: 0.98,
    vehicleMakeModel: "Hyundai Creta SX (O) Turbo",
    color: "Red",
    watchlistMatch: initialWatchlist[0]
  },
  {
    id: "SIGHT-009",
    registrationNumber: "GJ-01-AB-1234",
    cameraId: "CAM-SRT-005",
    cameraName: "Kamrej Toll Plaza NH-48 Surat Inbound",
    locationName: "NH-48 Kamrej Gateway, Surat",
    district: "Surat",
    coordinates: [21.2687, 72.9554],
    timestamp: "2026-09-08T11:02:14.000Z",
    ptsMs: 1725793334000,
    speedKmh: 68,
    heading: "Southbound entering Surat City limits",
    confidence: 0.99,
    vehicleMakeModel: "Hyundai Creta SX (O) Turbo",
    color: "Red",
    watchlistMatch: initialWatchlist[0]
  },
  {
    id: "SIGHT-010",
    registrationNumber: "GJ-01-AB-1234",
    cameraId: "CAM-SRT-001",
    cameraName: "Ring Road Sahara Darwaja Flyover",
    locationName: "Sahara Darwaja Junction, Surat",
    district: "Surat",
    coordinates: [21.1969, 72.8424],
    timestamp: "2026-09-08T11:28:49.000Z",
    ptsMs: 1725794929000,
    speedKmh: 35,
    heading: "Westbound toward Textile Market Hub (Active Sighting)",
    confidence: 0.97,
    vehicleMakeModel: "Hyundai Creta SX (O) Turbo",
    color: "Red",
    watchlistMatch: initialWatchlist[0]
  }
];

export const testVehicle2Sightings: VehicleSighting[] = [
  {
    id: "SIGHT-201",
    registrationNumber: "GJ-05-CD-5678",
    cameraId: "CAM-SRT-001",
    cameraName: "Ring Road Sahara Darwaja Flyover",
    locationName: "Sahara Darwaja Junction, Surat",
    district: "Surat",
    coordinates: [21.1969, 72.8424],
    timestamp: "2026-09-08T05:10:00.000Z",
    ptsMs: 1725772200000,
    speedKmh: 52,
    heading: "Northbound toward NH-48",
    confidence: 0.97,
    vehicleMakeModel: "Toyota Fortuner 4x4",
    color: "White",
    watchlistMatch: initialWatchlist[1]
  },
  {
    id: "SIGHT-202",
    registrationNumber: "GJ-05-CD-5678",
    cameraId: "CAM-HWY-004",
    cameraName: "NH-48 Bharuch Narmada Cable Bridge Northbound",
    locationName: "Narmada Bridge Bharuch",
    district: "Bharuch",
    coordinates: [21.7051, 73.0034],
    timestamp: "2026-09-08T06:22:15.000Z",
    ptsMs: 1725776535000,
    speedKmh: 84,
    heading: "Northbound toward Vadodara",
    confidence: 0.98,
    vehicleMakeModel: "Toyota Fortuner 4x4",
    color: "White",
    watchlistMatch: initialWatchlist[1]
  },
  {
    id: "SIGHT-203",
    registrationNumber: "GJ-05-CD-5678",
    cameraId: "CAM-HWY-006",
    cameraName: "Bagodara Junction NH-47 Rajkot-Ahmedabad Fork",
    locationName: "Bagodara Highway Cross",
    district: "Ahmedabad Rural",
    coordinates: [22.6102, 72.1584],
    timestamp: "2026-09-08T08:05:40.000Z",
    ptsMs: 1725782740000,
    speedKmh: 88,
    heading: "Westbound toward Saurashtra / Rajkot",
    confidence: 0.96,
    vehicleMakeModel: "Toyota Fortuner 4x4",
    color: "White",
    watchlistMatch: initialWatchlist[1]
  },
  {
    id: "SIGHT-204",
    registrationNumber: "GJ-05-CD-5678",
    cameraId: "CAM-HWY-007",
    cameraName: "Limbdi Highway Bypass Chokdi",
    locationName: "Limbdi NH-47 Bypass",
    district: "Surendranagar",
    coordinates: [22.5654, 71.8021],
    timestamp: "2026-09-08T08:45:10.000Z",
    ptsMs: 1725785110000,
    speedKmh: 92,
    heading: "Westbound toward Chotila",
    confidence: 0.99,
    vehicleMakeModel: "Toyota Fortuner 4x4",
    color: "White",
    watchlistMatch: initialWatchlist[1]
  },
  {
    id: "SIGHT-205",
    registrationNumber: "GJ-05-CD-5678",
    cameraId: "CAM-RJK-002",
    cameraName: "Madhapar Chokdi Jamnagar Highway Bypass",
    locationName: "Madhapar Chowk Ring Road, Rajkot",
    district: "Rajkot",
    coordinates: [22.3276, 70.7698],
    timestamp: "2026-09-08T10:15:20.000Z",
    ptsMs: 1725790520000,
    speedKmh: 55,
    heading: "North-Westbound toward Jamnagar Highway",
    confidence: 0.98,
    vehicleMakeModel: "Toyota Fortuner 4x4",
    color: "White",
    watchlistMatch: initialWatchlist[1]
  }
];

export const testVehicle3Sightings: VehicleSighting[] = [
  {
    id: "SIGHT-301",
    registrationNumber: "GJ-27-XY-9012",
    cameraId: "CAM-VLS-001",
    cameraName: "Bhilad Maharashtra Border Checkpost NH-48",
    locationName: "Bhilad RTO Checkpost NH-48",
    district: "Valsad",
    coordinates: [20.2798, 72.8845],
    timestamp: "2026-09-08T07:45:00.000Z",
    ptsMs: 1725781500000,
    speedKmh: 48,
    heading: "Northbound entering Gujarat from Maharashtra",
    confidence: 0.99,
    vehicleMakeModel: "Maruti Suzuki Swift Dzire",
    color: "Silver",
    watchlistMatch: initialWatchlist[2]
  },
  {
    id: "SIGHT-302",
    registrationNumber: "GJ-27-XY-9012",
    cameraId: "CAM-VLS-002",
    cameraName: "Vapi GIDC Char Rasta Industrial Gate",
    locationName: "Vapi GIDC Main Junction",
    district: "Valsad",
    coordinates: [20.3721, 72.9124],
    timestamp: "2026-09-08T08:12:30.000Z",
    ptsMs: 1725783150000,
    speedKmh: 54,
    heading: "Northbound along NH-48 corridor",
    confidence: 0.97,
    vehicleMakeModel: "Maruti Suzuki Swift Dzire",
    color: "Silver",
    watchlistMatch: initialWatchlist[2]
  },
  {
    id: "SIGHT-303",
    registrationNumber: "GJ-27-XY-9012",
    cameraId: "CAM-SRT-005",
    cameraName: "Kamrej Toll Plaza NH-48 Surat Inbound",
    locationName: "NH-48 Kamrej Gateway, Surat",
    district: "Surat",
    coordinates: [21.2687, 72.9554],
    timestamp: "2026-09-08T09:40:15.000Z",
    ptsMs: 1725788415000,
    speedKmh: 72,
    heading: "Northbound approaching Surat bypass",
    confidence: 0.98,
    vehicleMakeModel: "Maruti Suzuki Swift Dzire",
    color: "Silver",
    watchlistMatch: initialWatchlist[2]
  }
];

// Helper to look up or generate dynamic route sightings for ANY vehicle registration number
export function getVehicleSightings(plate: string): VehicleSighting[] {
  const cleanPlate = plate.toUpperCase().trim();
  if (cleanPlate === "GJ-01-AB-1234" || cleanPlate === "GJ01AB1234") {
    return testVehicle1Sightings;
  }
  if (cleanPlate === "GJ-05-CD-5678" || cleanPlate === "GJ05CD5678") {
    return testVehicle2Sightings;
  }
  if (cleanPlate === "GJ-27-XY-9012" || cleanPlate === "GJ27XY9012") {
    return testVehicle3Sightings;
  }

  // Find if it's in watchlist
  const match = initialWatchlist.find(
    w => w.identifier.toUpperCase().replace(/[^A-Z0-9]/g, "") === cleanPlate.replace(/[^A-Z0-9]/g, "")
  );

  // Synthesize realistic trajectory across 4-6 cameras for evaluation demo
  const sampleCamIndices = [4, 12, 42, 40, 20, 14];
  const colors = ["Silver", "White", "Black", "Grey", "Blue"];
  const models = ["Mahindra Scorpio", "Hyundai Venue", "Honda City", "Tata Nexon", "Maruti Brezza"];
  const pickedColor = colors[cleanPlate.charCodeAt(cleanPlate.length - 1) % colors.length];
  const pickedModel = models[cleanPlate.charCodeAt(0) % models.length];

  const baseTime = Date.now() - 3600 * 4 * 1000;
  return sampleCamIndices.map((camIdx, index) => {
    const timeOffset = index * 42 * 60 * 1000;
    const time = new Date(baseTime + timeOffset);
    return {
      id: `DYN-SIGHT-${index + 1}`,
      registrationNumber: cleanPlate,
      cameraId: `CAM-HWY-00${index + 1}`,
      cameraName: `Gujarat State Highway Checkpoint Node ${index + 1}`,
      locationName: `Corridor Sector ${index + 1}, Gujarat State Highway`,
      district: index % 2 === 0 ? "Ahmedabad" : "Vadodara",
      coordinates: [23.0 - index * 0.15, 72.5 + index * 0.12],
      timestamp: time.toISOString(),
      ptsMs: time.getTime(),
      speedKmh: 55 + (index * 7) % 35,
      heading: index % 2 === 0 ? "Southbound" : "South-Eastbound",
      confidence: 0.94 + ((index * 3) % 6) / 100,
      vehicleMakeModel: pickedModel,
      color: pickedColor,
      watchlistMatch: match
    };
  });
}
