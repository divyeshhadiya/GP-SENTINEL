"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PoliceLogo from "@/components/common/PoliceLogo";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Download,
  FileText,
  Video,
  Shield,
  MapPin,
  Camera,
  Activity,
  AlertTriangle,
  FileCheck,
  Cpu,
  Layers,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface DemoScene {
  id: number;
  title: string;
  duration: number; // in seconds
  department: string;
  camera: string;
  narration: string;
  badgeText: string;
  badgeColor: string;
  renderVisual: () => React.ReactNode;
}

export default function VideoDemoPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0); // 0 to 100
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5 | 2>(1);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: "browser" },
        audio: true
      });
      recordedChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
          ? "video/webm;codecs=vp9,opus"
          : "video/webm"
      });
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "GP-SENTINEL_Official_Demonstration_Video.webm";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setIsRecording(false);
      };
      stream.getVideoTracks()[0].onended = () => {
        if (mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
        }
      };
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setCurrentSceneIndex(0);
      setSceneProgress(0);
      setIsPlaying(true);
    } catch (err) {
      console.warn("Screen recording was canceled or denied by user.", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const scenes: DemoScene[] = [
    // Scene 1: Platform Overview
    {
      id: 1,
      title: "1. Statewide CCTV Ingestion & Command Grid",
      duration: 10,
      department: "Home Department • SCRB Gandhinagar",
      camera: "GRID-CONTROL-01",
      badgeText: "STATE INGEST ONLINE",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      narration: "GP-SENTINEL establishes a statewide unified command grid across Gujarat's 33 districts, ingesting streams from 26 departments with zero hardware disruption.",
      renderVisual: () => (
        <div className="h-full flex flex-col justify-between p-6 bg-[#001830] text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <PoliceLogo size={42} />
              <div>
                <h3 className="text-base font-bold text-white">Gujarat Police SENTINEL Platform</h3>
                <span className="text-xs text-slate-300">State Crime Record Bureau (SCRB) • Operational Command</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xs font-mono text-emerald-400 font-bold">50 / 50 FEEDS ACTIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
            <div className="p-3 rounded-xl bg-white/5 border border-sky-400/30 text-center">
              <span className="text-xs text-slate-400 block font-mono">ONBOARDED CAMERAS</span>
              <span className="text-2xl font-black text-amber-400 font-mono">50 FEEDS</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">5 Pilot Departments</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-sky-400/30 text-center">
              <span className="text-xs text-slate-400 block font-mono">TARGET SCALE</span>
              <span className="text-2xl font-black text-sky-400 font-mono">80,000+</span>
              <span className="text-[10px] text-sky-300 block mt-0.5">Statewide Network</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-sky-400/30 text-center">
              <span className="text-xs text-slate-400 block font-mono">STREAM LATENCY</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">&lt; 350ms</span>
              <span className="text-[10px] text-slate-300 block mt-0.5">Sub-Second WebRTC</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-sky-400/30 text-center">
              <span className="text-xs text-slate-400 block font-mono">ENCRYPTION</span>
              <span className="text-2xl font-black text-purple-400 font-mono">TLS 1.3</span>
              <span className="text-[10px] text-purple-300 block mt-0.5">Zero-Trust Security</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-300">
              Departmental Feeds: <strong>Police HQ</strong>, <strong>GSRTC Bus Portals</strong>, <strong>RTO Highway Checkpoints</strong>, <strong>Municipal Smart Poles</strong>, <strong>Panchayat Tolls</strong>
            </span>
            <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono text-[10px] font-bold">
              READY
            </span>
          </div>
        </div>
      )
    },

    // Scene 2: Model 1 Registry & GIS
    {
      id: 2,
      title: "2. Model 1: Statewide Camera Registry & GIS Mapping",
      duration: 10,
      department: "Transport & Police Surveillance Grid",
      camera: "GIS-ENGINE-01",
      badgeText: "MODEL 1 ACTIVE",
      badgeColor: "bg-sky-500/20 text-sky-400 border-sky-500/40",
      narration: "Model 1 maps every camera with GPS coordinates, operational health, and departmental tags, running automated surveillance gap analysis across highway routes.",
      renderVisual: () => (
        <div className="h-full flex flex-col justify-between p-6 bg-[#001830] text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2 text-sky-400 font-mono font-bold text-xs">
              <MapPin className="w-4 h-4" />
              <span>GEOSPATIAL CAMERA REGISTRY &amp; SENSORS</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300">Default Roads</span>
              <span className="px-2 py-0.5 rounded bg-sky-600 text-white font-bold">ESRI Aerial</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300">Dark Tactical</span>
            </div>
          </div>

          {/* Simulated Map View with Camera Markers */}
          <div className="relative my-3 h-52 rounded-xl bg-[#070c18] border border-white/15 overflow-hidden flex items-center justify-center">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>
            
            {/* Simulated Highway Polyline */}
            <svg className="absolute inset-0 w-full h-full">
              <path
                d="M 80 180 Q 220 80, 360 120 T 640 60"
                fill="none"
                stroke="#0284c7"
                strokeWidth="3"
                strokeDasharray="6 4"
              />
            </svg>

            {/* Camera Nodes */}
            <div className="absolute top-12 right-28 p-2 rounded-lg bg-navy/90 border border-emerald-400 text-white text-[10px] flex items-center space-x-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-mono font-bold">CAM-GND-04 (Gandhinagar Chiloda)</span>
            </div>
            <div className="absolute bottom-10 left-20 p-2 rounded-lg bg-navy/90 border border-sky-400 text-white text-[10px] flex items-center space-x-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              <span className="font-mono font-bold">CAM-AHM-01 (S.G. Highway)</span>
            </div>
            <div className="absolute top-24 left-1/2 p-2 rounded-lg bg-navy/90 border border-amber-400 text-white text-[10px] flex items-center space-x-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="font-mono font-bold">CAM-VAD-08 (Golden Chokdi)</span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between text-xs text-slate-300">
            <span>Automated Gap Report: <strong>0 blind spots</strong> detected on S.G. Highway Corridor</span>
            <span className="text-emerald-400 font-mono font-bold">Uptime 99.8%</span>
          </div>
        </div>
      )
    },

    // Scene 3: Model 2 Video Wall
    {
      id: 3,
      title: "3. Model 2: Unified Tactical Video Wall",
      duration: 10,
      department: "Gujarat Police Unified Video Wall",
      camera: "WALL-MATRIX-04",
      badgeText: "MODEL 2 LIVE",
      badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/40",
      narration: "Model 2 streams multi-vendor cameras into a synchronized tactical matrix with dynamic AI bounding boxes, projecting plates and speeds in real time.",
      renderVisual: () => (
        <div className="h-full flex flex-col justify-between p-6 bg-[#001830] text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center space-x-2 text-amber-400 font-mono font-bold text-xs">
              <Camera className="w-4 h-4" />
              <span>LIVE AI TACTICAL VIDEO WALL (4-CAMERA GRID)</span>
            </div>
            <span className="text-xs font-mono text-slate-400">FPS: 25.0 • WebRTC TCP</span>
          </div>

          {/* 4-Camera Video Grid Simulation */}
          <div className="grid grid-cols-2 gap-2.5 my-2">
            {[
              { id: "CAM-01", name: "Ahmedabad S.G. Highway", plate: "GJ-01-AB-1234", speed: "68 km/h", alert: true },
              { id: "CAM-04", name: "Gandhinagar Chiloda", plate: "GJ-18-BQ-9921", speed: "52 km/h", alert: false },
              { id: "CAM-08", name: "Vadodara Express Toll", plate: "GJ-06-TR-4401", speed: "78 km/h", alert: false },
              { id: "CAM-02", name: "Surat Sahara Darwaja", plate: "GJ-05-CD-5678", speed: "55 km/h", alert: false }
            ].map((feed, idx) => (
              <div
                key={idx}
                className={`relative h-28 rounded-lg bg-[#070c18] border p-2 flex flex-col justify-between overflow-hidden ${
                  feed.alert ? "border-red-500 shadow-lg shadow-red-500/20" : "border-white/15"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">{feed.id} • {feed.name}</span>
                  {feed.alert ? (
                    <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-bold animate-pulse">ALERT</span>
                  ) : (
                    <span className="text-emerald-400">● LIVE</span>
                  )}
                </div>

                {/* Simulated AI Bounding Box */}
                <div className="self-center my-auto p-1.5 rounded border border-amber-400 bg-amber-500/10 text-center font-mono">
                  <span className="text-xs font-bold text-white block">{feed.plate}</span>
                  <span className="text-[9px] text-amber-300">{feed.speed} • Conf: 98.4%</span>
                </div>

                <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono">
                  <span>H.264 • 1080p</span>
                  <span>PTS Monotonic</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 rounded bg-black/40 border border-white/10 text-xs text-slate-300 flex items-center justify-between">
            <span>Dynamic AI overlays localize license plates &amp; compute real-time velocity</span>
            <span className="text-amber-400 font-mono font-bold">OCR 98.4% Accuracy</span>
          </div>
        </div>
      )
    },

    // Scene 4: Test Case Vehicle Traversal
    {
      id: 4,
      title: "4. Test Case: Vehicle Traversal (GJ-01-AB-1234)",
      duration: 12,
      department: "Statewide Crime Tracking Unit",
      camera: "ANPR-TRAVERSAL-01",
      badgeText: "TEST SCENARIO PASS",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      narration: "During evaluation, test vehicle GJ-01-AB-1234 is identified across Ahmedabad, Gandhinagar, Vadodara, and Surat, reconstructing its exact chronological route.",
      renderVisual: () => (
        <div className="h-full flex flex-col justify-between p-6 bg-[#001830] text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Official Evaluation Scenario</span>
              <h3 className="text-sm font-bold text-white">Target Vehicle: GJ-01-AB-1234 (Hyundai Creta)</h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-red-600 text-white font-mono font-bold text-xs animate-pulse">
              VAHAN STOLEN MATCH
            </span>
          </div>

          {/* Chronological Traversal Timeline */}
          <div className="space-y-2 my-2">
            {[
              { time: "08:14:22", cam: "CAM-AHM-01", loc: "S.G. Highway, Ahmedabad", speed: "68 km/h", status: "In Transit" },
              { time: "08:42:10", cam: "CAM-GND-04", loc: "Chiloda Circle, Gandhinagar", speed: "74 km/h", status: "In Transit" },
              { time: "09:15:38", cam: "CAM-VAD-08", loc: "Golden Chokdi, Vadodara", speed: "82 km/h", status: "In Transit" },
              { time: "09:48:55", cam: "CAM-SUR-02", loc: "Sahara Darwaja, Surat", speed: "42 km/h", status: "MATCH DETECTED" }
            ].map((pt, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                  idx === 3 ? "bg-red-950/50 border-red-500 text-red-200" : "bg-white/5 border-white/10 text-slate-300"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-amber-400 font-bold">{pt.time}</span>
                  <div>
                    <strong className="text-white block">{pt.cam} • {pt.loc}</strong>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-slate-300 mr-3">{pt.speed}</span>
                  <span className={`font-bold ${idx === 3 ? "text-red-400" : "text-emerald-400"}`}>
                    {pt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 rounded bg-black/40 border border-white/10 text-xs text-slate-300 flex items-center justify-between">
            <span>Route traversed: <strong>265 km across 4 districts</strong> with sub-second camera correlation</span>
            <span className="text-emerald-400 font-mono font-bold">100% Sequence Matched</span>
          </div>
        </div>
      )
    },

    // Scene 5: Watchlist Correlation & Alert Dispatch
    {
      id: 5,
      title: "5. Real-Time Watchlist Correlation & Alert Dispatch",
      duration: 10,
      department: "SCRB Automated Dispatch Console",
      camera: "DISPATCH-CORE-01",
      badgeText: "PRIORITY ALERT",
      badgeColor: "bg-red-500/20 text-red-400 border-red-500/40",
      narration: "Detections are cross-referenced in under 12ms against VAHAN and eGujCop databases, triggering audio alerts and pushing GPS coordinates to police patrol vans.",
      renderVisual: () => (
        <div className="h-full flex flex-col justify-between p-6 bg-[#001830] text-white">
          <div className="flex items-center justify-between border-b border-red-500/30 pb-2">
            <div className="flex items-center space-x-2 text-red-400 font-mono font-bold text-xs">
              <AlertTriangle className="w-4 h-4 animate-bounce" />
              <span>HIGH-PRIORITY WATCHLIST DISPATCH TRIGGERED</span>
            </div>
            <span className="text-xs font-mono text-slate-300">Lookup Latency: 11.4 ms</span>
          </div>

          <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/60 my-2 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-red-300 font-mono">STOLEN VEHICLE ALERT (FIR #392/2026)</span>
                <h4 className="text-lg font-black text-white font-mono">GJ-01-AB-1234 • White Hyundai Creta</h4>
              </div>
              <span className="px-3 py-1 bg-red-600 text-white rounded font-bold text-xs animate-pulse">
                ACTION REQUIRED
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs text-slate-200">
              <div className="p-2 bg-black/40 rounded border border-white/10">
                <span className="text-[10px] text-slate-400 block font-mono">LAST SIGHTING</span>
                <span className="font-bold">Sahara Darwaja, Surat</span>
              </div>
              <div className="p-2 bg-black/40 rounded border border-white/10">
                <span className="text-[10px] text-slate-400 block font-mono">ESTIMATED SPEED</span>
                <span className="font-bold text-amber-400 font-mono">42 km/h Heading South</span>
              </div>
              <div className="p-2 bg-black/40 rounded border border-white/10">
                <span className="text-[10px] text-slate-400 block font-mono">DISPATCH STATUS</span>
                <span className="font-bold text-emerald-400">PCR Van #12 Notified</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded bg-black/40 border border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-300">Broadcast sent to: <strong>Surat Police Control Room</strong> &amp; <strong>Kamrej Toll Plaza</strong></span>
            <span className="text-red-400 font-mono font-bold">AUDIO DISPATCH ACTIVE</span>
          </div>
        </div>
      )
    },

    // Scene 6: Section 65B Dossier
    {
      id: 6,
      title: "6. Section 65B Certified Forensic Evidentiary Dossier",
      duration: 10,
      department: "Legal & Forensic Documentation Unit",
      camera: "FORENSIC-CERT-01",
      badgeText: "COURT ADMISSIBLE",
      badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      narration: "GP-SENTINEL automatically generates Section 65B Indian Evidence Act compliant certificates with SHA-256 cryptographic hashes, ready for PDF download or print.",
      renderVisual: () => (
        <div className="h-full flex flex-col justify-between p-6 bg-[#001830] text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center space-x-2 text-amber-400 font-mono font-bold text-xs">
              <FileCheck className="w-4 h-4" />
              <span>STATUTORY SECTION 65B EVIDENTIARY DOSSIER</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">SHA-256 VERIFIED</span>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/15 my-2 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Certified Electronic Evidentiary Certificate</h4>
                <p className="text-xs text-slate-300">Under Section 65B(4) of the Indian Evidence Act, 1872</p>
              </div>
              <div className="text-right text-xs font-mono text-slate-400">
                <span>Dossier ID: <strong>DOS-2026-GJ01AB1234</strong></span>
              </div>
            </div>

            <div className="p-3 bg-black/50 rounded-lg border border-white/10 font-mono text-[11px] text-slate-300 space-y-1">
              <div>• Hash: <span className="text-amber-400">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span></div>
              <div>• Custody: State Crime Record Bureau (SCRB) • Digital Police System</div>
              <div>• Integrity: Zero post-capture tampering verified by automated checksum</div>
            </div>

            <div className="flex items-center space-x-3 pt-1">
              <span className="px-3 py-1.5 rounded-lg bg-sky-600 text-white font-bold text-xs flex items-center space-x-1.5">
                <Download className="w-3.5 h-3.5" />
                <span>Downloaded to Browser Downloads Folder</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/10 text-slate-300 text-xs font-bold">
                A4 Legal Print Layout Verified
              </span>
            </div>
          </div>

          <div className="p-2 rounded bg-black/40 border border-white/10 text-xs text-slate-300 flex items-center justify-between">
            <span>Standardized forensic package ready for judicial magistrate filing</span>
            <span className="text-emerald-400 font-mono font-bold">Indian Evidence Act Compliant</span>
          </div>
        </div>
      )
    },

    // Scene 7: Model 3 VMS Federation
    {
      id: 7,
      title: "7. Model 3: Multi-Vendor VMS Federation Middleware",
      duration: 10,
      department: "Middleware Integration Bus",
      camera: "VMS-GATEWAY-01",
      badgeText: "MODEL 3 ACTIVE",
      badgeColor: "bg-sky-500/20 text-sky-400 border-sky-500/40",
      narration: "Model 3 bridges legacy systems. Proprietary streams from Hikvision, Dahua, Milestone, and CP Plus are normalized through software adapters without replacing cameras.",
      renderVisual: () => (
        <div className="h-full flex flex-col justify-between p-6 bg-[#001830] text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center space-x-2 text-sky-400 font-mono font-bold text-xs">
              <Layers className="w-4 h-4" />
              <span>HETEROGENEOUS VMS ADAPTER MATRIX</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">4 ADAPTERS CONNECTED</span>
          </div>

          <div className="grid grid-cols-2 gap-3 my-2">
            {[
              { vendor: "Hikvision iVMS/NVR", proto: "ISAPI / ONVIF Profile S", delay: "42 ms", status: "Active" },
              { vendor: "Dahua DSS / SmartPSS", proto: "DH-SDK Protocol Relay", delay: "38 ms", status: "Active" },
              { vendor: "Milestone XProtect", proto: "MIP SDK Event Webhook", delay: "51 ms", status: "Active" },
              { vendor: "CP Plus / Honeywell", proto: "ONVIF / H.264 Transcoder", delay: "46 ms", status: "Active" }
            ].map((ad, idx) => (
              <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{ad.vendor}</h4>
                  <span className="text-[10px] text-slate-400 font-mono block">{ad.proto}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-400 font-mono font-bold block">● {ad.status}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{ad.delay}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300">
            <strong>Key Benefit:</strong> Saves ₹450+ Crore across Gujarat by federating existing hardware through software adapters rather than replacing 80,000 deployed cameras.
          </div>
        </div>
      )
    },

    // Scene 8: 80,000 Scalability & Conclusion
    {
      id: 8,
      title: "8. Statewide Scalability to 80,000 Cameras & Deployment",
      duration: 10,
      department: "Statewide Infrastructure & Summary",
      camera: "SCALE-CORE-01",
      badgeText: "80k READY",
      badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/40",
      narration: "By pushing lightweight metadata from edge nodes, GP-SENTINEL saves 95% of state WAN bandwidth, enabling seamless scaling to 80,000 cameras across Gujarat.",
      renderVisual: () => (
        <div className="h-full flex flex-col justify-between p-6 bg-[#001830] text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center space-x-2 text-purple-400 font-mono font-bold text-xs">
              <Cpu className="w-4 h-4" />
              <span>SCALE TO 80,000 CAMERAS • BANDWIDTH OPTIMIZATION</span>
            </div>
            <span className="text-xs font-mono text-amber-400 font-bold">READY FOR DEPLOYMENT</span>
          </div>

          <div className="grid grid-cols-3 gap-3 my-2 text-center">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 font-mono block">RAW 4K WAN LOAD</span>
              <span className="text-xl font-bold text-red-400 font-mono line-through">160 Gbps</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Unscalable</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-emerald-400/40">
              <span className="text-[10px] text-slate-400 font-mono block">OPTIMIZED LOAD</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">6.4 Gbps</span>
              <span className="text-[10px] text-emerald-400 block mt-0.5">95% WAN Saved</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 font-mono block">RECOVERY RATE</span>
              <span className="text-xl font-bold text-sky-400 font-mono">&gt; 65%</span>
              <span className="text-[10px] text-sky-300 block mt-0.5">Automated Intercept</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#002347] border border-amber-500/40 text-center space-y-1">
            <h4 className="text-sm font-bold text-white">GP-SENTINEL: Gujarat Police Innovation Challenge 2026</h4>
            <p className="text-xs text-sky-200">
              Submitted by <strong>Divyesh Hadiya</strong> • Fully Functional Prototype Live on <strong>localhost:3000</strong>
            </p>
          </div>
        </div>
      )
    }
  ];

  // Timer for scene progression
  useEffect(() => {
    if (!isPlaying) return;

    const currentScene = scenes[currentSceneIndex];
    const totalDurationMs = (currentScene.duration * 1000) / playbackSpeed;
    const intervalMs = 100;
    const increment = (intervalMs / totalDurationMs) * 100;

    const timer = setInterval(() => {
      setSceneProgress((prev) => {
        if (prev >= 100) {
          // Advance to next scene
          if (currentSceneIndex < scenes.length - 1) {
            setCurrentSceneIndex((s) => s + 1);
            return 0;
          } else {
            // Loop back or pause
            setIsPlaying(false);
            return 100;
          }
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, currentSceneIndex, playbackSpeed, scenes]);

  const handleNextScene = () => {
    if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
      setSceneProgress(0);
    }
  };

  const handlePrevScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex((prev) => prev - 1);
      setSceneProgress(0);
    }
  };

  const handleRestart = () => {
    setCurrentSceneIndex(0);
    setSceneProgress(0);
    setIsPlaying(true);
  };

  const scene = scenes[currentSceneIndex];

  return (
    <div className="space-y-4">
      {/* Top Header & Deliverable Links */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#002347] text-white border border-sky-400/30 shadow-lg">
        <div className="flex items-center space-x-3">
          <PoliceLogo size={36} />
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold uppercase text-amber-400">
                Official Sentinel 2026 Video Demonstration
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${isRecording ? "bg-red-600 text-white animate-pulse" : "bg-emerald-600 text-white"}`}>
                {isRecording ? "● RECORDING TO FILE" : "TOUR READY"}
              </span>
            </div>
            <h2 className="text-sm font-bold text-white truncate">
              Guided Operational Tour • 8 Core Intelligence Scenes
            </h2>
          </div>
        </div>

        {/* Action Downloads */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* 1-Click Screen Record & Download Button */}
          {isRecording ? (
            <button
              onClick={stopRecording}
              className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs transition-all shadow-md animate-pulse cursor-pointer flex-1 sm:flex-initial min-h-[36px]"
            >
              <div className="w-2.5 h-2.5 bg-white rounded-xs"></div>
              <span>Stop &amp; Save (.webm)</span>
            </button>
          ) : (
            <button
              onClick={startRecording}
              className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-red-600/90 hover:bg-red-600 text-white font-bold rounded-lg text-xs transition-all shadow-md cursor-pointer flex-1 sm:flex-initial min-h-[36px]"
              title="Record the guided tour directly to a downloadable video file"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></div>
              <span>Record Video</span>
            </button>
          )}

          {/* Direct PPTX Download Button */}
          <a
            href="/GP-SENTINEL_Official_Pitch_Deck.pptx"
            download="GP-SENTINEL_Official_Pitch_Deck.pptx"
            className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-md cursor-pointer flex-1 sm:flex-initial min-h-[36px]"
            title="Download the official 16-slide presentation file (.pptx)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .PPTX</span>
          </a>

          {/* Direct JSON Report Download Button */}
          <a
            href="/DETECTION_OUTPUT_REPORT.json"
            download="DETECTION_OUTPUT_REPORT.json"
            className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-all shadow-md cursor-pointer flex-1 sm:flex-initial min-h-[36px]"
            title="Download the mandated official vehicle detection output report (.json)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Report (.JSON)</span>
          </a>

          {/* Link to Interactive Slide Deck */}
          <Link
            href="/presentation"
            className="flex items-center justify-center space-x-1.5 px-3 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg text-xs transition-all shadow-md flex-1 sm:flex-initial min-h-[36px]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Open Slides</span>
          </Link>
        </div>
      </div>

      {/* Main Video Demo Screen Player */}
      <div className="relative rounded-2xl bg-black border border-sky-500/40 text-white shadow-2xl overflow-hidden min-h-[500px] flex flex-col justify-between">
        
        {/* Top Video Feed Header Banner */}
        <div className="p-3 bg-[#001428] border-b border-white/10 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-slate-300 uppercase">{scene.camera} • {scene.department}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${scene.badgeColor}`}>
              {scene.badgeText}
            </span>
            <span className="text-slate-400">
              SCENE {currentSceneIndex + 1} / {scenes.length}
            </span>
          </div>
        </div>

        {/* Video Canvas Body */}
        <div className="flex-1 relative overflow-hidden">
          {scene.renderVisual()}
        </div>

        {/* Subtitles / Narrator Caption Bar */}
        <div className="p-3.5 bg-black/90 border-t border-white/15 text-center">
          <div className="flex items-center justify-center space-x-2 text-amber-400 text-xs font-mono font-bold uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Narrator Audio &amp; Operational Context:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-100 max-w-4xl mx-auto font-sans leading-relaxed">
            "{scene.narration}"
          </p>
        </div>

        {/* Scrubber Timeline Bar */}
        <div className="w-full bg-slate-800 h-1.5 relative overflow-hidden">
          <div
            className="bg-gradient-to-r from-sky-400 to-amber-400 h-full transition-all duration-100"
            style={{ width: `${sceneProgress}%` }}
          ></div>
        </div>

        {/* Video Player Controls Bar */}
        <div className="p-3 bg-[#001428] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          {/* Playback Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all cursor-pointer"
              title={isPlaying ? "Pause Demo" : "Play Demo"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={handleRestart}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-all cursor-pointer"
              title="Restart Demo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrevScene}
              disabled={currentSceneIndex === 0}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition-all cursor-pointer"
              title="Previous Scene"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={handleNextScene}
              disabled={currentSceneIndex === scenes.length - 1}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 transition-all cursor-pointer"
              title="Next Scene"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Speed Toggle */}
            <button
              onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-amber-400 transition-all"
              title="Playback Speed"
            >
              {playbackSpeed}x SPEED
            </button>
          </div>

          {/* Scene Jump Pills */}
          <div className="hidden lg:flex items-center space-x-1">
            {scenes.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => {
                  setCurrentSceneIndex(idx);
                  setSceneProgress(0);
                }}
                className={`px-2 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                  idx === currentSceneIndex
                    ? "bg-sky-500 text-white font-bold shadow"
                    : "bg-white/5 text-slate-400 hover:text-white"
                }`}
              >
                Scene {sc.id}
              </button>
            ))}
          </div>

          {/* Audio Mute & Full Status */}
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <button
              onClick={() => setIsAudioMuted(!isAudioMuted)}
              className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-slate-300 cursor-pointer"
            >
              {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <span>{isAudioMuted ? "MUTED" : "AUDIO ON"}</span>
          </div>
        </div>
      </div>

      {/* Official Video Submission Guidance Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 dark:text-white">
            <Video className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Official Video Submission Instructions (According to sentinel.gujarat.gov.in)</span>
          </div>
          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono">
            OFFICIAL EVALUATION CRITERIA
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <strong className="text-slate-900 dark:text-white block font-semibold">1. Screen Recording</strong>
            <p>
              Use Windows Game Bar (<kbd className="px-1 rounded bg-slate-200 dark:bg-slate-700 font-mono">Win</kbd> + <kbd className="px-1 rounded bg-slate-200 dark:bg-slate-700 font-mono">G</kbd>) or OBS Studio to record this automated guided walkthrough on full screen.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <strong className="text-slate-900 dark:text-white block font-semibold">2. YouTube / Drive Upload</strong>
            <p>
              Upload the video file to YouTube with visibility set to <strong>"Unlisted"</strong>, or upload to Google Drive with <strong>"Anyone with the link — Viewer"</strong> access.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
            <strong className="text-slate-900 dark:text-white block font-semibold">3. Submit with Output Report</strong>
            <p>
              Paste your unlisted video URL along with the <strong>DETECTION_OUTPUT_REPORT.json</strong> file into the official submission form at <a href="https://sentinel.gujarat.gov.in" target="_blank" rel="noopener noreferrer" className="text-sky-600 dark:text-sky-400 underline">sentinel.gujarat.gov.in</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
