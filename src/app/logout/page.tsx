"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import PoliceLogo from "@/components/common/PoliceLogo";
import {
  LogOut,
  LogIn,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Clock,
  CheckCircle2,
  Home,
  User,
  Shield
} from "lucide-react";

export default function LogoutPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();

  // If user is logged in, show confirmation first; if not, show logged-out confirmation
  const [loggedOut, setLoggedOut] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(6);
  const [autoRedirectEnabled, setAutoRedirectEnabled] = useState(true);
  const [logoutTimestamp, setLogoutTimestamp] = useState<string>("");

  useEffect(() => {
    // If not authenticated upon arriving, mark as already logged out
    if (!isAuthenticated && !loggedOut) {
      setLoggedOut(true);
      setLogoutTimestamp(
        new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "medium"
        })
      );
    }
  }, [isAuthenticated, loggedOut]);

  // Handle countdown when in loggedOut state
  useEffect(() => {
    if (!loggedOut || !autoRedirectEnabled) return;

    if (redirectCountdown <= 0) {
      router.push("/login");
      return;
    }

    const timer = setTimeout(() => {
      setRedirectCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [loggedOut, redirectCountdown, autoRedirectEnabled, router]);

  const handleConfirmLogout = () => {
    setLogoutTimestamp(
      new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "medium"
      })
    );
    logout();
    setLoggedOut(true);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all">
        {/* Top Header Banner */}
        <div className="bg-[#002347] text-white p-6 sm:p-7 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center space-y-3">
            <PoliceLogo size={56} />
            <div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/70 text-blue-200 border border-blue-700 tracking-wider uppercase font-bold">
                Gujarat Police • SCRB Security Gateway
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1.5 tracking-tight">
                {loggedOut ? "Session Ended Securely" : "Sign Out Confirmation"}
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Gujarat Police SENTINEL Video Intelligence & Command Platform
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {!loggedOut && user ? (
            /* State 1: Active Session Confirmation */
            <div className="space-y-6">
              {/* Active Officer Identity Card */}
              <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-full bg-[#002347] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-md">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {user.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800 font-bold">
                      {user.role}
                    </span>
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium truncate">
                    {user.rank}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    Badge: <strong className="text-slate-700 dark:text-slate-300">{user.badgeId}</strong> • {user.department}
                  </div>
                </div>
              </div>

              {/* Security Advisory Notice */}
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3.5 text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
                <div className="flex items-center space-x-2 font-bold text-amber-800 dark:text-amber-300">
                  <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Are you sure you want to end your command session?</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 pl-6">
                  Signing out will revoke real-time stream feeds, legal watchlist authorization, and incident dispatch privileges on this terminal.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleConfirmLogout}
                  className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Yes, Log Out Securely</span>
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="flex-1 py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-300 dark:border-slate-700 transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                  <span>Stay on Dashboard</span>
                </button>
              </div>
            </div>
          ) : (
            /* State 2: Logged Out Success */
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 shadow-lg mx-auto">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  You Have Been Logged Out
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Your officer authentication tokens and active session have been safely cleared.
                </p>
              </div>

              {/* Audit Summary Box */}
              <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3.5 text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span>Terminal Status:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Unauthenticated (Safe)</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span>Timestamp Recorded:</span>
                  <span className="text-slate-900 dark:text-white">{logoutTimestamp || "Just now"}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span>Local Storage Cache:</span>
                  <span className="text-blue-600 dark:text-blue-400">Wiped Clean</span>
                </div>
              </div>

              {/* Workstation Security Hint */}
              <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-normal">
                🔒 If you are using a shared command room workstation, please close the browser window or tab for maximum security.
              </p>

              {/* Actions & Auto Redirect */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/login"
                    className="flex-1 py-3 px-4 bg-[#002347] hover:bg-[#001830] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-sm"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Log In Again</span>
                  </Link>

                  <Link
                    href="/"
                    className="flex-1 py-3 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-300 dark:border-slate-700 transition-all flex items-center justify-center space-x-2 text-sm"
                  >
                    <Home className="w-4 h-4" />
                    <span>Public Dashboard</span>
                  </Link>
                </div>

                {autoRedirectEnabled && (
                  <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                    <span>
                      Redirecting to Login in <strong className="text-slate-900 dark:text-white font-mono">{redirectCountdown}s</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setAutoRedirectEnabled(false)}
                      className="text-blue-600 dark:text-blue-400 underline hover:opacity-80 text-[11px] ml-1"
                    >
                      (Stay here)
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
