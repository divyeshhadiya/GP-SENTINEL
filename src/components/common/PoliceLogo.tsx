"use client";

import React, { useState } from "react";

interface Props {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function PoliceLogo({ className = "", size = 44, showText = false }: Props) {
  const [imgError, setImgError] = useState(false);
  const height = Math.round(size * 1.28);

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Official Gujarat Police Emblem Badge */}
      {!imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/assets/gujarat-police-logo.png"
          alt="Gujarat Police Official Emblem"
          width={size}
          height={height}
          onError={() => setImgError(true)}
          className="shrink-0 object-contain drop-shadow-md select-none"
          style={{ width: `${size}px`, height: "auto" }}
        />
      ) : (
        /* Crisp Vector Fallback Shield */
        <svg
          width={size}
          height={height}
          viewBox="0 0 100 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 drop-shadow-md"
        >
          <path
            d="M50 4 C68 4 94 12 96 32 C96 74 72 106 50 124 C28 106 4 74 4 32 C6 12 32 4 50 4 Z"
            fill="#002347"
            stroke="#ffffff"
            strokeWidth="3"
          />
          <circle cx="50" cy="62" r="22" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="50" cy="62" r="16" fill="#1e3a8a" />
          <text x="50" y="112" textAnchor="middle" fill="#facc15" fontSize="7" fontWeight="bold">
            GUJARAT POLICE
          </text>
        </svg>
      )}

      {showText && (
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="text-base font-extrabold tracking-wider text-slate-900 dark:text-white uppercase">
              Gujarat Police
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold border border-blue-300 dark:border-blue-800">
              SCRB
            </span>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
            Home Department • Government of Gujarat
          </p>
        </div>
      )}
    </div>
  );
}
