"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PoliceLogo from "@/components/common/PoliceLogo";
import { ArrowLeft, Download, Copy, Check, ShieldCheck, Terminal, BookOpen } from "lucide-react";

export default function SwaggerDocsPage() {
  const swaggerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Load Swagger UI CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/swagger-ui/swagger-ui.css";
    document.head.appendChild(link);

    // 2. Load Swagger UI Bundle Script
    const bundleScript = document.createElement("script");
    bundleScript.src = "/swagger-ui/swagger-ui-bundle.js";
    bundleScript.crossOrigin = "anonymous";

    // 3. Load Swagger UI Standalone Preset Script
    const presetScript = document.createElement("script");
    presetScript.src = "/swagger-ui/swagger-ui-standalone-preset.js";
    presetScript.crossOrigin = "anonymous";

    let bundleLoaded = false;
    let presetLoaded = false;

    const initSwagger = () => {
      if (bundleLoaded && presetLoaded && (window as any).SwaggerUIBundle && swaggerRef.current) {
        try {
          (window as any).SwaggerUIBundle({
            url: "/openapi.json",
            domNode: swaggerRef.current,
            deepLinking: true,
            presets: [
              (window as any).SwaggerUIBundle.presets.apis,
              (window as any).SwaggerUIStandalonePreset
            ],
            plugins: [
              (window as any).SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout",
            docExpansion: "list",
            defaultModelsExpandDepth: 1,
            defaultModelExpandDepth: 1,
            displayRequestDuration: true,
            filter: true,
            tryItOutEnabled: true,
            persistAuthorization: true
          });
        } catch (e) {
          console.error("Swagger UI initialization error:", e);
        } finally {
          setIsLoading(false);
        }
      }
    };

    bundleScript.onload = () => {
      bundleLoaded = true;
      initSwagger();
    };

    presetScript.onload = () => {
      presetLoaded = true;
      initSwagger();
    };

    document.body.appendChild(bundleScript);
    document.body.appendChild(presetScript);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(bundleScript)) document.body.removeChild(bundleScript);
      if (document.body.contains(presetScript)) document.body.removeChild(presetScript);
    };
  }, []);

  const copyUrl = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Header Bar */}
      <header className="bg-[#001833] text-white border-b border-sky-500/20 px-4 py-3 sticky top-0 z-50 shadow-md backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 flex items-center gap-1.5 text-xs font-semibold"
              title="Return to GP-SENTINEL Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <PoliceLogo size={34} />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-sm sm:text-base font-bold text-white tracking-wide flex items-center gap-2">
                  <span>GP-SENTINEL REST API</span>
                  <span className="text-sky-400 font-mono text-xs hidden md:inline">• OpenAPI 3.0.3</span>
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold hidden sm:inline-block">
                  Live Interactive
                </span>
              </div>
              <p className="text-[11px] text-sky-300/80">
                Gujarat Police SCRB Statewide Video Intelligence & Multi-Department CCTV Federation Endpoints
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={copyUrl}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all font-mono border border-white/10"
              title="Copy URL to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </button>

            <a
              href="/openapi.json"
              target="_blank"
              rel="noopener noreferrer"
              download="openapi.json"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold transition-all shadow-md shadow-sky-900/30"
            >
              <Download className="w-3.5 h-3.5" />
              <span>openapi.json</span>
            </a>
          </div>
        </div>
      </header>

      {/* Info Hero Banner */}
      <div className="bg-[#002244] border-b border-sky-500/20 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
              <Terminal className="w-3.5 h-3.5" />
              <span>REST Specification & Developer Sandbox</span>
            </div>
            <p className="text-xs text-slate-300 max-w-3xl">
              Access the interactive API explorer below. Test live queries for PostGIS CCTV registries, ANPR vehicle tracking, Section 65B forensic verification, real-time alert queues, and RTSP video ingestion feeds.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="bg-sky-950/60 border border-sky-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sky-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>CORS Enabled</span>
            </div>
            <div className="bg-sky-950/60 border border-sky-500/30 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sky-200">
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>Try It Out Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Swagger UI Canvas */}
      <main className="max-w-7xl mx-auto w-full p-3 sm:p-6 flex-1">
        {isLoading && (
          <div className="py-24 flex flex-col items-center justify-center space-y-4 text-slate-300">
            <div className="w-10 h-10 border-3 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-mono tracking-wide">Initializing GP-SENTINEL Swagger UI & OpenAPI Engine...</p>
          </div>
        )}

        <div className={`bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden p-2 sm:p-6 ${isLoading ? "hidden" : "block"}`}>
          <div ref={swaggerRef} id="swagger-ui" />
        </div>
      </main>

      {/* Custom Styles to Override Swagger Default Topbar and Polish UI */}
      <style jsx global>{`
        /* Hide default Swagger UI top banner */
        .swagger-ui .topbar {
          display: none !important;
        }

        /* Swagger container font & clean sizing */
        .swagger-ui {
          font-family: inherit;
          color: #0f172a;
        }

        /* Server dropdown container styling */
        .swagger-ui .scheme-container {
          background: #f8fafc !important;
          padding: 16px 20px !important;
          border-radius: 12px !important;
          box-shadow: none !important;
          border: 1px solid #e2e8f0 !important;
          margin-bottom: 24px !important;
        }

        .swagger-ui .info {
          margin: 16px 0 24px 0 !important;
        }

        .swagger-ui .info .title {
          font-size: 24px !important;
          color: #002244 !important;
          font-weight: 800 !important;
        }

        .swagger-ui .info p {
          color: #475569 !important;
          font-size: 14px !important;
          line-height: 1.6 !important;
        }

        /* Operation Blocks */
        .swagger-ui .opblock {
          border-radius: 12px !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05) !important;
          margin-bottom: 12px !important;
          overflow: hidden !important;
        }

        .swagger-ui .opblock .opblock-summary {
          padding: 10px 16px !important;
        }

        .swagger-ui .opblock .opblock-summary-method {
          font-weight: 700 !important;
          border-radius: 8px !important;
          min-width: 75px !important;
          text-align: center !important;
        }

        .swagger-ui .opblock-tag {
          font-size: 18px !important;
          font-weight: 700 !important;
          color: #002244 !important;
          border-bottom: 1px solid #e2e8f0 !important;
          padding-bottom: 8px !important;
          margin-top: 24px !important;
        }

        .swagger-ui .opblock-tag small {
          color: #64748b !important;
          font-weight: 400 !important;
          font-size: 13px !important;
        }

        /* Buttons & Inputs */
        .swagger-ui .btn.execute {
          background-color: #0284c7 !important;
          border-color: #0284c7 !important;
          color: #ffffff !important;
          box-shadow: 0 2px 4px rgba(2, 132, 199, 0.25) !important;
          border-radius: 8px !important;
          font-weight: 600 !important;
        }

        .swagger-ui .btn.execute:hover {
          background-color: #0369a1 !important;
        }

        .swagger-ui .btn.try-out__btn {
          border-radius: 6px !important;
        }

        .swagger-ui select {
          border-radius: 6px !important;
          padding: 6px 10px !important;
          border: 1px solid #cbd5e1 !important;
        }

        /* Models Section */
        .swagger-ui section.models {
          border-radius: 12px !important;
          border: 1px solid #e2e8f0 !important;
          margin-top: 32px !important;
        }

        .swagger-ui section.models h4 {
          color: #002244 !important;
          font-weight: 700 !important;
        }

        /* Responsive table wrapping */
        .swagger-ui table {
          word-break: break-word !important;
        }
      `}</style>
    </div>
  );
}

