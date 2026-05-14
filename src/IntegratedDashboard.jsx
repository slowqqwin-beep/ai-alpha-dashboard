import React, { useState, useEffect, useMemo } from "react";
import {
  Sparkles, Target, Filter, Layers, Wrench, Zap,
  TrendingUp, AlertCircle, ChevronDown, ChevronUp, Globe2,
  Cpu, Database, Snowflake, CircuitBoard, Network, HardDrive,
  Building2, BatteryCharging, RefreshCw
} from "lucide-react";

/* ============================================================
   AI Alpha Suite v2.1 - 完整格式动态版
   ============================================================ */

export default function IntegratedDashboard() {
  const [activeTab, setActiveTab] = useState("picks");
  const [prices, setPrices] = useState({});
  const [updatedAt, setUpdatedAt] = useState("");
  const [loading, setLoading] = useState(true);

  // 动态获取 GitHub Actions 生成的价格数据
  const fetchPrices = () => {
    setLoading(true);
    fetch(`./prices.json?t=${new Date().getTime()}`)
      .then(res => res.json())
      .then(data => {
        setPrices(data.stocks || {});
        setUpdatedAt(data.updatedAt || "");
        setLoading(false);
      })
      .catch(err => {
        console.error("价格获取失败:", err);
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
        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; letter-spacing: -0.02em; }
        .font-body    { font-family: 'Geist', sans-serif; }
        .font-mono    { font-family: 'JetBrains Mono', monospace; }
        .digit { font-feature-settings: "tnum"; font-variant-numeric: tabular-nums; }
        .grain::before {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(212,165,116,0.05) 1px, transparent 1px);
          background-size: 28px 28px; opacity: 0.4;
        }
        .hover-lift { transition: all .25s ease; }
        .hover-lift:hover { transform: translateY(-2px); }
        .glow-emerald { box-shadow: 0 0 0 1px rgba(52,211,153,0.3), 0 0 30px -8px rgba(52,211,153,0.4); }
        .pulse-ring { animation: pulseRing 2s ease-in-out infinite; }
        @keyframes pulseRing { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>

      <div className="grain absolute inset-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-8 py-8">
        {/* 顶部标题栏 */}
        <header className="flex items-center justify-between mb-8 pb-6 border-b border-stone-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-amber-400/60 flex items-center justify-center bg-amber-500/10">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="font-display text-2xl text-stone-50 leading-none">AI Alpha Suite</div>
              <div className="text-[11px] tracking-[0.25em] text-stone-300 mt-1.5 uppercase font-medium">
                v2.1 · 自动化价格同步
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <button onClick={fetchPrices} className="flex items-center gap-2 px-3 py-1.5 border border-stone-700 hover:bg-stone-800 transition-colors">
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              <span className="font-mono text-stone-300 uppercase">刷新数据</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-ring" />
              <span className="font-mono text-emerald-300 tracking-widest font-semibold uppercase">
                SYNCED: {updatedAt ? updatedAt.split('T')[0] : "2026·05·14"}
              </span>
            </div>
          </div>
        </header>

        {/* 提示栏 */}
        <div className="mb-8 border border-amber-400/40 bg-amber-500/5 p-4 flex items-start gap-3">
          <Zap className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-display text-base text-amber-100 mb-1 italic">
              自动化成功！价格由机器人实时抓取。FADING 标签为风险警示。
            </div>
            <div className="text-sm text-stone-200 leading-relaxed font-mono">
              DATA SOURCE: 新浪财经 (A股) / yfinance (美股) · 22:00 UTC 定时更新
            </div>
          </div>
        </div>

        {/* Tab 切换 */}
        <div className="flex items-center gap-2 mb-6 border-b border-stone-800">
          <TabButton active={activeTab === "picks"} onClick={() => setActiveTab("picks")} icon={Wrench} label="Picks & Shovels" sub="硬件中游 · 动态行情" />
          <TabButton active={activeTab === "s2"} onClick={() => setActiveTab("s2")} icon={Cpu} label="S2 Tracker" sub="应用层 · 阶段判定" />
        </div>

        {activeTab === "picks" ? <PicksShovelsView externalPrices={prices} /> : <S2TrackerView />}

        <footer className="pt-6 mt-10 border-t border-stone-700 flex items-center justify-between text-[11px] text-stone-300">
          <div className="font-mono uppercase">DATA : 自动更新 prices.json · 卖方研报</div>
          <div className="font-mono">LAST_SYNC : {updatedAt || "N/A"}</div>
        </footer>
      </div>
    </div>
  );
}

/* ============================================================
   Picks & Shovels 视图 - 核心逻辑合并
   ============================================================ */

function PicksShovelsView({ externalPrices }) {
  const [marketFilter, setMarketFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [stageFilter, setStageFilter] = useState("ALL");
  const [expanded, setExpanded] = useState(null);

  // 原始股票叙事数据
  const rawStocks = [
    { ticker: "金盘科技", code: "688676.SH", market: "A", category: "电力配电", sub: "干变/SST", directness: 3, exposure: 2, underpriced: 0, visibility: 3, narrative: "国内干变龙头, AIDC 收入 +337% 占比 20%", catalyst: "2026 年 SST 出货, 美国工厂筹备", risk: "估值偏高" },
    { ticker: "英维克", code: "002837.SZ", market: "A", category: "冷却", sub: "液冷", directness: 3, exposure: 3, underpriced: 1, visibility: 2, narrative: "国内液冷龙头, AI 算力密度上升驱动", catalyst: "大厂液冷采购加速", risk: "竞争加剧" },
    { ticker: "中际旭创", code: "300308.SZ", market: "A", category: "光模块", sub: "800G/1.6T", directness: 3, exposure: 3, underpriced: 0, visibility: 3, narrative: "全球光模块领军, 1.6T 订单已排至 2027", catalyst: "1.6T 批量交付", risk: "估值极端" },
    { ticker: "科华数据", code: "002335.SZ", market: "A", category: "电力管理", sub: "UPS/IDC运营", directness: 3, exposure: 2, underpriced: 2, visibility: 1, narrative: "UPS 第一梯队 + IDC 运营", catalyst: "AIDC 建设放量", risk: "现金流压力" },
    { ticker: "雅克科技", code: "002409.SZ", market: "A", category: "HBM材料", sub: "前驱体", directness: 3, exposure: 3, underpriced: 1, visibility: 3, narrative: "国内唯一 HBM 前驱体替代", catalyst: "HBM4 认证通过", risk: "商誉风险" },
    { ticker: "晶丰明源", code: "688368.SH", market: "A", category: "电源芯片", sub: "DrMOS", directness: 3, exposure: 3, underpriced: 1, visibility: 3, narrative: "DrMOS 龙头, AI 服务器专用", catalyst: "Smart DrMOS 出货", risk: "产能受限" },
    { ticker: "VRT", code: "VRT", market: "US", category: "电力管理", sub: "电源/冷却整机", directness: 3, exposure: 3, underpriced: 1, visibility: 3, narrative: "Vertiv - 全球数据中心基建龙头", catalyst: "MSFT/META capex 传导", risk: "历史高位" },
    { ticker: "MU", code: "MU", market: "US", category: "内存存储", sub: "HBM/DRAM", directness: 3, exposure: 3, underpriced: 2, visibility: 2, narrative: "HBM3E 锁单, 内存涨价受益", catalyst: "定价权确认", risk: "周期回顾" },
    { ticker: "AVGO", code: "AVGO", market: "US", category: "ASIC", sub: "TPU/MTIA", directness: 3, exposure: 2, underpriced: 0, visibility: 3, narrative: "博通 - Google/Meta AI 芯片伙伴", catalyst: "定制 ASIC 路线验证", risk: "估值充分" },
    { ticker: "ANET", code: "ANET", market: "US", category: "网络互联", sub: "交换机", directness: 3, exposure: 3, underpriced: 1, visibility: 3, narrative: "Arista - 网络集群超线性增长受益", catalyst: "800G 渗透", risk: "竞争加剧" }
  ];

  // 核心逻辑：将动态价格注入叙事数据
  const stocks = useMemo(() => {
    return rawStocks.map(s => {
      // 匹配代码（如 "300308.SZ" -> "300308"）
      const cleanCode = s.code.split('.')[0];
      const pData = externalPrices[cleanCode] || {};
      
      const currentPrice = pData.price || 0;
      const ytdReturn = pData.yearStartPrice 
        ? Math.round((currentPrice / pData.yearStartPrice - 1) * 100) 
        : (s.ytdReturn || 0);

      const score = s.directness + s.exposure + s.underpriced + s.visibility;
      let stage, stageLabel;
      if (score >= 9) { stage = "PRIME"; stageLabel = "PRIME ⭐⭐"; }
      else if (score >= 7) { stage = "STRONG"; stageLabel = "STRONG ⭐"; }
      else if (score >= 4) { stage = "INDIRECT"; stageLabel = "INDIRECT"; }
      else { stage = "STORY"; stageLabel = "STORY"; }

      return { ...s, currentPrice, ytdReturn, score, stage, stageLabel, 
               week52High: pData.week52High, week52Low: pData.week52Low };
    }).sort((a, b) => b.score - a.score);
  }, [externalPrices]);

  const filtered = stocks.filter(s => {
    if (marketFilter !== "ALL" && s.market !== marketFilter) return false;
    if (categoryFilter !== "ALL" && s.category !== categoryFilter) return false;
    if (stageFilter !== "ALL" && s.stage !== stageFilter) return false;
    return true;
  });

  const stats = {
    PRIME: stocks.filter(s => s.stage === "PRIME").length,
    STRONG: stocks.filter(s => s.stage === "STRONG").length,
    INDIRECT: stocks.filter(s => s.stage === "INDIRECT").length
  };

  return (
    <div>
      <section className="mb-6 grid grid-cols-3 gap-3">
        <StageStatCard label="PRIME ⭐⭐" chinese="产业链核心" count={stats.PRIME} color="emerald" desc="直供大厂 · 核心受益" highlight />
        <StageStatCard label="STRONG ⭐" chinese="强相关标的" count={stats.STRONG} color="amber" desc="直接受益 · 确定性高" />
        <StageStatCard label="INDIRECT" chinese="间接受益" count={stats.INDIRECT} color="stone" desc="外围关联 · 补涨逻辑" />
      </section>

      <section className="mb-6 space-y-2">
        <div className="flex items-center gap-2">
          <Globe2 className="w-3.5 h-3.5 text-stone-300" />
          <span className="text-[11px] tracking-widest text-stone-300 uppercase mr-2 font-bold">市场</span>
          {["ALL", "A", "US"].map(k => (
            <FilterChip key={k} active={marketFilter === k} onClick={() => setMarketFilter(k)}>{k === 'ALL' ? '全部' : k === 'A' ? 'A股' : '美股'}</FilterChip>
          ))}
        </div>
      </section>

      {/* 排行榜表格 */}
      <section className="mb-8 border border-stone-700 bg-stone-900/40">
        <div className="grid grid-cols-12 px-5 py-3 bg-stone-800/60 border-b border-stone-700 text-[10px] tracking-widest text-stone-300 uppercase font-semibold">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Ticker / Code</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-1 text-right">YTD</div>
          <div className="col-span-3 text-center">Score Structure</div>
          <div className="col-span-2 text-right">Stage</div>
        </div>
        {filtered.map((s, i) => (
          <RankRow key={s.ticker} stock={s} rank={i + 1} expanded={expanded === s.ticker} onToggle={() => setExpanded(expanded === s.ticker ? null : s.ticker)} />
        ))}
      </section>

      {/* 重点 Prime 卡片 */}
      <section className="grid grid-cols-3 gap-3">
        {stocks.filter(s => s.stage === "PRIME").slice(0, 3).map(s => <PrimeCard key={s.ticker} stock={s} />)}
      </section>
    </div>
  );
}

/* ============================================================
   UI 子组件库 (完整保留并美化)
   ============================================================ */

function RankRow({ stock, rank, expanded, onToggle }) {
  const s = stock;
  const rangePct = (s.week52High && s.week52Low) ? ((s.currentPrice - s.week52Low) / (s.week52High - s.week52Low) * 100) : 50;

  return (
    <>
      <div onClick={onToggle} className="grid grid-cols-12 px-5 py-4 border-b border-stone-800 hover:bg-stone-800/40 cursor-pointer items-center transition-colors">
        <div className="col-span-1 font-mono text-stone-500">{rank}</div>
        <div className="col-span-3">
          <div className="font-display text-base text-stone-50">{s.ticker}</div>
          <div className="font-mono text-[10px] text-stone-400">{s.code}</div>
        </div>
        <div className="col-span-2 text-right font-mono font-bold text-stone-50 text-lg">
          {s.market === 'A' ? '¥' : '$'}{s.currentPrice?.toFixed(2)}
        </div>
        <div className={`col-span-1 text-right font-mono digit font-bold ${s.ytdReturn >= 0 ? "text-rose-300" : "text-emerald-300"}`}>
          {s.ytdReturn > 0 ? "+" : ""}{s.ytdReturn}%
        </div>
        <div className="col-span-3 px-4">
          <div className="h-1.5 bg-stone-800 relative w-full rounded-full overflow-hidden">
            <div className="absolute h-full bg-gradient-to-r from-emerald-500/50 to-amber-400/50" style={{ width: `${Math.min(100, Math.max(0, rangePct))}%` }} />
          </div>
          <div className="flex justify-between text-[8px] text-stone-500 mt-1 uppercase font-mono"><span>52W Low</span><span>High</span></div>
        </div>
        <div className="col-span-2 text-right">
          <span className={`font-mono text-[9px] px-2 py-1 border font-bold uppercase tracking-tighter ${s.stage === 'PRIME' ? 'border-emerald-500 text-emerald-300' : 'border-stone-600 text-stone-400'}`}>
            {s.stageLabel}
          </span>
        </div>
      </div>
      {expanded && (
        <div className="px-5 py-4 bg-stone-900/60 border-b border-stone-800 animate-in slide-in-from-top-1">
          <div className="grid grid-cols-3 gap-5 text-[11px] leading-relaxed">
            <div className="text-stone-300"><span className="text-amber-200 font-bold block mb-1">叙事 / NARRATIVE</span>{s.narrative}</div>
            <div className="text-stone-300"><span className="text-emerald-300 font-bold block mb-1">催化 / CATALYST</span>{s.catalyst}</div>
            <div className="text-stone-300"><span className="text-rose-300 font-bold block mb-1">风险 / RISK</span>{s.risk}</div>
          </div>
        </div>
      )}
    </>
  );
}

function PrimeCard({ stock }) {
  const s = stock;
  return (
    <div className="border border-emerald-400/40 bg-emerald-500/5 p-5 glow-emerald hover-lift">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-display text-xl text-stone-50 leading-none">{s.ticker}</div>
          <div className="text-[10px] text-stone-500 font-mono mt-1">{s.code}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-mono font-bold text-stone-50 leading-none">¥{s.currentPrice?.toFixed(1)}</div>
          <div className="text-[10px] text-emerald-300 font-mono mt-1 font-bold">CORE PRIME ⭐⭐</div>
        </div>
      </div>
      <div className="text-xs text-stone-200 leading-relaxed mb-4 min-h-[3rem]">{s.narrative}</div>
      <div className="flex items-center gap-2 pt-3 border-t border-stone-700/60">
        <TrendingUp className="w-3 h-3 text-emerald-300" />
        <span className="text-[10px] text-emerald-300 font-mono font-bold uppercase">Targeting Alpha Growth</span>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label, sub }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 px-5 py-3 border-b-2 transition-all ${active ? "border-amber-400 bg-amber-500/5" : "border-transparent hover:bg-stone-800/40"}`}>
      <Icon className={`w-4 h-4 ${active ? "text-amber-200" : "text-stone-400"}`} />
      <div className="text-left">
        <div className={`font-display text-base ${active ? "text-stone-50" : "text-stone-300"}`}>{label}</div>
        <div className={`text-[10px] tracking-wider ${active ? "text-amber-200/70" : "text-stone-500"}`}>{sub}</div>
      </div>
    </button>
  );
}

function StageStatCard({ label, chinese, count, color, desc, highlight }) {
  const colorMap = {
    stone: "border-stone-600 text-stone-200",
    emerald: "border-emerald-400/60 text-emerald-200",
    amber: "border-amber-400/60 text-amber-200"
  };
  return (
    <div className={`border ${colorMap[color]} ${highlight ? "glow-emerald" : ""} bg-stone-900/40 p-4`}>
      <div className="font-mono text-[9px] tracking-widest font-bold mb-1 opacity-60 uppercase">{label}</div>
      <div className="font-display italic text-sm text-stone-100 mb-3">{chinese}</div>
      <div className="font-display digit text-4xl text-stone-50 mb-2">{count}</div>
      <div className="text-[10px] text-stone-400 leading-snug">{desc}</div>
    </div>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button onClick={onClick} className={`font-mono text-[10px] px-3 py-1 border transition-all ${active ? "border-amber-400 bg-amber-500/15 text-amber-200 font-bold" : "border-stone-700 text-stone-400"}`}>
      {children}
    </button>
  );
}

function S2TrackerView() {
  return <div className="py-20 text-center font-mono text-stone-500 italic border border-dashed border-stone-800">S2 Tracker 模块暂时保持静态，数据同步开发中...</div>;
}
