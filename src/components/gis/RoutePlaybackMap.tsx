"use client";

import React, { useEffect, useState, useRef } from "react";
import { VehicleSighting } from "@/types";
import { Play, Pause, RotateCcw, FastForward, MapPin, Gauge, Clock, ShieldAlert } from "lucide-react";
import MapTypeSelector, { MapViewType } from "./MapTypeSelector";
import { useTheme } from "@/context/ThemeContext";

interface Props {
  sightings: VehicleSighting[];
  height?: string;
  activeCheckpointIndex?: number;
  onSelectCheckpoint?: (index: number) => void;
}

export default function RoutePlaybackMap({
  sightings,
  height = "520px",
  activeCheckpointIndex = 0,
  onSelectCheckpoint
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const vehicleMarkerRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);
  const checkpointMarkersRef = useRef<any[]>([]);

  const { theme } = useTheme();
  const [mapType, setMapType] = useState<MapViewType>(theme === "dark" ? "dark" : "default");

  const [currentIndex, setCurrentIndex] = useState(activeCheckpointIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setCurrentIndex(activeCheckpointIndex);
  }, [activeCheckpointIndex]);

  // Handle map type layer swap
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

  // Main Map & Trajectory Setup
  useEffect(() => {
    if (!isClient || !mapContainerRef.current || sightings.length === 0) return;

    let isMounted = true;

    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current) return;

      if (!mapInstanceRef.current) {
        const firstCoord = sightings[0].coordinates;
        const map = L.map(mapContainerRef.current, {
          center: firstCoord,
          zoom: 8,
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
        mapInstanceRef.current = map;
      }

      const map = mapInstanceRef.current;

      if (polylineRef.current) map.removeLayer(polylineRef.current);
      if (vehicleMarkerRef.current) map.removeLayer(vehicleMarkerRef.current);
      checkpointMarkersRef.current.forEach((m) => map.removeLayer(m));
      checkpointMarkersRef.current = [];

      const coords = sightings.map((s) => s.coordinates);

      // Trajectory Polyline
      const polyline = L.polyline(coords, {
        color: "#0284c7",
        weight: 5,
        opacity: 0.9,
        dashArray: "8, 10"
      }).addTo(map);
      polylineRef.current = polyline;

      map.fitBounds(polyline.getBounds(), { padding: [60, 60] });

      // Checkpoint Markers
      sightings.forEach((s, idx) => {
        const isMatch = !!s.watchlistMatch;
        const checkIcon = L.divIcon({
          className: "route-checkpoint-icon",
          html: `
            <div style="
              width: 26px; height: 26px; border-radius: 50%;
              background: ${isMatch ? "#ef4444" : "#2563eb"};
              border: 2px solid #ffffff;
              color: #ffffff; font-weight: bold; font-size: 11px;
              display: flex; align-items: center; justify-content: center;
              box-shadow: 0 0 10px ${isMatch ? "rgba(239,68,68,0.8)" : "rgba(37,99,235,0.8)"};
              cursor: pointer;
            ">
              ${idx + 1}
            </div>
          `,
          iconSize: [26, 26],
          iconAnchor: [13, 13]
        });

        const marker = L.marker(s.coordinates, { icon: checkIcon }).addTo(map);
        marker.on("click", () => {
          setCurrentIndex(idx);
          if (onSelectCheckpoint) onSelectCheckpoint(idx);
        });

        checkpointMarkersRef.current.push(marker);
      });

      // Animated Vehicle Marker
      const activeSighting = sightings[currentIndex] || sightings[0];
      const vehicleIcon = L.divIcon({
        className: "vehicle-tracker-icon",
        html: `
          <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: #f59e0b; opacity: 0.4; animation: ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="width: 24px; height: 24px; border-radius: 50%; background: #f59e0b; border: 2px solid #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 12px #f59e0b;">
              <span style="font-size: 10px; font-weight: 900; color: #000000;">V</span>
            </div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });

      const vMarker = L.marker(activeSighting.coordinates, { icon: vehicleIcon }).addTo(map);
      vehicleMarkerRef.current = vMarker;
    });

    return () => {
      isMounted = false;
    };
  }, [isClient, sightings]);

  useEffect(() => {
    if (!vehicleMarkerRef.current || !sightings[currentIndex]) return;
    const current = sightings[currentIndex];
    vehicleMarkerRef.current.setLatLng(current.coordinates);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo(current.coordinates, { animate: true, duration: 0.5 });
    }
  }, [currentIndex, sightings]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= sightings.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        const next = prev + 1;
        if (onSelectCheckpoint) onSelectCheckpoint(next);
        return next;
      });
    }, 2500 / playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, sightings.length, playbackSpeed, onSelectCheckpoint]);

  const activeSighting = sightings[currentIndex] || sightings[0];

  if (!isClient) {
    return (
      <div style={{ height }} className="w-full bg-slate-100 dark:bg-police-850 rounded-xl border border-slate-200 dark:border-police-700 flex items-center justify-center">
        <span className="text-xs font-mono text-slate-500">Loading Traversal Cartography...</span>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-slate-300 dark:border-police-700 bg-white dark:bg-police-900 shadow-2xl">
      {/* Map Display */}
      <div ref={mapContainerRef} style={{ height }} className="w-full" />

      {/* Map Type Switcher Widget matching reference image (Top Right) */}
      <MapTypeSelector
        currentType={mapType}
        onChange={(t) => setMapType(t)}
        className="absolute top-20 right-3 z-[1000]"
      />

      {/* Top Floating Telemetry Overlay */}
      {activeSighting && (
        <div className="absolute top-3 left-3 right-3 z-[1000] bg-white/95 dark:bg-police-900/95 backdrop-blur-md border border-slate-200 dark:border-police-700/80 rounded-xl p-3 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2.5">
              <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs font-mono">
                #{currentIndex + 1}
              </span>
              <div>
                <div className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center space-x-2">
                  <span>{activeSighting.cameraName}</span>
                  {activeSighting.watchlistMatch && (
                    <span className="bg-red-600 text-white font-mono text-[10px] px-1.5 py-0.5 rounded font-extrabold animate-pulse flex items-center space-x-1">
                      <ShieldAlert className="w-3 h-3" />
                      <span>{activeSighting.watchlistMatch.category} MATCH</span>
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-blue-500" />
                  <span>{activeSighting.locationName}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs font-mono">
              <div className="flex items-center space-x-1.5 text-slate-600 dark:text-slate-300">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  {new Date(activeSighting.timestamp).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                <Gauge className="w-3.5 h-3.5 text-emerald-500" />
                <span>{activeSighting.speedKmh} km/h</span>
              </div>
              <div className="hidden sm:block text-slate-500 dark:text-slate-400">
                PTS: <span className="text-blue-600 dark:text-cyan-400">{activeSighting.ptsMs} ms</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Floating Playback Controls Bar */}
      <div className="absolute bottom-3 left-3 right-3 z-[1000] bg-white/95 dark:bg-police-900/95 backdrop-blur-md border border-slate-300 dark:border-police-700/90 rounded-xl px-4 py-2.5 shadow-2xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md transition-all"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? "Pause Route" : "Play Route"}</span>
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentIndex(0);
              if (onSelectCheckpoint) onSelectCheckpoint(0);
            }}
            className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs border border-slate-300 dark:border-slate-700"
            title="Reset to Start"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setPlaybackSpeed((s) => (s === 1 ? 2 : s === 2 ? 4 : 1))}
            className="flex items-center space-x-1 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-mono border border-slate-300 dark:border-slate-700"
          >
            <FastForward className="w-3.5 h-3.5 text-blue-500" />
            <span>{playbackSpeed}x</span>
          </button>
        </div>

        {/* Checkpoint Scrubber */}
        <div className="flex items-center space-x-2 flex-1 max-w-md">
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Node</span>
          <input
            type="range"
            min={0}
            max={sightings.length - 1}
            value={currentIndex}
            onChange={(e) => {
              const idx = Number(e.target.value);
              setCurrentIndex(idx);
              if (onSelectCheckpoint) onSelectCheckpoint(idx);
            }}
            className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
          />
          <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold">
            {currentIndex + 1}/{sightings.length}
          </span>
        </div>
      </div>
    </div>
  );
}
