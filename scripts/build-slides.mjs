// Bundle every Markdown deck under public/slides into a single static JSON file
// so the whole site can be exported statically (no server-side API route needed).
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const slidesDir = path.join(root, "public", "slides");
const outFile = path.join(root, "public", "slides-index.json");

const files = fs.existsSync(slidesDir)
  ? fs.readdirSync(slidesDir).filter((f) => f.endsWith(".md")).sort()
  : [];

const decks = files.map((file) => {
  const content = fs.readFileSync(path.join(slidesDir, file), "utf-8");
  const titleMatch = content.match(/^title:\s*(.+)$/m);
  return {
    file,
    title: titleMatch ? titleMatch[1].trim() : file.replace(/\.md$/, ""),
    content,
  };
});

fs.writeFileSync(outFile, JSON.stringify(decks, null, 2) + "\n", "utf-8");
console.log(`[build-slides] bundled ${decks.length} deck(s) -> public/slides-index.json`);
