"use client";

import React from "react";
import { Check } from "lucide-react";

export type MapViewType = "default" | "satellite" | "dark";

interface Props {
  currentType: MapViewType;
  onChange: (type: MapViewType) => void;
  className?: string;
}

export default function MapTypeSelector({ currentType, onChange, className = "" }: Props) {
  return (
    <div
      className={`bg-white/95 dark:bg-police-900/95 backdrop-blur-md p-2 rounded-xl border border-slate-200 dark:border-police-700 shadow-xl z-[1000] text-xs font-sans ${className}`}
    >
      <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mb-1.5 px-0.5 tracking-tight">
        Map type
      </div>

      <div className="flex items-center space-x-2.5">
        {/* 1. Default (Street / Roads) */}
        <button
          type="button"
          onClick={() => onChange("default")}
          className="flex flex-col items-center group cursor-pointer focus:outline-none"
          title="Default Street Map"
        >
          <div
            className={`relative w-10 h-10 rounded-xl overflow-hidden border-2 transition-all p-0.5 ${
              currentType === "default"
                ? "border-[#0097a7] shadow-[0_0_8px_rgba(0,151,167,0.4)]"
                : "border-slate-300 dark:border-police-700 opacity-70 group-hover:opacity-100"
            }`}
          >
            {/* Styled vector street map thumbnail preview */}
            <div className="w-full h-full rounded-lg bg-[#e0f2fe] relative overflow-hidden flex items-center justify-center">
              {/* Landmass */}
              <div className="absolute right-0 top-0 bottom-0 w-6 bg-[#f1f5f9] rounded-l-full"></div>
              {/* Road line */}
              <div className="absolute w-10 h-1.5 bg-[#64748b] rotate-[-25deg]"></div>
              {/* Secondary road */}
              <div className="absolute w-7 h-1 bg-[#94a3b8] rotate-[45deg]"></div>
              {/* Coastline sand */}
              <div className="absolute left-2.5 top-1.5 w-1 h-5 bg-[#fde68a] rounded-full"></div>
            </div>

            {/* Checkbox badge indicator when selected */}
            {currentType === "default" && (
              <div className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-[#0097a7] text-white flex items-center justify-center shadow-sm">
                <Check className="w-2 h-2 stroke-[3]" />
              </div>
            )}
          </div>
          <span
            className={`text-[10px] font-medium mt-1 transition-colors ${
              currentType === "default"
                ? "text-[#0097a7] dark:text-[#26c6da] font-bold"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Default
          </span>
        </button>

        {/* 2. Satellite (ESRI Aerial World Imagery) */}
        <button
          type="button"
          onClick={() => onChange("satellite")}
          className="flex flex-col items-center group cursor-pointer focus:outline-none"
          title="Aerial Satellite Map"
        >
          <div
            className={`relative w-10 h-10 rounded-xl overflow-hidden border-2 transition-all p-0.5 ${
              currentType === "satellite"
                ? "border-[#0097a7] shadow-[0_0_8px_rgba(0,151,167,0.4)]"
                : "border-slate-300 dark:border-police-700 opacity-70 group-hover:opacity-100"
            }`}
          >
            {/* Styled satellite aerial photo thumbnail preview */}
            <div className="w-full h-full rounded-lg bg-[#243024] relative overflow-hidden flex items-center justify-center">
              {/* Highway flyover dark asphalt */}
              <div className="absolute w-12 h-2 bg-[#475569] rotate-[-30deg]"></div>
              <div className="absolute w-8 h-1.5 bg-[#334155] rotate-[35deg]"></div>
              {/* White lane dash */}
              <div className="absolute w-10 h-0.5 border-t border-dashed border-white/60 rotate-[-30deg]"></div>
              {/* Surrounding green terrain patches */}
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#14532d] rounded-tl-lg opacity-80"></div>
              <div className="absolute top-0 left-0 w-3 h-3 bg-[#1e3a1e] rounded-br-lg opacity-80"></div>
            </div>

            {/* Checkbox badge indicator when selected */}
            {currentType === "satellite" && (
              <div className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-[#0097a7] text-white flex items-center justify-center shadow-sm">
                <Check className="w-2 h-2 stroke-[3]" />
              </div>
            )}
          </div>
          <span
            className={`text-[10px] font-medium mt-1 transition-colors ${
              currentType === "satellite"
                ? "text-[#0097a7] dark:text-[#26c6da] font-bold"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Satellite
          </span>
        </button>

        {/* 3. Dark Tactical */}
        <button
          type="button"
          onClick={() => onChange("dark")}
          className="flex flex-col items-center group cursor-pointer focus:outline-none"
          title="Dark Night Tactical Map"
        >
          <div
            className={`relative w-10 h-10 rounded-xl overflow-hidden border-2 transition-all p-0.5 ${
              currentType === "dark"
                ? "border-[#0097a7] shadow-[0_0_8px_rgba(0,151,167,0.4)]"
                : "border-slate-300 dark:border-police-700 opacity-70 group-hover:opacity-100"
            }`}
          >
            {/* Styled dark tactical map thumbnail preview */}
            <div className="w-full h-full rounded-lg bg-[#070c18] relative overflow-hidden flex items-center justify-center">
              {/* Glowing tactical road lines */}
              <div className="absolute w-10 h-1 bg-[#1e3a8a] rotate-[-20deg]"></div>
              <div className="absolute w-7 h-1 bg-[#0284c7] rotate-[40deg]"></div>
              {/* Camera node dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_#06b6d4]"></div>
            </div>

            {/* Checkbox badge indicator when selected */}
            {currentType === "dark" && (
              <div className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-[#0097a7] text-white flex items-center justify-center shadow-sm">
                <Check className="w-2 h-2 stroke-[3]" />
              </div>
            )}
          </div>
          <span
            className={`text-[10px] font-medium mt-1 transition-colors ${
              currentType === "dark"
                ? "text-[#0097a7] dark:text-[#26c6da] font-bold"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Dark
          </span>
        </button>
      </div>
    </div>
  );
}
