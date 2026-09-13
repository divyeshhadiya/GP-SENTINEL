"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { initialCameras } from "@/data/cameras";
import { initialWatchlist } from "@/data/watchlists";
import GujaratGisMap from "@/components/gis/GujaratGisMap";
import CanvasCCTVPlayer from "@/components/video/CanvasCCTVPlayer";
import {
  Shield,
  Video,
  Navigation,
  AlertTriangle,
  Layers,
  Activity,
  CheckCircle2,
  Radio,
  ArrowRight,
  Database,
  ExternalLink,
  Zap,
  Loader2
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isAuthLoading } = useAuth();
  const [cameras, setCameras] = useState(initialCameras);
  const [selectedCamera, setSelectedCamera] = useState(initialCameras[0]);

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  if (isAuthLoading || !isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center shadow-lg animate-pulse">
          <Shield className="w-7 h-7 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center space-x-2 text-slate-800 dark:text-white font-bold text-sm">
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            <span>State Command Grid Security Gateway</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Redirecting to Gujarat Police Officer Login Portal...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white dark:bg-gradient-to-r dark:from-police-850 dark:via-police-900 dark:to-police-850 border border-slate-200 dark:border-police-700/80 rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden transition-colors">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 font-mono text-xs font-bold border border-blue-200 dark:border-blue-500/30">
                GUJARAT POLICE SENTINEL
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">• State Command Center</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Integrated Video Intelligence & Multi-Department Command Platform
            </h1>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-1.5 max-w-3xl leading-relaxed">
              Real-time federation of heterogeneous CCTV systems across 26 Gujarat Government departments.
              Continuous AI-powered ANPR cross-referencing with <span className="text-blue-600 dark:text-blue-400 font-semibold">VAHAN</span> and <span className="text-blue-600 dark:text-blue-400 font-semibold">eGujCop</span>, automated PCR dispatch, and forensic vehicle route reconstruction.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/vehicle-tracking"
              className="flex items-center space-x-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
            >
              <Navigation className="w-4 h-4" />
              <span>Launch Vehicle Tracker (Test Scenario)</span>
            </Link>

            <Link
              href="/video-wall"
              className="flex items-center space-x-1.5 px-3.5 py-2.5 bg-slate-100 dark:bg-police-800 hover:bg-slate-200 dark:hover:bg-police-750 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold border border-slate-300 dark:border-police-700 transition-all"
            >
              <Video className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Video Wall</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Statewide Mission-Critical Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-lg transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Onboarded Cameras</span>
            <Video className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">
            50 <span className="text-xs text-slate-400 font-normal">/ 80,000 Target</span>
          </div>
          <div className="flex items-center space-x-1.5 mt-2 text-[11px] text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>48 Feeds Streaming Live (TCP)</span>
          </div>
        </div>

        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-lg transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Integrated Departments</span>
            <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">
            26 <span className="text-xs text-slate-400 font-normal">State Agencies</span>
          </div>
          <div className="flex items-center space-x-1.5 mt-2 text-[11px] text-cyan-600 dark:text-cyan-400">
            <Activity className="w-3.5 h-3.5" />
            <span>Police, GSRTC, RTO, Civil, Malls</span>
          </div>
        </div>

        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-lg transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Watchlist Databases</span>
            <Database className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">
            4 <span className="text-xs text-slate-400 font-normal">Live Bridges</span>
          </div>
          <div className="flex items-center space-x-1.5 mt-2 text-[11px] text-purple-600 dark:text-purple-400">
            <Zap className="w-3.5 h-3.5" />
            <span>VAHAN • eGujCop • SARTHI • NAFIS</span>
          </div>
        </div>

        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-lg transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Critical Alerts Active</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-black text-red-600 dark:text-red-400 font-mono mt-1">
            3 <span className="text-xs text-slate-400 font-normal">High Priority</span>
          </div>
          <div className="flex items-center space-x-1.5 mt-2 text-[11px] text-red-600 dark:text-red-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Stolen Creta Tracked in Surat</span>
          </div>
        </div>
      </div>

      {/* Main Dual Operational View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Statewide GIS Grid (7 Columns) */}
        <div className="lg:col-span-7 bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-2xl p-4 shadow-xl space-y-3 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-police-800 pb-2.5">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">
                Statewide CCTV Cartography & Deployment Layer
              </h2>
            </div>
            <Link
              href="/registry"
              className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
            >
              <span>Full Registry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <GujaratGisMap
            cameras={cameras}
            selectedCamera={selectedCamera}
            onSelectCamera={(cam) => setSelectedCamera(cam)}
            height="440px"
          />
        </div>

        {/* Right: Live Selected Stream Focus & Real-Time Detections (5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-2xl p-4 shadow-xl space-y-3 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-police-800 pb-2">
              <div className="flex items-center space-x-2 truncate">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {selectedCamera.name}
                </h3>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                {selectedCamera.id}
              </span>
            </div>

            <CanvasCCTVPlayer
              camera={selectedCamera}
              targetPlate="GJ-01-AB-1234"
              isWatchlistAlert={selectedCamera.district === "Surat" || selectedCamera.district === "Ahmedabad"}
              showAiOverlays={true}
              showOsd={true}
              height="260px"
            />

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300 pt-1 font-mono">
              <div className="bg-slate-50 dark:bg-police-850 p-2 rounded border border-slate-200 dark:border-police-800">
                <span className="text-slate-400 block text-[10px]">DEPARTMENT</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">{selectedCamera.department}</span>
              </div>
              <div className="bg-slate-50 dark:bg-police-850 p-2 rounded border border-slate-200 dark:border-police-800">
                <span className="text-slate-400 block text-[10px]">VMS PLATFORM</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 truncate block">{selectedCamera.vmsVendor}</span>
              </div>
            </div>
          </div>

          {/* Real-Time ANPR Sighting Stream Feed */}
          <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-2xl p-4 shadow-xl space-y-2.5 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-police-800 pb-1.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white font-mono flex items-center space-x-1.5">
                <Activity className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Live ANPR Sighting Ticker</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Active Feed</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-500/60 p-2 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-bold text-red-800 dark:text-red-300 font-mono">GJ-01-AB-1234 (Hyundai Creta)</div>
                  <div className="text-[10px] text-red-600 dark:text-red-400">Sahara Darwaja, Surat • VAHAN STOLEN MATCH</div>
                </div>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-red-600 text-white font-bold">
                  CRITICAL
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-police-850 border border-slate-200 dark:border-police-800 p-2 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 font-mono">GJ-05-CD-5678 (Toyota Fortuner)</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Madhapar Chokdi, Rajkot • Speed 55 km/h</div>
                </div>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-600 text-white font-bold">
                  HIGH
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-police-850 border border-slate-200 dark:border-police-800 p-2 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 font-mono">GJ-27-XY-9012 (Swift Dzire)</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Kamrej Toll Plaza, Surat • Speed 72 km/h</div>
                </div>
                <span className="font-mono text-[10px] text-slate-500">9:40 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
