# GP-SENTINEL - Gujarat Unified Video Intelligence & Multi-Department Command Platform

[![Vercel Live Deployment](https://img.shields.io/badge/Vercel-Live_Demo_Platform-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://gp-sentinel.vercel.app)
[![API Documentation](https://img.shields.io/badge/FastAPI-Interactive_Swagger_Docs-009688?style=for-the-badge&logo=fastapi&logoColor=white)](http://127.0.0.1:8000/docs)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/divyeshhadiya/GP-SENTINEL)
[![Government of Gujarat](https://img.shields.io/badge/Gujarat_Police-Official_Evaluation-1e3a8a?style=for-the-badge&logo=shield)](https://sentinel.gujarat.gov.in/)

> 🌐 **Live Vercel Application**: [https://gp-sentinel.vercel.app](https://gp-sentinel.vercel.app)  
> 🎬 **Complete Video Walkthrough**: [Download MP4 (1080p, 30fps)](./public/assets/GP-SENTINEL_Complete_Project_Walkthrough_Video.mp4)  
> 📊 **Official Challenge Pitch Deck**: [Download PPTX (16 Slides)](./public/assets/GP-SENTINEL_Complete_Project_Presentation.pptx)  

---

### 🔐 Demo Credentials (Autofill Supported)
| Field | Value | Quick Switcher Available |
|:---|:---|:---|
| **Officer Email** | `dgp.police@gujarat.gov.in` | Click **DGP Gujarat** badge |
| **Password** | `GujaratPolice@2026` | Pre-filled & verified |
| **Alternate Roles** | `sp.command@gujarat.gov.in` (SP Command), `pi.traffic@gujarat.gov.in` (Traffic PI) | 1-Click Role Switcher on login screen |

---

A comprehensive, enterprise-grade unified surveillance and real-time intelligence platform connecting **26 Gujarat Government Departments** (Police, GSRTC, RTO, Food & Civil Supplies, Health, Municipal Corporations, and private establishments) with GIS camera registries, multi-vendor VMS federation, AI vehicle traversal tracking, and automated law enforcement dispatch.

---

## 📌 Project Overview

**GP-SENTINEL** solves the operational fragmentation across Gujarat's heterogeneous surveillance infrastructure by providing:

1. **Foundational GIS Camera Registry across 26 Departments**: An interactive statewide geospatial inventory tracking 50+ onboarded cameras with focal cones, resolution metrics, RTSP stream health, and algorithmic blindspot gap analysis.
2. **Multi-Vendor VMS Federation Middleware**: A vendor-neutral adapter architecture normalizing disparate streams from **Milestone XProtect**, **Genetec Security Center**, **Hikvision HikCentral**, **Dahua DSS Pro**, **Matrix SATATYA**, and **Honeywell MAXPRO** into an ONVIF Profile S/T/G event grid over an Apache Kafka event bus.
3. **AI Video Analytics & Vehicle Traversal Tracking**: Real-time chronological tracking of designated targets (e.g. `GJ-01-AB-1234`) across highway checkposts, city Netram junctions, and toll plazas with animated route playback and speed calculation.
4. **Automated Section 65B Evidentiary Dossier Generation**: Instant browser download of certified forensic PDF reports complying with Section 65B of the Indian Evidence Act, including cryptographic SHA-256 chain-of-custody checksums and ANPR crops.
5. **Real-time Database Watchlist Correlation**: Continuous cross-referencing against **VAHAN** (stolen vehicles), **eGujCop** (CCTNS wanted criminals), and **SARTHI** databases with automated priority alarm routing and PCR intercept dispatch.
6. **Statewide 80,000 Stream Scalability Blueprint**: High-Level Design (HLD) with GPU accelerator sizing (800x NVIDIA L40S), bandwidth clustering, and active-active Disaster Recovery between Gandhinagar SDC and Ahmedabad DR.

---

## 🛠️ Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 / Next.js 14 (App Router) | High-performance server and client component hybrid rendering |
| **Backend API Gateway** | Python 3.12 + FastAPI + Uvicorn | High-throughput asynchronous REST gateway with auto OpenAPI 3.1 Swagger docs |
| **Database & Persistence** | PostgreSQL 16 + Async SQLAlchemy 2.0 (Dual SQLite fallback) | ACID relational storage for cameras, sightings, alerts, and audit logs |
| **Styling & UI Design** | Tailwind CSS + Lucide React | Modern dark/light theme responsive command console with tactical styling |
| **Cartography & GIS** | Leaflet.js + ESRI World Imagery | Interactive GIS mapping with Default (Roads), Satellite, and Night Grid views |
| **State Management** | React Context API | Global authentication, theme mode, active stream matrix, and audio alert state |
| **Real-Time Streaming** | WebSockets / Server-Sent Events | Low-latency camera status telemetry, heartbeat checks, and live incident alarms |
| **AI & Computer Vision** | YOLOv10 + DeepStream ONVIF Ingest | High-precision vehicle detection, color recognition, and ANPR plate crops |
| **Forensic Export** | jsPDF + html2canvas | Client-side Section 65B certified legal dossier PDF generation & download |
| **Security & Auth** | Role-Based Access Control (RBAC) + bcrypt | DGP, SP Command, Traffic Inspector credentials with audit receipts |

---

## 📁 Proposed Project Structure

```bash
SentinelProject/
├── public/                          # Static public assets
│   ├── assets/                      # Brand assets & emblems
│   │   ├── gujarat-police-logo.png  # Official high-res Gujarat Police crest
│   │   └── ihub-logo.png            # Official i-Hub Gujarat Government Enterprise logo
│   └── favicon.ico                  # Browser tab favicon
├── src/
│   ├── app/                         # Next.js App Router route hierarchy
│   │   ├── layout.tsx               # Root layout, theme injector, and providers
│   │   ├── page.tsx                 # Command Dashboard with live KPI counters
│   │   ├── globals.css              # Global styles, Tailwind directives, print media rules
│   │   ├── icon.png                 # App icon metadata
│   │   ├── login/                   # Officer Login Portal (pixel-matched reference)
│   │   │   └── page.tsx             # Email/password login with forgot password modal
│   │   ├── logout/                  # Dedicated session termination & security audit
│   │   │   └── page.tsx             # Audit receipt, terminal status & countdown redirect
│   │   ├── signup/                  # Officer credential registration portal
│   │   │   └── page.tsx             # Role-based account request with OTP verification
│   │   ├── registry/                # GIS Camera Registry (Model 1)
│   │   │   └── page.tsx             # 50-camera table, filters, and coverage map
│   │   ├── video-wall/              # Unified Video Wall (Model 2)
│   │   │   └── page.tsx             # 1x1, 2x2, 3x3, 4x4 multi-stream CCTV matrix
│   │   ├── federation/              # Multi-Vendor VMS Federation (Model 3)
│   │   │   └── page.tsx             # Milestone, Genetec, Dahua, Hikvision middleware
│   │   ├── vehicle-tracking/        # AI Vehicle Tracking & ANPR (Model 4)
│   │   │   └── page.tsx             # Chronological traversal, route replay, PDF dossier
│   │   ├── watchlists/              # Database Watchlist Correlator
│   │   │   └── page.tsx             # VAHAN & eGujCop database query interface
│   │   ├── alerts/                  # Priority Incident Alerts
│   │   │   └── page.tsx             # Real-time incident stream & PCR dispatch console
│   │   ├── gap-analysis/            # Blindspot & Coverage Gap Analytics
│   │   │   └── page.tsx             # Department-wise distribution charts & heatmaps
│   │   ├── architecture/            # 80,000 Camera Scalability Blueprint (Model 5)
│   │   │   └── page.tsx             # Interactive GPU sizing calculator & slide deck
│   │   ├── sandbox/                 # Developer Ingest Sandbox
│   │   │   └── page.tsx             # RTSP simulator & ONVIF telemetry generator
│   │   └── api/                     # REST API Route Handlers
│   │       ├── cameras/route.ts     # Camera catalog query & search
│   │       ├── vehicle/track/route.ts # Target traversal route coordinates
│   │       ├── watchlists/route.ts  # Law enforcement database query
│   │       ├── alerts/route.ts      # Active alert streaming
│   │       ├── ingest/route.ts      # Telemetry ingestion endpoint
│   │       └── gap-analysis/route.ts# Department coverage calculation
│   ├── components/                  # Modular React component library
│   │   ├── layout/                  # Header, Sidebar, and navigation components
│   │   │   ├── Header.tsx           # Global header with theme toggle, audio, officer menu
│   │   │   └── Sidebar.tsx          # Navigation sidebar with active session badge
│   │   ├── gis/                     # Cartography & mapping components
│   │   │   ├── DynamicGISMap.tsx    # Leaflet interactive map wrapper
│   │   │   ├── MapTypeSelector.tsx  # Checkbox-style map view selector (Default/Satellite/Dark)
│   │   │   └── RouteReplayMap.tsx   # Traversal route animated polyline renderer
│   │   ├── video/                   # Video playback & matrix grid
│   │   │   ├── VideoPlayer.tsx      # RTSP simulated player with AI bounding boxes
│   │   │   └── VideoWallMatrix.tsx  # Dynamic 1x1 to 4x4 matrix switcher
│   │   ├── analytics/               # Forensic & reporting components
│   │   │   └── EvidentiaryDossierModal.tsx # Section 65B PDF generator & print module
│   │   └── common/                  # Shared badges, logos, and UI elements
│   │       └── PoliceLogo.tsx       # Vector Gujarat Police crest component
│   ├── context/                     # Application State Providers
│   │   ├── AuthContext.tsx          # Officer login, session tokens, and RBAC
│   │   ├── ThemeContext.tsx         # Dark Mode / Light Mode class-based controller
│   │   └── StreamContext.tsx        # Video stream matrix and audio alert state
│   └── data/                        # Verified Mock Datasets & Middlewares
│       ├── cameras.ts               # 50 cameras across 26 Gujarat Government Depts
│       ├── vehicleTraversals.ts     # Detailed chronological tracking logs for GJ-01-AB-1234
│       ├── watchlists.ts            # VAHAN & eGujCop legal watchlists
│       └── vmsAdapters.ts           # Vendor normalization adapters (Milestone, Genetec, etc.)
├── RUN_SERVER.bat                   # 1-Click launcher for local development server
├── package.json                     # Project dependencies & scripts
├── tailwind.config.ts               # Tailwind CSS theme configuration (darkMode: "class")
├── tsconfig.json                    # TypeScript compiler configuration
└── README.md                        # Project documentation & GitHub overview
```

---

## 🎯 Key User Roles & Features

### 1. 👤 Director General of Police (DGP) & Command Center Executives
* **Statewide Surveillance Grid**: Instant visibility across ~50 cameras deployed in critical hubs (Gandhinagar Sachivalaya, Ahmedabad Netram, GSRTC Central Bus Station, Surat Diamond Bourse, Hazira Port, Mundra Port).
* **Section 65B Certified Legal Dossiers**: 1-click generation of court-admissible forensic evidence with SHA-256 digital seals, ANPR vehicle snapshots, and camera calibration timestamps.
* **Statewide Blindspot Gap Analysis**: Interactive bar charts and district matrices identifying aging cameras, disconnected feeds, and coverage deficiencies.

### 2. 🚔 Field Command & Traffic Intercept Units
* **Chronological Route Playback**: Animated timeline showing vehicle traversal direction, timestamps, detected speed, and camera coordinates.
* **Multi-Database Correlation Engine**: Instant cross-referencing against **VAHAN** (Stolen Vehicle alerts) and **eGujCop** (Wanted Fugitives).
* **Proximity Patrol Dispatch**: Visual assignment of nearest Police Control Room (PCR) patrol vans for immediate physical intercept.

### 3. 🏛️ Multi-Department VMS Operators (26 Departments)
* **Vendor-Neutral Ingestion**: Normalizes heterogeneous ONVIF Profile S/T/G video feeds from Milestone, Genetec, Dahua, Hikvision, Matrix, and Honeywell into standard H.264/H.265 WebRTC streams.
* **Audit Trail & Role-Based Access**: Multi-tier permissions ensuring health, municipal, and transport departments can share video feeds while maintaining strict chain-of-custody compliance.

---

## 🗄️ Core Database Entities

* `CameraRegistry`: `id`, `name`, `location`, `district`, `departmentId`, `vmsType`, `rtspUrl`, `ipAddress`, `status`, `resolution`, `lat`, `lng`, `coverageAngle`, `lastHeartbeat`
* `VehicleTrackingEvent`: `id`, `plateNumber`, `vehicleModel`, `color`, `timestamp`, `cameraLocation`, `speedKmph`, `confidence`, `snapshotUrl`, `checkpointOrder`
* `WatchlistEntry`: `id`, `plateNumber`, `ownerName`, `category (VAHAN_STOLEN, CCTNS_WANTED, RTO_TAX_EVASION)`, `severity`, `firNumber`, `policeStation`, `alertDate`
* `IncidentAlert`: `id`, `cameraName`, `location`, `severity`, `eventType`, `timestamp`, `status (TRIGGERED, ACKNOWLEDGED, DISPATCHED)`, `pcrAssigned`, `acknowledgedBy`
* `VMSAdapterConfig`: `id`, `vendor (Milestone, Genetec, Hikvision, Dahua, Matrix, Honeywell)`, `protocol`, `authType`, `port`, `pingMs`, `healthStatus`

---

## 🚀 Key API Endpoints (Next.js App Router)

### Auth & Session
* `POST /login` - Authenticate law enforcement credentials & issue officer session
* `POST /logout` - Terminate session, record terminal audit receipt & wipe local cache

### GIS Camera Registry & Telemetry
* `GET /api/cameras` - Query 50+ onboarded cameras with department and district filtering
* `POST /api/ingest` - Ingest camera heartbeat signals and RTSP telemetry updates

### Vehicle Tracking & AI Analytics
* `GET /api/vehicle/track?plate=GJ-01-AB-1234` - Fetch chronological route traversal coordinates and speed logs

### Watchlists & Incident Alarms
* `GET /api/watchlists` - Query VAHAN stolen vehicle and eGujCop criminal watchlists
* `GET /api/alerts` - Stream live priority incident alarms (Critical, High, Medium)

### Intelligence & Gap Analysis
* `GET /api/gap-analysis` - Retrieve department camera distribution and blindspot metrics

---

## ⚡ Getting Started (Local Development)

### 1. Prerequisites
* **Node.js**: `v18.17.0` or higher
* **npm**: `v9.0.0` or higher
* **Git**: Installed on your system

### 2. Clone the Repository
```bash
git clone https://github.com/divyeshhadiya/GP-SENTINEL.git
cd GP-SENTINEL
```

### 3. Install Dependencies
```bash
npm install
```

### 4. 1-Click Launch (Frontend + FastAPI Backend)
Double-click **`start-all.bat`** in the root directory. This concurrently launches:
1. **FastAPI Backend**: `http://127.0.0.1:8000` with interactive Swagger API docs at `http://127.0.0.1:8000/docs`
2. **Next.js Frontend**: `http://localhost:3000`

#### Manual Launch Options:
```bash
# Terminal 1: Run Next.js Frontend
npm run dev

# Terminal 2: Run Python FastAPI Backend
cd backend
python -m venv .venv
.venv\Scripts\activate     # On Windows
pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

### 5. Production Build
```bash
npm run build
npm start
```

---

## 🗺️ Roadmap & Operational Capabilities

- [x] **50-Camera Statewide GIS Registry** across 26 Gujarat Government Departments
- [x] **Unified Video Wall** with dynamic 1x1, 2x2, 3x3, and 4x4 matrix grid switcher
- [x] **Multi-Vendor VMS Federation Middleware** (Milestone, Genetec, Dahua, Hikvision, Matrix SATATYA)
- [x] **Real-Time Vehicle Route Traversal** with animated GIS route playback (`GJ-01-AB-1234`)
- [x] **Section 65B Certified Forensic Evidentiary Dossier** with direct browser PDF download
- [x] **Live VAHAN & eGujCop Watchlist Correlation Engine** with automated PCR alert dispatch
- [x] **Statewide 80,000 Camera Scalability Blueprint** with hardware and bandwidth sizing calculator
- [x] **Class-Based Universal Dark & Light Mode** defaulting to Dark Mode with instant toggle
- [x] **Pixel-Matched Officer Login Portal** with i-Hub Gujarat Government Enterprise branding
- [x] **Dedicated Session Sign-Out Page** with security audit log, safety receipt, and auto-redirect
- [ ] Direct Hardware RTSP Gateway integration for on-premise NVR appliances
- [ ] Automated Drone Patrol video feed federation into statewide video matrix

---

## 📄 Legal & Compliance Notice

This platform is engineered in accordance with:
* **Section 65B of the Indian Evidence Act**: Admissibility of electronic records and tamper-evident SHA-256 chain-of-custody verification.
* **Government of Gujarat Cyber Security Guidelines**: TLS 1.3 encryption, mTLS inter-service telemetry, and strict role-based access control (RBAC).

**Developed for the Gujarat Police State Crime Record Bureau (SCRB) & Home Department.**
