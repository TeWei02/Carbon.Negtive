import SlideViewer from "@/components/SlideViewer";

export const metadata = {
  title: "簡報瀏覽 | 負碳褶學",
  description: "以投影片方式瀏覽負碳技術相關簡報",
};

export default function SlidesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📊 簡報瀏覽</h1>
        <p style={{ color: "var(--muted)" }}>
          選擇並瀏覽 Markdown 格式簡報，支援鍵盤方向鍵翻頁。每個 <code>---</code> 分隔符代表一張投影片。
        </p>
      </div>
      <SlideViewer />
    </div>
  );
}
