import CarbonCalculator from "@/components/CarbonCalculator";

export const metadata = {
  title: "互動工具 | 負碳褶學",
  description: "估算生物炭與負碳技術的減碳量與 NPV",
};

export default function ToolsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">⚡ 互動計算工具</h1>
        <p style={{ color: "var(--muted)" }}>
          輸入參數，即時估算生物炭或其他負碳技術的總減碳量、淨現值（NPV）和年度碳收益，結果以圖表方式呈現。
        </p>
      </div>
      <CarbonCalculator />
    </div>
  );
}
