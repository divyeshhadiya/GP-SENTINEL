"use client";

import React, { useState } from "react";
import {
  Calculator,
  Server,
  HardDrive,
  Wifi,
  Cpu,
  Shield,
  Layers,
  RefreshCw
} from "lucide-react";

export default function SizingCalculator() {
  const [cameraCount, setCameraCount] = useState<number>(80000);
  const [avgBitrateMbps, setAvgBitrateMbps] = useState<number>(3.5);
  const [retentionDays, setRetentionDays] = useState<number>(30);
  const [anprPct, setAnprPct] = useState<number>(40);

  // Bandwidth calculation (Gbps)
  const totalBandwidthGbps = ((cameraCount * avgBitrateMbps) / 1000).toFixed(1);

  // Storage calculation in Petabytes (PB)
  // Bytes = (CameraCount * Bitrate_bps * Retention_Seconds) / 8
  const dailyPetabytes =
    (cameraCount * (avgBitrateMbps * 1000000) * 86400) / (8 * 1024 * 1024 * 1024 * 1024 * 1024);
  const totalStoragePetabytes = (dailyPetabytes * retentionDays).toFixed(1);

  // Storage Tier Breakdown
  const hotStoragePb = (parseFloat(totalStoragePetabytes) * 0.1).toFixed(1); // 10% Fast NVMe for immediate query
  const warmStoragePb = (parseFloat(totalStoragePetabytes) * 0.6).toFixed(1); // 60% Ceph Distributed Object Store
  const coldStoragePb = (parseFloat(totalStoragePetabytes) * 0.3).toFixed(1); // 30% Tape Library / Deep Archive

  // GPU inference hardware requirements (NVIDIA L40S 48GB running 16 streams of YOLOv10 per card)
  const anprStreamCount = Math.round((cameraCount * anprPct) / 100);
  const totalGpusNeeded = Math.ceil(anprStreamCount / 16);
  const totalGpuServers = Math.ceil(totalGpusNeeded / 8); // 8x GPUs per 4U Server Node

  // Edge AI Gateways (1 Edge box per 16 cameras for decentralized edge processing)
  const edgeGatewaysNeeded = Math.ceil(cameraCount / 16);

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-700/80 rounded-xl p-5 shadow-xl transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-wide">
                Statewide Infrastructure Sizing &amp; Scalability Calculator (~80,000 Cameras)
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Engineered for the Gujarat Police State Crime Record Bureau (SCRB) statewide CCTV expansion roadmap.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setCameraCount(80000);
                setAvgBitrateMbps(3.5);
                setRetentionDays(30);
                setAnprPct(40);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-police-800 hover:bg-slate-200 dark:hover:bg-police-700 text-xs font-mono text-blue-700 dark:text-blue-300 border border-slate-200 dark:border-police-700 flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset to Official 80k Sizing</span>
            </button>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 pt-4 border-t border-slate-200 dark:border-police-800">
          {/* Slider 1: Camera Count */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Total Cameras:</span>
              <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">{cameraCount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={50}
              max={100000}
              step={500}
              value={cameraCount}
              onChange={(e) => setCameraCount(Number(e.target.value))}
              className="w-full accent-blue-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>50 (Sandbox)</span>
              <span>80,000 (Target)</span>
              <span>100,000</span>
            </div>
          </div>

          {/* Slider 2: Average Bitrate (H.265) */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Average Bitrate (H.265):</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{avgBitrateMbps} Mbps</span>
            </div>
            <input
              type="range"
              min={1.5}
              max={8.0}
              step={0.5}
              value={avgBitrateMbps}
              onChange={(e) => setAvgBitrateMbps(Number(e.target.value))}
              className="w-full accent-emerald-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1.5 (720p)</span>
              <span>3.5 (1080p FHD)</span>
              <span>8.0 (4K UHD)</span>
            </div>
          </div>

          {/* Slider 3: Retention Days */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Retention Period:</span>
              <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">{retentionDays} Days</span>
            </div>
            <input
              type="range"
              min={7}
              max={90}
              step={1}
              value={retentionDays}
              onChange={(e) => setRetentionDays(Number(e.target.value))}
              className="w-full accent-amber-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>7 Days (Min)</span>
              <span>15 Days</span>
              <span>30 Days (Standard)</span>
            </div>
          </div>

          {/* Slider 4: ANPR AI Stream Percentage */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">AI Analytic Concurrency:</span>
              <span className="text-purple-600 dark:text-purple-400 font-mono font-bold">{anprPct}% ({anprStreamCount.toLocaleString()} Cams)</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={anprPct}
              onChange={(e) => setAnprPct(Number(e.target.value))}
              className="w-full accent-purple-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>10% (Static)</span>
              <span>40% (Active Grid)</span>
              <span>100% (All Feeds)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Calculated Hardware Specification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Bandwidth Card */}
        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-xl transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Core Ingest Bandwidth</span>
            <Wifi className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">
            {totalBandwidthGbps} <span className="text-sm font-bold text-blue-600 dark:text-blue-400">Gbps</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Distributed across 33 District Netram Centers with GSWAN 10 Gbps redundant backbones.
          </p>
        </div>

        {/* Storage Card */}
        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-xl transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Total Statewide Storage</span>
            <HardDrive className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">
            {totalStoragePetabytes} <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">PB</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Sized for {retentionDays}-day full video retention using adaptive H.265 smart codec.
          </p>
        </div>

        {/* GPU Acceleration Card */}
        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-xl transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">AI Accelerator Clusters</span>
            <Cpu className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">
            {totalGpusNeeded} <span className="text-sm font-bold text-purple-600 dark:text-purple-400">GPUs</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {totalGpuServers} Server Nodes (8x NVIDIA L40S) running TensorRT &amp; DeepStream.
          </p>
        </div>

        {/* Edge Nodes Card */}
        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-xl transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Edge Gateway Deployments</span>
            <Server className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono mt-1">
            {edgeGatewaysNeeded.toLocaleString()} <span className="text-sm font-bold text-amber-600 dark:text-amber-400">Boxes</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            1 Edge unit per 16 cameras for low-bandwidth local stream ingestion &amp; metadata extraction.
          </p>
        </div>
      </div>

      {/* Storage Tiering & Disaster Recovery Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Tiered Storage Breakdown */}
        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-xl space-y-3 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-police-800 pb-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Multi-Tier Storage Architecture (Statewide)</span>
            </h3>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              Total: {totalStoragePetabytes} PB
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {/* Hot Tier */}
            <div className="bg-slate-50 dark:bg-police-850 p-3 rounded-lg border border-slate-200 dark:border-police-750">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span>Hot Tier (NVMe / High-IOPS SAN)</span>
                </span>
                <span className="font-mono text-red-600 dark:text-red-400 font-bold">{hotStoragePb} PB (3 Days)</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Immediate incident playback, high-speed ANPR query indexing, and real-time live forensics.
              </p>
            </div>

            {/* Warm Tier */}
            <div className="bg-slate-50 dark:bg-police-850 p-3 rounded-lg border border-slate-200 dark:border-police-750">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span>Warm Tier (Distributed Ceph / Object Storage)</span>
                </span>
                <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{warmStoragePb} PB (27 Days)</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Standard investigation archive, cross-department evidentiary access, automated lifecycle purging.
              </p>
            </div>

            {/* Cold Tier */}
            <div className="bg-slate-50 dark:bg-police-850 p-3 rounded-lg border border-slate-200 dark:border-police-750">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span>Cold Tier (LTO-9 Tape Library &amp; S3 Deep Archive)</span>
                </span>
                <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{coldStoragePb} PB (1–3 Years)</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Preserved crime scene footage, court trial evidence exhibits, and high-profile case audits.
              </p>
            </div>
          </div>
        </div>

        {/* Disaster Recovery (DR) & Cybersecurity Architecture */}
        <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-800 rounded-xl p-4 shadow-xl space-y-3 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-police-800 pb-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>High Availability &amp; Disaster Recovery (DC/DR)</span>
            </h3>
            <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400 font-bold">RPO &lt; 5m | RTO &lt; 15m</span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="bg-slate-50 dark:bg-police-850 p-2.5 rounded-lg border border-slate-200 dark:border-police-800">
              <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Dual Data Center Architecture (Active-Active)</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Primary DC at State Data Center (SDC) Gandhinagar paired with secondary DR site at Ahmedabad. Synchronous metadata replication with Kafka MirrorMaker and Ceph geo-replication.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-police-850 p-2.5 rounded-lg border border-slate-200 dark:border-police-800">
              <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Network Segmentation &amp; Stream Encryption</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Complete isolation between Operational Technology (OT Camera VLAN) and Enterprise Police IT Network (GSWAN). Streams encrypted via SRTP / AES-256 and mutual TLS (mTLS).
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-police-850 p-2.5 rounded-lg border border-slate-200 dark:border-police-800">
              <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span>Zero-Trust Role-Based Access Control (RBAC)</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Department-wise granular permissions (e.g. Health dept cannot view Police surveillance feeds without court warrant). Every feed access and export is watermarked and logged in tamper-proof audit trails.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
