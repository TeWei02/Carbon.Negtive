import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "負碳褶學 | Negative Carbon Technology",
  description: "探索生物炭與負碳技術的互動式學習平台",
  manifest: `${BASE_PATH}/manifest.json`,
  applicationName: "負碳褶學",
  appleWebApp: { capable: true, title: "負碳褶學", statusBarStyle: "black-translucent" },
  icons: {
    icon: [
      { url: `${BASE_PATH}/icons/favicon.svg`, type: "image/svg+xml" },
      { url: `${BASE_PATH}/icons/favicon-32.png`, sizes: "32x32", type: "image/png" },
    ],
    apple: `${BASE_PATH}/icons/apple-touch-icon.png`,
  },
  openGraph: {
    type: "website",
    title: "負碳褶學 | Negative Carbon Technology",
    description: "探索生物炭與負碳技術的互動式學習平台",
    locale: "zh_TW",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <ServiceWorkerRegistrar />
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t mt-16 py-6 text-center" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
          <p>© 2026 負碳褶學 · Negative Carbon Technology Platform</p>
        </footer>
      </body>
    </html>
  );
}
