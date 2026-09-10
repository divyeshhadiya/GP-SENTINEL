"use client";

import React, { useState, useEffect } from "react";
import { vmsAdapters } from "@/data/vmsAdapters";
import { VMSAdapterConfig } from "@/types";
import { Network, Server, RefreshCw, CheckCircle2, ShieldCheck, Activity, Terminal } from "lucide-react";

export default function FederationPage() {
  const [adapters, setAdapters] = useState<VMSAdapterConfig[]>(vmsAdapters);
  const [logs, setLogs] = useState<string[]>([
    "[" + new Date().toISOString() + "] [GENETEC-ADAPTER] Ingested 18,400 cameras across GIDC Industrial Estates",
    "[" + new Date().toISOString() + "] [MILESTONE-ADAPTER] Active session with Surat Netram Core (14,200 cams)",
    "[" + new Date().toISOString() + "] [HIKVISION-CENTRAL] Polling 12,000 GSRTC Bus Station RTSP endpoints",
    "[" + new Date().toISOString() + "] [DAHUA-DSS] Municipal Smart City feeds synced (16,000 cams)",
    "[" + new Date().toISOString() + "] [EVENT-BUS] Normalized schema validation: 100% compliant with Gujarat Police Model 3"
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const randomVendor = adapters[Math.floor(Math.random() * adapters.length)];
      const eventTypes = ["ANPR_SIGHTING", "CONGESTION_ALERT", "SPEED_VIOLATION", "MOTION_TRIGGER"];
      const chosenEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const randomPlate = `GJ-${String(Math.floor(Math.random() * 38) + 1).padStart(2, "0")}-${String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
      )}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newLog = `[${new Date().toISOString()}] [${randomVendor.vendorName.toUpperCase()}] Event Dispatched: ${chosenEvent} | Target: ${randomPlate} | Kafka Latency: ${randomVendor.latencyMs}ms`;

      setLogs((prev) => [newLog, ...prev.slice(0, 14)]);
    }, 2800);

    return () => clearInterval(timer);
  }, [adapters]);

  const handleSimulateSync = () => {
    setAdapters((prev) =>
      prev.map((a) => ({
        ...a,
        latencyMs: Math.floor(15 + Math.random() * 25)
      }))
    );
    setLogs((prev) => [
      `[${new Date().toISOString()}] [MANUAL-RESYNC] Initiated handshake re-calibration across 6 VMS clusters`,
      ...prev
    ]);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 font-bold">
              Model 3: VMS Federation & Middleware
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-1">
            Multi-Vendor VMS Federation Middleware & Event Exchange Bus
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Decoupled adapter framework integrating Milestone, Genetec, Hikvision, Dahua, Matrix, and Honeywell into a unified Gujarat Police JSON-LD event schema.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <div className="bg-slate-100 dark:bg-police-850 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-police-800 text-emerald-700 dark:text-emerald-400 flex items-center space-x-1.5 font-bold">
            <Activity className="w-3.5 h-3.5" />
            <span>Bus Active (Kafka / RabbitMQ)</span>
          </div>
        </div>
      </div>

      {/* Multi-Vendor Adapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {adapters.map((adapter) => (
          <div
            key={adapter.id}
            className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-xl space-y-3 relative overflow-hidden transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
                {adapter.id}
              </span>
              <span
                className={`font-mono text-[10px] px-2 py-0.5 rounded flex items-center space-x-1 ${
                  adapter.status === "Connected"
                    ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                    : "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                <span>{adapter.status}</span>
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{adapter.vendorName}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{adapter.department}</p>
            </div>

            <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-mono text-[11px] bg-slate-50 dark:bg-police-850 p-2.5 rounded-lg border border-slate-200 dark:border-police-750">
              <div className="flex justify-between">
                <span className="text-slate-500">Protocol:</span>
                <span className="text-slate-900 dark:text-slate-200 font-semibold">{adapter.protocol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Auth:</span>
                <span className="text-slate-900 dark:text-slate-200 font-semibold">{adapter.authType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Connected Cams:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{adapter.connectedCameras} Streams</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sync Latency:</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">{adapter.latencyMs} ms</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-police-700">
                <span className="text-slate-500">Kafka Topic:</span>
                <span className="text-slate-600 dark:text-slate-400 truncate max-w-[140px] text-[10px]">{adapter.eventBusTopic}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Real-Time Event Bus Terminal Stream */}
      <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl overflow-hidden shadow-2xl transition-colors">
        <div className="px-4 py-2.5 bg-slate-100 dark:bg-police-850 border-b border-slate-200 dark:border-police-800 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Live Normalized Metadata Exchange Bus (JSON-LD Ingestion Stream)</span>
          </span>
          <button
            onClick={handleSimulateSync}
            className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-200 dark:bg-police-800 hover:bg-slate-300 dark:hover:bg-police-750 text-slate-700 dark:text-slate-200 text-xs font-mono transition-all"
          >
            <RefreshCw className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            <span>Test Handshake</span>
          </button>
        </div>

        <div className="p-4 bg-slate-900 font-mono text-xs text-emerald-400 space-y-1.5 max-h-72 overflow-y-auto">
          {logs.map((log, idx) => (
            <div key={idx} className="leading-relaxed">
              <span className="text-slate-500 select-none mr-2">&gt;</span>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
