import { WatchlistEntry, AlertEvent } from "@/types";

export const initialWatchlist: WatchlistEntry[] = [
  {
    id: "WL-VAHAN-001",
    identifier: "GJ-01-AB-1234",
    source: "VAHAN",
    category: "Stolen Vehicle",
    severity: "CRITICAL",
    details: "Vehicle reported stolen from Navrangpura, Ahmedabad. Linked to active jewelry heist getaway investigation.",
    firNumber: "FIR-1120/2026/NAV",
    policeStation: "Navrangpura Police Station, Ahmedabad",
    registeredOwner: "Manoj B. Patel",
    vehicleMakeModel: "Hyundai Creta SX (O) Turbo - Passion Red",
    dateAdded: "2026-09-06T09:30:00Z",
    status: "ACTIVE"
  },
  {
    id: "WL-VAHAN-002",
    identifier: "GJ-05-CD-5678",
    source: "VAHAN",
    category: "Blacklisted RC",
    severity: "HIGH",
    details: "Vehicle impound warrant issued by RTO Surat. Multiple toll evasion incidents and forged registration certificate.",
    firNumber: "RTO-SUR-ENF/8942",
    policeStation: "Katargam Police Station, Surat",
    registeredOwner: "Kishore M. Savani",
    vehicleMakeModel: "Toyota Fortuner 4x4 - Pearl White",
    dateAdded: "2026-09-07T11:15:00Z",
    status: "ACTIVE"
  },
  {
    id: "WL-VAHAN-003",
    identifier: "GJ-27-XY-9012",
    source: "VAHAN",
    category: "Suspect Vehicle",
    severity: "CRITICAL",
    details: "Suspected illicit contraband transit vehicle flagged at Bhilad border. Look-out circular issued across NH-48 corridor.",
    firNumber: "FIR-402/2026/VAP",
    policeStation: "Vapi Town Police Station, Valsad",
    registeredOwner: "Rameshwar Transport Syndicate",
    vehicleMakeModel: "Maruti Suzuki Swift Dzire - Silky Silver",
    dateAdded: "2026-09-07T14:45:00Z",
    status: "ACTIVE"
  },
  {
    id: "WL-VAHAN-004",
    identifier: "GJ-06-ZZ-9999",
    source: "VAHAN",
    category: "Stolen Vehicle",
    severity: "HIGH",
    details: "High-speed pursuit evasion on NE-1 Expressway. Fake number plate suspected. Intercept orders active.",
    firNumber: "FIR-778/2026/SAY",
    policeStation: "Sayajigunj Police Station, Vadodara",
    registeredOwner: "Unknown / Cloned Plate",
    vehicleMakeModel: "Mahindra Scorpio-N - Stealth Black",
    dateAdded: "2026-09-08T04:20:00Z",
    status: "ACTIVE"
  },
  {
    id: "WL-VAHAN-005",
    identifier: "GJ-18-BQ-4321",
    source: "VAHAN",
    category: "Stolen Vehicle",
    severity: "MEDIUM",
    details: "Reported missing from Sector 21 Shopping Center, Gandhinagar. Owner filed e-FIR.",
    firNumber: "FIR-312/2026/GNR",
    policeStation: "Sector 21 Police Station, Gandhinagar",
    registeredOwner: "Deepak S. Shah",
    vehicleMakeModel: "Toyota Innova Crysta 2.4 - Super White",
    dateAdded: "2026-09-08T08:00:00Z",
    status: "ACTIVE"
  },
  {
    id: "WL-EGUJ-001",
    identifier: "Vikram @ Vicky Solanki",
    source: "eGujCop",
    category: "Wanted Criminal",
    severity: "CRITICAL",
    details: "Accused in multiple armed robberies across Saurashtra. Non-bailable arrest warrant under BNS Sec 310(2). FRS template active.",
    firNumber: "FIR-220/2026/RJK",
    policeStation: "Pradyuman Nagar Police Station, Rajkot",
    photoUrl: "/assets/suspect_1.jpg",
    dateAdded: "2026-08-28T16:00:00Z",
    status: "ACTIVE"
  },
  {
    id: "WL-EGUJ-002",
    identifier: "Aarav Nirav Shah (Age 9)",
    source: "eGujCop",
    category: "Missing Person",
    severity: "CRITICAL",
    details: "Missing child alert (Amber alert) issued across Ahmedabad & Gandhinagar. Last seen near Vastrapur Lake. Height 4'2\", blue t-shirt.",
    firNumber: "MISSING-441/2026/VAS",
    policeStation: "Vastrapur Police Station, Ahmedabad",
    photoUrl: "/assets/missing_child.jpg",
    dateAdded: "2026-09-08T06:15:00Z",
    status: "ACTIVE"
  },
  {
    id: "WL-EGUJ-003",
    identifier: "Farhan Mohammad Sheikh",
    source: "eGujCop",
    category: "Absconder",
    severity: "HIGH",
    details: "Absconding parole jumper convicted in cyber financial heist syndicate. Associated with vehicle GJ-01-AB-1234.",
    firNumber: "CCTNS-CR-5891/2025",
    policeStation: "Cyber Crime Cell, Police Bhawan Gandhinagar",
    photoUrl: "/assets/suspect_2.jpg",
    dateAdded: "2026-09-01T12:00:00Z",
    status: "ACTIVE"
  },
  {
    id: "WL-SARTHI-001",
    identifier: "DL-GJ01-20180049281",
    source: "SARTHI",
    category: "Blacklisted RC",
    severity: "MEDIUM",
    details: "Driver license permanently revoked following 3 hit-and-run offenses under Gujarat Road Safety Authority.",
    registeredOwner: "Harish K. Desai",
    dateAdded: "2026-08-15T10:00:00Z",
    status: "ACTIVE"
  },
  {
    id: "WL-AFIS-001",
    identifier: "NAFIS-ID-GUJ-84920",
    source: "AFIS/NAFIS",
    category: "Wanted Criminal",
    severity: "CRITICAL",
    details: "10-print fingerprint match on biometric scanner at Surat Diamond Bourse checkpoint. Habitual interstate burglar.",
    firNumber: "NAFIS-GUJ-84920",
    policeStation: "State Crime Record Bureau (SCRB) Gandhinagar",
    dateAdded: "2026-09-05T18:30:00Z",
    status: "ACTIVE"
  }
];

export const initialAlerts: AlertEvent[] = [
  {
    id: "ALT-2026-001",
    timestamp: "2026-09-08T18:30:00Z",
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
    timestamp: "2026-09-08T18:15:00Z",
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
      dispatchedAt: "2026-09-08T18:20:00Z"
    },
    notes: "Impound warrant active. Unit en-route to intercept at junction."
  },
  {
    id: "ALT-2026-003",
    timestamp: "2026-09-08T17:45:00Z",
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
