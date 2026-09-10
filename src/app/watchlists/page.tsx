"use client";

import React, { useState } from "react";
import { initialWatchlist } from "@/data/watchlists";
import { WatchlistEntry, WatchlistSource, WatchlistCategory } from "@/types";
import {
  Database,
  Search,
  Plus,
  ShieldAlert,
  Car,
  UserX,
  FileText,
  Fingerprint,
  Radio,
  X,
  CheckCircle2
} from "lucide-react";
import { alertAudio } from "@/utils/audio";

export default function WatchlistsPage() {
  const [watchlists, setWatchlists] = useState<WatchlistEntry[]>(initialWatchlist);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState<string>("ALL");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("ALL");

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<WatchlistEntry>>({
    identifier: "",
    source: "VAHAN",
    category: "Stolen Vehicle",
    severity: "CRITICAL",
    details: "",
    firNumber: "",
    policeStation: "Navrangpura Police Station, Ahmedabad",
    vehicleMakeModel: ""
  });

  const filtered = watchlists.filter((w) => {
    if (selectedSource !== "ALL" && w.source !== selectedSource) return false;
    if (selectedSeverity !== "ALL" && w.severity !== selectedSeverity) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        w.identifier.toLowerCase().includes(q) ||
        w.details.toLowerCase().includes(q) ||
        (w.firNumber && w.firNumber.toLowerCase().includes(q)) ||
        (w.registeredOwner && w.registeredOwner.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.identifier || !newEntry.details) return;

    const entry: WatchlistEntry = {
      id: `WL-${newEntry.source?.slice(0, 4)}-${Date.now().toString().slice(-4)}`,
      identifier: newEntry.identifier.toUpperCase().trim(),
      source: newEntry.source as WatchlistSource,
      category: newEntry.category as WatchlistCategory,
      severity: (newEntry.severity as any) || "HIGH",
      details: newEntry.details,
      firNumber: newEntry.firNumber || `FIR-${Math.floor(Math.random() * 900 + 100)}/2026`,
      policeStation: newEntry.policeStation || "SCRB Gandhinagar",
      registeredOwner: newEntry.registeredOwner || "N/A",
      vehicleMakeModel: newEntry.vehicleMakeModel || "Unspecified",
      dateAdded: new Date().toISOString(),
      status: "ACTIVE"
    };

    setWatchlists([entry, ...watchlists]);
    setShowAddModal(false);
    alertAudio.playNotificationPing();
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-police-900 border border-police-800 rounded-xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Law Enforcement Database Bridges
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white mt-1">
            Integrated Watchlist Databases (VAHAN, eGujCop, SARTHI & NAFIS)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Continuous background cross-referencing between incoming CCTV feeds and state criminal & vehicle databases.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Target to Watchlist</span>
        </button>
      </div>

      {/* Database Source Quick Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setSelectedSource("VAHAN")}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedSource === "VAHAN"
              ? "bg-blue-600/20 border-blue-500 shadow-md"
              : "bg-police-900 border-police-800 hover:border-slate-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white font-mono">VAHAN Registry</span>
            <Car className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-black text-blue-400 font-mono mt-1">
            {watchlists.filter((w) => w.source === "VAHAN").length} Targets
          </div>
          <span className="text-[10px] text-slate-400">Stolen & Blacklisted Plates</span>
        </button>

        <button
          onClick={() => setSelectedSource("eGujCop")}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedSource === "eGujCop"
              ? "bg-blue-600/20 border-blue-500 shadow-md"
              : "bg-police-900 border-police-800 hover:border-slate-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white font-mono">eGujCop (CCTNS)</span>
            <UserX className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-emerald-400 font-mono mt-1">
            {watchlists.filter((w) => w.source === "eGujCop").length} Targets
          </div>
          <span className="text-[10px] text-slate-400">Wanted Criminals & Missing</span>
        </button>

        <button
          onClick={() => setSelectedSource("SARTHI")}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedSource === "SARTHI"
              ? "bg-blue-600/20 border-blue-500 shadow-md"
              : "bg-police-900 border-police-800 hover:border-slate-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white font-mono">SARTHI License</span>
            <FileText className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-black text-amber-400 font-mono mt-1">
            {watchlists.filter((w) => w.source === "SARTHI").length} Targets
          </div>
          <span className="text-[10px] text-slate-400">Revoked Driver Licenses</span>
        </button>

        <button
          onClick={() => setSelectedSource("AFIS/NAFIS")}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedSource === "AFIS/NAFIS"
              ? "bg-blue-600/20 border-blue-500 shadow-md"
              : "bg-police-900 border-police-800 hover:border-slate-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white font-mono">AFIS / NAFIS</span>
            <Fingerprint className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-black text-purple-400 font-mono mt-1">
            {watchlists.filter((w) => w.source === "AFIS/NAFIS").length} Targets
          </div>
          <span className="text-[10px] text-slate-400">Biometric Criminal Flags</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-police-900 border border-police-800 rounded-xl p-3.5 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by plate number, suspect name, FIR number..."
            className="bg-police-800 border border-police-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="bg-police-800 border border-police-700 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="ALL">All Database Sources</option>
            <option value="VAHAN">VAHAN (Vehicles)</option>
            <option value="eGujCop">eGujCop (CCTNS)</option>
            <option value="SARTHI">SARTHI (Licenses)</option>
            <option value="AFIS/NAFIS">AFIS/NAFIS (Biometrics)</option>
          </select>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-police-800 border border-police-700 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
          </select>
        </div>
      </div>

      {/* Watchlist Entries Table */}
      <div className="bg-police-900 border border-police-800 rounded-xl overflow-hidden shadow-xl">
        <div className="px-4 py-2.5 bg-police-850 border-b border-police-800 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-200">
            Active Watchlist Targets ({filtered.length} Records)
          </span>
          <span className="text-[11px] font-mono text-emerald-400">
            Auto-Cross-Referencing Enabled
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-police-800/80 text-[11px] text-slate-400 uppercase font-mono border-b border-police-700">
              <tr>
                <th className="p-3">Identifier / Target</th>
                <th className="p-3">Source & Category</th>
                <th className="p-3">Details & Case Link</th>
                <th className="p-3">Police Station / FIR</th>
                <th className="p-3">Severity</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-police-800">
              {filtered.map((entry) => (
                <tr key={entry.id} className="hover:bg-police-800/60 transition-colors">
                  <td className="p-3">
                    <div className="font-mono text-sm font-black text-white">
                      {entry.identifier}
                    </div>
                    {entry.vehicleMakeModel && (
                      <div className="text-[11px] text-slate-400">{entry.vehicleMakeModel}</div>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-1.5 font-mono text-xs font-bold text-blue-400">
                      <span>{entry.source}</span>
                    </div>
                    <div className="text-[11px] text-slate-300">{entry.category}</div>
                  </td>
                  <td className="p-3 max-w-sm">
                    <p className="text-xs text-slate-300 line-clamp-2">{entry.details}</p>
                    {entry.registeredOwner && (
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                        Owner: {entry.registeredOwner}
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-mono text-[11px]">
                    <div className="text-slate-200 font-bold">{entry.firNumber || "N/A"}</div>
                    <div className="text-slate-400 truncate max-w-[160px] text-[10px]">
                      {entry.policeStation || "Statewide"}
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
                        entry.severity === "CRITICAL"
                          ? "bg-red-950 text-red-300 border border-red-700"
                          : entry.severity === "HIGH"
                          ? "bg-amber-950 text-amber-300 border border-amber-700"
                          : "bg-blue-950 text-blue-300 border border-blue-700"
                      }`}
                    >
                      {entry.severity}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <span className="inline-flex items-center space-x-1 font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>ACTIVE</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-police-900 border border-police-700 rounded-2xl max-w-lg w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-police-800 pb-2">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Plus className="w-4 h-4 text-blue-400" />
                <span>Add Target to Active Watchlist</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">
                  Target Identifier (Vehicle Plate or Suspect Name)
                </label>
                <input
                  type="text"
                  required
                  value={newEntry.identifier}
                  onChange={(e) => setNewEntry({ ...newEntry, identifier: e.target.value })}
                  placeholder="e.g. GJ-01-XX-9999 or Suspect Full Name"
                  className="w-full bg-police-800 border border-police-700 rounded-lg p-2 text-white font-mono uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Database Source</label>
                  <select
                    value={newEntry.source}
                    onChange={(e) => setNewEntry({ ...newEntry, source: e.target.value as any })}
                    className="w-full bg-police-800 border border-police-700 rounded-lg p-2 text-white"
                  >
                    <option value="VAHAN">VAHAN (National Vehicle DB)</option>
                    <option value="eGujCop">eGujCop (Gujarat Police CCTNS)</option>
                    <option value="SARTHI">SARTHI (License DB)</option>
                    <option value="Police Hotlist">Police Special Hotlist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={newEntry.category}
                    onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value as any })}
                    className="w-full bg-police-800 border border-police-700 rounded-lg p-2 text-white"
                  >
                    <option value="Stolen Vehicle">Stolen Vehicle</option>
                    <option value="Blacklisted RC">Blacklisted RC</option>
                    <option value="Wanted Criminal">Wanted Criminal</option>
                    <option value="Missing Person">Missing Person</option>
                    <option value="Absconder">Absconder</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Investigation Details / Reason</label>
                <textarea
                  required
                  rows={2}
                  value={newEntry.details}
                  onChange={(e) => setNewEntry({ ...newEntry, details: e.target.value })}
                  placeholder="Describe the incident, warrant status, and reason for surveillance..."
                  className="w-full bg-police-800 border border-police-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">FIR / Crime Reference No.</label>
                  <input
                    type="text"
                    value={newEntry.firNumber}
                    onChange={(e) => setNewEntry({ ...newEntry, firNumber: e.target.value })}
                    placeholder="FIR-889/2026"
                    className="w-full bg-police-800 border border-police-700 rounded-lg p-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Severity Priority</label>
                  <select
                    value={newEntry.severity}
                    onChange={(e) => setNewEntry({ ...newEntry, severity: e.target.value as any })}
                    className="w-full bg-police-800 border border-police-700 rounded-lg p-2 text-white font-mono"
                  >
                    <option value="CRITICAL">CRITICAL (Immediate Siren Alert)</option>
                    <option value="HIGH">HIGH (Command Center Warning)</option>
                    <option value="MEDIUM">MEDIUM (Standard Log)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-police-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-police-800 text-slate-300 rounded-lg hover:bg-police-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold"
                >
                  Add & Broadcast to Edge Cameras
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
