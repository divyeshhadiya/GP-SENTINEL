import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const arrayBuffer = await req.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length === 0) {
      return NextResponse.json({ error: "Empty video payload" }, { status: 400 });
    }

    const fileName = "GP-SENTINEL_Official_Demonstration_Video.webm";
    const destinations = [
      path.join("C:", "Users", "USEEER", "Downloads", fileName),
      path.join(process.cwd(), "public", "assets", fileName),
      path.join(process.cwd(), "public", fileName),
      path.join(process.cwd(), fileName)
    ];

    for (const dest of destinations) {
      try {
        const dir = path.dirname(dest);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(dest, buffer);
      } catch (err) {
        console.warn(`Failed to write to ${dest}:`, err);
      }
    }

    return NextResponse.json({
      success: true,
      sizeBytes: buffer.length,
      fileName,
      savedToDownloads: true
    });
  } catch (error: any) {
    console.error("Save video error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
