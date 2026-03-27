import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");
  if (!file || !file.endsWith(".md")) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }
  const slidesDir = path.resolve(process.cwd(), "public", "slides");
  const filePath = path.resolve(slidesDir, file);
  // Ensure the resolved path is strictly inside the slides directory
  if (!filePath.startsWith(slidesDir + path.sep) && filePath !== slidesDir) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
