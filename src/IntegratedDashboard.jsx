import React, { useState, useEffect } from "react";
import {
  Sparkles, Filter, Wrench, Zap,
  AlertTriangle, Globe2, RefreshCw
} from "lucide-react";

/* ============================================================
   AI Alpha Dashboard v2.1 (修复版)
   ============================================================ */

export default function IntegratedDashboard() {
  const [activeTab, setActiveTab] = useState("picks");
  const [dynamicData, setDynamicData] = useState({ stocks: {}, updatedAt: "" });
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    fetch(`./prices.json?t=${new Date().getTime()}`)
      .then((res) => res.json())
      .then((data) => {
        setDynamicData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("加载失败:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#05070d] text-stone-50 antialiased relative font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600&family=Geist:wght@400;600&family=JetBrains+Mono:wght@400;700&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body    { font-family: 'Geist', sans-serif; }
        .font-mono    { font-family: 'JetBrains Mono', monospace; }
        .digit { font-feature-settings: "tnum"; font-variant-numeric: tabular-nums; }
        .hover-lift { transition: all .25s ease; }
        .hover-lift:hover { transform: translateY(-2px); }
      `}</style>

      <div className="relative max-w-[1400px] mx-auto px-8 py-8">
        <header className="flex items-center justify-between mb-8 pb-6 border-b border-stone-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-amber-400/60 flex items-center justify-center bg-amber-500/10">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="font-display text-2xl text-stone-50 leading-none">AI Alpha Suite</div>
              <div className="text-[11px] tracking-[0.25em] text-stone-300 mt-1.5 uppercase font-medium">v2.1 · 自动化同步</div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button onClick={fetchData} className="flex items-center gap-2 px-3 py-1.5 border border-stone-700 hover:bg-stone-800 text-xs font-mono">
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> 刷新
            </button>
            <div className="text-[10px] font-mono text-emerald-300 border border-emerald-500/30 px-2 py-1">
              SYNCED: {dynamicData.updatedAt ? dynamicData.updatedAt.split('T')[0] : '...'}
            </div>
          </div>
        </header>

        <div className="mb-6 border border-amber-400/40 bg-amber-500/5 p-4 flex items-start gap-3 text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-300 flex-shrink-0" />
          <p className="text-stone-200">自动化成功！价格由机器人实时抓取。FADING 标签为风险警示。</p>
        </div>

        <div className="flex gap-4 mb-6 border-b border-stone-800 text-sm">
          <button onClick={() => setActiveTab("picks")} className={`pb-2 px-4 ${activeTab === 'picks' ? 'border-b-2 border-amber-400 text-amber-200' : 'text-stone-400'}`}>硬件中游</button>
          <button onClick={() => setActiveTab("s2")} className={`pb-2 px-4 ${activeTab === 's2' ? 'border-b-2 border-amber-400 text-amber-200' : 'text-stone-400'}`}>应用层</button>
        </div>

        {loading && !dynamicData.updatedAt ? (
          <div className="py-20 text-center font-mono text-amber-200">同步中...</div>
        ) : (
          activeTab === "picks" ? <PicksShovelsView rawStocks={dynamicData.stocks} /> : <div className="py-10 text-stone-500 italic">S2 Tracker 待接入</div>
        )}
      </div>
    </div>
  );
}

function PicksShovelsView({ rawStocks }) {
  const [marketFilter, setMarketFilter] = useState("ALL");
  const stocks = Object.values(rawStocks).filter(s => marketFilter === "ALL" || s.market === marketFilter);

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {["ALL", "A", "US"].map(m => (
          <button key={m} onClick={() => setMarketFilter(m)} className={`px-3 py-1 text-[10px] border ${marketFilter === m ? 'border-amber-400 text-amber-200 bg-amber-500/10' : 'border-stone-700 text-stone-400'}`}>{m}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stocks.map(s => <StockCard key={s.ticker} s={s} />)}
      </div>
    </div>
  );
}

function StockCard({ s }) {
  const currentPrice = s.price || s.currentPrice;
  const rangePct = (s.week52High && s.week52Low) ? ((currentPrice - s.week52Low) / (s.week52High - s.week52Low) * 100) : 0;

  return (
    <div className={`p-4 border ${s.isFading ? 'border-rose-500/50 bg-rose-500/5' : 'border-stone-700 bg-stone-900/40'} hover-lift`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-display text-lg leading-none">{s.ticker} <span className="text-xs font-mono text-stone-500">{s.code}</span></div>
          <div className="text-[10px] text-stone-400 mt-1 uppercase">{s.category} · {s.sub}</div>
        </div>
        {s.isFading && <span className="text-[9px] px-1 bg-rose-500/20 text-rose-300 border border-rose-500/50">⚠ FADING</span>}
      </div>
      
      <div className="my-3 p-2 bg-black/40 border border-stone-800">
        <div className="flex items-baseline gap-2">
          <span className="text-xs text-stone-500 font-mono">PRICE</span>
          <span className="text-xl font-mono font-bold text-stone-50">{s.market === 'A' ? '¥' : '$'}{currentPrice?.toFixed(2)}</span>
        </div>
        <div className="mt-2 h-1 bg-stone-800 relative w-full">
          <div className="absolute h-full bg-amber-400/50" style={{ width: `${Math.min(100, Math.max(0, rangePct))}%` }} />
        </div>
        <div className="flex justify-between text-[8px] text-stone-500 mt-1 font-mono"><span>52W L</span><span>52W H</span></div>
      </div>

      <div className="text-xs text-stone-300 leading-relaxed line-clamp-2 mb-2">{s.narrative}</div>
      <div className="text-[10px] text-stone-500 border-t border-stone-800 pt-2 italic">Risk: {s.risk}</div>
    </div>
  );
}
