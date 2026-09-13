"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone =
    pathname === "/login" ||
    pathname === "/logout" ||
    pathname === "/signup" ||
    pathname === "/docs";

  if (isStandalone) {
    return <div className="min-h-screen flex flex-col">{children}</div>;
  }

  return (
    <>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-slate-100/60 dark:bg-slate-950/60 p-3 sm:p-4 md:p-6 transition-all">
          {children}
        </main>
      </div>
    </>
  );
}
