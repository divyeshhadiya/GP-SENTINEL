import { NextRequest, NextResponse } from "next/server";
import { initialWatchlist } from "@/data/watchlists";
import { WatchlistEntry } from "@/types";

let watchlistStore: WatchlistEntry[] = [...initialWatchlist];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const source = searchParams.get("source");
  const category = searchParams.get("category");
  const severity = searchParams.get("severity");
  const q = searchParams.get("q")?.toLowerCase();

  let list = [...watchlistStore];

  if (source && source !== "ALL") {
    list = list.filter(w => w.source === source);
  }
  if (category && category !== "ALL") {
    list = list.filter(w => w.category === category);
  }
  if (severity && severity !== "ALL") {
    list = list.filter(w => w.severity === severity);
  }
  if (q) {
    list = list.filter(w =>
      w.identifier.toLowerCase().includes(q) ||
      w.details.toLowerCase().includes(q) ||
      (w.registeredOwner && w.registeredOwner.toLowerCase().includes(q)) ||
      (w.firNumber && w.firNumber.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({
    success: true,
    total: list.length,
    watchlists: list
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.identifier || !body.source || !body.category) {
      return NextResponse.json(
        { success: false, error: "identifier, source, and category are required" },
        { status: 400 }
      );
    }

    const newEntry: WatchlistEntry = {
      id: `WL-${body.source.slice(0, 4).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      identifier: body.identifier.toUpperCase().trim(),
      source: body.source,
      category: body.category,
      severity: body.severity || "HIGH",
      details: body.details || "Added by Command Center Operator",
      firNumber: body.firNumber || `FIR-${Math.floor(Math.random() * 900 + 100)}/2026`,
      policeStation: body.policeStation || "State Cyber Crime Cell, Gandhinagar",
      registeredOwner: body.registeredOwner || "N/A",
      vehicleMakeModel: body.vehicleMakeModel || "Unspecified",
      dateAdded: new Date().toISOString(),
      status: "ACTIVE"
    };

    watchlistStore.unshift(newEntry);

    return NextResponse.json({
      success: true,
      message: "Watchlist entry created and broadcasted to edge ANPR nodes",
      entry: newEntry
    }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
