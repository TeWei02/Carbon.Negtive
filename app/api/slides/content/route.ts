import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");
  if (!file || file.includes("..") || !file.endsWith(".md")) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }
  const slidesDir = path.join(process.cwd(), "public", "slides");
  const filePath = path.join(slidesDir, file);
  if (!filePath.startsWith(slidesDir)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
