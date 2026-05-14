import React, { useState, useEffect, useMemo } from "react";
import {
  Sparkles, Filter, Wrench, Zap,
  AlertTriangle, Globe2, Cpu, CheckCircle2, Clock, RefreshCw
} from "lucide-react";

/* ============================================================
   AI Alpha Dashboard v2.4 - 逻辑全修正版
   修复：52W 区间指针逻辑、动态数据匹配、全量标的对齐
   ============================================================ */

export default function IntegratedDashboard() {
  const [activeTab, setActiveTab] = useState("picks");
  const [dynamicData, setDynamicData] = useState({ stocks: {}, updatedAt: "" });
  const [loading, setLoading] = useState(false);

  const fetchPrices = () => {
    setLoading(true);
    fetch(`./prices.json?t=${new Date().getTime()}`)
      .then(res => res.json())
      .then(data => {
        setDynamicData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("同步失败:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <div className="min-h-screen bg-[#05070d] text-stone-50 antialiased relative overflow-hidden font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body    { font-family: 'Geist', sans-serif; }
        .font-mono    { font-family: 'JetBrains Mono', monospace; }
        .digit { font-feature-settings: "tnum"; font-variant-numeric: tabular-nums; }
        .grain::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(212,165,116,0.05) 1px, transparent 1px);
          background-size: 28px 28px; opacity: 0.4;
        }
        .glow-emerald { box-shadow: 0 0 0 1px rgba(52,211,153,0.3), 0 0 30px -8px rgba(52,211,153,0.4); }
        .pulse-ring { animation: pulseRing 2s ease-in-out infinite; }
        @keyframes pulseRing { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>

      <div className="grain absolute inset-0" />
      <div className="relative max-w-[1400px] mx-auto px-8 py-8">
        <header className="flex items-center justify-between mb-8 pb-6 border-b border-stone-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-amber-400/60 flex items-center justify-center bg-amber-500/10">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="font-display text-2xl text-stone-50 leading-none">AI Alpha Suite</div>
              <div className="text-[11px] tracking-[0.25em] text-stone-300 mt-1.5 uppercase font-medium">v2.4 · 自动化行情监控</div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button onClick={fetchPrices} className="flex items-center gap-2 px-3 py-1.5 border border-stone-700 hover:bg-stone-800 transition-colors text-xs font-mono">
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> 刷新行情
            </button>
            <div className="text-[10px] font-mono text-emerald-300 border border-emerald-500/30 px-2 py-1">
              SYNCED: {dynamicData.updatedAt ? dynamicData.updatedAt.split('T')[0] : '...'}
            </div>
          </div>
        </header>

        <div className="mb-6 border border-amber-400/40 bg-amber-500/5 p-4 flex items-start gap-3 text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-300 flex-shrink-0" />
          <p className="text-stone-200 leading-relaxed font-mono">
            全系统核查提示：已统一 52W 标尺算法。指针位置代表 [现价] 在 [一年最低] 至 [一年最高] 的物理百分比。
          </p>
        </div>

        <div className="flex gap-2 mb-6 border-b border-stone-800">
          <TabButton active={activeTab === "picks"} onClick={() => setActiveTab("picks")} icon={Wrench} label="Picks & Shovels" sub="硬件链行情同步" />
          <TabButton active={activeTab === "s2"} onClick={() => setActiveTab("s2")} icon={Cpu} label="S2 Tracker" sub="应用层判定" />
        </div>

        {activeTab === "picks" ? <PicksShovelsView externalPrices={dynamicData.stocks} /> : <div className="py-20 text-center font-mono text-stone-600">S2 跟踪模块待接入</div>}
      </div>
    </div>
  );
}

function PicksShovelsView({ externalPrices }) {
  const [marketFilter, setMarketFilter] = useState("ALL");
  const [stageFilter, setStageFilter] = useState("ALL");
  const [expanded, setExpanded] = useState(null);

  // 1. 核心叙事数据库
  const rawStocks = [
    { ticker: "中际旭创", code: "300308.SZ", market: "A", category: "光模块", sub: "800G/1.6T", directness: 3, exposure: 3, visibility: 3, yearStartPrice: 620.08, narrative: "Q1 单季利润超 2024 全年, 预付款 +1009% 锁料信号极强", catalyst: "1.6T 全球市占 50-70%, 12.8T XPO 首发", risk: "PE 90+ 估值极端" },
    { ticker: "金盘科技", code: "688676.SH", market: "A", category: "电力配电", sub: "干变/SST", directness: 3, exposure: 2, visibility: 3, yearStartPrice: 88.82, narrative: "AIDC 收入+337%, SST 拿到英伟达订单", catalyst: "2026 年 SST 出货", risk: "距目标价空间有限" },
    { ticker: "大族数控", code: "301200.SZ", market: "A", category: "PCB/CCL", sub: "PCB 设备", directness: 2, exposure: 3, visibility: 2, yearStartPrice: 119.26, narrative: "二阶受益 - PCB 厂扩产带动设备需求", catalyst: "沪电/深南等下游扩产", risk: "⚠ 52周涨幅巨大, 估值透支" },
    { ticker: "英维克", code: "002837.SZ", market: "A", category: "冷却", sub: "液冷", directness: 3, exposure: 2, visibility: 2, yearStartPrice: 104.2, isFading: true, narrative: "液冷实占总营收<8%", catalyst: "等待业绩兑现节奏改善", risk: "⚠ Q1 净利 -82%, 一字跌停" },
    { ticker: "深南电路", code: "002916.SZ", market: "A", category: "PCB/CCL", sub: "ABF载板", directness: 3, exposure: 3, visibility: 2, yearStartPrice: 325.41, narrative: "国内 ABF 载板领军, 芯片价值量翻倍受益", catalyst: "B200 等下一代芯片层数提升", risk: "ABF 国产化验证中" },
    { ticker: "科泰电源", code: "300153.SZ", market: "A", category: "备用电源", sub: "柴发", directness: 3, exposure: 3, visibility: 1, yearStartPrice: 31.7, narrative: "高功率柴发, AIDC 备电需求", catalyst: "涨价预期 + 国产化替代", risk: "⚠ 之前已大幅炒作" },
    { ticker: "拓尔思", code: "300229.SZ", market: "A", category: "Agentic应用", sub: "政企 AI", directness: 3, exposure: 3, visibility: 2, yearStartPrice: 18.09, narrative: "对标 PLTR Gotham, 政企 Agentic 叙事", catalyst: "PLTR 业绩验证后的重估窗口", risk: "业绩节奏不稳定" },
    { ticker: "沪电股份", code: "002463.SZ", market: "A", category: "PCB/CCL", sub: "AI 服务器 PCB", directness: 3, exposure: 3, visibility: 3, yearStartPrice: 104.4, narrative: "AI 服务器 PCB 主供, 客户群完整", catalyst: "1.6T 时代 PCB 价值量再次跃升", risk: "⚠ 估值已透支" },
    { ticker: "雅克科技", code: "002409.SZ", market: "A", category: "HBM材料", sub: "前驱体", directness: 3, exposure: 3, visibility: 3, yearStartPrice: 76, narrative: "HBM 前驱体国内独苗", catalyst: "HBM4 通过海力士认证", risk: "大基金减持计划" },
    { ticker: "晶丰明源", code: "688368.SH", market: "A", category: "电源芯片", sub: "DrMOS", directness: 3, exposure: 3, visibility: 3, yearStartPrice: 115.44, narrative: "国内 DrMOS 龙头, AI 服务器专用", catalyst: "Smart DrMOS 出货放量", risk: "估值不便宜" },
    { ticker: "VRT", code: "VRT", market: "US", category: "电力管理", sub: "整机", directness: 3, exposure: 3, visibility: 3, yearStartPrice: 330.65, narrative: "Vertiv - 全球 AIDC 基建绝对龙头", catalyst: "MSFT/META Capex 直接传导", risk: "历史高位, 估值溢价" },
    { ticker: "MU", code: "MU", market: "US", category: "内存存储", sub: "HBM", directness: 3, exposure: 3, visibility: 2, yearStartPrice: 511.78, narrative: "HBM3E 锁单, MSFT 确认涨价", catalyst: "内存周期与 AI 需求共振", risk: "周期顾虑" }
  ];

  // 2. 动态缝合与分值计算
  const stocks = useMemo(() => {
    return rawStocks.map(s => {
      const codeKey = s.code.split('.')[0];
      const dyn = externalPrices[codeKey] || {};
      const price = dyn.price || s.currentPrice || 0;
      const score = s.directness + s.exposure + s.visibility;
      let stage = "INDIRECT";
      if (s.isFading) stage = "FADING";
      else if (score >= 7) stage = "CORE";
      else if (score >= 5) stage = "STRONG";

      return { ...s, price, week52High: dyn.week52High, week52Low: dyn.week52Low, score, stage };
    }).sort((a, b) => b.score - a.score);
  }, [externalPrices]);

  const filtered = stocks.filter(s => {
    if (marketFilter !== "ALL" && s.market !== marketFilter) return false;
    if (stageFilter !== "ALL" && s.stage !== stageFilter) return false;
    return true;
  });

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {["ALL", "A", "US"].map(m => (
          <FilterChip key={m} active={marketFilter === m} onClick={() => setMarketFilter(m)}>{m}</FilterChip>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(s => <StockCard key={s.ticker} s={s} expanded={expanded === s.ticker} onToggle={() => setExpanded(expanded === s.ticker ? null : s.ticker)} />)}
      </div>
    </div>
  );
}

function StockCard({ s, expanded, onToggle }) {
  const currentPrice = s.price;
  // 核心修复逻辑：指针物理位置计算
  const rangePct = (s.week52High && s.week52Low)
    ? ((currentPrice - s.week52Low) / (s.week52High - s.week52Low) * 100)
    : 50;

  return (
    <div className={`p-4 border ${s.stage === 'CORE' ? 'border-emerald-500/50 bg-emerald-500/5 glow-emerald' : 'border-stone-700 bg-stone-900/40'} hover-lift cursor-pointer`} onClick={onToggle}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-display text-lg leading-none">{s.ticker} <span className="text-[10px] font-mono text-stone-500">{s.code}</span></div>
          <div className="text-[10px] text-stone-400 mt-1 uppercase font-bold tracking-tighter">{s.category} · {s.sub}</div>
        </div>
        <div className="font-display text-2xl leading-none">{s.score}<span className="text-stone-500 text-sm">/8</span></div>
      </div>
      
      {/* 52W 标尺：全背景 + 指针模式 */}
      <div className="my-4 p-3 bg-black/40 border border-stone-800 rounded">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-2xl font-mono font-bold text-stone-50">
            {s.market === 'A' ? '¥' : '$'}{currentPrice?.toFixed(2)}
          </span>
          {s.yearStartPrice && (
            <span className={`text-xs font-mono font-bold ${currentPrice >= s.yearStartPrice ? 'text-rose-400' : 'text-emerald-400'}`}>
              {currentPrice >= s.yearStartPrice ? '+' : ''}{((currentPrice/s.yearStartPrice-1)*100).toFixed(1)}% <span className="text-[9px] opacity-60">YTD</span>
            </span>
          )}
        </div>
        <div className="relative pt-4 pb-1">
          <div className="h-1 w-full bg-stone-800 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 via-amber-500/30 to-rose-500/30" />
            <div className="absolute h-full w-1 bg-white shadow-[0_0_8px_#fff] z-10" style={{ left: `${Math.min(100, Math.max(0, rangePct))}%` }} />
          </div>
          <div className="flex justify-between text-[8px] text-stone-500 mt-1 font-mono uppercase font-bold">
            <span>Low: {s.week52Low}</span>
            <span>High: {s.week52High}</span>
          </div>
          <div className="mt-2 text-[9px] text-stone-400 font-medium italic">
            仪表位置: 位于 52 周区间的 <span className="text-amber-200 font-bold">{rangePct.toFixed(0)}%</span> (现价为最高价的 {((currentPrice/s.week52High)*100).toFixed(0)}%)
          </div>
        </div>
      </div>

      <div className="text-xs text-stone-300 leading-relaxed line-clamp-2 mb-2">{s.narrative}</div>
      {expanded && (
        <div className="mt-3 pt-3 border-t border-stone-800 text-[10px] animate-in slide-in-from-top-1">
          <div className="mb-1"><span className="text-emerald-400 font-bold uppercase mr-2">Catalyst:</span>{s.catalyst}</div>
          <div><span className="text-rose-400 font-bold uppercase mr-2">Risk:</span>{s.risk}</div>
        </div>
      )}
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label, sub }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 px-5 py-3 border-b-2 transition-all ${active ? "border-amber-400 bg-amber-500/5 text-stone-50" : "border-transparent text-stone-500"}`}>
      <Icon className={`w-4 h-4 ${active ? "text-amber-200" : ""}`} />
      <div className="text-left leading-tight">
        <div className="font-display text-sm">{label}</div>
        <div className="text-[9px] uppercase font-bold">{sub}</div>
      </div>
    </button>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button onClick={onClick} className={`px-3 py-1 font-mono text-[10px] border transition-all ${active ? 'border-amber-400 text-amber-200 bg-amber-400/10' : 'border-stone-700 text-stone-500'}`}>{children}</button>
  );
}

function StageStatCard({ label, count, color, desc, highlight }) {
  const c = { emerald: "border-emerald-500/50 text-emerald-400", amber: "border-amber-500/50 text-amber-400", rose: "border-rose-500/50 text-rose-400" }[color];
  return (
    <div className={`border ${c} p-4 bg-stone-900/40 ${highlight ? 'glow-emerald' : ''}`}>
      <div className="text-[9px] font-mono uppercase opacity-60 mb-1 font-bold">{label}</div>
      <div className="text-3xl font-display mb-1">{count}</div>
      <div className="text-[10px] text-stone-500 leading-tight">{desc}</div>
    </div>
  );
}
  );
}
