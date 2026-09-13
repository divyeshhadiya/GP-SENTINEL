"use client";

import React, { useState, useEffect } from "react";
import { initialAlerts } from "@/data/watchlists";
import { AlertEvent } from "@/types";
import { alertAudio } from "@/utils/audio";
import {
  AlertTriangle,
  Radio,
  Car,
  MapPin,
  Clock,
  Shield,
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertEvent[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<AlertEvent | null>(null);

  useEffect(() => {
    fetch("/api/alerts")
      .then((res) => res.json())
      .then((data) => {
        if (data.alerts) {
          setAlerts(data.alerts);
          if (data.alerts.length > 0) setSelectedAlert(data.alerts[0]);
        }
      })
      .catch(() => {
        setAlerts(initialAlerts);
        setSelectedAlert(initialAlerts[0]);
      });
  }, []);

  const handleUpdateStatus = (
    alertId: string,
    newStatus: "ACKNOWLEDGED" | "DISPATCHED" | "RESOLVED" | "FALSE_POSITIVE"
  ) => {
    setAlerts((prev) =>
      prev.map((alt) => {
        if (alt.id === alertId) {
          const updated: AlertEvent = {
            ...alt,
            status: newStatus,
            dispatchedUnit:
              newStatus === "DISPATCHED"
                ? {
                    unitId: "PCR-SURAT-14",
                    unitName: "Surat City Netram Intercept Unit 14",
                    dispatchedAt: new Date().toISOString(),
                    etaMinutes: 4
                  }
                : alt.dispatchedUnit
          };
          if (selectedAlert?.id === alertId) setSelectedAlert(updated);
          return updated;
        }
        return alt;
      })
    );
    alertAudio.playNotificationPing();
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-500/30 font-bold">
              State Police Incident Command
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-1">
            Real-Time Law Enforcement Incident & Alert Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Automated alerts generated from continuous live CCTV cross-referencing with PCR patrol dispatching.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-950/70 border border-red-300 dark:border-red-500/50 text-red-800 dark:text-red-300 font-bold flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>{alerts.filter((a) => a.status === "NEW").length} UNRESOLVED CRITICAL ALERTS</span>
          </span>
        </div>
      </div>

      {/* Main Alert Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Active Alerts Stream (5 Columns) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
            Incident Queue ({alerts.length} Events)
          </div>

          <div className="space-y-2.5">
            {alerts.map((alt) => {
              const isSelected = selectedAlert?.id === alt.id;
              return (
                <div
                  key={alt.id}
                  onClick={() => setSelectedAlert(alt)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-blue-50 dark:bg-police-800 border-blue-500 shadow-xl"
                      : "bg-white dark:bg-police-900 border-slate-200 dark:border-police-800 hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-mono font-black text-red-600 dark:text-red-400 flex items-center space-x-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                      <span>{alt.watchlistEntry.category.toUpperCase()}</span>
                    </span>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                        alt.status === "NEW"
                          ? "bg-red-600 text-white animate-pulse"
                          : alt.status === "DISPATCHED"
                          ? "bg-blue-600 text-white"
                          : "bg-emerald-700 text-white"
                      }`}
                    >
                      {alt.status}
                    </span>
                  </div>

                  <div className="font-mono text-sm font-black text-slate-900 dark:text-white">
                    {alt.registrationNumber}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-1">
                    {alt.cameraName}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2 pt-2 border-t border-slate-100 dark:border-police-800 font-mono">
                    <span>{alt.locationName}</span>
                    <span>
                      {new Date(alt.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Alert Detail & Dispatch Console (7 Columns) */}
        {selectedAlert && (
          <div className="lg:col-span-7 bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-2xl p-5 shadow-2xl space-y-4 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-police-800 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 font-bold">
                    {selectedAlert.id}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Source: {selectedAlert.watchlistEntry.source}
                  </span>
                </div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  Target Hit: {selectedAlert.registrationNumber} ({selectedAlert.watchlistEntry.category})
                </h2>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono block">DETECTION TIME</span>
                <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  {new Date(selectedAlert.timestamp).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Sighting Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-police-850 p-3.5 rounded-xl border border-slate-200 dark:border-police-750">
              <div>
                <span className="text-slate-500 text-[10px] block">DETECTING CAMERA</span>
                <span className="font-bold text-slate-900 dark:text-white block">{selectedAlert.cameraName}</span>
                <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">ID: {selectedAlert.cameraId}</span>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] block">LOCATION COORDINATES</span>
                <span className="font-bold text-slate-900 dark:text-white block">{selectedAlert.locationName}</span>
                <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                  {selectedAlert.coordinates[0].toFixed(4)}°N, {selectedAlert.coordinates[1].toFixed(4)}°E
                </span>
              </div>

              <div className="sm:col-span-2 pt-2 border-t border-slate-200 dark:border-police-700">
                <span className="text-slate-500 text-[10px] block">INVESTIGATION INTELLIGENCE</span>
                <p className="text-slate-700 dark:text-slate-300 mt-0.5">{selectedAlert.watchlistEntry.details}</p>
                <div className="flex flex-wrap items-center gap-3 mt-1.5 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                  {selectedAlert.watchlistEntry.firNumber && (
                    <span>FIR: <strong className="text-slate-900 dark:text-slate-200">{selectedAlert.watchlistEntry.firNumber}</strong></span>
                  )}
                  {selectedAlert.watchlistEntry.policeStation && (
                    <span>PS: <strong className="text-slate-900 dark:text-slate-200">{selectedAlert.watchlistEntry.policeStation}</strong></span>
                  )}
                  {selectedAlert.watchlistEntry.registeredOwner && (
                    <span>Owner: <strong className="text-slate-900 dark:text-slate-200">{selectedAlert.watchlistEntry.registeredOwner}</strong></span>
                  )}
                </div>
              </div>
            </div>

            {/* Dispatched Patrol Unit Telemetry */}
            {selectedAlert.dispatchedUnit ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/60 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      Dispatched Unit: {selectedAlert.dispatchedUnit.unitName}
                    </div>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400/80 font-mono">
                      Unit ID: {selectedAlert.dispatchedUnit.unitId} • Status: En-Route Intercept
                    </div>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400/80 font-mono block">ESTIMATED ARRIVAL</span>
                  <span className="text-sm font-black text-emerald-800 dark:text-emerald-300 font-mono">
                    {selectedAlert.dispatchedUnit.etaMinutes} Minutes ETA
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 dark:bg-police-850 p-3.5 rounded-xl border border-slate-200 dark:border-police-750 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white block">Nearest Patrol Unit Available:</strong>
                  <span>Surat City Quick Response Team PCR-12 (Distance: 1.8 km)</span>
                </div>

                <button
                  onClick={() => handleUpdateStatus(selectedAlert.id, "DISPATCHED")}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center justify-center space-x-1.5 w-full sm:w-auto"
                >
                  <Radio className="w-3.5 h-3.5" />
                  <span>Dispatch PCR Unit</span>
                </button>
              </div>
            )}

            {/* Command Actions Bar */}
            <div className="pt-3 border-t border-slate-200 dark:border-police-800 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleUpdateStatus(selectedAlert.id, "ACKNOWLEDGED")}
                  className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-police-800 hover:bg-slate-200 dark:hover:bg-police-750 text-slate-800 dark:text-slate-300 text-xs font-mono border border-slate-200 dark:border-police-700 transition-colors flex-1 sm:flex-initial text-center"
                >
                  Acknowledge Incident
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedAlert.id, "RESOLVED")}
                  className="px-3 py-2 rounded-lg bg-emerald-600 dark:bg-emerald-700/80 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-colors flex-1 sm:flex-initial text-center"
                >
                  Mark Resolved
                </button>
              </div>

              <button
                onClick={() => handleUpdateStatus(selectedAlert.id, "FALSE_POSITIVE")}
                className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-300 text-xs font-mono border border-slate-200 dark:border-slate-700 transition-colors w-full sm:w-auto text-center"
              >
                False Positive
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
