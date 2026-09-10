"use client";

import React, { useEffect, useState, useRef } from "react";
import { Camera, DepartmentType } from "@/types";
import { Video, Wifi, Shield, Server, AlertCircle, Info, ExternalLink } from "lucide-react";
import MapTypeSelector, { MapViewType } from "./MapTypeSelector";
import { useTheme } from "@/context/ThemeContext";

interface Props {
  cameras: Camera[];
  selectedCamera?: Camera | null;
  onSelectCamera?: (camera: Camera) => void;
  filterDepartment?: string;
  filterStatus?: string;
  height?: string;
}

export default function GujaratGisMap({
  cameras,
  selectedCamera,
  onSelectCamera,
  filterDepartment = "ALL",
  filterStatus = "ALL",
  height = "560px"
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const markersGroupRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const { theme } = useTheme();

  const [mapType, setMapType] = useState<MapViewType>(theme === "dark" ? "dark" : "default");

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update map layer when mapType changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    import("leaflet").then((L) => {
      const map = mapInstanceRef.current;
      if (tileLayerRef.current) {
        map.removeLayer(tileLayerRef.current);
      }

      let url = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
      let maxZoom = 19;

      if (mapType === "default") {
        url = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
      } else if (mapType === "satellite") {
        url = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
        maxZoom = 18;
      }

      const newTile = L.tileLayer(url, {
        subdomains: "abcd",
        maxZoom: maxZoom
      }).addTo(map);

      tileLayerRef.current = newTile;
    });
  }, [mapType]);

  // Main Leaflet Map Initialization & Marker Updates
  useEffect(() => {
    if (!isClient || !mapContainerRef.current) return;

    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [22.4, 71.8],
          zoom: 7.5,
          zoomControl: true,
          attributionControl: false
        });

        let initialUrl = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
        if (mapType === "default") {
          initialUrl = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
        } else if (mapType === "satellite") {
          initialUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
        }

        const tileLayer = L.tileLayer(initialUrl, {
          subdomains: "abcd",
          maxZoom: 19
        }).addTo(map);

        tileLayerRef.current = tileLayer;
        const markersGroup = L.layerGroup().addTo(map);
        mapInstanceRef.current = map;
        markersGroupRef.current = markersGroup;
      }

      const map = mapInstanceRef.current;
      const markersGroup = markersGroupRef.current;
      markersGroup.clearLayers();

      const filtered = cameras.filter((cam) => {
        if (filterDepartment !== "ALL" && cam.department !== filterDepartment) return false;
        if (filterStatus !== "ALL" && cam.status !== filterStatus) return false;
        return true;
      });

      const getMarkerColor = (dept: DepartmentType) => {
        switch (dept) {
          case "Gujarat Police": return "#3b82f6";
          case "GSRTC": return "#10b981";
          case "RTO Gujarat": return "#f59e0b";
          case "Ahmedabad Municipal Corp (AMC)":
          case "Surat Municipal Corp (SMC)":
          case "Vadodara Municipal Corp (VMC)":
          case "Rajkot Municipal Corp (RMC)": return "#06b6d4";
          case "Health & Family Welfare": return "#ef4444";
          case "Food & Civil Supplies": return "#eab308";
          case "Private Commercial / Mall": return "#a855f7";
          default: return "#94a3b8";
        }
      };

      filtered.forEach((cam) => {
        const color = getMarkerColor(cam.department);
        const isOnline = cam.status === "Online";

        const iconHtml = `
          <div style="
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
          ">
            <span style="
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background-color: ${color};
              opacity: ${isOnline ? 0.45 : 0.15};
              animation: ${isOnline ? "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite" : "none"};
            "></span>
            <div style="
              width: 18px;
              height: 18px;
              border-radius: 50%;
              background-color: ${color};
              border: 2px solid #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 0 10px ${color};
            ">
              <span style="width: 5px; height: 5px; border-radius: 50%; background: #ffffff;"></span>
            </div>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: "custom-tactical-marker",
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const marker = L.marker(cam.coordinates, { icon: customIcon });

        const popupContent = document.createElement("div");
        popupContent.className = "p-1.5 min-w-[240px] text-xs font-sans text-slate-800 dark:text-slate-100";
        popupContent.innerHTML = `
          <div class="border-b border-slate-200 dark:border-slate-700 pb-1.5 mb-2">
            <div class="flex items-center justify-between">
              <span class="font-mono text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 font-bold border border-blue-300 dark:border-blue-700/50">${cam.id}</span>
              <span class="font-mono text-[10px] px-1.5 py-0.5 rounded ${
                cam.status === "Online"
                  ? "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/50"
                  : cam.status === "Degraded"
                  ? "bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/50"
                  : "bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700/50"
              }">${cam.status}</span>
            </div>
            <div class="font-bold text-slate-900 dark:text-slate-100 text-sm mt-1">${cam.name}</div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400">${cam.locationName}, ${cam.district}</div>
          </div>
          <div class="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
            <div class="flex justify-between"><span class="text-slate-400">Department:</span> <span class="font-medium text-slate-800 dark:text-slate-200">${cam.department}</span></div>
            <div class="flex justify-between"><span class="text-slate-400">Camera Type:</span> <span class="font-medium text-slate-800 dark:text-slate-200">${cam.cameraType}</span></div>
            <div class="flex justify-between"><span class="text-slate-400">Resolution / Codec:</span> <span class="font-mono text-slate-800 dark:text-slate-200">${cam.resolution} (${cam.codec})</span></div>
            <div class="flex justify-between"><span class="text-slate-400">VMS Platform:</span> <span class="font-mono text-blue-600 dark:text-blue-400">${cam.vmsVendor}</span></div>
            <div class="flex justify-between"><span class="text-slate-400">Retention:</span> <span class="font-mono text-slate-800 dark:text-slate-200">${cam.storageDays} Days (${cam.storageType})</span></div>
          </div>
          <div class="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
            <span>Ping: <strong class="text-emerald-600 dark:text-emerald-400 font-mono">${cam.pingMs} ms</strong></span>
            <span>AMC: <strong class="${cam.amcActive ? "text-emerald-600 dark:text-emerald-400" : "text-amber-500"}">${cam.amcActive ? "Active" : "Expired"}</strong></span>
          </div>
        `;

        marker.bindPopup(popupContent);
        marker.on("click", () => {
          if (onSelectCamera) onSelectCamera(cam);
        });

        marker.addTo(markersGroup);

        if (cam.cameraType === "ANPR" || cam.cameraType === "Thermal Border") {
          L.circle(cam.coordinates, {
            radius: cam.coverageRadiusMeters,
            color: color,
            fillColor: color,
            fillOpacity: 0.12,
            weight: 1.5,
            dashArray: "4, 4"
          }).addTo(markersGroup);
        }
      });

      if (selectedCamera && map) {
        map.flyTo(selectedCamera.coordinates, 13, { duration: 1.2 });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [isClient, cameras, selectedCamera, filterDepartment, filterStatus]);

  if (!isClient) {
    return (
      <div
        style={{ height }}
        className="w-full bg-slate-100 dark:bg-police-850 rounded-xl border border-slate-200 dark:border-police-700 flex flex-col items-center justify-center text-slate-500"
      >
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <span className="text-xs font-mono">Initializing Gujarat State GIS Cartography Engine...</span>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-300 dark:border-police-700/80 shadow-2xl bg-white dark:bg-police-900">
      {/* Tactical Top Overlay */}
      <div className="absolute top-3 left-3 z-[1000] bg-white/90 dark:bg-police-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-300 dark:border-police-700 text-xs flex items-center space-x-2 text-slate-800 dark:text-slate-300 shadow-lg">
        <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span className="font-bold text-slate-900 dark:text-white">Gujarat Police GIS Grid</span>
        <span className="text-slate-400">|</span>
        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{cameras.length} Nodes</span>
      </div>

      {/* Map Type Switcher matching reference image (Top Right) */}
      <MapTypeSelector
        currentType={mapType}
        onChange={(t) => setMapType(t)}
        className="absolute top-3 right-3"
      />

      {/* Map Canvas */}
      <div ref={mapContainerRef} style={{ height }} className="w-full z-0" />

      {/* Legend at Bottom Right */}
      <div className="absolute bottom-3 right-3 z-[1000] bg-white/90 dark:bg-police-900/90 backdrop-blur-md p-2.5 rounded-lg border border-slate-300 dark:border-police-700 text-[11px] text-slate-700 dark:text-slate-300 space-y-1 shadow-lg max-w-[210px]">
        <div className="font-bold text-slate-900 dark:text-slate-200 border-b border-slate-200 dark:border-police-800 pb-1 mb-1">
          Department Layers
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px]">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span>Police</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>GSRTC</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>RTO</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
            <span>Municipal</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span>Health</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
            <span>Private</span>
          </div>
        </div>
      </div>
    </div>
  );
}
