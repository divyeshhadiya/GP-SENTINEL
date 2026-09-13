"use client";

import React, { useState } from "react";
import { VehicleSighting, WatchlistEntry } from "@/types";
import { getVehicleSightings } from "@/data/vehicleSightings";
import { initialWatchlist } from "@/data/watchlists";
import RoutePlaybackMap from "@/components/gis/RoutePlaybackMap";
import EvidentiaryDossierModal from "./EvidentiaryDossierModal";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  Navigation,
  ShieldAlert,
  Clock,
  Gauge,
  MapPin,
  FileText,
  Radio,
  CheckCircle,
  AlertCircle,
  Car,
  Printer,
  Download
} from "lucide-react";
import { alertAudio } from "@/utils/audio";

export default function VehicleTracker() {
  const { user } = useAuth();
  const [searchPlate, setSearchPlate] = useState("GJ-01-AB-1234");
  const [activePlate, setActivePlate] = useState("GJ-01-AB-1234");
  const [sightings, setSightings] = useState<VehicleSighting[]>(() =>
    getVehicleSightings("GJ-01-AB-1234")
  );
  const [selectedCheckpointIndex, setSelectedCheckpointIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"MAP" | "TIMELINE">("MAP");
  const [isDispatched, setIsDispatched] = useState(false);
  const [showDossierModal, setShowDossierModal] = useState(false);

  const handleSearch = (plateToSearch: string) => {
    const clean = plateToSearch.toUpperCase().trim();
    if (!clean) return;
    setActivePlate(clean);
    const results = getVehicleSightings(clean);
    setSightings(results);
    setSelectedCheckpointIndex(0);
    setIsDispatched(false);

    const match = initialWatchlist.find(
      (w) => w.identifier.toUpperCase().replace(/[^A-Z0-9]/g, "") === clean.replace(/[^A-Z0-9]/g, "")
    );
    if (match) {
      alertAudio.playCriticalAlert();
    } else {
      alertAudio.playNotificationPing();
    }
  };

  const currentMatch = initialWatchlist.find(
    (w) => w.identifier.toUpperCase().replace(/[^A-Z0-9]/g, "") === activePlate.replace(/[^A-Z0-9]/g, "")
  );

  const firstSighting = sightings[0];
  const lastSighting = sightings[sightings.length - 1];
  const avgSpeed = Math.round(
    sightings.reduce((acc, curr) => acc + curr.speedKmh, 0) / (sightings.length || 1)
  );

  return (
    <div className="space-y-5">
      {/* Top Search & Scenario Presets */}
      <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-700/80 rounded-xl p-4 shadow-xl transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Navigation className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-wide">
                Statewide Vehicle Movement Tracing & Forensic Trajectory
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-500/40 font-bold">
                Evaluation Test Scenario
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Enter any vehicle registration number to reconstruct its complete chronological route across the 50+ camera grid.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                value={searchPlate}
                onChange={(e) => setSearchPlate(e.target.value)}
                placeholder="e.g. GJ-01-AB-1234"
                className="bg-slate-50 dark:bg-police-800 border border-slate-300 dark:border-police-600 rounded-lg px-3.5 py-2 text-sm text-slate-900 dark:text-white font-mono uppercase tracking-wider focus:outline-none focus:border-blue-500 w-full sm:w-56"
                onKeyDown={(e) => e.key === "Enter" && handleSearch(searchPlate)}
              />
            </div>
            <button
              onClick={() => handleSearch(searchPlate)}
              className="flex items-center justify-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shrink-0 min-h-[38px]"
            >
              <Search className="w-4 h-4" />
              <span>Trace Vehicle</span>
            </button>
          </div>
        </div>

        {/* Evaluation Quick Presets */}
        <div className="mt-3.5 pt-3 border-t border-slate-200 dark:border-police-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px] mr-1">Designated Test Plates:</span>
          <button
            onClick={() => {
              setSearchPlate("GJ-01-AB-1234");
              handleSearch("GJ-01-AB-1234");
            }}
            className="px-2.5 py-1.5 rounded bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-500/60 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900 font-mono text-xs flex items-center space-x-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>GJ-01-AB-1234 (VAHAN Stolen Creta)</span>
          </button>

          <button
            onClick={() => {
              setSearchPlate("GJ-05-CD-5678");
              handleSearch("GJ-05-CD-5678");
            }}
            className="px-2.5 py-1.5 rounded bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-500/60 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900 font-mono text-xs flex items-center space-x-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>GJ-05-CD-5678 (Surat RTO Blacklisted)</span>
          </button>

          <button
            onClick={() => {
              setSearchPlate("GJ-27-XY-9012");
              handleSearch("GJ-27-XY-9012");
            }}
            className="px-2.5 py-1.5 rounded bg-purple-50 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-500/60 text-purple-800 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 font-mono text-xs flex items-center space-x-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <span>GJ-27-XY-9012 (Bhilad Contraband Transit)</span>
          </button>
        </div>
      </div>

      {/* Watchlist Cross-Referencing Alert Banner */}
      {currentMatch && (
        <div className="bg-red-50 dark:bg-red-950/70 border-2 border-red-500 rounded-xl p-4 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-600 text-white font-mono text-[10px] font-black px-3 py-0.5 rounded-bl-lg tracking-wider uppercase">
            ACTIVE WATCHLIST HIT
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-600/30 border border-red-500 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-400 animate-pulse" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-extrabold text-red-900 dark:text-white">
                    {currentMatch.source} ALERT: {currentMatch.category.toUpperCase()}
                  </h3>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-red-600 text-white font-black">
                    {currentMatch.identifier}
                  </span>
                </div>
                <p className="text-xs text-red-800 dark:text-red-200 mt-0.5">{currentMatch.details}</p>
                <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] font-mono text-red-700 dark:text-red-300">
                  {currentMatch.firNumber && <span>FIR: {currentMatch.firNumber}</span>}
                  {currentMatch.policeStation && <span>PS: {currentMatch.policeStation}</span>}
                  {currentMatch.vehicleMakeModel && <span>Vehicle: {currentMatch.vehicleMakeModel}</span>}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 w-full md:w-auto">
              <button
                onClick={() => {
                  setIsDispatched(true);
                  alertAudio.playNotificationPing();
                }}
                disabled={isDispatched}
                className={`flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-lg w-full md:w-auto ${
                  isDispatched
                    ? "bg-emerald-700 text-white cursor-default"
                    : "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>{isDispatched ? "PCR Intercept Dispatched (ETA 4m)" : "Dispatch Nearest PCR Van"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trajectory Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-3 shadow-lg">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Total Camera Detections</span>
          <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-mono mt-0.5">
            {sightings.length} Nodes
          </div>
          <span className="text-[10px] text-slate-400">100% ANPR Plate Match</span>
        </div>

        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-3 shadow-lg">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Average Corridor Speed</span>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
            {avgSpeed} km/h
          </div>
          <span className="text-[10px] text-slate-400">Highway & City Mixed</span>
        </div>

        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-3 shadow-lg">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Initial Point of Sighting</span>
          <div className="text-sm font-bold text-slate-900 dark:text-white truncate mt-0.5">
            {firstSighting?.district || "N/A"}
          </div>
          <span className="text-[10px] text-slate-400 font-mono truncate block">
            {firstSighting?.cameraName.slice(0, 26)}
          </span>
        </div>

        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-3 shadow-lg">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Latest Sighting Point</span>
          <div className="text-sm font-bold text-amber-600 dark:text-amber-400 truncate mt-0.5">
            {lastSighting?.district || "N/A"} (Active)
          </div>
          <span className="text-[10px] text-slate-400 font-mono truncate block">
            {lastSighting?.cameraName.slice(0, 26)}
          </span>
        </div>
      </div>

      {/* Tabs & View Controls */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-police-800 pb-2 gap-2">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("MAP")}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex-1 sm:flex-initial text-center min-h-[36px] ${
              activeTab === "MAP"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-slate-200 dark:bg-police-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Interactive GIS Map
          </button>
          <button
            onClick={() => setActiveTab("TIMELINE")}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex-1 sm:flex-initial text-center min-h-[36px] ${
              activeTab === "TIMELINE"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-slate-200 dark:bg-police-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Chronological Timeline
          </button>
        </div>

        {/* Evidentiary Dossier Generator Button */}
        <button
          type="button"
          onClick={() => setShowDossierModal(true)}
          className="flex items-center justify-center space-x-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow-md transition-all w-full sm:w-auto min-h-[36px]"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Export Evidentiary Dossier (PDF)</span>
        </button>
      </div>

      {/* View 1: Interactive GIS Trajectory Playback */}
      {activeTab === "MAP" && (
        <div className="space-y-4">
          <RoutePlaybackMap
            sightings={sightings}
            height="500px"
            activeCheckpointIndex={selectedCheckpointIndex}
            onSelectCheckpoint={(idx) => setSelectedCheckpointIndex(idx)}
          />

          {/* Sighting Checkpoints Horizontal Slider */}
          <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-3 shadow-lg">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 font-mono flex items-center justify-between">
              <span>Chronological Checkpoint Sequence:</span>
              <span className="text-blue-600 dark:text-blue-400">Node #{selectedCheckpointIndex + 1} Selected</span>
            </div>
            <div className="flex items-center space-x-2.5 overflow-x-auto pb-1.5">
              {sightings.map((s, idx) => {
                const isSelected = selectedCheckpointIndex === idx;
                const isMatch = !!s.watchlistMatch;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedCheckpointIndex(idx)}
                    className={`shrink-0 p-2.5 rounded-lg border text-left transition-all min-w-[190px] ${
                      isSelected
                        ? "bg-blue-50 dark:bg-blue-600/20 border-blue-500 shadow-md"
                        : "bg-slate-50 dark:bg-police-850 border-slate-200 dark:border-police-800 hover:border-slate-400 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span
                        className={`px-1.5 py-0.2 rounded font-bold ${
                          isMatch
                            ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
                            : "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300"
                        }`}
                      >
                        #{idx + 1} • {s.cameraId}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {new Date(s.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{s.locationName}</div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
                      <span>{s.district}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{s.speedKmh} km/h</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* View 2: Detailed Forensic Chronological Timeline */}
      {activeTab === "TIMELINE" && (
        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-police-800 pb-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Chain of Custody Vehicle Traversal Log — {activePlate}</span>
            </h3>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Verified by Gujarat Police SCRB Video Analytics
            </span>
          </div>

          <div className="space-y-2.5">
            {sightings.map((s, idx) => (
              <div
                key={s.id}
                className="bg-slate-50 dark:bg-police-850 border border-slate-200 dark:border-police-800 rounded-lg p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-police-700 transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold font-mono text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{s.cameraId}</span>
                      <span className="text-slate-400">•</span>
                      <span className="font-bold text-slate-900 dark:text-white text-xs">{s.cameraName}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{s.locationName}, {s.district}</span>
                    </p>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
                      Heading: <span className="text-slate-700 dark:text-slate-300">{s.heading}</span> | Confidence: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{(s.confidence * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 shrink-0 text-xs font-mono">
                  <div>
                    <div className="text-slate-400 text-[10px]">Timestamp (IST)</div>
                    <div className="text-slate-800 dark:text-slate-200 font-bold">
                      {new Date(s.timestamp).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-400 text-[10px]">Speed</div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold">{s.speedKmh} km/h</div>
                  </div>

                  <div className="bg-slate-200 dark:bg-police-800 px-2.5 py-1.5 rounded border border-slate-300 dark:border-police-700 text-center">
                    <div className="text-[9px] text-slate-500 dark:text-slate-400">PTS Monotonic</div>
                    <div className="text-blue-700 dark:text-cyan-400 font-bold text-[11px]">{s.ptsMs} ms</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evidentiary Dossier Modal */}
      <EvidentiaryDossierModal
        isOpen={showDossierModal}
        onClose={() => setShowDossierModal(false)}
        plate={activePlate}
        sightings={sightings}
        watchlistMatch={currentMatch}
        officerName={user?.name || "Dr. Vikas Sahay, IPS"}
        badgeId={user?.badgeId || "GP-DGP-01"}
      />
    </div>
  );
}
