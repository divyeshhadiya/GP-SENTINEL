"use client";

import React from "react";
import { initialCameras } from "@/data/cameras";
import VideoGrid from "@/components/video/VideoGrid";
import { Tv, Shield, Activity, Radio, Cpu, Layers } from "lucide-react";

export default function VideoWallPage() {
  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 font-bold">
              Model 2: Unified Video Viewing & Analytics
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 font-bold">
              RTSP TCP / Monotonic PTS
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-1">
            Statewide Unified Video Wall & AI Analytics Matrix
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Aggregated multi-department video wall connecting police, transport, municipal, and commercial cameras without modifying field infrastructure.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="bg-slate-100 dark:bg-police-850 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-police-800 flex items-center space-x-2 text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Feeds:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">50 Active</span>
          </div>
          <div className="bg-slate-100 dark:bg-police-850 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-police-800 flex items-center space-x-2 text-slate-700 dark:text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Inference:</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">YOLOv10 + ANPR</span>
          </div>
        </div>
      </div>

      {/* Video Wall Grid Matrix Component */}
      <VideoGrid cameras={initialCameras} targetPlate="GJ-01-AB-1234" />
    </div>
  );
}
