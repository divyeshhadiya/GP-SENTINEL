"use client";

import React, { useEffect, useRef, useState } from "react";
import { Camera } from "@/types";
import {
  Camera as CameraIcon,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Scan,
  CheckCircle2,
  AlertTriangle,
  Download
} from "lucide-react";

interface Props {
  camera: Camera;
  targetPlate?: string;
  isWatchlistAlert?: boolean;
  showAiOverlays?: boolean;
  showOsd?: boolean;
  height?: string;
  className?: string;
}

interface SimulatedVehicle {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  plate: string;
  type: string;
  color: string;
  confidence: number;
  isTarget: boolean;
}

export default function CanvasCCTVPlayer({
  camera,
  targetPlate = "GJ-01-AB-1234",
  isWatchlistAlert = false,
  showAiOverlays = true,
  showOsd = true,
  height = "320px",
  className = ""
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [fps, setFps] = useState(30);
  const [lastPts, setLastPts] = useState(Date.now());
  const [showScanlines, setShowScanlines] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let basePts = Date.now();
    let frameCount = 0;
    let lastFpsTime = performance.now();

    // Vehicles active on this camera feed
    const vehicles: SimulatedVehicle[] = [
      {
        x: -120,
        y: 110,
        width: 140,
        height: 65,
        speed: 2.8,
        plate: targetPlate,
        type: "SUV (Creta)",
        color: "#dc2626", // Red
        confidence: 0.99,
        isTarget: true
      },
      {
        x: -360,
        y: 80,
        width: 125,
        height: 55,
        speed: 3.2,
        plate: "GJ-01-EK-8821",
        type: "Sedan (City)",
        color: "#94a3b8", // Silver
        confidence: 0.97,
        isTarget: false
      },
      {
        x: -600,
        y: 120,
        width: 180,
        height: 80,
        speed: 2.1,
        plate: "GJ-27-TR-4910",
        type: "Truck (Tata)",
        color: "#2563eb", // Blue
        confidence: 0.95,
        isTarget: false
      }
    ];

    const render = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastFpsTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsTime)));
        frameCount = 0;
        lastFpsTime = now;
      }

      const w = canvas.width;
      const h = canvas.height;

      ctx.save();
      ctx.clearRect(0, 0, w, h);

      // Apply digital zoom centered
      if (zoom > 1) {
        ctx.translate(w / 2, h / 2);
        ctx.scale(zoom, zoom);
        ctx.translate(-w / 2, -h / 2);
      }

      // 1. Draw CCTV Asphalt Road & Environment
      ctx.fillStyle = "#0d1527"; // Dark surrounding
      ctx.fillRect(0, 0, w, h);

      // Highway lanes
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 70, w, 140);

      // Road shoulder & kerb
      ctx.fillStyle = "#334155";
      ctx.fillRect(0, 68, w, 3);
      ctx.fillRect(0, 209, w, 3);

      // Lane divider dashes
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 2;
      ctx.setLineDash([20, 15]);
      ctx.beginPath();
      ctx.moveTo(0, 140);
      ctx.lineTo(w, 140);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Draw Moving Vehicles
      vehicles.forEach((v) => {
        v.x += v.speed;
        if (v.x > w + 100) {
          v.x = -200 - Math.random() * 200;
        }

        // Vehicle shadow
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
        ctx.beginPath();
        ctx.roundRect(v.x + 4, v.y + 6, v.width, v.height, 8);
        ctx.fill();

        // Vehicle body
        ctx.fillStyle = v.color;
        ctx.beginPath();
        ctx.roundRect(v.x, v.y, v.width, v.height, 8);
        ctx.fill();

        // Windshield and windows
        ctx.fillStyle = "#0f172a";
        ctx.beginPath();
        ctx.roundRect(v.x + v.width * 0.2, v.y + 8, v.width * 0.55, v.height - 16, 4);
        ctx.fill();

        // Headlights / taillights
        ctx.fillStyle = "#fef08a"; // Yellow headlights
        ctx.fillRect(v.x + v.width - 4, v.y + 6, 4, 12);
        ctx.fillRect(v.x + v.width - 4, v.y + v.height - 18, 4, 12);

        // License Plate background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(v.x + v.width - 12, v.y + v.height / 2 - 7, 10, 14);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.strokeRect(v.x + v.width - 12, v.y + v.height / 2 - 7, 10, 14);

        // 3. AI Detection Overlays (YOLO & ANPR Bounding Boxes)
        if (showAiOverlays) {
          const isTargetAndAlert = v.isTarget && isWatchlistAlert;

          // Main vehicle bounding box
          ctx.strokeStyle = isTargetAndAlert ? "#ef4444" : "#10b981";
          ctx.lineWidth = 2;
          ctx.strokeRect(v.x - 6, v.y - 6, v.width + 12, v.height + 12);

          // Bounding box tactical corner brackets
          const bX = v.x - 6;
          const bY = v.y - 6;
          const bW = v.width + 12;
          const bH = v.height + 12;
          const corner = 8;
          ctx.lineWidth = 3;
          ctx.strokeStyle = isTargetAndAlert ? "#ef4444" : "#38bdf8";

          // Corners
          ctx.beginPath();
          ctx.moveTo(bX, bY + corner); ctx.lineTo(bX, bY); ctx.lineTo(bX + corner, bY);
          ctx.moveTo(bX + bW - corner, bY); ctx.lineTo(bX + bW, bY); ctx.lineTo(bX + bW, bY + corner);
          ctx.moveTo(bX, bY + bH - corner); ctx.lineTo(bX, bY + bH); ctx.lineTo(bX + corner, bY + bH);
          ctx.moveTo(bX + bW - corner, bY + bH); ctx.lineTo(bX + bW, bY + bH); ctx.lineTo(bX + bW, bY + bH - corner);
          ctx.stroke();

          // YOLO Class Tag
          ctx.fillStyle = isTargetAndAlert ? "#ef4444" : "rgba(15, 23, 42, 0.85)";
          ctx.fillRect(bX, bY - 18, 120, 16);
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 9px ui-monospace, monospace";
          ctx.fillText(`${v.type} ${(v.confidence * 100).toFixed(0)}%`, bX + 4, bY - 6);

          // ANPR License Plate Reader Tag
          const plateX = v.x + v.width - 24;
          const plateY = v.y + v.height / 2 - 14;
          ctx.strokeStyle = "#eab308";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(plateX, plateY, 28, 28);

          ctx.fillStyle = isTargetAndAlert ? "#dc2626" : "rgba(0, 0, 0, 0.85)";
          ctx.fillRect(bX, bY + bH + 2, 130, 16);
          ctx.fillStyle = isTargetAndAlert ? "#fef08a" : "#38bdf8";
          ctx.font = "bold 10px ui-monospace, monospace";
          ctx.fillText(`ANPR: ${v.plate}`, bX + 4, bY + bH + 14);
        }
      });

      // 4. Simulated Camera Scanlines & Grain
      if (showScanlines) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        for (let y = 0; y < h; y += 3) {
          ctx.fillRect(0, y, w, 1);
        }
      }

      ctx.restore();

      // 5. Tactical OSD (On-Screen Display)
      if (showOsd) {
        const ptsNow = basePts + Math.floor(performance.now());
        setLastPts(ptsNow);

        const nowUtc = new Date().toISOString().replace("T", " ").slice(0, 19);

        // Top Header OSD
        ctx.fillStyle = "rgba(7, 12, 24, 0.8)";
        ctx.fillRect(8, 8, 330, 36);
        ctx.strokeStyle = "rgba(51, 65, 85, 0.6)";
        ctx.lineWidth = 1;
        ctx.strokeRect(8, 8, 330, 36);

        ctx.fillStyle = "#f8fafc";
        ctx.font = "bold 10px ui-monospace, monospace";
        ctx.fillText(`CAM: ${camera.id} | ${camera.name.slice(0, 24)}`, 14, 22);

        ctx.fillStyle = "#38bdf8";
        ctx.font = "9px ui-monospace, monospace";
        ctx.fillText(`PTS: ${ptsNow} ms | TCP | ${camera.codec} | ${camera.resolution}`, 14, 36);

        // Live status indicator (top right)
        ctx.fillStyle = "rgba(7, 12, 24, 0.8)";
        ctx.fillRect(w - 110, 8, 102, 24);
        ctx.fillStyle = camera.status === "Online" ? "#10b981" : "#f59e0b";
        ctx.beginPath();
        ctx.arc(w - 98, 20, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px ui-monospace, monospace";
        ctx.fillText(`LIVE REC [${camera.fps} FPS]`, w - 88, 23);

        // Bottom Coordinates & Timestamp OSD
        ctx.fillStyle = "rgba(7, 12, 24, 0.8)";
        ctx.fillRect(8, h - 28, w - 16, 20);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "9px ui-monospace, monospace";
        ctx.fillText(
          `LOC: ${camera.coordinates[0].toFixed(4)}°N, ${camera.coordinates[1].toFixed(4)}°E | VMS: ${camera.vmsVendor} | UTC: ${nowUtc}`,
          14,
          h - 15
        );
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [camera, zoom, showAiOverlays, showOsd, showScanlines, targetPlate, isWatchlistAlert]);

  const handleDownloadSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `SENTINEL_${camera.id}_${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-xl overflow-hidden border border-police-700 bg-black shadow-xl group ${className}`}
    >
      <canvas
        ref={canvasRef}
        width={640}
        height={360}
        style={{ height, width: "100%", objectFit: "cover" }}
        className="block"
      />

      {/* Camera Control Toolbar (Appears on hover) */}
      <div className="absolute bottom-9 right-3 z-20 flex items-center space-x-1.5 bg-police-900/85 backdrop-blur-md px-2 py-1 rounded-lg border border-police-700 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
          className="p-1 hover:text-blue-400 text-slate-300"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span className="font-mono text-[10px] text-slate-400 px-1">{zoom.toFixed(2)}x</span>
        <button
          onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
          className="p-1 hover:text-blue-400 text-slate-300"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <div className="w-px h-3 bg-slate-700"></div>
        <button
          onClick={handleDownloadSnapshot}
          className="p-1 hover:text-emerald-400 text-slate-300"
          title="Save High-Res Snapshot with OSD Watermark"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-1 hover:text-blue-400 text-slate-300"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Target Hit Visual Banner if Watchlist Alert is active */}
      {isWatchlistAlert && (
        <div className="absolute top-12 left-3 z-20 bg-red-600/90 text-white font-mono text-[11px] font-bold px-2 py-1 rounded border border-red-400 flex items-center space-x-1.5 animate-pulse shadow-lg">
          <AlertTriangle className="w-3.5 h-3.5 text-yellow-300" />
          <span>MATCH: VAHAN STOLEN VEHICLE ({targetPlate})</span>
        </div>
      )}
    </div>
  );
}
