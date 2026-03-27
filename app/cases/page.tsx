export const metadata = {
  title: "案例展示 | 負碳褶學",
  description: "全球負碳技術應用案例展示",
};

const cases = [
  {
    id: 1,
    title: "丹麥 Husk 生物炭農業計畫",
    country: "🇩🇰 丹麥",
    technology: "生物炭",
    category: "農業",
    year: "2022",
    scale: "5,000 噸/年",
    reduction: "13,000 tCO₂/年",
    description: "丹麥農業企業將穀物廢稻殼轉化為生物炭，施用於農田後不僅封存碳素，更提升土壤保水能力達 25%。透過碳信用交易，每噸生物炭可獲得約 USD 150 收益。",
    highlights: ["碳信用收益 USD 750,000/年", "土壤有機質增加 18%", "用水量降低 20%", "農作物產量提升 15%"],
    status: "進行中",
    statusColor: "#2ea043",
  },
  {
    id: 2,
    title: "冰島 Climeworks Orca DAC 工廠",
    country: "🇮🇸 冰島",
    technology: "直接空氣捕獲",
    category: "工業",
    year: "2021",
    scale: "4,000 tCO₂/年",
    reduction: "4,000 tCO₂/年",
    description: "全球首座大規模商業化直接空氣捕獲工廠，利用冰島地熱能源驅動，將大氣中的 CO₂ 礦化後永久封存於玄武岩層。每噸捕獲成本約 USD 600–1,000。",
    highlights: ["全球首座商業 DAC 工廠", "使用 100% 可再生能源", "CO₂ 礦化封存 >1000 年", "已有微軟等企業購買碳信用"],
    status: "運營中",
    statusColor: "#1f6feb",
  },
  {
    id: 3,
    title: "印度 Karnataka 強化岩石風化",
    country: "🇮🇳 印度",
    technology: "強化岩石風化",
    category: "農業",
    year: "2023",
    scale: "10,000 噸礦粉/年",
    reduction: "9,000 tCO₂/年",
    description: "在喀拉那塔卡邦蔗糖農地上施撒玄武岩粉末，加速自然風化過程，不僅固碳還補充土壤礦物質，降低化肥使用量。",
    highlights: ["礦物元素補充替代 30% 化肥", "土壤 pH 穩定改善", "成本 USD 50–80/tCO₂", "規模可擴展性高"],
    status: "試驗中",
    statusColor: "#ffa657",
  },
  {
    id: 4,
    title: "越南湄公河三角洲紅樹林復育",
    country: "🇻🇳 越南",
    technology: "藍碳",
    category: "生態",
    year: "2020",
    scale: "10,000 公頃",
    reduction: "75,000 tCO₂/年",
    description: "在湄公河三角洲恢復受蝦養殖破壞的紅樹林，結合當地社區生計，每公頃紅樹林每年可封存 7.5 噸 CO₂，並提供重要的海岸保護功能。",
    highlights: ["生物多樣性顯著提升", "沿岸侵蝕減少 40%", "漁業資源增加", "社區收入提升 25%"],
    status: "進行中",
    statusColor: "#2ea043",
  },
  {
    id: 5,
    title: "台灣農委會生物炭推廣計畫",
    country: "🇹🇼 台灣",
    technology: "生物炭",
    category: "農業",
    year: "2023",
    scale: "500 噸/年（試驗）",
    reduction: "1,300 tCO₂/年",
    description: "農委會與多所大學合作，以稻殼與茶葉廢料製作生物炭，在嘉義、彰化農田進行實驗，評估本地化生物炭對土壤的長期影響。",
    highlights: ["本土化原料利用", "學術研究同步進行", "碳足跡驗證機制建立", "農民補貼方案研擬"],
    status: "試驗中",
    statusColor: "#ffa657",
  },
  {
    id: 6,
    title: "加拿大 Carbon Streaming 森林碳匯",
    country: "🇨🇦 加拿大",
    technology: "造林/再造林",
    category: "林業",
    year: "2019",
    scale: "500,000 公頃",
    reduction: "2,500,000 tCO₂/年",
    description: "在英屬哥倫比亞省管理天然林與人工造林，透過嚴格監測確保碳封存品質，並向微軟、Stripe 等科技公司出售碳信用。",
    highlights: ["VERRA 認證碳信用", "野生動物棲地保護", "原住民社區共管", "長期碳封存 >100 年"],
    status: "運營中",
    statusColor: "#1f6feb",
  },
];

const categoryColors: Record<string, string> = {
  農業: "rgba(46,160,67,0.2)",
  工業: "rgba(31,111,235,0.2)",
  生態: "rgba(121,192,255,0.2)",
  林業: "rgba(255,166,87,0.2)",
};

const categoryTextColors: Record<string, string> = {
  農業: "#2ea043",
  工業: "#58a6ff",
  生態: "#79c0ff",
  林業: "#ffa657",
};

export default function CasesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📋 案例展示</h1>
        <p style={{ color: "var(--muted)" }}>
          來自全球的負碳技術應用案例，涵蓋生物炭、DAC、強化岩石風化與藍碳等多種技術路徑。
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "案例總數", val: cases.length },
          { label: "涵蓋國家", val: "6 國" },
          { label: "總減碳量", val: "2.6M+" },
          { label: "技術類型", val: "5 種" },
        ].map((s) => (
          <div key={s.label} className="card p-4 text-center">
            <div className="text-2xl font-bold" style={{ color: "var(--accent)" }}>{s.val}</div>
            <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {cases.map((c) => (
          <div key={c.id} className="card p-6">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <h2 className="font-semibold text-base leading-snug mb-1">{c.title}</h2>
                <div className="flex gap-2 flex-wrap text-xs">
                  <span>{c.country}</span>
                  <span style={{ color: "var(--border)" }}>·</span>
                  <span style={{ color: "var(--muted)" }}>{c.year}</span>
                  <span
                    className="px-2 py-0.5 rounded"
                    style={{
                      background: categoryColors[c.category] || "rgba(255,255,255,0.05)",
                      color: categoryTextColors[c.category] || "var(--foreground)",
                    }}
                  >
                    {c.category}
                  </span>
                </div>
              </div>
              <span
                className="text-xs px-2 py-1 rounded whitespace-nowrap font-medium"
                style={{ background: `${c.statusColor}20`, color: c.statusColor, border: `1px solid ${c.statusColor}40` }}
              >
                {c.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
              <div className="rounded p-2" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div style={{ color: "var(--muted)" }}>技術類型</div>
                <div className="font-medium mt-0.5">{c.technology}</div>
              </div>
              <div className="rounded p-2" style={{ background: "rgba(255,255,255,0.03)" }}>
                <div style={{ color: "var(--muted)" }}>年減碳量</div>
                <div className="font-medium mt-0.5" style={{ color: "var(--accent)" }}>{c.reduction}</div>
              </div>
            </div>

            <p className="text-sm mb-3" style={{ color: "var(--muted)", lineHeight: 1.65 }}>
              {c.description}
            </p>

            <div className="space-y-1.5">
              {c.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2 text-xs" style={{ color: "var(--muted)" }}>
                  <span style={{ color: "var(--accent)", marginTop: "1px" }}>✓</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
