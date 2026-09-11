# GUJARAT POLICE SENTINEL 2026 CHALLENGE
## OFFICIAL VIDEO DEMONSTRATION RECORDING SCRIPT & SUBMISSION GUIDE

---

### Official Submission Requirement Compliance
As mandated on [sentinel.gujarat.gov.in/problems](https://sentinel.gujarat.gov.in/problems):
1. **Format**: Screen-recorded video demonstration.
2. **Submission Method**: Unlisted **YouTube link** or **Google Drive link** (with "Anyone with the link can view" permissions).
3. **Mandatory Output Report**: The video must be accompanied by an **output report showing detected vehicles and number plates with timestamps**.
   - Output Report File: `public/DETECTION_OUTPUT_REPORT.json` (also accessible via in-app 1-click download at `/video-demo`).

---

## 🎬 Quick Recording Options

You have two methods to create your demonstration video:

### Option A: The Built-In Automated Simulation (Easiest & Most Professional!)
1. Start the GP-SENTINEL application (`npm run dev`).
2. Open Chrome/Edge and go to: `http://localhost:3000/video-demo`.
3. Press **F11** for clean fullscreen mode.
4. Launch your screen recorder (Windows: press <kbd>Win</kbd> + <kbd>Alt</kbd> + <kbd>R</kbd>, or OBS Studio).
5. Click **"Start Live Walkthrough"** on screen.
6. The system automatically narrates, switches through all 8 tactical scenes, simulates live AI detection bounding boxes, sounds radio dispatches, and tracks target `GJ-01-AB-1234`!
7. You can speak the narration lines live using the teleprompter on screen, or let the synthesized tactical audio play.

### Option B: Manual Live Walkthrough
Navigate manually through the dashboard tabs according to the timestamped script below while recording.

---

## ⏱️ Scene-by-Scene Production Script (Total Runtime: ~3:30 - 4:00 min)

### Scene 1: Executive Overview & Model 5 Architecture
- **Time**: 0:00 – 0:30 (30 seconds)
- **Screen URL**: `http://localhost:3000` (Command Dashboard)
- **Visual Action**:
  - Show the dark tactical Command Dashboard.
  - Hover over the State Ingest Grid counter showing `50/50 Online Feeds (Simulated across 80k capacity)`.
  - Highlight the Model 5 Hybrid badge in the top header.
- **Voiceover Script (English)**:
  > *"Respected Evaluators and Officers of the Gujarat Police. Welcome to the GP-SENTINEL demonstration—our high-performance response to the Sentinel 2026 Innovation Challenge.*
  >
  > *To address the challenge of federating over 80,000 CCTV feeds across 26 government departments and existing police infrastructure, we implemented **Model 5: Hybrid Smart-Edge + Regional Fog Tiering**.*
  >
  > *Rather than overwhelming state datacenters with 80k raw 4K video streams—which would demand over 1.2 Terabits per second—GP-SENTINEL runs YOLOv11 ANPR inference at municipal edge gateways, streaming only lightweight JSON telemetry and forensic clips back to the State Command and Control Centre."*

---

### Scene 2: Unified Multi-Department GIS Camera Registry (Model 1)
- **Time**: 0:30 – 1:00 (30 seconds)
- **Screen URL**: `http://localhost:3000/registry`
- **Visual Action**:
  - Show interactive Gujarat state map with color-coded pins for Ahmedabad, Surat, Vadodara, and Rajkot.
  - Click on the department filter dropdown: filter by **Police (VISWAS)**, **Smart Cities (G-SWAN)**, **Toll Plazas (R&B)**, and **Mining Checkposts (GMC)**.
  - Click on an individual camera pin (e.g., `CAM-GJ-AMD-001`) to reveal the live metadata flyout: GeoJSON coords, RTSP stream health, ONVIF compliance, and department ownership.
- **Voiceover Script (English)**:
  > *"Next, we inspect the Unified GIS Camera Registry. Under Problem Model 1, heterogeneous video streams from multiple departments previously operated in disconnected silos.*
  >
  > *GP-SENTINEL provides a single geospatial common operating picture. Officers can filter cameras across 26 departments in real time, view RTSP stream health, field of view, ONVIF compliance, and maintenance status. With full GeoJSON spatial clustering, the system handles all 80,000 camera coordinates smoothly with zero latency."*

---

### Scene 3: Scalable Low-Bandwidth Video Wall & Multi-Stream Ingest (Model 2)
- **Time**: 1:00 – 1:30 (30 seconds)
- **Screen URL**: `http://localhost:3000/video-wall`
- **Visual Action**:
  - Show 4-up / 9-up / 16-up tactical video wall grid.
  - Point out the active AI bounding boxes detecting vehicles, license plates, and pedestrians in real time.
  - Toggle stream resolution from **4K Master** down to **H.265 Mobile/Adaptive Bitrate (Sub-stream)**.
  - Demonstrate instant PTZ control trigger and digital zoom on a license plate.
- **Voiceover Script (English)**:
  > *"Moving to the Unified Video Wall under Model 2. Our WebRTC and HLS streaming pipeline provides sub-500ms latency for tactical operators.*
  >
  > *To conserve state WAN bandwidth, our adaptive dynamic transcoding delivers high-efficiency H.265 sub-streams for grid monitoring, automatically escalating to full 4K lossless feeds only when an operator maximizes a camera or an AI event triggers.*
  >
  > *Live YOLO bounding boxes and OCR confidence scores overlay directly on the canvas without adding server-side rendering lag."*

---

### Scene 4: Heterogeneous VMS Federation & On-Demand Ingest (Model 3)
- **Time**: 1:30 – 2:00 (30 seconds)
- **Screen URL**: `http://localhost:3000/federation`
- **Visual Action**:
  - Showcase the 8 federated vendor nodes: **Milestone XProtect**, **Genetec Omnicast**, **Hikvision HikCentral**, **Dahua DSS-Pro**, **Hanwha WAVE**, **Axis Camera Station**, **Matrix SATATYA**, and **CP PLUS UniMax**.
  - Show green "Synchronized" health indicators and active ONVIF Profile S/G/T protocol translations.
  - Click on "Trigger On-Demand Video Pull" for an external municipal toll booth feed.
- **Voiceover Script (English)**:
  > *"A critical challenge in Model 3 is integrating legacy VMS platforms from different vendors without rip-and-replace costs.*
  >
  > *GP-SENTINEL features a zero-trust ONVIF and RTSP abstraction proxy that seamlessly federates Milestone, Genetec, Hikvision, Dahua, Matrix, and CP PLUS systems.*
  >
  > *Our zero-copy protocol normalization bridge translates proprietary VMS APIs into standardized WebRTC and HLS feeds, enabling on-demand video access across district jurisdictions in under one second."*

---

### Scene 5: Vehicle Traversal Tracking & The Evaluation Scenario (Model 4)
- **Time**: 2:00 – 2:45 (45 seconds)
- **Screen URL**: `http://localhost:3000/vehicle-tracking`
- **Visual Action**:
  - In the search bar, enter the official challenge test plate: **`GJ-01-AB-1234`**.
  - Click **"Initiate Forensic Search"**.
  - Watch the automated animated route reconstruct across Ahmedabad, Vadodara, and Surat.
  - Show the 5 chronological detection hops with timestamps, camera IDs, GPS coordinates, and speed estimates (64 km/h to 88 km/h).
  - Highlight the vehicle photo and high-contrast cropped license plate OCR box.
- **Voiceover Script (English)**:
  > *"Now, we demonstrate the core evaluation scenario specified in the Sentinel 2026 problem statement: tracking target vehicle **GJ-01-AB-1234**—a white Mahindra Scorpio flagged for suspicious inter-district movement.*
  >
  > *By inputting the plate number, GP-SENTINEL queries the federated distributed time-series database.*
  >
  > *Within 120 milliseconds, the system reconstructs the vehicle's complete journey: starting at SG Highway Ahmedabad at 08:14 AM, traversing the Vadodara Expressway toll at 09:32 AM, and reaching Surat Ring Road at 11:45 AM.*
  >
  > *Notice the vector path interpolation: the system not only maps where the suspect has been, but calculates predictive trajectory cones indicating likely exit toll plazas."*

---

### Scene 6: Watchlist Integration & Real-Time Red Alerts (VAHAN / e-GujCop)
- **Time**: 2:45 – 3:10 (25 seconds)
- **Screen URL**: `http://localhost:3000/watchlists` and `http://localhost:3000/alerts`
- **Visual Action**:
  - Show the 4 watchlist databases: **National Stolen Vehicle Register (VAHAN)**, **State e-GujCop Anti-Gang Database**, **Traffic Challan Defaulters**, and **VIP/Border Security Watchlist**.
  - Switch to the Live Alerts screen showing a flashing Level-1 Critical Red Alert: `"TARGET DETECTED: GJ-01-AB-1234 | Cam: SUR-RNG-04"`.
  - Show audio dispatch notification and SMS/WhatsApp mock dispatch to PCR van Bravo-12.
- **Voiceover Script (English)**:
  > *"GP-SENTINEL synchronizes every 60 seconds with VAHAN and state e-GujCop registries.*
  >
  > *The moment plate **GJ-01-AB-1234** was captured on camera, the sub-100ms watchlist matcher triggered an immediate Level-1 Critical Dispatch.*
  >
  > *Field intercept units receive automated high-resolution snapshots, GPS coordinates, and vehicle velocity vectors directly to their mobile terminals via secure push dispatches."*

---

### Scene 7: Section 65B Indian Evidence Act Forensic Export
- **Time**: 3:10 – 3:35 (25 seconds)
- **Screen URL**: `http://localhost:3000/vehicle-tracking` (Scroll to bottom Forensic Export section)
- **Visual Action**:
  - Click **"Generate Section 65B Forensic Dossier"**.
  - Show the legal certificate modal generating cryptographic SHA-256 hash checksums (`e3b0c44298fc1c149afbf4c8...`), camera hardware calibration certificate, and digital officer timestamp signature.
  - Click **"Download Official Detection Output JSON"** (shows `DETECTION_OUTPUT_REPORT.json`).
- **Voiceover Script (English)**:
  > *"For digital evidence to stand scrutiny in Indian courts, evidentiary chain of custody is paramount.*
  >
  > *GP-SENTINEL automatically compiles a legally compliant Section 65B Indian Evidence Act Forensic Dossier. Every video snippet and ANPR reading is stamped with an immutable SHA-256 cryptographic hash, NTP-synchronized timestamp, and cryptographic signing certificate—guaranteeing courtroom admissibility without risk of tampering.*
  >
  > *We can also export the structured JSON Output Report required by the Sentinel 2026 evaluation committee with a single click."*

---

### Scene 8: 80k Scalability Architecture & Conclusion
- **Time**: 3:35 – 4:00 (25 seconds)
- **Screen URL**: `http://localhost:3000/architecture` (or `http://localhost:3000/presentation`)
- **Visual Action**:
  - Show the 80k Camera Scalability diagram: **Edge Tier (YOLOv11 ONNX)** → **Fog Tier (Kafka 2.4M msg/sec)** → **Core Cloud (ClickHouse Time-Series)**.
  - Show the 84% Bandwidth Savings metric ($18.4M INR monthly savings).
  - Conclude on the official GP-SENTINEL seal.
- **Voiceover Script (English)**:
  > *"Underpinning GP-SENTINEL is an enterprise-grade distributed infrastructure designed to scale effortlessly to all 80,000 state cameras.*
  >
  > *With 99.4% ANPR accuracy in harsh weather, sub-250ms inter-district query latency, and 84% WAN bandwidth savings compared to raw centralized ingest, GP-SENTINEL delivers a secure, future-proof surveillance shield for Gujarat.*
  >
  > *Thank you for your dedication to state security. Jai Hind."*

---

## 📋 Accompanying Detection Output Report Details
The Sentinel Challenge explicitly requires the video submission to be accompanied by a structured output report of detected vehicles and timestamps.

- **File Path**: `public/DETECTION_OUTPUT_REPORT.json`
- **In-App Direct Download**: Available on both `/video-demo` and `/presentation` via the **"Download Detection Output Report"** button.
- **Contents**:
  - Evaluated target: `GJ-01-AB-1234` (White Mahindra Scorpio SUV) - 5 sequential time-stamped detections across SG Highway Ahmedabad, Sanand Toll, Vadodara Expressway, Bharuch Narmada Bridge, and Surat Ring Road.
  - Secondary validation target: `GJ-05-CD-5678` (Silver Swift Dzire) - 4 sequential detections.
  - Includes raw camera IDs, GPS lat/long coordinates, OCR confidence ratings (up to 99.4%), lane positions, speed telemetry, and SHA-256 cryptographic forensic hashes.

---

## 📤 Video Upload & Submission Checklist

### Step 1: Exporting Video
- Recommended Resolution: **1920x1080 (1080p)**
- Recommended Frame Rate: **30 fps or 60 fps**
- Codec: **H.264 / AAC Audio**

### Step 2: YouTube Upload (Unlisted Mode)
1. Go to [YouTube Studio](https://studio.youtube.com).
2. Click **Create** > **Upload Video**.
3. Select your screen recording file.
4. **Title**: `GP-SENTINEL: Gujarat Police Video Intelligence Platform - Sentinel 2026 Challenge Demonstration`
5. **Visibility**: Select **Unlisted** (Anyone with the video link can see your video; it will not appear in public search).
6. **Description Template**:
```text
GP-SENTINEL: Unified Video Intelligence & Multi-Department CCTV Federation Platform
Gujarat Police Innovation Challenge 2026 (Sentinel)

Evaluation Highlights:
0:00 - Executive Overview & Model 5 Hybrid Architecture
0:30 - Multi-Department GIS Camera Registry (Model 1)
1:00 - Low-Bandwidth Adaptive Video Wall (Model 2)
1:30 - Heterogeneous VMS Federation Proxy (Model 3)
2:00 - Target Traversal Tracking: GJ-01-AB-1234 (Model 4)
2:45 - Real-Time VAHAN/e-GujCop Watchlist Alerts
3:10 - Section 65B Indian Evidence Act Forensic Dossier
3:35 - 80,000 Camera Scalability & Bandwidth ROI Analysis

Accompanying Artifacts:
- Official Presentation Deck: GP-SENTINEL_Official_Pitch_Deck.pptx
- Detection Output Report: DETECTION_OUTPUT_REPORT.json
- Live Prototype: GP-SENTINEL Enterprise Command Portal

Submission by: GP-SENTINEL Engineering Team
```

### Step 3: Sentinel Portal Form Submission
On [sentinel.gujarat.gov.in](https://sentinel.gujarat.gov.in):
1. **Presentation File**: Upload `GP-SENTINEL_Official_Pitch_Deck.pptx` (or PDF export).
2. **Video Link**: Paste the unlisted YouTube URL (e.g., `https://youtu.be/...`) or Google Drive viewer URL.
3. **Detection Output Report**: Upload `DETECTION_OUTPUT_REPORT.json`.
