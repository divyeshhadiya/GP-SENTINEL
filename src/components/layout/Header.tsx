"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  AlertTriangle,
  Volume2,
  VolumeX,
  Eye,
  Activity,
  Sun,
  Moon,
  User,
  LogOut,
  LogIn,
  Presentation,
  Video
} from "lucide-react";
import PoliceLogo from "@/components/common/PoliceLogo";
import { alertAudio } from "@/utils/audio";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [currentTime, setCurrentTime] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [pulse, setPulse] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    const pulseTimer = setInterval(() => setPulse((p) => !p), 1500);
    return () => {
      clearInterval(timer);
      clearInterval(pulseTimer);
    };
  }, []);

  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    if (next) {
      alertAudio.playNotificationPing();
    }
  };

  return (
    <header className="bg-white dark:bg-police-900 border-b border-slate-200 dark:border-police-700/80 sticky top-0 z-50 text-slate-800 dark:text-slate-200 transition-colors">
      {/* Top Law Enforcement Masthead */}
      <div className="bg-slate-100 dark:bg-gradient-to-r dark:from-police-900 dark:via-police-850 dark:to-police-900 px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-police-800 text-xs">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-blue-900 dark:text-police-gold font-bold tracking-wider uppercase text-[11px]">
            <Shield className="w-3.5 h-3.5 text-amber-500" />
            <span>Government of Gujarat</span>
            <span className="text-slate-400">|</span>
            <span>Home Department</span>
          </div>
          <span className="hidden md:inline-block px-2 py-0.5 rounded bg-blue-100 dark:bg-police-accent/20 text-blue-800 dark:text-police-cyan font-mono border border-blue-300 dark:border-police-accent/30 text-[10px]">
            SENTINEL 2026 CHALLENGE
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
            <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>State Ingest Grid:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">ONLINE (50/50 Feeds)</span>
          </div>
          <div className="hidden sm:block text-slate-500 dark:text-slate-400 font-mono text-[11px]">
            IST: <span className="text-slate-800 dark:text-slate-200">{currentTime || "Loading..."}</span>
          </div>
        </div>
      </div>

      {/* Main Tactical Navigation Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <PoliceLogo size={36} />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-black tracking-wider text-slate-900 dark:text-white uppercase">
                  GP-SENTINEL
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 font-bold">
                  Hybrid Model 5
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 tracking-tight hidden sm:block">
                Gujarat Unified Video Intelligence & Multi-Department Command Platform
              </p>
            </div>
          </Link>
        </div>

        {/* Live Counters & Tactical Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            href="/presentation"
            className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg text-amber-700 dark:text-amber-400 text-xs font-medium transition-all"
            title="Official Pitch Deck & Architecture Presentation"
          >
            <Presentation className="w-3.5 h-3.5 text-amber-500" />
            <span>Pitch Deck</span>
          </Link>

          <Link
            href="/video-demo"
            className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-700 dark:text-emerald-400 text-xs font-medium transition-all"
            title="Live Operational Video Demonstration"
          >
            <Video className="w-3.5 h-3.5 text-emerald-500" />
            <span>Video Demo</span>
          </Link>

          <Link
            href="/vehicle-tracking"
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-600/20 hover:bg-blue-100 dark:hover:bg-blue-600/30 border border-blue-300 dark:border-blue-500/40 rounded-lg text-blue-700 dark:text-blue-300 text-xs font-medium transition-all"
          >
            <Activity className="w-3.5 h-3.5 text-blue-500" />
            <span className="hidden md:inline">Evaluation Test:</span>
            <span className="font-mono font-bold text-blue-900 dark:text-white">GJ-01-AB-1234</span>
          </Link>

          <Link
            href="/alerts"
            className="relative flex items-center space-x-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 border border-red-300 dark:border-red-500/50 rounded-lg text-red-700 dark:text-red-300 text-xs font-medium transition-all"
          >
            <AlertTriangle
              className={`w-3.5 h-3.5 text-red-500 ${pulse ? "opacity-100 scale-110" : "opacity-70 scale-100"} transition-all`}
            />
            <span className="hidden xs:inline">Alerts:</span>
            <span className="font-mono font-bold bg-red-600 text-white px-1.5 py-0.2 rounded-full text-[10px]">
              3
            </span>
          </Link>

          {/* Theme Toggle Button (Light / Dark Mode) */}
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-blue-600" />}
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={toggleAudio}
            title={audioEnabled ? "Alert Sound Active (Click to Mute)" : "Alert Sound Muted"}
            className={`p-2 rounded-lg border transition-all ${
              audioEnabled
                ? "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-blue-600 dark:text-police-cyan"
                : "bg-slate-100/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 text-slate-400"
            }`}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* User Profile / Login Dropdown */}
          <div className="relative">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-slate-100 dark:bg-police-800 hover:bg-slate-200 dark:hover:bg-police-750 rounded-lg border border-slate-200 dark:border-police-700 text-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 hidden lg:inline max-w-[120px] truncate">
                    {user.name.split(",")[0]}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-11 w-64 bg-white dark:bg-police-850 border border-slate-200 dark:border-police-700 rounded-xl shadow-2xl p-3 space-y-2 z-50 text-xs">
                    <div className="border-b border-slate-200 dark:border-police-750 pb-2">
                      <div className="font-bold text-slate-900 dark:text-white">{user.name}</div>
                      <div className="text-[11px] text-blue-600 dark:text-blue-400 font-mono">{user.rank}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">Badge: {user.badgeId}</div>
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      {user.department}
                    </div>
                    <div className="pt-2 border-t border-slate-200 dark:border-police-750 flex justify-between items-center">
                      <Link
                        href="/login"
                        onClick={() => setUserMenuOpen(false)}
                        className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Switch Officer
                      </Link>
                      <Link
                        href="/logout"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center space-x-1 text-[11px] text-red-600 hover:text-red-500 font-semibold cursor-pointer"
                      >
                        <LogOut className="w-3 h-3" />
                        <span>Sign Out</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow-md"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Officer Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
