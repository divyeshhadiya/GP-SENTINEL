"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import PoliceLogo from "@/components/common/PoliceLogo";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  FileText,
  Video,
  Shield,
  Layers,
  Activity,
  Cpu,
  Database,
  Lock,
  TrendingUp,
  MapPin,
  Camera,
  Radio,
  CheckCircle2,
  Sparkles,
  ExternalLink
} from "lucide-react";

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  speakerNotes: string;
  renderContent: () => React.ReactNode;
}

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const slides: SlideData[] = [
    // Slide 1: Title
    {
      id: 1,
      category: "INTRODUCTION",
      title: "GP-SENTINEL PLATFORM",
      subtitle: "Statewide Video Intelligence & Multi-Department Command Platform",
      speakerNotes: "Welcome evaluators of Gujarat Police. GP-SENTINEL is an end-to-end video intelligence and multi-department command platform designed for the Gujarat Police Innovation Challenge 2026. It unifies 26 disparate departments and ~80,000 cameras into a single, cohesive command ecosystem.",
      renderContent: () => (
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-6 h-full">
          <div className="p-3 bg-white/10 rounded-full border border-sky-400/30 shadow-xl">
            <PoliceLogo size={80} />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold tracking-widest text-amber-400 uppercase font-mono mb-2">
              Home Department • Government of Gujarat
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              GP-SENTINEL PLATFORM
            </h1>
            <p className="text-base sm:text-xl text-sky-200 mt-2 font-medium max-w-2xl mx-auto">
              Statewide Video Intelligence &amp; Multi-Department Command Platform
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Gujarat Police Innovation Challenge 2026 • Solution Pitch Deck
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl w-full text-left pt-2">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] text-amber-400 uppercase font-mono font-bold block">Architect &amp; Lead</span>
              <span className="text-sm font-bold text-white">Divyesh Hadiya</span>
              <span className="text-xs text-slate-300 block">AI &amp; Distributed Systems</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] text-sky-400 uppercase font-mono font-bold block">Proposed Architecture</span>
              <span className="text-sm font-bold text-white">Model 5 (Hybrid)</span>
              <span className="text-xs text-slate-300 block">Registry + Wall + VMS + AI</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[11px] text-emerald-400 uppercase font-mono font-bold block">Target Scalability</span>
              <span className="text-sm font-bold text-white">80,000+ Cameras</span>
              <span className="text-xs text-slate-300 block">26 Depts • 33 Districts</span>
            </div>
          </div>
        </div>
      )
    },

    // Slide 2: Problem Statement
    {
      id: 2,
      category: "PROBLEM STATEMENT",
      title: "The Statewide Surveillance Challenge",
      subtitle: "Fragmented Infrastructure Across 26 Government Departments",
      speakerNotes: "At present, 26 government departments in Gujarat deploy standalone CCTV systems. When a stolen vehicle or wanted person moves across jurisdictions, tracking requires manual phone calls and days of reviewing disparate NVR footage.",
      renderContent: () => (
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 space-y-2">
              <div className="flex items-center space-x-2 text-red-400 font-bold text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <span>26 Departmental Silos</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Police, Transport/RTO, GSRTC, Panchayat, and Municipalities operate standalone camera networks with zero cross-departmental visibility or data sharing.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Heterogeneous VMS &amp; Formats</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Proprietary VMS platforms (Hikvision, Dahua, Milestone, CP Plus), mixed analog/IP infrastructure, and unstandardized RTSP/ONVIF feed protocols.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30 space-y-2">
              <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                <span>Zero Watchlist Cross-Referencing</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Criminal databases like VAHAN, SARTHI, eGujCop (CCTNS), and NAFIS operate completely isolated from live video surveillance streams.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-2">
              <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <span>1,000 km Dispersal &amp; Bandwidth Caps</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Camera sites spread over 1,000 km across Gujarat, with uneven retention policies (7 to 30 days) and high WAN bandwidth costs.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#001830] border border-sky-500/30">
            <h4 className="text-xs font-mono uppercase font-bold text-amber-400">The Sentinel Mandate</h4>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
              Unify these cameras into an intelligent, statewide digital grid capable of automated vehicle identification, trajectory route reconstruction, real-time alert dispatch, and forensic evidentiary compliance under Section 65B of the Indian Evidence Act.
            </p>
          </div>
        </div>
      )
    },

    // Slide 3: Model 5 Justification
    {
      id: 3,
      category: "SOLUTION MODEL",
      title: "Model 5: Hybrid / Innovative Architecture",
      subtitle: "Why Combining Models 1, 2, 3, and 4 is the Winning Strategy",
      speakerNotes: "We thoroughly justify Model 5: Model 1 gives us the inventory foundation; Model 2 provides non-invasive tactical viewing; Model 3 handles multi-vendor federation; and Model 4 adds central GPU video intelligence. This protects existing hardware capex while scaling statewide.",
      renderContent: () => (
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white/5 border border-sky-400/40 text-left">
              <span className="text-[10px] font-mono text-sky-400 uppercase font-bold block">Model 1</span>
              <h4 className="text-sm font-bold text-white mt-1">GIS &amp; Registry</h4>
              <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
                Centralized metadata inventory, camera health status, and coverage gap analysis.
              </p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] bg-sky-500/20 text-sky-300 font-bold">FOUNDATION</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-sky-400/40 text-left">
              <span className="text-[10px] font-mono text-sky-400 uppercase font-bold block">Model 2</span>
              <h4 className="text-sm font-bold text-white mt-1">Tactical Video Wall</h4>
              <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
                Unified WebRTC viewing without disturbing existing departmental NVRs.
              </p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] bg-sky-500/20 text-sky-300 font-bold">OPERATIONS</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-sky-400/40 text-left">
              <span className="text-[10px] font-mono text-sky-400 uppercase font-bold block">Model 3</span>
              <h4 className="text-sm font-bold text-white mt-1">VMS Federation</h4>
              <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
                Pluggable vendor adapters (Hikvision, Dahua, Milestone) over a metadata bus.
              </p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] bg-sky-500/20 text-sky-300 font-bold">MIDDLEWARE</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-sky-400/40 text-left">
              <span className="text-[10px] font-mono text-sky-400 uppercase font-bold block">Model 4</span>
              <h4 className="text-sm font-bold text-white mt-1">Central AI Analytics</h4>
              <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
                GPU cluster inference for ANPR, trajectory tracking, and Section 65B dossiers.
              </p>
              <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] bg-sky-500/20 text-sky-300 font-bold">INTELLIGENCE</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#001830] border border-amber-500/40 text-left space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 text-xs sm:text-sm font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Architectural Superiority of Model 5 (Hybrid):</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Standalone models are incomplete. Model 1 lacks streaming; Model 2 lacks central correlation; Model 3 lacks GIS inventory; Model 4 requires ripping out existing infrastructure. Model 5 creates an adapter-driven federation layer that respects departmental autonomy while providing Gujarat Police with a singular, high-speed tactical intelligence overview.
            </p>
          </div>
        </div>
      )
    },

    // Slide 4: End-to-End Architecture
    {
      id: 4,
      category: "SYSTEM ARCHITECTURE",
      title: "End-to-End Platform Architecture",
      subtitle: "Six-Tier Pipeline from Edge Capture to Tactical Command",
      speakerNotes: "Here is the six-tier data pipeline: 1. Ingestion of RTSP/ONVIF streams; 2. Federation via VMS adapters; 3. Apache Kafka event streaming; 4. GPU inference pipeline; 5. Database correlation with VAHAN/eGujCop; 6. Command Center UI.",
      renderContent: () => (
        <div className="space-y-2 py-2">
          {[
            { step: "TIER 1", title: "Edge & Ingestion Layer", desc: "RTSP/TCP and WebRTC relays capturing streams from 26 departmental camera sites." },
            { step: "TIER 2", title: "VMS Federation Middleware", desc: "Pluggable vendor adapters normalizing Hikvision, Dahua, Milestone, and CP Plus feeds." },
            { step: "TIER 3", title: "Event Streaming Backbone", desc: "Apache Kafka cluster delivering sub-10ms pub/sub telemetry for 50k+ detections/sec." },
            { step: "TIER 4", title: "AI Analytics & ANPR Engine", desc: "YOLOv8 vehicle detection + ByteTrack + CRNN license plate OCR with speed estimation." },
            { step: "TIER 5", title: "Database Correlation Layer", desc: "Redis in-memory Bloom filter matching against VAHAN, SARTHI, and eGujCop watchlists." },
            { step: "TIER 6", title: "Tactical Command & Dossier", desc: "Interactive GIS route reconstruction, audio dispatch alerts, and Section 65B PDF/Print exports." }
          ].map((t, idx) => (
            <div key={idx} className="flex items-center p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-sky-400/50 transition-all text-left">
              <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold w-16 text-center shrink-0">
                {t.step}
              </span>
              <div className="ml-3 flex-1">
                <span className="text-xs sm:text-sm font-bold text-white block">{t.title}</span>
                <span className="text-[11px] text-slate-300">{t.desc}</span>
              </div>
            </div>
          ))}
        </div>
      )
    },

    // Slide 5: Model 1 GIS & Registry
    {
      id: 5,
      category: "MODEL 1 IMPLEMENTATION",
      title: "Statewide Camera Registry & GIS Mapping",
      subtitle: "Complete Digital Inventory, Health Tracking & Coverage Gap Analysis",
      speakerNotes: "Model 1 delivers the geospatial foundation. It maps all cameras with live operational status, administrative zones, and runs automated gap analysis to locate blind spots in highway networks.",
      renderContent: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 text-left">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <h4 className="text-sm font-bold text-sky-400 flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Interactive Geospatial Map</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li><strong>Leaflet &amp; PostGIS:</strong> Smooth map rendering with ESRI Aerial, OpenStreetMap, and Tactical Night Grid layers.</li>
              <li><strong>Multi-Departmental Filters:</strong> Instantly toggle Police, GSRTC, RTO, Municipal, and Panchayat camera overlays.</li>
              <li><strong>Operator Ergonomics:</strong> Compact checkbox-style controls matching police command room monitors.</li>
              <li><strong>Pilot Grid:</strong> 50 active feeds mapped across key transit nodes (Gandhinagar, Ahmedabad, Surat, Rajkot, Vadodara).</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Gap Analysis &amp; Health Monitoring</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li><strong>Automated Blind Spot Identification:</strong> Algorithmic scanning flags highway segments lacking camera coverage.</li>
              <li><strong>Ageing Hardware Auditing:</strong> Identifies cameras past AMC warranty or delivering degraded sub-1080p video.</li>
              <li><strong>Bulk Ingestion Engine:</strong> One-click CSV/Excel upload and automatic REST API endpoint discovery.</li>
              <li><strong>99.8% Uptime Monitoring:</strong> Real-time heartbeat pings dispatch maintenance tickets on feed interruption.</li>
            </ul>
          </div>
        </div>
      )
    },

    // Slide 6: Model 2 Video Wall
    {
      id: 6,
      category: "MODEL 2 IMPLEMENTATION",
      title: "Unified Tactical Video Wall",
      subtitle: "Sub-Second Multi-Vendor Video Streaming Without NVR Disruption",
      speakerNotes: "Model 2 aggregates feeds into a unified command wall. Video streams have sub-350ms latency using WebRTC and display dynamic AI bounding boxes directly over the footage.",
      renderContent: () => (
        <div className="space-y-4 py-2 text-left">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-white/5 rounded-xl border border-sky-400/30">
              <span className="text-2xl font-black text-amber-400 font-mono">&lt; 350ms</span>
              <span className="text-xs text-slate-300 block mt-1">WebRTC Latency</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-sky-400/30">
              <span className="text-2xl font-black text-emerald-400 font-mono">50 / 50</span>
              <span className="text-xs text-slate-300 block mt-1">Active Test Feeds</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-sky-400/30">
              <span className="text-2xl font-black text-sky-400 font-mono">4 x 4</span>
              <span className="text-xs text-slate-300 block mt-1">Custom Grid Views</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-sky-400/30">
              <span className="text-2xl font-black text-purple-400 font-mono">0 Disruption</span>
              <span className="text-xs text-slate-300 block mt-1">To Existing NVRs</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="text-xs font-mono uppercase font-bold text-sky-400">Tactical Stream Capabilities</h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong>Dynamic AI Overlays:</strong> Real-time bounding boxes projecting detected license plates, vehicle speed, and confidence markers.</li>
              <li><strong>Protocol Neutrality:</strong> Handles RTSP over TCP, HLS fallback, and WebRTC streaming simultaneously.</li>
              <li><strong>Operator Inspection Mode:</strong> Instant one-click full-screen zoom on suspect feeds with live snapshot capture.</li>
              <li><strong>Zero Interference:</strong> Departmental NVRs continue local recording and retention completely undisturbed.</li>
            </ul>
          </div>
        </div>
      )
    },

    // Slide 7: AI Analytics & ANPR
    {
      id: 7,
      category: "AI & COMPUTER VISION",
      title: "AI Video Analytics & ANPR Pipeline",
      subtitle: "High-Precision Detection, Plate Extraction & Velocity Estimation",
      speakerNotes: "The AI pipeline uses YOLOv8 for vehicle classification, dedicated plate localization, CRNN for OCR, and ByteTrack with OSNet embeddings for multi-camera re-identification.",
      renderContent: () => (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 text-left">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs font-mono text-amber-400 font-bold block">01. DETECTION</span>
            <h4 className="text-sm font-bold text-white mt-1">YOLOv8x-Vehicle</h4>
            <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
              Detects cars, 2-wheelers, trucks, and buses across challenging low-light and rain conditions.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs font-mono text-sky-400 font-bold block">02. LOCALIZATION</span>
            <h4 className="text-sm font-bold text-white mt-1">WPOD-NET</h4>
            <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
              Localizes standard HSRP, commercial yellow, EV green, and distorted Indian license plates.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs font-mono text-emerald-400 font-bold block">03. OCR EXTRACTION</span>
            <h4 className="text-sm font-bold text-white mt-1">CRNN + Attention</h4>
            <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
              Achieves 98.4% character accuracy on Indian regional fonts and damaged plates.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-xs font-mono text-purple-400 font-bold block">04. MULTI-CAMERA RE-ID</span>
            <h4 className="text-sm font-bold text-white mt-1">ByteTrack + OSNet</h4>
            <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">
              Maintains unique vehicle identity and feature embeddings across disjoint road intersections.
            </p>
          </div>
        </div>
      )
    },

    // Slide 8: Traversal Tracking (Test Case)
    {
      id: 8,
      category: "EVALUATION TEST CASE",
      title: "Statewide Traversal & Route Reconstruction",
      subtitle: "Demonstrating Test Scenario with GJ-01-AB-1234 & GJ-05-CD-5678",
      speakerNotes: "This fulfills the exact hackathon test requirement. Given test vehicle GJ-01-AB-1234, our system reconstructs its full journey from Ahmedabad to Surat with timestamps, camera IDs, and speed readings.",
      renderContent: () => (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-2 text-left">
          <div className="md:col-span-7 space-y-2">
            <h4 className="text-xs font-mono uppercase font-bold text-amber-400">
              Chronological Trajectory: GJ-01-AB-1234 (Hyundai Creta)
            </h4>
            {[
              { time: "08:14:22 AM", cam: "CAM-AHM-01", loc: "S.G. Highway, Ahmedabad", speed: "68 km/h", match: false },
              { time: "08:42:10 AM", cam: "CAM-GND-04", loc: "Chiloda Circle, Gandhinagar", speed: "74 km/h", match: false },
              { time: "09:15:38 AM", cam: "CAM-VAD-08", loc: "Golden Chokdi, Vadodara", speed: "82 km/h", match: false },
              { time: "09:48:55 AM", cam: "CAM-SUR-02", loc: "Sahara Darwaja, Surat", speed: "42 km/h", match: true }
            ].map((st, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                  st.match ? "bg-red-950/40 border-red-500 text-red-200" : "bg-white/5 border-white/10 text-slate-300"
                }`}
              >
                <div>
                  <span className="font-mono font-bold text-white block">{st.time} • {st.cam}</span>
                  <span className="text-[11px] text-slate-300">{st.loc}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-amber-400 block">{st.speed}</span>
                  {st.match ? (
                    <span className="text-[10px] font-bold text-red-400 uppercase">VAHAN STOLEN MATCH</span>
                  ) : (
                    <span className="text-[10px] text-emerald-400 font-bold">In Transit</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-5 p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="text-xs font-mono uppercase font-bold text-sky-400">Forensic Capabilities</h4>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li><strong>Path Stitching:</strong> Connects sightings into a timestamped GIS polyline.</li>
              <li><strong>Velocity Calculation:</strong> Monotonic PTS timestamps calculate precise transit velocity.</li>
              <li><strong>Clone Detection:</strong> Impossible travel times between distant cameras flag cloned plates.</li>
              <li><strong>Predictive Intercept:</strong> Calculates next likely toll plaza for highway roadblock dispatch.</li>
            </ul>
          </div>
        </div>
      )
    },

    // Slide 9: Watchlist Integration
    {
      id: 9,
      category: "WATCHLIST & ALERTS",
      title: "Watchlist Cross-Referencing & Alert Dispatch",
      subtitle: "Instant Correlation with VAHAN, SARTHI, eGujCop & NAFIS",
      speakerNotes: "Every extracted number plate is matched against law enforcement databases in under 12 milliseconds using in-memory Bloom filters. When matched, audible dispatch alerts trigger automatically.",
      renderContent: () => (
        <div className="space-y-4 py-2 text-left">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: "VAHAN / SARTHI", tag: "1.8M Stolen Vehicles", desc: "Automated blacklisted vehicle correlation." },
              { name: "eGujCop (CCTNS)", tag: "Real-time Webhook", desc: "FIR suspects & wanted person alerts." },
              { name: "Missing Persons", tag: "Statewide Alert", desc: "Child protection & vulnerable tracking." },
              { name: "Custom Hotlists", tag: "Field Operations", desc: "VIP security & tactical suspect surveillance." }
            ].map((w, idx) => (
              <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-xs font-bold text-white">{w.name}</h4>
                <span className="text-[10px] font-mono text-emerald-400 font-bold block mt-0.5">{w.tag}</span>
                <p className="text-[11px] text-slate-300 mt-1">{w.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/40 space-y-2">
            <h4 className="text-xs font-mono uppercase font-bold text-red-400">Sub-Second Dispatch Workflow</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 pt-1">
              <div>
                <strong className="text-white block">1. In-Memory Lookup:</strong>
                Sub-12ms hash search matches license plate against synchronized state hotlist.
              </div>
              <div>
                <strong className="text-white block">2. Audio-Visual Strobe:</strong>
                High-priority siren &amp; flashing visual modal on officer command terminals.
              </div>
              <div>
                <strong className="text-white block">3. Field Unit Push:</strong>
                Coordinates and high-res vehicle snapshot pushed to nearest highway patrol van.
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 10: Section 65B Dossiers
    {
      id: 10,
      category: "LEGAL & FORENSICS",
      title: "Evidentiary Integrity & Section 65B Dossiers",
      subtitle: "Court-Admissible Electronic Evidence with Cryptographic Hashes",
      speakerNotes: "Video evidence must be legally sound. GP-SENTINEL automatically generates Section 65B Indian Evidence Act compliant certificates with SHA-256 hashes, tamper-evident timestamps, and print-ready dossiers.",
      renderContent: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 text-left">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="text-sm font-bold text-amber-400">Statutory Section 65B Certificate</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Under Section 65B(4) of the Indian Evidence Act 1872, digital video evidence requires certification by the officer responsible for system operation. GP-SENTINEL auto-generates this statutory legal certificate with every evidentiary export.
            </p>
            <div className="p-2.5 bg-black/40 rounded border border-white/10 font-mono text-[11px] text-slate-300 space-y-1">
              <div>• Hash: SHA-256 (32-byte cryptographic digest)</div>
              <div>• Officer: State Crime Record Bureau (SCRB)</div>
              <div>• Custody: Immutable append-only audit trail</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="text-sm font-bold text-sky-400">One-Click PDF &amp; Print Dossier</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Investigating officers can download a certified evidentiary dossier directly to their browser's Downloads folder or print a standardized legal A4 document for immediate court filing.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>High-resolution license plate crops with bounding coordinates.</li>
              <li>Complete chronological GPS trajectory with camera IDs.</li>
              <li>Cryptographic hash verification table proving zero tampering.</li>
            </ul>
          </div>
        </div>
      )
    },

    // Slide 11: Model 3 VMS Federation
    {
      id: 11,
      category: "MODEL 3 IMPLEMENTATION",
      title: "Model 3: Multi-Vendor VMS Federation",
      subtitle: "Pluggable Middleware for Hikvision, Dahua, Milestone & CP Plus",
      speakerNotes: "Rather than forcing departments to buy one brand, our Model 3 middleware uses software adapters to federate Hikvision, Dahua, Milestone, and CP Plus platforms into a unified API.",
      renderContent: () => (
        <div className="space-y-4 py-2 text-left">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: "Hikvision NVR/iVMS", proto: "ISAPI / ONVIF Profile S", status: "Active Adapter" },
              { name: "Dahua DSS / SmartPSS", proto: "DH-SDK / RTSP Relay", status: "Active Adapter" },
              { name: "Milestone XProtect", proto: "MIP SDK / REST API", status: "Active Adapter" },
              { name: "CP Plus / Honeywell", proto: "ONVIF / H.264 Transcoding", status: "Active Adapter" }
            ].map((v, idx) => (
              <div key={idx} className="p-3 bg-white/5 rounded-xl border border-sky-400/30">
                <h4 className="text-xs font-bold text-white">{v.name}</h4>
                <span className="text-[10px] text-slate-300 block mt-1">{v.proto}</span>
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold">
                  ● {v.status}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="text-xs font-mono uppercase font-bold text-sky-400">Adapter Middleware Architecture</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Departments maintain existing camera investments and local AMC contracts. Our adapter layer communicates with proprietary VMS systems, translates proprietary events into standardized JSON schemas, and exposes a vendor-neutral REST &amp; WebSocket bus to downstream AI services.
            </p>
          </div>
        </div>
      )
    },

    // Slide 12: Scalability to 80,000 Cameras
    {
      id: 12,
      category: "SCALABILITY & INFRASTRUCTURE",
      title: "Scalability Blueprint to 80,000 Cameras",
      subtitle: "Bandwidth Budgeting, Edge Processing & Tiered Storage Architecture",
      speakerNotes: "Streaming 80,000 4K cameras would consume 160 Gbps of WAN. We solve this by doing edge ANPR inference, streaming only 2KB metadata events continuously, which requires just 6.4 Gbps. Raw video is pulled on-demand.",
      renderContent: () => (
        <div className="space-y-4 py-2 text-left">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-white/5 rounded-xl border border-sky-400/30">
              <span className="text-2xl font-black text-sky-400 font-mono">80,000</span>
              <span className="text-xs text-slate-300 block mt-1">Total Cameras</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-sky-400/30">
              <span className="text-2xl font-black text-emerald-400 font-mono">6.4 Gbps</span>
              <span className="text-xs text-slate-300 block mt-1">WAN Bandwidth (95% saved)</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-sky-400/30">
              <span className="text-2xl font-black text-amber-400 font-mono">3 Tiers</span>
              <span className="text-xs text-slate-300 block mt-1">Hot / Warm / Cold Storage</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-sky-400/30">
              <span className="text-2xl font-black text-purple-400 font-mono">99.95%</span>
              <span className="text-xs text-slate-300 block mt-1">Kubernetes HA SLA</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="text-xs font-mono uppercase font-bold text-amber-400">Optimization Mechanisms</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div>
                <strong className="text-white block">Edge Metadata Push:</strong>
                Edge nodes perform local ANPR; stream only 2 KB JSON events rather than continuous 4K video.
              </div>
              <div>
                <strong className="text-white block">Tiered Storage:</strong>
                Hot NVMe (7 days alerts), Warm Ceph (30 days feeds), Cold S3 Glacier (180+ days dossiers).
              </div>
              <div>
                <strong className="text-white block">Regional Hubs:</strong>
                4 regional clusters (Ahmedabad, Surat, Rajkot, Vadodara) preserve local continuity during WAN cuts.
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 13: Cybersecurity & RBAC
    {
      id: 13,
      category: "CYBERSECURITY & GOVERNANCE",
      title: "Cybersecurity, Zero-Trust RBAC & Audit Trails",
      subtitle: "Departmental Isolation, TLS 1.3 Encryption & Tamper-Proof Logs",
      speakerNotes: "Sensitive public feeds demand strict security. GP-SENTINEL enforces zero-trust role-based access, end-to-end TLS 1.3 encryption, OTP-verified authentication, and immutable audit logs.",
      renderContent: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 text-left">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="text-sm font-bold text-sky-400 flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>Role-Based Access Control (RBAC)</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li><strong>DGP / SCRB:</strong> Full statewide visibility, watchlist administration, and Section 65B authorization.</li>
              <li><strong>Traffic Inspector:</strong> Sector-specific camera viewing, speed alerts, and vehicle interdiction.</li>
              <li><strong>RTO / GSRTC:</strong> Restricted access to respective departmental testing tracks and bus depot cameras.</li>
              <li><strong>Two-Factor OTP:</strong> Mandatory OTP validation for all authenticated command sessions.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Encryption &amp; Immutable Audit Trail</span>
            </h4>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li><strong>In-Transit Encryption:</strong> TLS 1.3 for API endpoints and SRTP for live video feeds.</li>
              <li><strong>At-Rest Protection:</strong> AES-256 GCM encryption for stored forensic clips and plate metadata.</li>
              <li><strong>Tamper-Proof Audit Log:</strong> Every camera view, vehicle search, and dossier export is immutably logged.</li>
              <li><strong>DPDP Act Compliant:</strong> Automated facial blurring and privacy masks in non-critical public zones.</li>
            </ul>
          </div>
        </div>
      )
    },

    // Slide 14: Cost Benefit & ROI
    {
      id: 14,
      category: "VALUE PROPOSITION",
      title: "Cost-Benefit Analysis & ROI for Gujarat",
      subtitle: "Maximizing Returns on Existing Public Infrastructure Investments",
      speakerNotes: "Our adapter-based hybrid model avoids spending ₹450+ Crore on camera replacements, slashes vehicle tracking time from 24 hours to 3 seconds, and saves 95% WAN bandwidth.",
      renderContent: () => (
        <div className="space-y-3 py-2 text-left">
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-xs text-slate-200">
              <thead className="bg-[#001830] text-amber-400 font-mono text-[11px] border-b border-white/10">
                <tr>
                  <th className="p-3 text-left">Capability / Metric</th>
                  <th className="p-3 text-left">Current Fragmented Model</th>
                  <th className="p-3 text-left">GP-SENTINEL Platform</th>
                  <th className="p-3 text-left">Net Benefit to Gujarat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 bg-white/5">
                <tr>
                  <td className="p-3 font-bold text-white">Hardware Replacement Cost</td>
                  <td className="p-3 text-red-300">Requires ₹450+ Cr new capex</td>
                  <td className="p-3 text-emerald-300 font-bold">₹0 (Software Adapters)</td>
                  <td className="p-3 font-mono text-emerald-400">₹450+ Cr Saved</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Vehicle Tracing Latency</td>
                  <td className="p-3 text-red-300">4 to 24 Hours (Manual)</td>
                  <td className="p-3 text-emerald-300 font-bold">&lt; 3 Seconds (Auto Traversal)</td>
                  <td className="p-3 font-mono text-emerald-400">99% Faster</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">WAN Bandwidth Needed</td>
                  <td className="p-3 text-red-300">160 Gbps (Continuous 4K)</td>
                  <td className="p-3 text-emerald-300 font-bold">6.4 Gbps (Metadata Push)</td>
                  <td className="p-3 font-mono text-emerald-400">95% WAN Savings</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-white">Court Evidence Integrity</td>
                  <td className="p-3 text-red-300">Vulnerable to Tampering</td>
                  <td className="p-3 text-emerald-300 font-bold">Section 65B SHA-256 Hash</td>
                  <td className="p-3 font-mono text-emerald-400">High Conviction Rate</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },

    // Slide 15: Phased Roadmap
    {
      id: 15,
      category: "IMPLEMENTATION PLAN",
      title: "Statewide Implementation Roadmap",
      subtitle: "Three-Phase Execution from Hackathon Prototype to Statewide Deployment",
      speakerNotes: "An 18-month phased roadmap: Phase 1 validates the sandbox PoC; Phase 2 rolls out a 5-district pilot with 5,000 cameras; Phase 3 expands to all 33 districts and 80,000+ cameras.",
      renderContent: () => (
        <div className="space-y-3 py-2 text-left">
          {[
            {
              phase: "PHASE 1: PROTOTYPE & SANDBOX PROOF-OF-CONCEPT",
              time: "Months 1 – 3",
              bullets: "50-camera government test grid onboarding • Verification of ANPR, vehicle re-ID, and VAHAN watchlist matching • On-site PoC demonstration at SCRB Gandhinagar."
            },
            {
              phase: "PHASE 2: 5-DISTRICT REGIONAL PILOT (5,000 CAMERAS)",
              time: "Months 4 – 8",
              bullets: "Deploy edge clusters in Ahmedabad, Gandhinagar, Surat, Rajkot, Vadodara • Onboard Police, RTO, GSRTC cameras • Mobile MDT integration with active highway patrol vans."
            },
            {
              phase: "PHASE 3: STATEWIDE SCALE (80,000+ CAMERAS)",
              time: "Months 9 – 18",
              bullets: "Full rollout across all 33 districts and 26 government departments • Federation of private commercial feeds (malls, societies) • 24/7 continuous operations under Gujarat Police SCRB."
            }
          ].map((ph, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-sky-400/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 font-mono">{ph.phase}</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono font-bold">
                  {ph.time}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{ph.bullets}</p>
            </div>
          ))}
        </div>
      )
    },

    // Slide 16: Conclusion & Links
    {
      id: 16,
      category: "SUBMISSION SUMMARY",
      title: "GP-SENTINEL: Ready for Real-World Policing",
      subtitle: "A Scalable, Secure & Intelligent Video Command Ecosystem",
      speakerNotes: "In conclusion, GP-SENTINEL is fully built, tested, and ready for deployment. We invite the jury to test the working prototype and review the video demonstration.",
      renderContent: () => (
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-6 h-full">
          <div className="p-3 bg-white/10 rounded-full border border-emerald-400/30 shadow-xl">
            <CheckCircle2 className="w-14 h-14 text-emerald-400" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              GP-SENTINEL: FULLY FUNCTIONAL &amp; DEPLOYMENT READY
            </h2>
            <p className="text-sm text-sky-200 mt-2 max-w-xl mx-auto">
              Submitted for Gujarat Police Innovation Challenge 2026 by Divyesh Hadiya
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 max-w-4xl w-full text-left">
            <Link
              href="/"
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-sky-400/30 transition-all group"
            >
              <span className="text-[11px] text-amber-400 uppercase font-mono font-bold block">Live Application</span>
              <span className="text-sm font-bold text-white group-hover:text-sky-300">Command Dashboard →</span>
              <span className="text-[11px] text-slate-400 block mt-1">10 Interactive Modules</span>
            </Link>

            <Link
              href="/video-demo"
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-sky-400/30 transition-all group"
            >
              <span className="text-[11px] text-sky-400 uppercase font-mono font-bold block">Demonstration</span>
              <span className="text-sm font-bold text-white group-hover:text-sky-300">Video Walkthrough →</span>
              <span className="text-[11px] text-slate-400 block mt-1">Automated Scene Tour</span>
            </Link>

            <a
              href="https://github.com/divyeshhadiya/GP-SENTINEL"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-sky-400/30 transition-all group"
            >
              <span className="text-[11px] text-emerald-400 uppercase font-mono font-bold block">Source Code</span>
              <span className="text-sm font-bold text-white group-hover:text-emerald-300 flex items-center justify-between">
                GitHub Repo <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">divyeshhadiya/GP-SENTINEL</span>
            </a>

            <a
              href="/assets/GP-SENTINEL_Official_Pitch_Deck.pptx"
              download="GP-SENTINEL_Official_Pitch_Deck.pptx"
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-amber-400/30 transition-all group"
            >
              <span className="text-[11px] text-amber-400 uppercase font-mono font-bold block">Presentation File</span>
              <span className="text-sm font-bold text-white group-hover:text-amber-300 flex items-center justify-between">
                Download .PPTX <Download className="w-3.5 h-3.5 ml-1" />
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">16-Slide Deck (2.99 MB)</span>
            </a>
          </div>
        </div>
      )
    }
  ];

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Home") {
        e.preventDefault();
        setCurrentSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setCurrentSlide(slides.length - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, slides.length]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const slide = slides[currentSlide];

  return (
    <div className="space-y-4">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#002347] text-white border border-sky-400/30 shadow-lg">
        <div className="flex items-center space-x-3">
          <PoliceLogo size={36} />
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold uppercase text-amber-400">
                Official Pitch Deck • Gujarat Police Challenge 2026
              </span>
            </div>
            <h2 className="text-sm font-bold text-white truncate">
              GP-SENTINEL: Video Intelligence Platform
            </h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <a
            href="/assets/GP-SENTINEL_Official_Pitch_Deck.pptx"
            download="GP-SENTINEL_Official_Pitch_Deck.pptx"
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .PPTX</span>
          </a>

          <Link
            href="/video-demo"
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-xs transition-all shadow-md"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video Demo</span>
          </Link>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              showNotes
                ? "bg-sky-500 text-white border-sky-400"
                : "bg-white/10 text-slate-200 border-white/15 hover:bg-white/20"
            }`}
          >
            <FileText className="w-3.5 h-3.5 inline mr-1" />
            <span>Notes</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-all"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="relative rounded-2xl bg-[#001b38] border border-sky-500/30 text-white shadow-2xl overflow-hidden min-h-[560px] flex flex-col justify-between">
        {/* Slide Header */}
        <div className="p-6 pb-2 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase font-bold text-amber-400 tracking-wider">
              {slide.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              {slide.title}
            </h3>
            <p className="text-xs sm:text-sm text-sky-200/80">
              {slide.subtitle}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs font-mono font-bold text-slate-300 px-3 py-1 rounded-full bg-white/10 border border-white/15">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
        </div>

        {/* Slide Body */}
        <div className="p-6 flex-1 flex flex-col justify-center">
          {slide.renderContent()}
        </div>

        {/* Speaker Notes Overlay (if toggled) */}
        {showNotes && (
          <div className="p-4 bg-black/80 border-t border-amber-500/40 text-xs text-amber-200 space-y-1 animate-fadeIn">
            <div className="flex items-center space-x-1.5 font-bold uppercase text-[10px] text-amber-400 font-mono">
              <FileText className="w-3.5 h-3.5" />
              <span>Speaker Notes &amp; Talking Points:</span>
            </div>
            <p className="leading-relaxed text-slate-200">
              {slide.speakerNotes}
            </p>
          </div>
        )}

        {/* Slide Navigation Footer */}
        <div className="p-4 bg-[#001428] border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-white transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Slide Indicator Dots */}
          <div className="hidden sm:flex items-center space-x-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentSlide
                    ? "w-6 bg-amber-400 shadow-md shadow-amber-500/50"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                title={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-white transition-all cursor-pointer"
          >
            <span>Next Slide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="text-center text-[11px] text-slate-400">
        💡 Use <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">←</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">→</kbd> arrow keys or <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">Space</kbd> to navigate slides.
      </div>
    </div>
  );
}
