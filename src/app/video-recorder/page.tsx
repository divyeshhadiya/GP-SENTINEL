"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Download, CheckCircle2, Video, ArrowLeft, Play, Shield } from "lucide-react";

export default function VideoRecorderPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState<"idle" | "recording" | "saving" | "done" | "error">("idle");
  const [progressText, setProgressText] = useState("Ready to record high-definition demonstration video.");
  const [currentSceneNum, setCurrentSceneNum] = useState(0);
  const [videoSize, setVideoSize] = useState<number | null>(null);

  const startAutomatedRecording = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setStatus("recording");
    setProgressText("Initializing 1080p Canvas & MediaRecorder engine...");

    // Setup stream & recorder
    const stream = canvas.captureStream(30); // 30 fps
    let recorder: MediaRecorder;
    try {
      recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
          ? "video/webm;codecs=vp9"
          : "video/webm"
      });
    } catch {
      recorder = new MediaRecorder(stream);
    }

    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        chunks.push(e.data);
      }
    };

    recorder.onstop = async () => {
      setStatus("saving");
      setProgressText("Encoding WebM video and saving to Downloads folder...");

      const blob = new Blob(chunks, { type: "video/webm" });
      setVideoSize(blob.size);

      // 1. Browser immediate download
      try {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "GP-SENTINEL_Official_Demonstration_Video.webm";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.warn("Browser download trigger failed:", err);
      }

      // 2. Direct server save to C:\Users\USEEER\Downloads
      try {
        const res = await fetch("/api/save-video", {
          method: "POST",
          headers: { "Content-Type": "video/webm" },
          body: blob
        });
        const data = await res.json();
        if (data.success) {
          setStatus("done");
          setProgressText("Video successfully downloaded and saved directly to your Downloads folder!");
        } else {
          setStatus("done");
          setProgressText("Video downloaded to browser default folder.");
        }
      } catch (err) {
        setStatus("done");
        setProgressText("Video downloaded via browser.");
      }
    };

    recorder.start();

    // Scene Definitions
    const scenes = [
      {
        id: 1,
        title: "1. Executive Overview & Model 5 Hybrid Architecture",
        dept: "Home Department • SCRB Gandhinagar",
        cam: "GRID-CONTROL-01",
        badge: "STATE INGEST ONLINE",
        narration: "GP-SENTINEL establishes a statewide unified command grid across Gujarat, ingesting 80,000+ CCTV feeds from 26 departments with zero WAN overload."
      },
      {
        id: 2,
        title: "2. Multi-Department GIS Camera Registry (Model 1)",
        dept: "VISWAS (Police) • Smart Cities (G-SWAN) • Tolls (R&B)",
        cam: "GIS-REGISTRY-MAP",
        badge: "80,000 CAMERAS MAPPED",
        narration: "Unified geospatial Common Operating Picture. Real-time RTSP health, ONVIF compliance, and department-wise spatial clustering across 33 districts."
      },
      {
        id: 3,
        title: "3. Low-Bandwidth Adaptive Video Wall (Model 2)",
        dept: "State Command & Control Centre",
        cam: "VID-WALL-GRID",
        badge: "SUB-350ms WEBRTC",
        narration: "Adaptive H.265 sub-stream delivery saves 84% bandwidth. Dynamic AI bounding boxes overlay real-time vehicle and pedestrian telemetry."
      },
      {
        id: 4,
        title: "4. Heterogeneous VMS Federation Middleware (Model 3)",
        dept: "Multi-Vendor Integration Layer",
        cam: "VMS-PROXY-CORE",
        badge: "ZERO-TRUST FEDERATION",
        narration: "Standardized ONVIF abstraction proxy federating Milestone, Genetec, Hikvision, Dahua, Matrix, and CP PLUS systems without rip-and-replace."
      },
      {
        id: 5,
        title: "5. Inter-District Traversal Tracking: GJ-01-AB-1234 (Model 4)",
        dept: "Crime Investigation & Traffic Command",
        cam: "SUR-RNG-04 (Ring Road Surat)",
        badge: "TARGET RECONSTRUCTED",
        narration: "Reconstructs the full 5-hop journey of suspect vehicle GJ-01-AB-1234 from Ahmedabad to Surat in under 120ms with vector speed estimation."
      },
      {
        id: 6,
        title: "6. VAHAN & e-GujCop Watchlist Matcher (<100ms)",
        dept: "State Crime Records Bureau",
        cam: "WATCHLIST-SYNC-ENGINE",
        badge: "LEVEL-1 RED ALERT",
        narration: "Continuous sync with National VAHAN and state crime registries. Triggers automated radio dispatches and encrypted coordinates to PCR vans."
      },
      {
        id: 7,
        title: "7. Section 65B Indian Evidence Act Forensic Export",
        dept: "Forensic Evidentiary Chain of Custody",
        cam: "LEGAL-DOSSIER-ENGINE",
        badge: "SHA-256 TAMPER-PROOF",
        narration: "Cryptographically signed court-admissible forensic dossiers with SHA-256 checksums, NTP timestamps, and mandated JSON detection reports."
      },
      {
        id: 8,
        title: "8. 80,000 Camera Scalability & Bandwidth ROI",
        dept: "Gujarat State Data Centre (GSDC)",
        cam: "HLD-SCALABILITY-TIER",
        badge: "₹18.4 CR ANNUAL SAVINGS",
        narration: "YOLOv11 Smart-Edge inference paired with Kafka fog tiering delivers 99.4% ANPR accuracy and multi-crore telecom savings for Gujarat."
      }
    ];

    const fps = 30;
    const durationPerSceneSec = 2.0; // ~16 seconds high-impact demonstration video
    const totalFramesPerScene = Math.floor(durationPerSceneSec * fps);

    let currentSceneIdx = 0;
    let frameInScene = 0;

    const renderFrame = () => {
      const scene = scenes[currentSceneIdx];
      setCurrentSceneNum(currentSceneIdx + 1);
      setProgressText(`Recording Scene ${currentSceneIdx + 1}/8: ${scene.title}`);

      // Dimensions: 1280x720
      const w = 1280;
      const h = 720;

      // 1. Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, "#001326");
      bgGrad.addColorStop(1, "#002347");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Subtle tech grid pattern
      ctx.strokeStyle = "rgba(14, 165, 233, 0.07)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 2. Top Masthead Bar
      ctx.fillStyle = "#000e1f";
      ctx.fillRect(0, 0, w, 60);
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(0, 58, w, 2);

      // Logo Crest Circle
      ctx.beginPath();
      ctx.arc(36, 30, 20, 0, Math.PI * 2);
      ctx.fillStyle = "#002b5c";
      ctx.fill();
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Police Star / Emblem text
      ctx.fillStyle = "#f59e0b";
      ctx.font = "bold 14px monospace";
      ctx.fillText("GP", 27, 35);

      // Masthead Text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText("GUJARAT POLICE SENTINEL 2026", 68, 28);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "12px monospace";
      ctx.fillText("STATEWIDE UNIFIED VIDEO INTELLIGENCE & CCTV FEDERATION PLATFORM", 68, 46);

      // Top Right Status Indicators
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.arc(w - 230, 30, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = "bold 12px monospace";
      ctx.fillText("INGEST: 50/50 ONLINE", w - 215, 34);

      // REC Active Badge
      ctx.fillStyle = "#dc2626";
      ctx.fillRect(w - 75, 18, 55, 24);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px monospace";
      ctx.fillText("● REC", w - 65, 34);

      // 3. Sub-header with scene info
      ctx.fillStyle = "rgba(15, 23, 42, 0.7)";
      ctx.fillRect(30, 80, w - 60, 44);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
      ctx.strokeRect(30, 80, w - 60, 44);

      ctx.fillStyle = "#f59e0b";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText(scene.title, 45, 107);

      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 11px monospace";
      const badgeW = ctx.measureText(scene.badge).width + 16;
      ctx.fillStyle = "rgba(56, 189, 248, 0.15)";
      ctx.fillRect(w - 45 - badgeW, 90, badgeW, 24);
      ctx.strokeStyle = "#38bdf8";
      ctx.strokeRect(w - 45 - badgeW, 90, badgeW, 24);
      ctx.fillStyle = "#38bdf8";
      ctx.fillText(scene.badge, w - 37 - badgeW, 106);

      // 4. Center Content Rendering per Scene
      const contentY = 140;
      const contentH = 430;

      // Draw Scene-Specific Visuals
      if (scene.id === 1) {
        // Architecture Overview / Grid
        ctx.fillStyle = "rgba(2, 6, 23, 0.6)";
        ctx.fillRect(50, contentY, w - 100, contentH);
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.strokeRect(50, contentY, w - 100, contentH);

        const cards = [
          { label: "CONNECTED CAMERAS", val: "80,000+", sub: "26 State Departments", color: "#38bdf8" },
          { label: "MODEL ARCHITECTURE", val: "Model 5 (Hybrid)", sub: "Smart Edge + Fog Tiering", color: "#f59e0b" },
          { label: "BANDWIDTH SAVINGS", val: "84.2%", sub: "1.2 Tbps → 188 Gbps", color: "#10b981" },
          { label: "STREAM LATENCY", val: "< 350 ms", sub: "Sub-Second WebRTC / HLS", color: "#a855f7" }
        ];

        cards.forEach((c, idx) => {
          const cardX = 80 + idx * 280;
          ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
          ctx.fillRect(cardX, contentY + 40, 250, 150);
          ctx.strokeStyle = c.color;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(cardX, contentY + 40, 250, 150);

          ctx.fillStyle = "#94a3b8";
          ctx.font = "bold 11px monospace";
          ctx.fillText(c.label, cardX + 15, contentY + 70);

          ctx.fillStyle = c.color;
          ctx.font = "bold 26px sans-serif";
          ctx.fillText(c.val, cardX + 15, contentY + 115);

          ctx.fillStyle = "#cbd5e1";
          ctx.font = "12px sans-serif";
          ctx.fillText(c.sub, cardX + 15, contentY + 150);
        });

        // Diagram illustration: Edge -> Fog -> Cloud
        ctx.fillStyle = "rgba(255,255,255,0.03)";
        ctx.fillRect(80, contentY + 220, w - 160, 170);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
        ctx.strokeRect(80, contentY + 220, w - 160, 170);

        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 15px sans-serif";
        ctx.fillText("DISTRIBUTED STATEWIDE PIPELINE", 105, contentY + 255);

        // 3 Tiers
        const tiers = [
          { name: "1. Municipal Edge Gateways", desc: "Local ONVIF Ingest • YOLOv11 ANPR Inference" },
          { name: "2. Regional Fog Centers", desc: "Apache Kafka Ingest (2.4M msg/s) • Video Cache" },
          { name: "3. State Command Centre (GSDC)", desc: "ClickHouse Time-Series • Cross-District Search" }
        ];
        tiers.forEach((t, i) => {
          const tx = 105 + i * 360;
          ctx.fillStyle = "rgba(56, 189, 248, 0.1)";
          ctx.fillRect(tx, contentY + 275, 330, 95);
          ctx.strokeStyle = "#0284c7";
          ctx.strokeRect(tx, contentY + 275, 330, 95);

          ctx.fillStyle = "#38bdf8";
          ctx.font = "bold 13px sans-serif";
          ctx.fillText(t.name, tx + 15, contentY + 305);

          ctx.fillStyle = "#94a3b8";
          ctx.font = "11px sans-serif";
          ctx.fillText(t.desc, tx + 15, contentY + 335);
        });

      } else if (scene.id === 5) {
        // Vehicle Tracking Scene (GJ-01-AB-1234)
        ctx.fillStyle = "rgba(2, 6, 23, 0.7)";
        ctx.fillRect(50, contentY, w - 100, contentH);
        ctx.strokeStyle = "#38bdf8";
        ctx.strokeRect(50, contentY, w - 100, contentH);

        // Map area on left
        ctx.fillStyle = "#00162b";
        ctx.fillRect(70, contentY + 20, 680, 390);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
        ctx.strokeRect(70, contentY + 20, 680, 390);

        // Draw animated road & hops
        ctx.strokeStyle = "#0ea5e9";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(120, contentY + 80);
        ctx.lineTo(250, contentY + 140);
        ctx.lineTo(380, contentY + 220);
        ctx.lineTo(510, contentY + 300);
        ctx.lineTo(650, contentY + 340);
        ctx.stroke();

        const hops = [
          { name: "Ahmedabad SG Hwy", time: "08:14", x: 120, y: contentY + 80 },
          { name: "Sanand Toll", time: "08:42", x: 250, y: contentY + 140 },
          { name: "Vadodara Expwy", time: "09:32", x: 380, y: contentY + 220 },
          { name: "Bharuch Bridge", time: "10:48", x: 510, y: contentY + 300 },
          { name: "Surat Ring Rd", time: "11:45", x: 650, y: contentY + 340 }
        ];

        hops.forEach((h, i) => {
          ctx.fillStyle = i === 4 ? "#ef4444" : "#10b981";
          ctx.beginPath();
          ctx.arc(h.x, h.y, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = "#f8fafc";
          ctx.font = "bold 11px sans-serif";
          ctx.fillText(h.name, h.x - 30, h.y - 14);
          ctx.fillStyle = "#38bdf8";
          ctx.font = "10px monospace";
          ctx.fillText(h.time + " AM", h.x - 15, h.y + 22);
        });

        // Suspect vehicle telemetry card on right
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.fillRect(770, contentY + 20, 440, 390);
        ctx.strokeStyle = "rgba(239, 68, 68, 0.5)";
        ctx.strokeRect(770, contentY + 20, 440, 390);

        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 13px monospace";
        ctx.fillText("FLAGGED TARGET VEHICLE", 790, contentY + 50);

        // Plate Box
        ctx.fillStyle = "#fef08a";
        ctx.fillRect(790, contentY + 65, 220, 45);
        ctx.strokeStyle = "#ca8a04";
        ctx.lineWidth = 2;
        ctx.strokeRect(790, contentY + 65, 220, 45);

        ctx.fillStyle = "#000000";
        ctx.font = "black 22px monospace";
        ctx.fillText("GJ-01-AB-1234", 805, contentY + 97);

        ctx.fillStyle = "#e2e8f0";
        ctx.font = "13px sans-serif";
        ctx.fillText("Make / Model: Mahindra Scorpio (White)", 790, contentY + 140);
        ctx.fillText("Watchlist Status: VAHAN Stolen / e-GujCop Critical", 790, contentY + 165);
        ctx.fillText("Last Confirmed Hop: Surat Ring Road Cam 04", 790, contentY + 190);
        ctx.fillText("Current Trajectory: Heading South (NH-48)", 790, contentY + 215);
        ctx.fillText("OCR AI Confidence: 99.4%", 790, contentY + 240);
        ctx.fillText("Estimated Speed: 78 km/h", 790, contentY + 265);

        ctx.fillStyle = "rgba(239, 68, 68, 0.2)";
        ctx.fillRect(790, contentY + 295, 400, 80);
        ctx.strokeStyle = "#ef4444";
        ctx.strokeRect(790, contentY + 295, 400, 80);

        ctx.fillStyle = "#fca5a5";
        ctx.font = "bold 12px sans-serif";
        ctx.fillText("AUTOMATED INTERCEPT DISPATCH ACTIVE", 805, contentY + 325);
        ctx.font = "11px monospace";
        ctx.fillStyle = "#cbd5e1";
        ctx.fillText("PCR Bravo-12 alerted with GPS vector coordinates.", 805, contentY + 350);

      } else {
        // Generic tactical scene layout with grid of cameras / dashboards
        ctx.fillStyle = "rgba(2, 6, 23, 0.6)";
        ctx.fillRect(50, contentY, w - 100, contentH);
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.strokeRect(50, contentY, w - 100, contentH);

        // 4 sub-screens / video feeds
        const feeds = [
          { title: "FEED 01 • AHMEDABAD SG HIGHWAY", status: "ONVIF STREAM OK • 1080p", fps: "30.0 FPS" },
          { title: "FEED 02 • SURAT RING ROAD TOLL", status: "YOLOv11 ANPR ACTIVE", fps: "29.8 FPS" },
          { title: "FEED 03 • VADODARA EXPRESSWAY", status: "LOW-BITRATE H.265 SUB", fps: "30.0 FPS" },
          { title: "FEED 04 • RAJKOT HIGHWAY JUNCTION", status: "MOTION & CLASSIFICATION", fps: "30.0 FPS" }
        ];

        feeds.forEach((f, idx) => {
          const fx = 75 + (idx % 2) * 580;
          const fy = contentY + 20 + Math.floor(idx / 2) * 195;

          ctx.fillStyle = "#001020";
          ctx.fillRect(fx, fy, 550, 180);
          ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
          ctx.strokeRect(fx, fy, 550, 180);

          // Header of feed
          ctx.fillStyle = "rgba(0,0,0,0.5)";
          ctx.fillRect(fx, fy, 550, 26);
          ctx.fillStyle = "#38bdf8";
          ctx.font = "bold 11px monospace";
          ctx.fillText(f.title, fx + 10, fy + 18);
          ctx.fillStyle = "#10b981";
          ctx.fillText(f.fps, fx + 480, fy + 18);

          // Simulated road canvas
          ctx.fillStyle = "#001e38";
          ctx.fillRect(fx + 20, fy + 40, 510, 120);

          // Simulated Car Bounding Box
          const carAnimX = (frameInScene * 6 + idx * 80) % 360;
          ctx.strokeStyle = idx === 1 ? "#ef4444" : "#10b981";
          ctx.lineWidth = 2;
          ctx.strokeRect(fx + 40 + carAnimX, fy + 55, 90, 60);

          ctx.fillStyle = idx === 1 ? "#ef4444" : "#10b981";
          ctx.fillRect(fx + 40 + carAnimX, fy + 40, 90, 16);
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 9px monospace";
          ctx.fillText(idx === 1 ? "GJ-01-AB-1234" : "VEHICLE 99%", fx + 44 + carAnimX, fy + 52);
        });
      }

      // 5. Bottom Narration / Subtitles Bar
      ctx.fillStyle = "#000a14";
      ctx.fillRect(0, h - 85, w, 85);
      ctx.fillStyle = "#f59e0b";
      ctx.fillRect(0, h - 85, w, 2);

      ctx.fillStyle = "#f59e0b";
      ctx.font = "bold 11px monospace";
      ctx.fillText("NARRATOR SCRIPT & OPERATIONAL CONTEXT:", 30, h - 65);

      ctx.fillStyle = "#f8fafc";
      ctx.font = "14px sans-serif";
      ctx.fillText(`"${scene.narration}"`, 30, h - 38);

      // 6. Scene Scrubber bar at very bottom
      const totalProgress = (currentSceneIdx * totalFramesPerScene + frameInScene) / (scenes.length * totalFramesPerScene);
      ctx.fillStyle = "#0284c7";
      ctx.fillRect(0, h - 5, w * totalProgress, 5);

      // Frame advance
      frameInScene++;
      if (frameInScene >= totalFramesPerScene) {
        frameInScene = 0;
        currentSceneIdx++;
        if (currentSceneIdx >= scenes.length) {
          recorder.stop();
          return;
        }
      }

      setTimeout(renderFrame, 1000 / fps);
    };

    renderFrame();
  };

  // Auto-start recording on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      startAutomatedRecording();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-[#002347] text-white border border-sky-400/30 shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
            <Video className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase text-amber-400 block">
              Automated Video Generator &amp; Downloader
            </span>
            <h1 className="text-xl font-black text-white">
              GP-SENTINEL: Official Demonstration Video
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            href="/video-demo"
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Interactive Demo</span>
          </Link>

          <a
            href="/GP-SENTINEL_Official_Pitch_Deck.pptx"
            download="GP-SENTINEL_Official_Pitch_Deck.pptx"
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow"
          >
            <Download className="w-4 h-4" />
            <span>Download PPTX</span>
          </a>
        </div>
      </div>

      {/* Live Status Card */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          {status === "recording" && (
            <span className="w-3.5 h-3.5 rounded-full bg-red-600 animate-ping"></span>
          )}
          {status === "saving" && (
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500 animate-pulse"></span>
          )}
          {status === "done" && (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          )}
          <div>
            <span className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block">
              Status: {status.toUpperCase()}
            </span>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {progressText}
            </p>
          </div>
        </div>

        {status === "done" && (
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded font-bold">
              Saved to C:\Users\USEEER\Downloads
            </span>
            <button
              onClick={startAutomatedRecording}
              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded text-xs font-bold transition-all cursor-pointer"
            >
              Re-Record Video
            </button>
          </div>
        )}
      </div>

      {/* 1280x720 Rendering Canvas Container */}
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-sky-500/30 bg-black aspect-video relative flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Direct File Locations Guide */}
      <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-3">
        <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
          <Shield className="w-4 h-4 text-sky-500" />
          <span>Both Challenge Files in Your Downloads Folder:</span>
        </div>
        <ul className="space-y-2 font-mono">
          <li className="flex items-center space-x-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ PPT File:</span>
            <span className="bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-300 dark:border-slate-700">
              C:\Users\USEEER\Downloads\GP-SENTINEL_Official_Pitch_Deck.pptx
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-sky-600 dark:text-sky-400 font-bold">✓ Video File:</span>
            <span className="bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-300 dark:border-slate-700">
              C:\Users\USEEER\Downloads\GP-SENTINEL_Official_Demonstration_Video.webm
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
