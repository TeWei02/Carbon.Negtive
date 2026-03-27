import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "負碳褶學 | Negative Carbon Technology",
  description: "探索生物炭與負碳技術的互動式學習平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t mt-16 py-6 text-center" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
          <p>© 2024 負碳褶學 · Negative Carbon Technology Platform</p>
        </footer>
      </body>
    </html>
  );
}
