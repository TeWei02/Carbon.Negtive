import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const slidesDir = path.join(process.cwd(), "public", "slides");
  try {
    const files = fs.readdirSync(slidesDir).filter((f) => f.endsWith(".md"));
    const slides = files.map((file) => {
      const content = fs.readFileSync(path.join(slidesDir, file), "utf-8");
      const titleMatch = content.match(/^title:\s*(.+)$/m);
      const title = titleMatch ? titleMatch[1] : file.replace(".md", "");
      return { file, title };
    });
    return NextResponse.json(slides);
  } catch {
    return NextResponse.json([]);
  }
}
