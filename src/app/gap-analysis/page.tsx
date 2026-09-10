"use client";

import React, { useState, useEffect, useRef } from "react";
import { GapAnalysisReport } from "@/types";
import PoliceLogo from "@/components/common/PoliceLogo";
import {
  PieChart,
  AlertTriangle,
  ShieldAlert,
  HardDrive,
  Clock,
  Download,
  CheckCircle2,
  Filter,
  FileSpreadsheet,
  Printer
} from "lucide-react";

export default function GapAnalysisPage() {
  const [reports, setReports] = useState<GapAnalysisReport[]>([]);
  const [loading, setLoading] = useState(true);
  const printableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/gap-analysis")
      .then((res) => res.json())
      .then((data) => {
        if (data.reports) {
          setReports(data.reports);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReport = () => {
    if (!printableRef.current) return;
    const content = printableRef.current.innerHTML;
    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Gujarat Police CCTV Gap Analysis Report 2026</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #111827; background: #ffffff; }
          .header { text-align: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 15px; margin-bottom: 25px; }
          .title { font-size: 20px; font-weight: bold; color: #1e3a8a; text-transform: uppercase; margin-top: 5px; }
          .subtitle { font-size: 13px; color: #4b5563; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
          th, td { border: 1px solid #d1d5db; padding: 8px 10px; text-align: left; }
          th { background: #f3f4f6; font-weight: bold; }
          .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; }
          .badge-high { background: #fee2e2; color: #991b1b; }
          .badge-med { background: #fef3c7; color: #92400e; }
          .badge-low { background: #d1fae5; color: #065f46; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="subtitle">GOVERNMENT OF GUJARAT • HOME DEPARTMENT</div>
          <div class="title">Statewide CCTV Surveillance Gap Analysis & Infrastructure Audit</div>
          <div class="subtitle">State Crime Record Bureau (SCRB) • Police Bhawan, Gandhinagar</div>
        </div>
        ${content}
      </body>
      </html>
    `;

    const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `GUJARAT_POLICE_CCTV_GAP_ANALYSIS_${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const highRiskCount = reports.filter((r) => r.riskScore === "HIGH").length;
  const totalBlindspots = reports.reduce((acc, r) => acc + r.blindspotCount, 0);
  const totalAging = reports.reduce((acc, r) => acc + r.agingCamerasCount, 0);

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 font-bold">
              Model 1 Deliverable: Infrastructure Intelligence
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-1">
            Statewide CCTV Gap Analysis & Infrastructure Assessment
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            District-wise evaluation of surveillance blindspots, retention shortfalls, and aging camera assets.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold shadow-md transition-all shrink-0"
          >
            <Printer className="w-3.5 h-3.5 text-blue-400" />
            <span>Print Report</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download Audit Dossier (HTML/PDF)</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>High Vulnerability Districts</span>
            <ShieldAlert className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-black text-red-600 dark:text-red-400 font-mono mt-1">
            {highRiskCount} <span className="text-xs text-slate-400 font-normal">/ {reports.length} Assessed</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Dahod border, Valsad coastal corridor, and Ahmedabad industrial pockets.
          </p>
        </div>

        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Identified Blindspots</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono mt-1">
            {totalBlindspots} <span className="text-xs text-slate-400 font-normal">Strategic Gaps</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Priority candidate locations for upcoming statewide camera tenders.
          </p>
        </div>

        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>Aging Infrastructure (&gt;5 Years)</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono mt-1">
            {totalAging} <span className="text-xs text-slate-400 font-normal">Legacy Nodes</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Older analog and 720p hardware scheduled for IP / 4K replacement.
          </p>
        </div>
      </div>

      {/* District Gap Analysis Audit Table */}
      <div
        className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl overflow-hidden shadow-xl"
        ref={printableRef}
      >
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-police-850 border-b border-slate-200 dark:border-police-800 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900 dark:text-slate-200">
            District-Wise Strategic Assessment Matrix
          </span>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Audit Standard: Gujarat Home Dept Security Guideline 2026
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-police-800/80 text-[11px] text-slate-600 dark:text-slate-400 uppercase font-mono border-b border-slate-200 dark:border-police-700">
              <tr>
                <th className="p-3">District</th>
                <th className="p-3">Connected Nodes</th>
                <th className="p-3">ANPR Density</th>
                <th className="p-3">Aging Nodes (&gt;5y)</th>
                <th className="p-3">Low Retention (&lt;15d)</th>
                <th className="p-3">Identified Critical Blindspots</th>
                <th className="p-3 text-right">Risk Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-police-800">
              {reports.map((r) => (
                <tr key={r.district} className="hover:bg-slate-50 dark:hover:bg-police-800/60 transition-colors">
                  <td className="p-3 font-bold text-slate-900 dark:text-white text-xs">{r.district}</td>
                  <td className="p-3 font-mono text-blue-600 dark:text-blue-400 font-bold">{r.totalCameras} Cams</td>
                  <td className="p-3 font-mono">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-blue-500 h-full rounded-full"
                          style={{ width: `${r.anprCoveragePct}%` }}
                        ></div>
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">{r.anprCoveragePct}%</span>
                    </div>
                  </td>
                  <td className="p-3 font-mono">
                    <span className={r.agingCamerasCount > 0 ? "text-amber-600 dark:text-amber-400 font-bold" : "text-slate-400"}>
                      {r.agingCamerasCount}
                    </span>
                  </td>
                  <td className="p-3 font-mono">
                    <span className={r.lowRetentionCount > 0 ? "text-red-600 dark:text-red-400 font-bold" : "text-slate-400"}>
                      {r.lowRetentionCount}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-300 text-[11px] max-w-sm">
                    <ul className="list-disc list-inside space-y-0.5 text-slate-500 dark:text-slate-400">
                      {r.criticalGaps.map((gap, i) => (
                        <li key={i}>{gap}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3 text-right">
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                        r.riskScore === "HIGH"
                          ? "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700"
                          : r.riskScore === "MEDIUM"
                          ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700"
                          : "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                      }`}
                    >
                      {r.riskScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
