import { NextRequest, NextResponse } from "next/server";
import { watchlistService } from "@/server/services/watchlistService";
import { apiError } from "@/server/utils/response";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const source = searchParams.get("source") || undefined;
    const category = searchParams.get("category") || undefined;
    const severity = searchParams.get("severity") || undefined;
    const query = searchParams.get("q") || undefined;

    const result = await watchlistService.getWatchlists({
      source,
      category,
      severity,
      query
    });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result
    });
  } catch (err) {
    return apiError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entry = await watchlistService.addEntry(body);

    return NextResponse.json(
      {
        success: true,
        timestamp: new Date().toISOString(),
        message: "Watchlist entry created successfully",
        entry
      },
      { status: 201 }
    );
  } catch (err) {
    return apiError(err);
  }
}
