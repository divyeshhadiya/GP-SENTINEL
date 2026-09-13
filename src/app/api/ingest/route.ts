import { NextResponse } from "next/server";
import { ingestService } from "@/server/services/ingestService";
import { apiError } from "@/server/utils/response";

export async function GET() {
  try {
    const catalogue = await ingestService.getStreamCatalogue();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...catalogue
    });
  } catch (err) {
    return apiError(err);
  }
}
