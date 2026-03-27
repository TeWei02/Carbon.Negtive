"use client";
import { useState, useCallback } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

interface Params {
  years: number;
  biochartTons: number;
  carbonPrice: number;
  discountRate: number;
  productionCostPerTon: number;
  technologyType: string;
}

interface YearData {
  year: number;
  annualCarbon: number;
  annualRevenue: number;
  cumulativeCarbon: number;
  npvContribution: number;
  cumulativeNPV: number;
}

const TECH_FACTORS: Record<string, { label: string; carbonFactor: number; desc: string }> = {
  biochar: { label: "生物炭 (Biochar)", carbonFactor: 2.6, desc: "每噸生物炭封存約 2.6 tCO₂" },
  dac: { label: "直接空氣捕獲 (DAC)", carbonFactor: 1.0, desc: "每單位能耗捕獲約 1 tCO₂" },
  erw: { label: "強化岩石風化 (ERW)", carbonFactor: 0.9, desc: "每噸礦粉固碳約 0.9 tCO₂" },
  bluecarbon: { label: "藍碳 (Blue Carbon)", carbonFactor: 7.5, desc: "每公頃海岸生態系年固碳約 7.5 tCO₂" },
};

function calculateData(params: Params): { data: YearData[]; totalCarbon: number; totalNPV: number } {
  const tech = TECH_FACTORS[params.technologyType] || TECH_FACTORS.biochar;
  const data: YearData[] = [];
  let cumulativeCarbon = 0;
  let cumulativeNPV = 0;

  for (let y = 1; y <= params.years; y++) {
    const annualCarbon = params.biochartTons * tech.carbonFactor;
    const annualRevenue = annualCarbon * params.carbonPrice - params.biochartTons * params.productionCostPerTon;
    const npvContribution = annualRevenue / Math.pow(1 + params.discountRate / 100, y);
    cumulativeCarbon += annualCarbon;
    cumulativeNPV += npvContribution;
    data.push({
      year: y,
      annualCarbon: Math.round(annualCarbon * 10) / 10,
      annualRevenue: Math.round(annualRevenue),
      cumulativeCarbon: Math.round(cumulativeCarbon * 10) / 10,
      npvContribution: Math.round(npvContribution),
      cumulativeNPV: Math.round(cumulativeNPV),
    });
  }
  return { data, totalCarbon: cumulativeCarbon, totalNPV: cumulativeNPV };
}

const CHART_COLORS = {
  carbon: "#2ea043",
  revenue: "#1f6feb",
  npv: "#f78166",
  cumulative: "#79c0ff",
};

