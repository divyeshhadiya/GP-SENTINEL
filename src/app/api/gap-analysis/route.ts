import { NextResponse } from "next/server";
import { gapAnalysisService } from "@/server/services/gapAnalysisService";
import { apiError } from "@/server/utils/response";

export async function GET() {
  try {
    const analysis = await gapAnalysisService.getAnalysis();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...analysis
    });
  } catch (err) {
    return apiError(err);
  }
}
