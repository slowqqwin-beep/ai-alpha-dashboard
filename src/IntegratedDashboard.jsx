import React, { useState, useEffect } from "react";
import {
  Sparkles, Filter, Wrench, Zap,
  AlertTriangle, Globe2, Cpu, CheckCircle2, Clock, ExternalLink, RefreshCw
} from "lucide-react";

/* ============================================================
   AI Alpha Dashboard v2.1 (自动化集成版)
   更新：动态获取 prices.json 数据，彻底解决缓存问题
   ============================================================ */

export default function IntegratedDashboard() {
  const [activeTab, setActiveTab] = useState("picks");
  const [dynamicData, setDynamicData] = useState({ stocks: {}, updatedAt: "" });
  const [loading, setLoading] = useState(true);

  // 核心功能：从服务器抓取最新的 prices.json
  const fetchData = () => {
    setLoading(true);
    // 添加时间戳 t=... 强制绕过浏览器缓存，确保拿到刚生成的最新数据
    fetch(`./prices.json?t=${new Date().getTime()}`)
      .then((res) => {
        if (!res.ok) throw new Error("无法加载价格文件");
        return res.json();
      })
      .then((data) => {
        setDynamicData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("数据加载失败:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
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
        .glow-rose    { box-shadow: 0 0 0 1px rgba(244,63,94,0.3), 0 0 30px -8px rgba(244,63,94,0.4); }
        .pulse-ring { animation: pulseRing 2s ease-in-out infinite; }
        @keyframes pulseRing { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>

      <div className="grain absolute inset-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-8 py-8">
        <header className="flex items-center justify-between mb-8 pb-6 border-b border-stone-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-amber-400/60 flex items-center justify-center bg-amber-500/10">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="font-display text-2xl text-stone-50 leading-none">AI Alpha Suite</div>
              <div className="text-[11px] tracking-[0.25em] text-stone-300 mt-1.5 uppercase font-medium">
                v2.1 · 自动化同步已启动
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <button 
              onClick={fetchData}
              className="flex items-center gap-2 px-3 py-1.5 border border-stone-700 hover:bg-stone-800 transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              <span className="font-mono text-stone-300">刷新数据</span>
            </button>
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${loading ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400 pulse-ring'}`} />
              <span className="font-mono text-emerald-300 tracking-widest font-semibold uppercase">
                {dynamicData.updatedAt ? dynamicData.updatedAt.split('T')[0] : '同步中...'}
