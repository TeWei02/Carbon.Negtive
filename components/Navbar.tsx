"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "🌱 簡介" },
  { href: "/tools", label: "⚡ 互動工具" },
  { href: "/cases", label: "📋 案例展示" },
  { href: "/slides", label: "📊 簡報瀏覽" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{ background: "rgba(13,17,23,0.95)", borderColor: "var(--border)", backdropFilter: "blur(8px)" }}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="font-bold text-lg" style={{ color: "var(--foreground)" }}>
          🌿 負碳褶學
        </Link>
        <div className="flex gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link text-sm font-medium${pathname === l.href ? " active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
