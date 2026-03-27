"use client";
import { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface SlideFile {
  file: string;
  title: string;
}

function parseSlides(content: string): string[] {
  // Remove frontmatter
  const noFrontmatter = content.replace(/^---[\s\S]+?---\n/, "");
  return noFrontmatter.split(/\n---\n/).map((s) => s.trim()).filter(Boolean);
}

export default function SlideViewer() {
  const [slideFiles, setSlideFiles] = useState<SlideFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/slides")
      .then((r) => r.json())
      .then((data) => {
        setSlideFiles(data);
        if (data.length > 0) setSelectedFile(data[0].file);
      })
      .catch(() => setSlideFiles([]));
  }, []);

  useEffect(() => {
    if (!selectedFile) return;
    setLoading(true);
    fetch(`/api/slides/content?file=${encodeURIComponent(selectedFile)}`)
      .then((r) => r.json())
      .then((data) => {
        const parsed = parseSlides(data.content || "");
        setSlides(parsed);
        setCurrentSlide(0);
      })
      .finally(() => setLoading(false));
  }, [selectedFile]);

  const prev = useCallback(() => setCurrentSlide((c) => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrentSlide((c) => Math.min(slides.length - 1, c + 1)), [slides.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <div className="space-y-4">
      {/* File selector */}
      <div className="flex gap-3 flex-wrap">
        {slideFiles.map((sf) => (
          <button
            key={sf.file}
            onClick={() => setSelectedFile(sf.file)}
            className="text-sm px-4 py-2 rounded-md font-medium transition-colors"
            style={{
              background: selectedFile === sf.file ? "rgba(46,160,67,0.2)" : "var(--card-bg)",
              border: `1px solid ${selectedFile === sf.file ? "var(--accent)" : "var(--border)"}`,
              color: selectedFile === sf.file ? "var(--accent)" : "var(--muted)",
            }}
          >
            📄 {sf.title}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="card p-12 text-center" style={{ color: "var(--muted)" }}>載入中...</div>
      ) : slides.length === 0 ? (
        <div className="card p-12 text-center" style={{ color: "var(--muted)" }}>請選擇一個簡報檔案</div>
      ) : (
        <>
          {/* Progress */}
          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: "var(--muted)" }}>
              {currentSlide + 1} / {slides.length}
            </span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ background: "var(--accent)", width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Slide */}
          <div
            className="card slide-content"
            style={{ minHeight: "480px", padding: "3rem 4rem", position: "relative" }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {slides[currentSlide]}
            </ReactMarkdown>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={prev}
              disabled={currentSlide === 0}
              className="px-5 py-2 rounded-md font-medium text-sm transition-all"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
                color: currentSlide === 0 ? "var(--border)" : "var(--foreground)",
                cursor: currentSlide === 0 ? "not-allowed" : "pointer",
              }}
            >
              ← 上一頁
            </button>

            {/* Slide dots */}
            <div className="flex gap-1.5 flex-wrap justify-center">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: i === currentSlide ? "20px" : "8px",
                    height: "8px",
                    background: i === currentSlide ? "var(--accent)" : "var(--border)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={currentSlide === slides.length - 1}
              className="px-5 py-2 rounded-md font-medium text-sm transition-all"
              style={{
                background: currentSlide === slides.length - 1 ? "var(--card-bg)" : "var(--accent)",
                border: "1px solid var(--border)",
                color: currentSlide === slides.length - 1 ? "var(--border)" : "white",
                cursor: currentSlide === slides.length - 1 ? "not-allowed" : "pointer",
              }}
            >
              下一頁 →
            </button>
          </div>

          {/* Keyboard hint */}
          <p className="text-center text-xs" style={{ color: "var(--muted)" }}>
            💡 可使用鍵盤方向鍵 ← → 翻頁
          </p>

          {/* Slide list */}
          <div className="card p-4">
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--muted)" }}>投影片列表</h3>
            <div className="space-y-1">
              {slides.map((slide, i) => {
                const titleLine = slide.split("\n")[0].replace(/^#+\s*/, "");
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className="w-full text-left flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors"
                    style={{
                      background: i === currentSlide ? "rgba(46,160,67,0.1)" : "transparent",
                      color: i === currentSlide ? "var(--accent)" : "var(--muted)",
                    }}
                  >
                    <span className="text-xs w-5 text-center"
                      style={{ color: i === currentSlide ? "var(--accent)" : "var(--border)" }}>
                      {i + 1}
                    </span>
                    <span className="truncate">{titleLine || `投影片 ${i + 1}`}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
