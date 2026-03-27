# 🌿 負碳褶學 — Negative Carbon Technology Platform

一個關於**負碳技術**（生物炭、DAC、強化岩石風化、藍碳）的互動式學習網站，使用 **Next.js 16 + TypeScript + Tailwind CSS** 構建，採用深色主題設計。

## 📚 頁面結構

| 頁面 | 路徑 | 說明 |
|------|------|------|
| 🌱 簡介 | `/` | 負碳技術總覽、生物炭介紹、主要技術比較 |
| ⚡ 互動工具 | `/tools` | 輸入年限、碳價、產量，估算 NPV 與總減碳量，圖表呈現 |
| 📋 案例展示 | `/cases` | 全球 6 個負碳技術應用案例（6 國、5 種技術） |
| 📊 簡報瀏覽 | `/slides` | Markdown 投影片瀏覽，支援鍵盤翻頁 |

## 🚀 快速開始

```bash
# 安裝相依套件
npm install

# 啟動開發伺服器
npm run dev

# 開啟瀏覽器
# http://localhost:3000
```

## 🔧 技術棧

- **框架**: Next.js 16 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS v4（深色主題）
- **圖表**: Recharts（面積圖、長條圖、折線圖）
- **Markdown**: react-markdown + remark-gfm

## ⚡ 互動計算工具

支援 4 種負碳技術的參數估算：

| 技術 | 固碳係數 |
|------|---------|
| 生物炭 (Biochar) | 2.6 tCO₂/噸 |
| 直接空氣捕獲 (DAC) | 1.0 tCO₂/單位 |
| 強化岩石風化 (ERW) | 0.9 tCO₂/噸 |
| 藍碳 (Blue Carbon) | 7.5 tCO₂/公頃/年 |

可調整參數：年限（1–50 年）、年產量、碳價（0–300 USD/tCO₂）、折現率、生產成本  
輸出：年度碳封存圖、年度收益圖、累計 NPV 圖、詳細數據表

## 📊 簡報檔案

簡報以 Markdown 格式存放於 `public/slides/`，每個 `---` 分隔符代表一張投影片：

- `intro.md` — 負碳褶學簡介（10 張投影片）
- `biochar-economics.md` — 生物炭經濟學（10 張投影片）

新增簡報：在 `public/slides/` 新增 `.md` 檔案，在 frontmatter 中加入 `title:` 即可。

```markdown
---
title: 我的簡報標題
---

# 第一張投影片

內容...

---

# 第二張投影片

內容...
```

## 🌍 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

本專案可直接部署至 Vercel：

```bash
npm run build
```
