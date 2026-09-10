"use client";

import React, { useState } from "react";
import { initialCameras } from "@/data/cameras";
import { Camera, DepartmentType, CameraStatus, CameraType } from "@/types";
import GujaratGisMap from "@/components/gis/GujaratGisMap";
import {
  MapPin,
  Search,
  Plus,
  Upload,
  Download,
  Filter,
  CheckCircle2,
  AlertCircle,
  Video,
  Layers,
  X,
  ShieldCheck
} from "lucide-react";

export default function RegistryPage() {
  const [cameras, setCameras] = useState<Camera[]>(initialCameras);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterDistrict, setFilterDistrict] = useState("ALL");
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [newCam, setNewCam] = useState<Partial<Camera>>({
    name: "",
    department: "Gujarat Police",
    district: "Gandhinagar",
    locationName: "",
    coordinates: [23.22, 72.65],
    cameraType: "ANPR",
    vendor: "Hikvision ANPR Pro",
    vmsVendor: "Hikvision",
    resolution: "1080p (FHD)",
    fps: 30,
    codec: "H.265",
    storageDays: 30,
    storageType: "Hybrid SAN",
    rtspUrl: "rtsp://10.0.0.1:8554/stream",
    ipAddress: "10.18.9.100",
    amcActive: true
  });

  const districts = Array.from(new Set(cameras.map((c) => c.district))).sort();
  const departments = Array.from(new Set(cameras.map((c) => c.department))).sort();

  const filteredCameras = cameras.filter((cam) => {
    if (filterDepartment !== "ALL" && cam.department !== filterDepartment) return false;
    if (filterStatus !== "ALL" && cam.status !== filterStatus) return false;
    if (filterDistrict !== "ALL" && cam.district !== filterDistrict) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        cam.id.toLowerCase().includes(q) ||
        cam.name.toLowerCase().includes(q) ||
        cam.locationName.toLowerCase().includes(q) ||
        cam.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateCamera = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCam.name || !newCam.locationName) return;

    const created: Camera = {
      id: `CAM-NEW-${Date.now().toString().slice(-4)}`,
      name: newCam.name || "Onboarded Surveillance Node",
      department: newCam.department as DepartmentType,
      district: newCam.district || "Gandhinagar",
      locationName: newCam.locationName || "Gujarat Highway",
      coordinates: newCam.coordinates || [23.22, 72.65],
      status: "Online",
      cameraType: newCam.cameraType as CameraType,
      vendor: newCam.vendor || "Standard IP Node",
      vmsVendor: (newCam.vmsVendor as any) || "Direct RTSP",
      resolution: newCam.resolution as any,
      fps: newCam.fps || 25,
      codec: newCam.codec as any,
      storageDays: newCam.storageDays || 30,
      storageType: newCam.storageType as any,
      rtspUrl: newCam.rtspUrl || "rtsp://sandbox.sentinel.gujarat.gov.in:8554/live",
      hlsUrl: "",
      ipAddress: newCam.ipAddress || "10.1.1.1",
      installationYear: 2026,
      amcActive: newCam.amcActive ?? true,
      fovAngle: 0,
      coverageRadiusMeters: 100,
      lastHeartbeat: "Just now",
      pingMs: 16,
      departmentPoc: "Gujarat State Police Control"
    };

    setCameras([created, ...cameras]);
    setShowAddModal(false);
  };

  const handleExportCsv = () => {
    const headers = "ID,Name,Department,District,Location,Lat,Lng,Status,Type,VMS,Codec,StorageDays\n";
    const rows = filteredCameras
      .map(
        (c) =>
          `"${c.id}","${c.name}","${c.department}","${c.district}","${c.locationName}",${c.coordinates[0]},${c.coordinates[1]},"${c.status}","${c.cameraType}","${c.vmsVendor}","${c.codec}",${c.storageDays}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SENTINEL_CCTV_REGISTRY_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 font-bold">
              Model 1: Mandatory Foundational Model
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mt-1">
            Centralized CCTV Registry & Interactive GIS Cartography
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Onboarding, metadata inventory, coverage analysis, and asset tracking across 26 departments.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setShowBulkModal(true)}
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 dark:bg-police-800 hover:bg-slate-200 dark:hover:bg-police-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold border border-slate-300 dark:border-police-700 transition-all"
          >
            <Upload className="w-3.5 h-3.5 text-blue-500" />
            <span>Bulk Import CSV/API</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Onboard Camera</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="p-2 bg-slate-100 dark:bg-police-800 hover:bg-slate-200 dark:hover:bg-police-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs border border-slate-300 dark:border-police-700"
            title="Export Registry CSV"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* GIS Map Layer */}
      <GujaratGisMap
        cameras={filteredCameras}
        selectedCamera={selectedCamera}
        onSelectCamera={(cam) => setSelectedCamera(cam)}
        filterDepartment={filterDepartment}
        filterStatus={filterStatus}
        height="480px"
      />

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-3.5 shadow-xl flex flex-wrap items-center justify-between gap-3 transition-colors">
        <div className="flex items-center space-x-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Camera ID, location, junction, district..."
            className="bg-slate-50 dark:bg-police-800 border border-slate-300 dark:border-police-700 rounded-lg px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200 w-full focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="bg-slate-50 dark:bg-police-800 border border-slate-300 dark:border-police-700 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="ALL">All Departments ({departments.length})</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={filterDistrict}
            onChange={(e) => setFilterDistrict(e.target.value)}
            className="bg-slate-50 dark:bg-police-800 border border-slate-300 dark:border-police-700 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="ALL">All Districts ({districts.length})</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 dark:bg-police-800 border border-slate-300 dark:border-police-700 text-slate-700 dark:text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="Online">Online</option>
            <option value="Degraded">Degraded</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
      </div>

      {/* Asset Inventory Table */}
      <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl overflow-hidden shadow-xl transition-colors">
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-police-850 border-b border-slate-200 dark:border-police-800 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900 dark:text-slate-200">
            Registered CCTV Asset Inventory ({filteredCameras.length} Nodes)
          </span>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            PostgreSQL + PostGIS Schema Conforming
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-police-800/80 text-[11px] text-slate-600 dark:text-slate-400 uppercase font-mono border-b border-slate-200 dark:border-police-700">
              <tr>
                <th className="p-3">Camera ID / Name</th>
                <th className="p-3">Department</th>
                <th className="p-3">District / Location</th>
                <th className="p-3">Type / VMS</th>
                <th className="p-3">Codec & Storage</th>
                <th className="p-3">Ping / Health</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-police-800">
              {filteredCameras.map((cam) => {
                const isSelected = selectedCamera?.id === cam.id;
                return (
                  <tr
                    key={cam.id}
                    onClick={() => setSelectedCamera(cam)}
                    className={`hover:bg-slate-50 dark:hover:bg-police-800/60 cursor-pointer transition-colors ${
                      isSelected ? "bg-blue-50 dark:bg-blue-600/15" : ""
                    }`}
                  >
                    <td className="p-3">
                      <div className="font-mono text-blue-600 dark:text-blue-400 font-bold text-[11px]">{cam.id}</div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs truncate max-w-[200px]">
                        {cam.name}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-slate-700 dark:text-slate-300">{cam.department}</span>
                    </td>
                    <td className="p-3">
                      <div className="text-slate-900 dark:text-slate-200 font-semibold">{cam.district}</div>
                      <div className="text-slate-500 dark:text-slate-400 text-[11px] truncate max-w-[180px]">
                        {cam.locationName}
                      </div>
                    </td>
                    <td className="p-3 font-mono text-[11px]">
                      <div className="text-slate-800 dark:text-slate-200">{cam.cameraType}</div>
                      <div className="text-blue-600 dark:text-blue-400">{cam.vmsVendor}</div>
                    </td>
                    <td className="p-3 font-mono text-[11px]">
                      <div>{cam.codec} ({cam.resolution})</div>
                      <div className="text-slate-500 dark:text-slate-400">{cam.storageDays} Days • {cam.storageType}</div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center space-x-1 font-mono text-[10px] px-2 py-0.5 rounded ${
                          cam.status === "Online"
                            ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                            : cam.status === "Degraded"
                            ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700"
                            : "bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>{cam.status} ({cam.pingMs}ms)</span>
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCamera(cam);
                        }}
                        className="px-2.5 py-1 bg-slate-100 dark:bg-police-800 hover:bg-blue-600 text-slate-700 dark:text-slate-300 hover:text-white rounded text-[11px] font-mono transition-all"
                      >
                        View On Map
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Camera Onboarding Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-700 rounded-2xl max-w-xl w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-police-800 pb-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Plus className="w-4 h-4 text-blue-500" />
                <span>Onboard New CCTV Node (Manual Entry)</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCamera} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Camera Name / Label</label>
                <input
                  type="text"
                  required
                  value={newCam.name}
                  onChange={(e) => setNewCam({ ...newCam, name: e.target.value })}
                  placeholder="e.g. Somnath Coastal Highway Gate 3"
                  className="w-full bg-slate-50 dark:bg-police-800 border border-slate-300 dark:border-police-700 rounded-lg p-2 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Department</label>
                  <select
                    value={newCam.department}
                    onChange={(e) => setNewCam({ ...newCam, department: e.target.value as any })}
                    className="w-full bg-slate-50 dark:bg-police-800 border border-slate-300 dark:border-police-700 rounded-lg p-2 text-slate-900 dark:text-white"
                  >
                    <option value="Gujarat Police">Gujarat Police</option>
                    <option value="GSRTC">GSRTC</option>
                    <option value="RTO Gujarat">RTO Gujarat</option>
                    <option value="Ahmedabad Municipal Corp (AMC)">AMC</option>
                    <option value="Surat Municipal Corp (SMC)">SMC</option>
                    <option value="Private Commercial / Mall">Private Mall</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={newCam.district}
                    onChange={(e) => setNewCam({ ...newCam, district: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-police-800 border border-slate-300 dark:border-police-700 rounded-lg p-2 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Location / Crossroad / Landmark</label>
                <input
                  type="text"
                  required
                  value={newCam.locationName}
                  onChange={(e) => setNewCam({ ...newCam, locationName: e.target.value })}
                  placeholder="e.g. Ring Road Junction, Surat"
                  className="w-full bg-slate-50 dark:bg-police-800 border border-slate-300 dark:border-police-700 rounded-lg p-2 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Camera Type</label>
                  <select
                    value={newCam.cameraType}
                    onChange={(e) => setNewCam({ ...newCam, cameraType: e.target.value as any })}
                    className="w-full bg-slate-50 dark:bg-police-800 border border-slate-300 dark:border-police-700 rounded-lg p-2 text-slate-900 dark:text-white"
                  >
                    <option value="ANPR">ANPR Camera</option>
                    <option value="PTZ Speed Dome">PTZ Speed Dome</option>
                    <option value="Fixed Bullet">Fixed Bullet</option>
                    <option value="Panoramic 360">Panoramic 360</option>
                    <option value="Thermal Border">Thermal Border</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">VMS Platform</label>
                  <select
                    value={newCam.vmsVendor}
                    onChange={(e) => setNewCam({ ...newCam, vmsVendor: e.target.value as any })}
                    className="w-full bg-slate-50 dark:bg-police-800 border border-slate-300 dark:border-police-700 rounded-lg p-2 text-slate-900 dark:text-white"
                  >
                    <option value="Hikvision">Hikvision HikCentral</option>
                    <option value="Matrix">Matrix SATATYA</option>
                    <option value="Genetec">Genetec Security Center</option>
                    <option value="Milestone">Milestone XProtect</option>
                    <option value="Dahua">Dahua DSS</option>
                    <option value="Direct RTSP">Direct RTSP</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">RTSP Stream URL (TCP Transport)</label>
                  <input
                    type="text"
                    value={newCam.rtspUrl}
                    onChange={(e) => setNewCam({ ...newCam, rtspUrl: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-police-800 border border-slate-300 dark:border-police-700 rounded-lg p-2 text-slate-900 dark:text-white font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Storage Retention Days</label>
                  <input
                    type="number"
                    value={newCam.storageDays}
                    onChange={(e) => setNewCam({ ...newCam, storageDays: Number(e.target.value) })}
                    className="w-full bg-slate-50 dark:bg-police-800 border border-slate-300 dark:border-police-700 rounded-lg p-2 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-police-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-police-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-police-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold"
                >
                  Confirm & Onboard Node
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-700 rounded-2xl max-w-lg w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-police-800 pb-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Upload className="w-4 h-4 text-blue-500" />
                <span>Bulk CSV / API Ingestion</span>
              </h3>
              <button
                onClick={() => setShowBulkModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Upload a standard departmental CSV file or sync automatically from the official Sentinel sandbox endpoint:
            </p>

            <div className="border-2 border-dashed border-slate-300 dark:border-police-700 rounded-xl p-6 text-center space-y-2 hover:border-blue-500 cursor-pointer transition-colors">
              <Upload className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="text-xs text-slate-800 dark:text-slate-200 font-bold">
                Drop your CSV or JSON camera inventory here
              </div>
              <div className="text-[10px] text-slate-500">
                Supports: Camera ID, Name, Dept, Lat, Lng, VMS, RTSP URL, AMC
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-police-850 p-3 rounded-lg border border-slate-200 dark:border-police-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">
              API Sync Endpoint: <span className="text-emerald-600 dark:text-emerald-400 font-bold">GET /api/ingest</span>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-police-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert("Syncing all 50 cameras from /api/ingest catalogue!");
                  setShowBulkModal(false);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
              >
                Sync with /api/ingest
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