export default function CarbonCalculator() {
  const [params, setParams] = useState<Params>({
    years: 20,
    biochartTons: 100,
    carbonPrice: 50,
    discountRate: 5,
    productionCostPerTon: 80,
    technologyType: "biochar",
  });
  const [activeChart, setActiveChart] = useState<"carbon" | "revenue" | "npv">("carbon");

  const { data, totalCarbon, totalNPV } = calculateData(params);
  const tech = TECH_FACTORS[params.technologyType];

  const update = useCallback((key: keyof Params, value: string | number) => {
    setParams((prev) => ({ ...prev, [key]: typeof value === "string" && key !== "technologyType" ? Number(value) : value }));
  }, []);

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("zh-TW", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

  const tooltipStyle = {
    backgroundColor: "var(--card-bg)",
    border: "1px solid var(--border)",
    color: "var(--foreground)",
    borderRadius: "6px",
  };

  return (
    <div className="space-y-6">
      {/* Tech info */}
      <div className="card p-4 flex items-center gap-3" style={{ borderColor: "rgba(46,160,67,0.4)" }}>
        <span className="text-2xl">🔬</span>
        <div>
          <span className="font-semibold">{tech.label}</span>
          <span className="text-sm ml-2" style={{ color: "var(--muted)" }}>{tech.desc}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="card p-6 space-y-5 md:col-span-1">
          <h2 className="font-semibold text-lg">參數設定</h2>

          <div>
            <label className="block text-sm mb-2" style={{ color: "var(--muted)" }}>負碳技術類型</label>
            <select value={params.technologyType} onChange={(e) => update("technologyType", e.target.value)}>
              {Object.entries(TECH_FACTORS).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2" style={{ color: "var(--muted)" }}>
              年限：<strong style={{ color: "var(--foreground)" }}>{params.years} 年</strong>
            </label>
            <input type="range" min="1" max="50" value={params.years}
              onChange={(e) => update("years", e.target.value)} className="w-full" />
          </div>

          <div>
            <label className="block text-sm mb-2" style={{ color: "var(--muted)" }}>
              年產量（噸）
            </label>
            <input type="number" min="1" value={params.biochartTons}
              onChange={(e) => update("biochartTons", e.target.value)} />
          </div>

          <div>
            <label className="block text-sm mb-2" style={{ color: "var(--muted)" }}>
              碳價（USD/tCO₂）：<strong style={{ color: "var(--foreground)" }}>${params.carbonPrice}</strong>
            </label>
            <input type="range" min="0" max="300" step="5" value={params.carbonPrice}
              onChange={(e) => update("carbonPrice", e.target.value)} className="w-full" />
          </div>

          <div>
            <label className="block text-sm mb-2" style={{ color: "var(--muted)" }}>
              折現率（%）：<strong style={{ color: "var(--foreground)" }}>{params.discountRate}%</strong>
            </label>
            <input type="range" min="0" max="20" step="0.5" value={params.discountRate}
              onChange={(e) => update("discountRate", e.target.value)} className="w-full" />
          </div>

          <div>
            <label className="block text-sm mb-2" style={{ color: "var(--muted)" }}>
              每噸生產成本（USD）
            </label>
            <input type="number" min="0" value={params.productionCostPerTon}
              onChange={(e) => update("productionCostPerTon", e.target.value)} />
          </div>
        </div>

        {/* Results */}
        <div className="md:col-span-2 space-y-4">
          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: CHART_COLORS.carbon }}>
                {totalCarbon.toLocaleString("zh-TW", { maximumFractionDigits: 0 })}
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>tCO₂ 總封存</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: CHART_COLORS.npv }}>
                {formatCurrency(totalNPV)}
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>累計 NPV</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: CHART_COLORS.cumulative }}>
                {(data[data.length - 1]?.annualRevenue > 0 ? "✅" : "⚠️")}
                {" "}{data[data.length - 1]?.annualRevenue > 0 ? "盈利" : "虧損"}
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>年度損益狀態</div>
            </div>
          </div>

          {/* Chart toggle */}
          <div className="flex gap-2">
            {(["carbon", "revenue", "npv"] as const).map((c) => (
              <button key={c} onClick={() => setActiveChart(c)}
                className="text-xs px-3 py-1.5 rounded-md font-medium transition-colors"
                style={{
                  background: activeChart === c ? "rgba(46,160,67,0.2)" : "var(--card-bg)",
                  border: `1px solid ${activeChart === c ? "var(--accent)" : "var(--border)"}`,
                  color: activeChart === c ? "var(--accent)" : "var(--muted)",
                }}>
                {c === "carbon" ? "📉 碳封存" : c === "revenue" ? "💰 收益" : "📈 NPV"}
              </button>
            ))}
          </div>

          <div className="card p-4">
            {activeChart === "carbon" && (
              <>
                <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--muted)" }}>年度 & 累計碳封存（tCO₂）</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="year" stroke="var(--muted)" tick={{ fill: "var(--muted)", fontSize: 12 }} label={{ value: "年", position: "insideBottomRight", fill: "var(--muted)" }} />
                    <YAxis stroke="var(--muted)" tick={{ fill: "var(--muted)", fontSize: 12 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ color: "var(--muted)" }} />
                    <Area type="monotone" dataKey="annualCarbon" name="年度碳封存" stroke={CHART_COLORS.carbon} fill="rgba(46,160,67,0.2)" strokeWidth={2} />
                    <Area type="monotone" dataKey="cumulativeCarbon" name="累計碳封存" stroke={CHART_COLORS.cumulative} fill="rgba(121,192,255,0.1)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </>
            )}
            {activeChart === "revenue" && (
              <>
                <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--muted)" }}>年度收益（USD）</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="year" stroke="var(--muted)" tick={{ fill: "var(--muted)", fontSize: 12 }} />
                    <YAxis stroke="var(--muted)" tick={{ fill: "var(--muted)", fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`$${Number(v).toLocaleString()}`, "年度收益"]} />
                    <Bar dataKey="annualRevenue" name="年度收益" fill={CHART_COLORS.revenue} radius={[3, 3, 0, 0]}
                      label={false} />
                  </BarChart>
                </ResponsiveContainer>
              </>
            )}
            {activeChart === "npv" && (
              <>
                <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--muted)" }}>累計 NPV（USD）</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="year" stroke="var(--muted)" tick={{ fill: "var(--muted)", fontSize: 12 }} label={{ value: "年", position: "insideBottomRight", fill: "var(--muted)" }} />
                    <YAxis stroke="var(--muted)" tick={{ fill: "var(--muted)", fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`$${Number(v).toLocaleString()}`, "累計 NPV"]} />
                    <Line type="monotone" dataKey="cumulativeNPV" name="累計 NPV" stroke={CHART_COLORS.npv} strokeWidth={2.5} dot={false} />
                    <Line type="monotone" dataKey="npvContribution" name="年度 NPV 貢獻" stroke="#ffa657" strokeWidth={1.5} dot={false} strokeDasharray="5 3" />
                  </LineChart>
                </ResponsiveContainer>
              </>
            )}
          </div>

          {/* Data table */}
          <div className="card overflow-auto" style={{ maxHeight: "220px" }}>
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: "rgba(22,27,34,0.8)", borderBottom: "1px solid var(--border)" }}>
                  <th className="p-2 text-left" style={{ color: "var(--muted)" }}>年</th>
                  <th className="p-2 text-right" style={{ color: "var(--muted)" }}>碳封存 (t)</th>
                  <th className="p-2 text-right" style={{ color: "var(--muted)" }}>年度收益</th>
                  <th className="p-2 text-right" style={{ color: "var(--muted)" }}>NPV 貢獻</th>
                  <th className="p-2 text-right" style={{ color: "var(--muted)" }}>累計 NPV</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.year} style={{ borderBottom: "1px solid rgba(48,54,61,0.5)" }}>
                    <td className="p-2">{row.year}</td>
                    <td className="p-2 text-right" style={{ color: CHART_COLORS.carbon }}>{row.annualCarbon.toLocaleString()}</td>
                    <td className="p-2 text-right" style={{ color: row.annualRevenue >= 0 ? CHART_COLORS.revenue : CHART_COLORS.npv }}>
                      ${row.annualRevenue.toLocaleString()}
                    </td>
                    <td className="p-2 text-right" style={{ color: row.npvContribution >= 0 ? CHART_COLORS.carbon : CHART_COLORS.npv }}>
                      ${row.npvContribution.toLocaleString()}
                    </td>
                    <td className="p-2 text-right" style={{ color: row.cumulativeNPV >= 0 ? CHART_COLORS.cumulative : CHART_COLORS.npv }}>
                      ${row.cumulativeNPV.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
