"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import PoliceLogo from "@/components/common/PoliceLogo";
import { ArrowLeft, Download, Copy, Check, ExternalLink } from "lucide-react";

export default function SwaggerDocsPage() {
  const swaggerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Swagger UI CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/swagger-ui-dist@5/swagger-ui.css";
    document.head.appendChild(link);

    // Load Swagger UI JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js";
    script.crossOrigin = "anonymous";
    script.onload = () => {
      if ((window as any).SwaggerUIBundle && swaggerRef.current) {
        (window as any).SwaggerUIBundle({
          url: "/openapi.json",
          domNode: swaggerRef.current,
          deepLinking: true,
          presets: [
            (window as any).SwaggerUIBundle.presets.apis,
          ],
          layout: "BaseLayout"
        });
        setIsLoading(false);
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Header Bar */}
      <div className="bg-[#002347] text-white border-b border-sky-500/30 px-4 py-3 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <PoliceLogo size={32} />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  GP-SENTINEL REST API • Interactive Swagger Documentation
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold hidden sm:inline-block">
                  OpenAPI 3.1
                </span>
              </div>
              <p className="text-[11px] text-sky-200">
                State Crime Record Bureau (SCRB) Video Intelligence & Multi-Department CCTV Federation Endpoints
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={copyUrl}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all font-mono"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied Link!" : "Copy Swagger Link"}</span>
            </button>

            <a
              href="/openapi.json"
              target="_blank"
              rel="noopener noreferrer"
              download="openapi.json"
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold transition-all shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>openapi.json</span>
            </a>
          </div>
        </div>
      </div>

      {/* Swagger UI Canvas */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {isLoading && (
          <div className="py-20 flex flex-col items-center justify-center space-y-3 text-slate-500">
            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-mono">Loading Interactive Swagger UI & OpenAPI Specification...</p>
          </div>
        )}
        <div ref={swaggerRef} className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-2 sm:p-4" />
      </div>
    </div>
  );
}
