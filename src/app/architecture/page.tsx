"use client";

import React, { useState } from "react";
import SizingCalculator from "@/components/architecture/SizingCalculator";
import PresentationDeck from "@/components/architecture/PresentationDeck";
import { Cpu, Presentation, Layers } from "lucide-react";

export default function ArchitecturePage() {
  const [activeTab, setActiveTab] = useState<"SIZING" | "PRESENTATION" | "HLD">("SIZING");

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 font-bold">
              Technical Proposal & Submission Dossier
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-1">
            High-Level Design (HLD), 80k Sizing & Solution Presentation
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Scalability blueprints, hardware & bandwidth sizing, disaster recovery, and the complete technical command slide deck.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-police-850 p-1.5 rounded-xl border border-slate-200 dark:border-police-800 text-xs w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("SIZING")}
            className={`px-3 py-2 rounded-lg font-bold transition-all flex items-center justify-center space-x-1.5 flex-1 sm:flex-initial min-h-[36px] ${
              activeTab === "SIZING"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>80k Sizing</span>
          </button>

          <button
            onClick={() => setActiveTab("PRESENTATION")}
            className={`px-3 py-2 rounded-lg font-bold transition-all flex items-center justify-center space-x-1.5 flex-1 sm:flex-initial min-h-[36px] ${
              activeTab === "PRESENTATION"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Presentation</span>
          </button>

          <button
            onClick={() => setActiveTab("HLD")}
            className={`px-3 py-2 rounded-lg font-bold transition-all flex items-center justify-center space-x-1.5 flex-1 sm:flex-initial min-h-[36px] ${
              activeTab === "HLD"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>HLD Blueprints</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Sizing Calculator */}
      {activeTab === "SIZING" && <SizingCalculator />}

      {/* Tab 2: Solution Presentation Deck */}
      {activeTab === "PRESENTATION" && <PresentationDeck />}

      {/* Tab 3: High-Level Design (HLD) Blueprints */}
      {activeTab === "HLD" && (
        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-6 shadow-2xl space-y-6 transition-colors">
          <div className="border-b border-slate-200 dark:border-police-800 pb-3">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
              <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Gujarat Police SENTINEL: High-Level Design Blueprint</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Architecture overview for statewide multi-department CCTV federation, AI analytics, and database integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 dark:bg-police-850 p-4 rounded-xl border border-slate-200 dark:border-police-800 space-y-2">
              <span className="font-mono text-blue-600 dark:text-blue-400 text-[10px] font-bold block uppercase">
                Phase 1: Field Edge Layer
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Decentralized Edge Gateways</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Deployed at 33 District Police Headquarters (Netram Centers). Performs local RTSP/TCP feed ingestion, motion detection, and lightweight edge ANPR plate cropping to reduce WAN bandwidth by 85%.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-police-850 p-4 rounded-xl border border-slate-200 dark:border-police-800 space-y-2">
              <span className="font-mono text-emerald-600 dark:text-emerald-400 text-[10px] font-bold block uppercase">
                Phase 2: Transport & Event Bus
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">GSWAN 10G &amp; Apache Kafka Bus</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Gujarat State Wide Area Network (GSWAN) with dedicated VLANs isolating camera streams from general internet traffic. High-throughput Kafka topics distribute normalized JSON-LD sighting events with zero loss.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-police-850 p-4 rounded-xl border border-slate-200 dark:border-police-800 space-y-2">
              <span className="font-mono text-purple-600 dark:text-purple-400 text-[10px] font-bold block uppercase">
                Phase 3: Central Command & AI
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">State Data Center (SDC) Clustered AI</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                GPU cluster (NVIDIA TensorRT) running deep re-identification, multi-camera vehicle tracking trajectory correlation, and microsecond cross-referencing against VAHAN and eGujCop databases.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
