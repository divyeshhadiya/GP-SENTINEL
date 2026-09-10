"use client";

import React from "react";
import VehicleTracker from "@/components/analytics/VehicleTracker";
import { Navigation, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function VehicleTrackingPage() {
  return (
    <div className="space-y-5">
      {/* Mounted Vehicle Tracker Component */}
      <VehicleTracker />
    </div>
  );
}
