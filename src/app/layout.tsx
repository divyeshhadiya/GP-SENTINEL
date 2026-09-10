import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Gujarat Police SENTINEL | Integrated Video Intelligence Platform",
  description:
    "Integrated statewide CCTV management, VMS federation, AI video analytics, vehicle tracking, and watchlist cross-referencing for Gujarat Police Innovation Challenge 2026.",
  icons: {
    icon: [
      { url: "/assets/gujarat-police-logo.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/assets/gujarat-police-logo.png",
    apple: "/assets/gujarat-police-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/png" href="/assets/gujarat-police-logo.png" />
        <link rel="shortcut icon" href="/assets/gujarat-police-logo.png" />
        <link rel="apple-touch-icon" href="/assets/gujarat-police-logo.png" />
        {/* Leaflet CSS stylesheet for GIS mapping */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="bg-slate-50 dark:bg-police-900 text-slate-900 dark:text-slate-200 min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <AuthProvider>
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto bg-slate-100/60 dark:bg-slate-950/60 p-4 md:p-6">
                {children}
              </main>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
