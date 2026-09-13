"use client";

import React, { useState } from "react";
import { Camera, DepartmentType } from "@/types";
import CanvasCCTVPlayer from "./CanvasCCTVPlayer";
import { Grid, Eye, Maximize, Sliders, Layers, RefreshCw } from "lucide-react";

interface Props {
  cameras: Camera[];
  targetPlate?: string;
}

type GridLayout = "1x1" | "2x2" | "3x3" | "4x4";

export default function VideoGrid({ cameras, targetPlate = "GJ-01-AB-1234" }: Props) {
  const [layout, setLayout] = useState<GridLayout>("2x2");
  const [selectedDept, setSelectedDept] = useState<string>("ALL");
  const [showAiOverlays, setShowAiOverlays] = useState(true);
  const [showOsd, setShowOsd] = useState(true);

  // Filter cameras if department selected
  const availableCameras = cameras.filter((c) =>
    selectedDept === "ALL" ? true : c.department === selectedDept
  );

  // Grid size mapping
  const cellCount = layout === "1x1" ? 1 : layout === "2x2" ? 4 : layout === "3x3" ? 9 : 16;
  const gridClasses = {
    "1x1": "grid-cols-1",
    "2x2": "grid-cols-1 md:grid-cols-2",
    "3x3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    "4x4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
  }[layout];

  const playerHeight = {
    "1x1": "520px",
    "2x2": "320px",
    "3x3": "240px",
    "4x4": "200px"
  }[layout];

  // Active camera assignments for each cell
  const [cellCamIds, setCellCamIds] = useState<string[]>([
    cameras[0]?.id || "CAM-GNR-001",
    cameras[4]?.id || "CAM-AMD-001",
    cameras[10]?.id || "CAM-SRT-001",
    cameras[16]?.id || "CAM-BDQ-001",
    cameras[20]?.id || "CAM-RJK-001",
    cameras[24]?.id || "CAM-JAM-001",
    cameras[31]?.id || "CAM-VLS-001",
    cameras[36]?.id || "CAM-HWY-001",
    cameras[42]?.id || "CAM-HWY-004",
    cameras[1]?.id || "CAM-GNR-002",
    cameras[5]?.id || "CAM-AMD-002",
    cameras[11]?.id || "CAM-SRT-002",
    cameras[17]?.id || "CAM-BDQ-002",
    cameras[21]?.id || "CAM-RJK-002",
    cameras[32]?.id || "CAM-VLS-002",
    cameras[37]?.id || "CAM-HWY-002"
  ]);

  const handleAssignCamera = (cellIndex: number, newCamId: string) => {
    const updated = [...cellCamIds];
    updated[cellIndex] = newCamId;
    setCellCamIds(updated);
  };

  return (
    <div className="space-y-4">
      {/* Tactical Toolbar */}
      <div className="bg-police-900/90 border border-police-700/80 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        {/* Layout Selectors */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-slate-400 mr-1 flex items-center space-x-1">
            <Grid className="w-3.5 h-3.5 text-blue-400" />
            <span>Grid:</span>
          </span>
          {(["1x1", "2x2", "3x3", "4x4"] as GridLayout[]).map((g) => (
            <button
              key={g}
              onClick={() => setLayout(g)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all min-h-[32px] min-w-[38px] ${
                layout === g
                  ? "bg-blue-600 text-white shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                  : "bg-police-800 text-slate-400 hover:text-white hover:bg-police-750"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Department Filter */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-police-800 border border-police-700 text-slate-200 text-xs rounded-lg px-2.5 py-2 focus:outline-none focus:border-blue-500 w-full sm:w-auto"
          >
            <option value="ALL">All Departments (26 Govt Agencies)</option>
            <option value="Gujarat Police">Gujarat Police</option>
            <option value="GSRTC">GSRTC Transport</option>
            <option value="RTO Gujarat">RTO Checkposts</option>
            <option value="Ahmedabad Municipal Corp (AMC)">AMC Smart City</option>
            <option value="Surat Municipal Corp (SMC)">SMC Netram</option>
            <option value="Vadodara Municipal Corp (VMC)">VMC Smart City</option>
            <option value="Rajkot Municipal Corp (RMC)">RMC ICCC</option>
            <option value="Health & Family Welfare">Civil Hospitals</option>
            <option value="Food & Civil Supplies">Civil Supplies Godowns</option>
            <option value="Private Commercial / Mall">Malls & Commercial</option>
          </select>
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-300">
          <label className="flex items-center space-x-1.5 cursor-pointer py-1">
            <input
              type="checkbox"
              checked={showAiOverlays}
              onChange={(e) => setShowAiOverlays(e.target.checked)}
              className="accent-blue-500 rounded w-4 h-4"
            />
            <span>AI YOLO/ANPR</span>
          </label>

          <label className="flex items-center space-x-1.5 cursor-pointer py-1">
            <input
              type="checkbox"
              checked={showOsd}
              onChange={(e) => setShowOsd(e.target.checked)}
              className="accent-blue-500 rounded w-4 h-4"
            />
            <span>PTS OSD</span>
          </label>
        </div>
      </div>

      {/* The Multi-Camera Grid Matrix */}
      <div className={`grid gap-3.5 ${gridClasses}`}>
        {Array.from({ length: cellCount }).map((_, index) => {
          const assignedId = cellCamIds[index] || cameras[index % cameras.length]?.id;
          const assignedCam =
            cameras.find((c) => c.id === assignedId) || cameras[index % cameras.length];

          const isTestWatchlistCam = assignedCam?.id === "CAM-SRT-001" || assignedCam?.id === "CAM-AMD-001";

          return (
            <div
              key={index}
              className="relative flex flex-col bg-police-900 rounded-xl border border-police-700/80 overflow-hidden shadow-xl"
            >
              {/* Cell Header Selector */}
              <div className="px-2.5 py-1.5 bg-police-850 border-b border-police-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5 truncate max-w-[70%]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <select
                    value={assignedCam?.id}
                    onChange={(e) => handleAssignCamera(index, e.target.value)}
                    className="bg-transparent text-slate-200 font-semibold font-mono text-[11px] truncate focus:outline-none cursor-pointer"
                  >
                    {availableCameras.map((c) => (
                      <option key={c.id} value={c.id} className="bg-police-900 text-white">
                        [{c.id}] {c.name} ({c.district})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-400">
                  <span className="px-1.5 py-0.2 rounded bg-police-800 text-blue-300">
                    {assignedCam?.codec}
                  </span>
                  <span>{assignedCam?.vmsVendor}</span>
                </div>
              </div>

              {/* Canvas Player */}
              {assignedCam ? (
                <CanvasCCTVPlayer
                  camera={assignedCam}
                  targetPlate={targetPlate}
                  isWatchlistAlert={isTestWatchlistCam}
                  showAiOverlays={showAiOverlays}
                  showOsd={showOsd}
                  height={playerHeight}
                />
              ) : (
                <div
                  style={{ height: playerHeight }}
                  className="flex items-center justify-center text-xs text-slate-500 font-mono"
                >
                  No feed configured
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
