"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Tv,
  Network,
  Navigation,
  Database,
  AlertOctagon,
  PieChart,
  Cpu,
  Terminal,
  LogIn,
  LogOut,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
  modelBadge?: string;
}

const navItems: NavItem[] = [
  {
    name: "Command Dashboard",
    href: "/",
    icon: LayoutDashboard
  },
  {
    name: "GIS Camera Registry",
    href: "/registry",
    icon: MapPin,
    modelBadge: "Model 1"
  },
  {
    name: "Unified Video Wall",
    href: "/video-wall",
    icon: Tv,
    modelBadge: "Model 2"
  },
  {
    name: "VMS Federation",
    href: "/federation",
    icon: Network,
    modelBadge: "Model 3"
  },
  {
    name: "Vehicle Route Tracker",
    href: "/vehicle-tracking",
    icon: Navigation,
    modelBadge: "Model 4",
    tag: "Core Test"
  },
  {
    name: "Watchlist Databases",
    href: "/watchlists",
    icon: Database,
    tag: "VAHAN/eGuj"
  },
  {
    name: "Live Incident Alerts",
    href: "/alerts",
    icon: AlertOctagon,
    tag: "3 Active"
  },
  {
    name: "Gap Analysis Reports",
    href: "/gap-analysis",
    icon: PieChart,
    modelBadge: "Model 1"
  },
  {
    name: "80k Scalability & HLD",
    href: "/architecture",
    icon: Cpu,
    modelBadge: "Model 5"
  },
  {
    name: "Sandbox Ingest Guide",
    href: "/sandbox",
    icon: Terminal,
    tag: "§1 - §4"
  },
  {
    name: "Officer Login Portal",
    href: "/login",
    icon: LogIn,
    tag: "Auth"
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();

  return (
    <aside className="w-64 bg-white/95 dark:bg-police-900/95 border-r border-slate-200 dark:border-police-800 flex flex-col h-[calc(100vh-80px)] sticky top-[80px] shrink-0 transition-colors">
      <div className="p-3 text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-police-850 flex items-center justify-between">
        <span>Command Modules</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
      </div>

      <nav className="p-2 space-y-1 overflow-y-auto flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
                isActive
                  ? "bg-blue-50 dark:bg-police-accent/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-police-accent/40 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-police-800/60 border border-transparent"
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </div>

              <div className="flex items-center space-x-1 shrink-0 ml-1.5">
                {item.modelBadge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60">
                    {item.modelBadge}
                  </span>
                )}
                {item.tag && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 font-bold">
                    {item.tag}
                  </span>
                )}
              </div>
            </Link>
          );
        })}

        {/* Dedicated Sign Out nav item if logged in */}
        {isAuthenticated && (
          <Link
            href="/logout"
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group ${
              pathname === "/logout"
                ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 shadow-sm"
                : "text-red-600/80 dark:text-red-400/80 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50/50 dark:hover:bg-red-950/30 border border-transparent"
            }`}
          >
            <div className="flex items-center space-x-2.5 truncate">
              <LogOut className="w-4 h-4 shrink-0" />
              <span className="truncate font-semibold">Sign Out / End Session</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-900">
              Exit
            </span>
          </Link>
        )}
      </nav>

      {/* Active Officer Quick Card */}
      {isAuthenticated && user ? (
        <div className="p-3 mx-2 mb-2 rounded-xl bg-blue-50/70 dark:bg-police-800/80 border border-blue-200/80 dark:border-police-700/80 space-y-2">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-[#002347] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {user.name.split(",")[0]}
              </div>
              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-mono truncate">
                {user.badgeId} • {user.role}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 pt-1 border-t border-blue-100 dark:border-police-700/50 text-[11px]">
            <Link
              href="/login"
              className="flex-1 text-center py-1 rounded bg-white dark:bg-police-700 border border-slate-200 dark:border-police-600 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 text-[10px]"
            >
              Switch Role
            </Link>
            <Link
              href="/logout"
              className="flex-1 text-center py-1 rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 font-bold hover:bg-red-100 text-[10px] flex items-center justify-center space-x-1"
            >
              <LogOut className="w-2.5 h-2.5" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="p-2.5 mx-2 mb-2 rounded-xl bg-slate-50 dark:bg-police-800/50 border border-slate-200 dark:border-police-700/50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Guest Terminal</span>
          </div>
          <Link
            href="/login"
            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[11px] font-bold shadow-sm"
          >
            Sign In
          </Link>
        </div>
      )}

      {/* Sub-footer with compliance status */}
      <div className="p-3 border-t border-slate-200 dark:border-police-850 bg-slate-50 dark:bg-police-900 text-[11px] text-slate-500 dark:text-slate-400 space-y-1.5 transition-colors">
        <div className="flex items-center justify-between">
          <span>Gujarat VMS Stack:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">Federated</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
          <span>Security Protocol:</span>
          <span className="font-mono">TLS 1.3 / mTLS</span>
        </div>
      </div>
    </aside>
  );
}
