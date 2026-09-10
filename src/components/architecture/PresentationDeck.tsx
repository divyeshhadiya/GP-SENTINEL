"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Presentation, Shield, Award, Cpu, CheckCircle2 } from "lucide-react";

interface Slide {
  title: string;
  subtitle: string;
  category: string;
  points: string[];
}

export default function PresentationDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      category: "1. Problem & Executive Vision",
      title: "The Challenge: 26 Departments, Fragmented Video Silos",
      subtitle: "Gujarat Police Innovation Challenge 2026 — CCTV & Video Analytics",
      points: [
        "Gujarat currently operates over 80,000 CCTV cameras across 26 independent government departments, municipalities, ports, traffic police, and commercial hubs.",
        "Crucial law enforcement surveillance data is fragmented across proprietary VMS silos (Milestone, Genetec, Dahua, Hikvision) with incompatible video formats and zero cross-agency interoperability.",
        "Lack of real-time automated correlation between live CCTV feeds and legal databases (eGujCop criminal FIRs, VAHAN stolen vehicle registry, CID hotlists) causes investigative delay.",
        "GP-SENTINEL solves this without replacing any existing camera hardware by deploying non-intrusive edge gateways and unified middleware."
      ]
    },
    {
      category: "2. Core System Architecture",
      title: "Three-Tier Scalable Architecture for ~80,000 Cameras",
      subtitle: "Edge Gateways • Transport Bus • Clustered AI Inference",
      points: [
        "Tier 1 (Edge Gateways): 5,000 decentralized edge nodes deployed at 33 District Police Netram centers performing local RTSP/TCP ingestion, camera health monitoring, and motion indexing.",
        "Tier 2 (GSWAN & Event Bus): 10 Gbps redundant state network carrying encrypted SRTP streams and high-throughput Apache Kafka topics distributing JSON-LD sighting metadata.",
        "Tier 3 (State Data Center): GPU-accelerated inference cluster (NVIDIA TensorRT + DeepStream) performing statewide vehicle tracking, re-identification, and instant watchlist hits under 800ms.",
        "Active-Active DC/DR pairing between Gandhinagar SDC and Ahmedabad disaster recovery site with RPO < 5 mins and RTO < 15 mins."
      ]
    },
    {
      category: "3. Model 1 & 2 Execution",
      title: "GIS Camera Registry & Unified Video Wall",
      subtitle: "Zero Hardware Replacement • Universal RTSP Ingestion",
      points: [
        "GIS Camera Registry (Model 1): Interactive statewide map plotting all municipal, traffic, and police cameras with automated gap analysis and blindspot detection algorithms.",
        "Unified Video Wall (Model 2): Simultaneous multi-camera monitoring matrix featuring low-latency RTSP-over-TCP playback and monotonic PTS timestamp verification.",
        "Real-time synthetic stream simulation with active vehicle trajectory overlays and instant camera feed reassignment.",
        "Tested compliance against Integrator Guide (§1–§4) specifications with forced TCP transport and exponential backoff retry."
      ]
    },
    {
      category: "4. Model 3, 4 & Legal Evidence",
      title: "Vehicle Trajectory Tracking & Section 65B Certified Dossiers",
      subtitle: "End-to-End Criminal Investigation & Court-Admissible Intelligence",
      points: [
        "Chronological Traversal Matrix (Model 4): Automated route reconstruction tracking suspect vehicle GJ-01-AB-1234 across multiple district checkpoints with exact PTS timestamps.",
        "Automated Database Cross-Referencing: Instant correlation against eGujCop FIR records, CID watchlists, and RTO stolen databases triggering PCR dispatch with estimated arrival times.",
        "Certified Evidentiary Dossier Generator: One-click export of court-ready forensic reports conforming to Section 65B Indian Evidence Act and Section 63 Bharatiya Sakshya Adhiniyam, 2023.",
        "Tamper-proof digital integrity: Every generated evidentiary dossier is cryptographically signed with an automated SHA-256 evidence fingerprint."
      ]
    }
  ];

  const slide = slides[currentSlide];

  return (
    <div className="bg-white dark:bg-police-900 border border-slate-200 dark:border-police-700/80 rounded-xl overflow-hidden shadow-2xl transition-colors">
      {/* Slide Navigation Header */}
      <div className="px-5 py-3 bg-slate-100 dark:bg-police-850 border-b border-slate-200 dark:border-police-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 font-bold">
            {slide.category}
          </span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
            disabled={currentSlide === 0}
            className="p-1.5 rounded-lg bg-slate-200 dark:bg-police-800 hover:bg-slate-300 dark:hover:bg-police-700 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-300 dark:border-police-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlide((s) => Math.min(slides.length - 1, s + 1))}
            disabled={currentSlide === slides.length - 1}
            className="p-1.5 rounded-lg bg-slate-200 dark:bg-police-800 hover:bg-slate-300 dark:hover:bg-police-700 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-300 dark:border-police-700 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Body */}
      <div className="p-6 md:p-8 min-h-[320px] flex flex-col justify-between space-y-6">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {slide.title}
          </h2>
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">{slide.subtitle}</p>

          <div className="mt-6 space-y-3.5">
            {slide.points.map((pt, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-600/30 border border-blue-400 dark:border-blue-500 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold shrink-0 text-xs mt-0.5">
                  {idx + 1}
                </div>
                <p className="leading-relaxed">{pt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Progress Dots */}
        <div className="flex items-center justify-center space-x-2 pt-4 border-t border-slate-200 dark:border-police-800/80">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentSlide === idx ? "w-8 bg-blue-600 dark:bg-blue-500" : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
