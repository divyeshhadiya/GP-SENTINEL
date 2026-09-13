import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/server/services/authService";
import { apiError } from "@/server/utils/response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await authService.authenticate(body.email, body.password);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: "Officer verified successfully",
      access_token: result.accessToken,
      token_type: result.tokenType,
      expires_in: result.expiresInSeconds,
      user: result.officer
    });
  } catch (err) {
    return apiError(err);
  }
}
