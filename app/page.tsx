import Link from "next/link";

const features = [
  {
    icon: "⚡",
    title: "互動計算工具",
    desc: "輸入年限、碳價、生物炭產量，即時估算 NPV 與總減碳量，結果以圖表呈現。",
    href: "/tools",
  },
  {
    icon: "📋",
    title: "案例展示",
    desc: "來自全球的負碳技術應用案例，包含農業、林業、工業等多種場景。",
    href: "/cases",
  },
  {
    icon: "📊",
    title: "簡報瀏覽",
    desc: "以投影片方式瀏覽 Markdown 格式簡報，支援鍵盤翻頁。",
    href: "/slides",
  },
];

const techs = [
  { name: "生物炭（Biochar）", desc: "將生物質熱解轉化為穩定碳形態，封存於土壤中。", rate: "~2.6 tCO₂/t biochar" },
  { name: "直接空氣捕獲（DAC）", desc: "利用化學吸附劑從大氣中直接擷取 CO₂。", rate: "~1 tCO₂/unit energy" },
  { name: "強化岩石風化（ERW）", desc: "加速礦物風化過程，將大氣中 CO₂ 轉化為碳酸鹽。", rate: "~0.3–1.5 tCO₂/t rock" },
  { name: "藍碳（Blue Carbon）", desc: "保護與恢復海岸生態系（紅樹林、海草床）的碳匯功能。", rate: "~5–10 tCO₂/ha/yr" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="text-center py-16">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
          style={{ background: "rgba(46,160,67,0.15)", color: "var(--accent)", border: "1px solid rgba(46,160,67,0.3)" }}>
          負碳技術學習平台
        </div>
        <h1 className="text-5xl font-bold mb-4" style={{ lineHeight: 1.2 }}>
          負碳褶學
        </h1>
        <p className="text-xl mb-2" style={{ color: "#79c0ff" }}>Negative Carbon Technology</p>
        <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
          透過互動工具、案例分析與簡報資源，深入了解生物炭與其他負碳技術如何協助人類達成淨零排放目標。
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/tools" className="btn-primary">開始計算 →</Link>
          <Link href="/slides" className="px-4 py-2 rounded-md font-semibold text-sm"
            style={{ border: "1px solid var(--border)", color: "var(--foreground)" }}>
            瀏覽簡報
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { val: "2.6 t", unit: "tCO₂/t biochar", label: "生物炭固碳率" },
          { val: "900°C", unit: "熱解溫度", label: "高溫炭化" },
          { val: "100+", unit: "年", label: "碳封存年限" },
          { val: "3x", unit: "土壤肥力", label: "農業增益" },
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: "var(--accent)" }}>{s.val}</div>
            <div className="text-xs" style={{ color: "#79c0ff" }}>{s.unit}</div>
            <div className="text-sm mt-1" style={{ color: "var(--muted)" }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 mb-12">
        {features.map((f) => (
          <Link key={f.href} href={f.href}
            className="card p-6 hover:border-green-700 transition-colors block"
            style={{ borderColor: "var(--border)" }}>
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-sm" style={{ color: "var(--muted)" }}>{f.desc}</p>
          </Link>
        ))}
      </section>

      {/* Tech overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">主要負碳技術</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {techs.map((t) => (
            <div key={t.name} className="card p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold">{t.name}</h3>
                <span className="text-xs px-2 py-1 rounded whitespace-nowrap"
                  style={{ background: "rgba(46,160,67,0.15)", color: "var(--accent)" }}>
                  {t.rate}
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--muted)" }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What is biochar */}
      <section className="card p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">什麼是生物炭？</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="mb-3" style={{ color: "var(--muted)" }}>
              生物炭（Biochar）是將有機生物質（如稻殼、木材廢料、農業殘餘物）在低氧或無氧環境下高溫熱解（300–900°C）所產生的固態碳材料。
            </p>
            <p style={{ color: "var(--muted)" }}>
              與普通炭不同，生物炭施用於土壤後，可穩定封存碳達數百年，同時改善土壤結構、增加保水能力，並促進土壤微生物活性。
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3" style={{ color: "#79c0ff" }}>生物炭的多重效益</h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--muted)" }}>
              <li>🌍 <strong style={{ color: "var(--foreground)" }}>碳封存</strong>：每噸生物炭可固定約 2.6 噸 CO₂</li>
              <li>🌾 <strong style={{ color: "var(--foreground)" }}>農業增益</strong>：改善土壤肥力，提升作物產量 10–30%</li>
              <li>💧 <strong style={{ color: "var(--foreground)" }}>保水能力</strong>：增加土壤保水性，減少灌溉需求</li>
              <li>🔋 <strong style={{ color: "var(--foreground)" }}>能源回收</strong>：熱解過程可產生生物油與合成氣</li>
              <li>♻️ <strong style={{ color: "var(--foreground)" }}>廢棄物利用</strong>：將農業廢棄物轉化為高價值產品</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
