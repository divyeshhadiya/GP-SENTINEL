import { NextResponse } from "next/server";
import { ApiError } from "./errors";

export interface ApiResponse<T = any> {
  success: boolean;
  timestamp: string;
  data?: T;
  meta?: Record<string, any>;
  error?: string;
  details?: any;
}

export function apiSuccess<T>(data: T, meta?: Record<string, any>, status = 200) {
  return NextResponse.json(
    {
      success: true,
      timestamp: new Date().toISOString(),
      data,
      ...(meta ? { meta } : {})
    },
    { status }
  );
}

export function apiError(error: unknown, defaultMessage = "Internal Server Error", defaultStatus = 500) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        timestamp: new Date().toISOString(),
        error: error.message,
        ...(error.details ? { details: error.details } : {})
      },
      { status: error.statusCode }
    );
  }

  const message = error instanceof Error ? error.message : defaultMessage;
  return NextResponse.json(
    {
      success: false,
      timestamp: new Date().toISOString(),
      error: message
    },
    { status: defaultStatus }
  );
}
