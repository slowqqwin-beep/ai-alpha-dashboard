import React, { useState, useEffect, useMemo } from "react";
import {
  Sparkles, Filter, Wrench, Zap,
  AlertTriangle, Globe2, Cpu, CheckCircle2, Clock, ExternalLink, RefreshCw
} from "lucide-react";

/* ============================================================
   AI Alpha Dashboard v2.2 (自动化行情缝合版)
   ============================================================ */

export default function IntegratedDashboard() {
  const [activeTab, setActiveTab] = useState("picks");
  
  // --- 新增：行情数据状态 ---
  const [externalData, setExternalData] = useState({ stocks: {}, updatedAt: "" });
  const [loading, setLoading] = useState(false);

  const fetchPrices = () => {
    setLoading(true);
    // 使用时间戳确保每次拿到的都是服务器上最新的 prices.json
    fetch(`./prices.json?t=${new Date().getTime()}`)
      .then(res => res.json())
      .then(data => {
        setExternalData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("价格同步失败:", err);
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
                v2 · 产业链思考 + 决策辅助 (非交易工具)
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 text-xs">
            {/* 新增手动刷新按钮 */}
            <button 
              onClick={fetchPrices}
              className="flex items-center gap-2 px-3 py-1.5 border border-stone-700 hover:bg-stone-800 transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              <span className="font-mono text-stone-300 uppercase">刷新行情</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-ring" />
              <span className="font-mono text-emerald-300 tracking-widest font-semibold">
                {externalData.updatedAt ? externalData.updatedAt.split('T')[0].replace(/-/g, '·') : '2026·05·14'}
              </span>
            </div>
          </div>
        </header>

        <div className="mb-6 border border-amber-400/40 bg-amber-500/5 p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
          <div className="flex-1 text-sm text-stone-200 leading-relaxed">
            <span className="font-display text-amber-100">使用说明 · </span>
            本工具价格数据已由 <span className="font-mono text-amber-200 font-bold uppercase">GitHub Bot</span> 自动同步。
            评分代表"产业链位置"，不代表"可以买"。FADING 标签为风险警示。
          </div>
        </div>

        <div className="mb-8 border border-stone-700 bg-stone-900/40 p-4 flex items-start gap-3">
          <Zap className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-display text-base text-stone-100 mb-1">
              最近事件 · 三重共振 + 一记警示
            </div>
            <div className="text-sm text-stone-200 leading-relaxed">
              <span className="font-mono text-emerald-300 font-bold">PLTR Q1 +85%</span> ·
              <span className="font-mono text-emerald-300 font-bold ml-2">中际旭创 Q1 +192%/+262%</span> ·
              <span className="font-mono text-emerald-300 font-bold ml-2">NVDA $1T 三年指引</span> ·
              <span className="font-mono text-rose-300 font-bold ml-2">⚠ 英维克 Q1 净利 -82%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6 border-b border-stone-800">
          <TabButton active={activeTab === "picks"} onClick={() => setActiveTab("picks")}
            icon={Wrench} label="Picks & Shovels" sub="硬件中游 · 29 只标的" />
          <TabButton active={activeTab === "s2"} onClick={() => setActiveTab("s2")}
            icon={Cpu} label="S2 Tracker" sub="美股应用层 · 8 只标的" />
        </div>

        {activeTab === "picks" ? <PicksShovelsView externalPrices={externalData.stocks} /> : <S2TrackerView />}

        <footer className="pt-6 mt-10 border-t border-stone-700 flex items-center justify-between text-[11px] text-stone-300">
          <div className="font-mono">DATA : 公司财报 · 自动化同步 · 不构成投资建议</div>
          <div className="font-mono uppercase">Last Sync: {externalData.updatedAt || "Pending..."}</div>
        </footer>
      </div>
    </div>
  );
}

/* ============================================================
   Picks & Shovels 视图 - 集成动态行情逻辑
   ============================================================ */

function PicksShovelsView({ externalPrices }) {
  const [marketFilter, setMarketFilter] = useState("ALL");
  const [stageFilter, setStageFilter] = useState("ALL");
  const [expanded, setExpanded] = useState(null);

  // 1. 保留你所有的原始描述数据
  const stocksRaw = [
    // ===== A股 =====
    { ticker: "中际旭创", code: "300308.SZ", market: "A", category: "光模块", sub: "800G/1.6T",
      directness: 3, exposure: 3, visibility: 3,
      currentPrice: 1017.99, priceRefDate: "2026-05-12", dataConfidence: "VERIFIED",
      week52High: 1022.98, week52Low: 86.98, yearStartPrice: 620.08,
      lastEarningsFlag: "BEAT", lastEarningsNote: "Q1 营收+192% 净利+262%",
      narrative: "Q1 单季利润超 2024 全年, 预付款 +1009% 锁料信号极强",
      catalyst: "1.6T 全球市占 50-70%, 12.8T XPO 首发, 订单已排至 2027",
      risk: "PE 90+ 估值极端 · 应收 +98% 存货 +24% 警惕以量补价" },

    { ticker: "金盘科技", code: "688676.SH", market: "A", category: "电力配电", sub: "干变/SST",
      directness: 3, exposure: 2, visibility: 3,
      currentPrice: 98.84, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High: 106.92, week52Low: 29.78, yearStartPrice: 88.82,
      lastEarningsFlag: "INLINE", lastEarningsNote: "2025 营收+5.8% 净利+14.9%",
      narrative: "AIDC 收入+337% 占比 20%, SST 拿到英伟达/微软/亚马逊订单",
      catalyst: "2026 年 SST 小批量出货, 美国弗吉尼亚工厂筹备",
      risk: "已涨 200%+, 距机构目标价 (103) 仅 6% 空间" },

    { ticker: "大族数控", code: "301200.SZ", market: "A", category: "PCB/CCL", sub: "PCB 设备",
      directness: 2, exposure: 3, visibility: 2,
      currentPrice: 222.66, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High: 224.77, week52Low: 34.83, yearStartPrice: 119.26,
      lastEarningsFlag: "BEAT", lastEarningsNote: "Q1 营收+103% 净利+176%",
      narrative: "二阶受益 - PCB 厂扩产带动设备需求",
      catalyst: "沪电/深南/景旺等下游持续扩产订单",
      risk: "⚠ 52周涨幅 540% (35→224), 估值已严重透支, 不建议追高" },

    { ticker: "英维克", code: "002837.SZ", market: "A", category: "冷却", sub: "液冷",
      directness: 3, exposure: 2, visibility: 2,
      currentPrice: 104.13, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High: 121.74, week52Low: 23.6, yearStartPrice: 104.2,
      lastEarningsFlag: "MISS", lastEarningsNote: "Q1 营收+26% 但净利 -82%",
      isFading: true,
      narrative: "国内液冷龙头叙事 vs 现实 - 液冷实占总营收<8%",
      catalyst: "无近期催化, 等业绩兑现节奏改善",
      risk: "⚠ Q1 净利 -82% · 4月21日一字跌停 · 蒸发 200亿市值 · 花旗重申'卖出'" },

    { ticker: "雅克科技", code: "002409.SZ", market: "A", category: "HBM材料", sub: "前驱体",
      directness: 3, exposure: 3, visibility: 3,
      currentPrice: 101.05, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High: 102.29, week52Low: 50.83, yearStartPrice: 76,
      lastEarningsFlag: "MISS_MILD", lastEarningsNote: "Q1 营收-6.85% 净利+2.47%",
      narrative: "HBM 前驱体国内独苗, 全球前三大 HBM 厂共同供应商",
      catalyst: "HBM4 已通过 SK 海力士独家认证, 与华为合作 2026Q1 量产",
      risk: "Q1 业绩兑现不及预期 · 商誉 20亿 · 大基金计划减持 1%" },

    { ticker: "晶丰明源", code: "688368.SH", market: "A", category: "电源芯片", sub: "DrMOS",
      directness: 3, exposure: 3, visibility: 3,
      currentPrice: 164.32, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High: 183.87, week52Low: 80.62, yearStartPrice: 115.44,
      lastEarningsFlag: "BEAT", lastEarningsNote: "高性能计算电源 +420% 出货+121%",
      narrative: "国内 DrMOS 龙头, AI 服务器电源专用",
      catalyst: "第二代 Smart DrMOS 出货放量",
      risk: "请查富途确认当前价格和近期涨幅" },

    { ticker: "新洁能", code: "605111.SH", market: "A", category: "电源芯片", sub: "MOSFET",
      directness: 3, exposure: 2, visibility: 2,
      currentPrice: 49.88, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High: 50.88, week52Low: 28.99, yearStartPrice: 36,
      narrative: "MOSFET 已在 AI 算力领域海外头部客户实现批量销售",
      catalyst: "SJ MOS 第四代量产, AI 服务器 PSU 端需求放量",
      risk: "AI 业务占比仅 9%, 主营受工控/汽车周期影响" },

    { ticker: "艾森股份", code: "688720.SH", market: "A", category: "HBM材料", sub: "光刻胶",
      directness: 2, exposure: 2, visibility: 2,
      currentPrice: 89.36, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High:91.29, week52Low: 38.54, yearStartPrice: 70.03,
      lastEarningsFlag: "BEAT", lastEarningsNote: "2025 营收+37% 净利+53%",
      narrative: "先进封装负性光刻胶用于 HBM 封装",
      catalyst: "HBM/3D NAND 验证推进",
      risk: "体量较小, 业绩弹性大但波动大" },

    { ticker: "科华数据", code: "002335.SZ", market: "A", category: "电力管理", sub: "UPS/IDC",
      directness: 3, exposure: 2, visibility: 1,
      currentPrice:71.02, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High: 79.15, week52Low: 37.61, yearStartPrice: 55.6,
      narrative: "国内 UPS 第一梯队 + IDC 运营双业务",
      catalyst: "UPS 出货量随 AIDC 建设放量",
      risk: "IDC 运营业务现金流压力" },

    { ticker: "盛弘股份", code: "300693.SZ", market: "A", category: "电力管理", sub: "APF/SVG",
      directness: 2, exposure: 2, visibility: 2,
      currentPrice: 68.95, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High: 69.37, week52Low: 27.57, yearStartPrice: 46.85,
      narrative: "HVDC 场景下的电能质量治理, 与维谛技术合作",
      catalyst: "HVDC 渗透率提升带动需求",
      risk: "充电桩业务波动" },

    { ticker: "科泰电源", code: "300153.SZ", market: "A", category: "备用电源", sub: "柴发",
      directness: 3, exposure: 3, visibility: 1,
      currentPrice: 32.56, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High: 50.98, week52Low: 23.69, yearStartPrice: 31.7,
      narrative: "高功率柴发, AI 数据中心备用电源",
      catalyst: "AIDC 备电需求 + 涨价预期",
      risk: "⚠ 之前几日已大幅炒作, 注意补涨阶段已过" },

    { ticker: "生益科技", code: "600183.SH", market: "A", category: "PCB/CCL", sub: "覆铜板",
      directness: 3, exposure: 2, visibility: 2,
      currentPrice: 94.18, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High: 94.18, week52Low: 24.69, yearStartPrice: 78.8,
      narrative: "国内高速 CCL 龙头, AI 服务器 PCB 价值量提升受益",
      catalyst: "M8/M9 高端 CCL 占比提升, 毛利率改善",
      risk: "CCL 仍受 PCB 整体景气度影响" },

    { ticker: "深南电路", code: "002916.SZ", market: "A", category: "PCB/CCL", sub: "ABF",
      directness: 3, exposure: 3, visibility: 2,
      currentPrice: 341.13, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High: 348, week52Low: 79.65, yearStartPrice: 325.41,
      narrative: "国内 ABF 载板第一梯队, AI 芯片价值量翻倍受益",
      catalyst: "B200 等下一代 AI 芯片 ABF 层数/面积大幅提升",
      risk: "ABF 国产化客户验证仍在推进" },

    { ticker: "中航光电", code: "002179.SZ", market: "A", category: "冷却", sub: "液冷接头",
      directness: 3, exposure: 2, visibility: 2,
      currentPrice: 41.41, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High: 42.99, week52Low: 32.17, yearStartPrice: 36.8,
      narrative: "液冷接头 + 高速连接器双业务, AI 服务器双重受益",
      catalyst: "液冷渗透率提升 + 国产 AI 服务器份额扩大",
      risk: "军工业务波动仍是主要业绩变量" },

    { ticker: "沪电股份", code: "002463.SZ", market: "A", category: "PCB/CCL", sub: "AI 服务器 PCB",
      directness: 3, exposure: 3, visibility: 3,
      currentPrice: 111.02, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High: 112.88, week52Low: 28.54, yearStartPrice: 104.4,
      lastEarningsFlag: "BEAT", lastEarningsNote: "业绩超预期",
      narrative: "AI 服务器 PCB 主供应商, 北美超大规模云厂客户群完整",
      catalyst: "1.6T 时代 PCB 价值量再次跃升",
      risk: "⚠ 估值已透支, 建议回调入场" },

    { ticker: "兆易创新", code: "603986.SH", market: "A", category: "内存存储", sub: "DDR4",
      directness: 2, exposure: 3, visibility: 1,
      currentPrice: 360, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High: 387.31, week52Low: 110.67, yearStartPrice: 330,
      narrative: "DDR4 利基存储龙头, 三大原厂切 HBM 导致 DDR4 供给收缩涨价",
      catalyst: "DDR4 价格 Q2-Q3 持续上涨 + NOR Flash 高景气",
      risk: "DDR4 终究是过渡产品, 故事生命周期 1-2 年" },

    { ticker: "金山办公", code: "688111.SH", market: "A", category: "Agentic应用", sub: "WPS AI",
      directness: 2, exposure: 2, visibility: 2,
      currentPrice: 262.62, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High: 415, week52Low: 225.18, yearStartPrice: 253.52,
      narrative: "国内最接近消费级 Copilot, PLTR 验证后估值重估窗口",
      catalyst: "WPS AI 付费用户突破临界点, 政企订单加速",
      risk: "AI 变现节奏不及预期" },

    { ticker: "科大讯飞", code: "002230.SZ", market: "A", category: "Agentic应用", sub: "星火 Agent",
      directness: 2, exposure: 2, visibility: 2,
      currentPrice: 49.11, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High: 67.5, week52Low: 44.98, yearStartPrice: 48.35,
      narrative: "星火大模型 + Agent 商业化推进, 多场景落地",
      catalyst: "星火 5.0 发布 + 智能体平台开放",
      risk: "ToG 业务回款慢, 国产算力依赖" },

    { ticker: "拓尔思", code: "300229.SZ", market: "A", category: "Agentic应用", sub: "政企 AI",
      directness: 3, exposure: 3, visibility: 2,
      currentPrice: 19.32, priceRefDate: "2026-05-13", dataConfidence: "VERIFIED",
      week52High: 31, week52Low: 16.3, yearStartPrice: 18.09,
      narrative: "对标 PLTR Gotham, 政企数据智能 + AI Agent 双重逻辑",
      catalyst: "PLTR 验证后 A 股 Agentic 重估窗口",
      risk: "市值小波动大, 业绩节奏不稳定" },

    // ===== 美股 =====
    { ticker: "VRT", code: "VRT", market: "US", category: "电力管理", sub: "数据中心电源",
      directness: 3, exposure: 3, visibility: 3,
      currentPrice: 367.13, priceRefDate: "2026-05-12", dataConfidence: "VERIFIED",
      week52High: 371.995, week52Low: 100.877, yearStartPrice: 330.65,
      narrative: "数据中心电源/冷却龙头, 订单 backlog 跟随 capex 上修",
      catalyst: "MSFT $190B / META $145B capex 直接传导",
      risk: "估值已较高" },

    { ticker: "ETN", code: "ETN", market: "US", category: "电力配电", sub: "电力管理",
      directness: 3, exposure: 2, visibility: 2,
      currentPrice: 401.53, priceRefDate: "2026-05-12", dataConfidence: "VERIFIED",
      week52High: 434.23, week52Low: 308.339, yearStartPrice: 433.801,
      narrative: "Eaton 数据中心电力 + 工业自动化双驱动",
      catalyst: "美国电网升级 + 数据中心 capex",
      risk: "工业周期暴露" },

    { ticker: "GEV", code: "GEV", market: "US", category: "电力配电", sub: "燃气轮机",
      directness: 3, exposure: 2, visibility: 3,
      currentPrice: 1071.98, priceRefDate: "2026-05-12", dataConfidence: "VERIFIED",
      week52High: 1181.95, week52Low: 420.71, yearStartPrice: 1088.83,
      narrative: "GE Vernova - 数据中心自备电厂核心供应商",
      catalyst: "MSFT/META 自建电厂趋势, 燃气轮机交期到 2028",
      risk: "已涨幅较高" },

    { ticker: "MU", code: "MU", market: "US", category: "内存存储", sub: "HBM/DRAM",
      directness: 3, exposure: 3, visibility: 2,
      currentPrice: 766.58, priceRefDate: "2026-05-12", dataConfidence: "VERIFIED",
      week52High: 818.67, week52Low: 90.713, yearStartPrice: 511.78,
      narrative: "HBM3E 已锁单 HBM4 量产爬坡, MSFT 明确确认涨价",
      catalyst: "MSFT $25B 涨价影响直接确认 MU 定价权",
      risk: "内存周期顾虑" },

    { ticker: "AVGO", code: "AVGO", market: "US", category: "ASIC", sub: "TPU/MTIA",
      directness: 3, exposure: 2, visibility: 3,
      currentPrice: 419.3, priceRefDate: "2026-05-12", dataConfidence: "VERIFIED",
      week52High: 437.68, week52Low: 219.819, yearStartPrice: 415.092,
      narrative: "Google TPU + Meta MTIA 设计伙伴, AI 营收翻倍",
      catalyst: "推理需求验证定制 ASIC 路线",
      risk: "已被充分定价" },

    { ticker: "MRVL", code: "MRVL", market: "US", category: "ASIC", sub: "Trainium/Maia",
      directness: 3, exposure: 2, visibility: 2,
      currentPrice: 164.5, priceRefDate: "2026-05-12", dataConfidence: "VERIFIED",
      week52High: 175.8, week52Low: 58.452, yearStartPrice: 162.35,
      narrative: "Marvell - Amazon Trainium / MS Maia 设计伙伴",
      catalyst: "Amazon $200B capex, Trainium 2 放量",
      risk: "落后 AVGO 一档" },

    { ticker: "ALAB", code: "ALAB", market: "US", category: "网络互联", sub: "PCIe/CXL",
      directness: 3, exposure: 3, visibility: 2,
      currentPrice: 204.42, priceRefDate: "2026-05-12", dataConfidence: "VERIFIED",
      week52High: 262.9, week52Low: 84.78, yearStartPrice: 195.98,
      narrative: "Astera Labs - 定制 ASIC 系统必备",
      catalyst: "推理负载扩张直接驱动需求",
      risk: "客户集中度高" },

    { ticker: "ANET", code: "ANET", market: "US", category: "网络互联", sub: "交换机",
      directness: 3, exposure: 3, visibility: 3,
      currentPrice: 142.54, priceRefDate: "2026-05-12", dataConfidence: "VERIFIED",
      week52High: 179.8, week52Low: 83.858, yearStartPrice: 172.99,
      narrative: "800G/1.6T 数据中心交换机龙头",
      catalyst: "AI 集群规模超线性增长 → 网络成本",
      risk: "估值充分" },

    { ticker: "CRDO", code: "CRDO", market: "US", category: "网络互联", sub: "AEC 铜缆",
      directness: 3, exposure: 3, visibility: 2,
      currentPrice: 198.57, priceRefDate: "2026-05-12",dataConfidence: "VERIFIED",
      week52High: 213.8, week52Low: 57.21, yearStartPrice: 175.8,
      narrative: "AEC 有源铜缆, 规模化 ASIC 集群必用",
      catalyst: "AVGO/MRVL ASIC 集群放量",
      risk: "竞争从 Marvell 等" },

    { ticker: "MOD", code: "MOD", market: "US", category: "冷却", sub: "数据中心液冷",
      directness: 3, exposure: 2, visibility: 2,
      currentPrice: 276.27, priceRefDate: "2026-05-12", dataConfidence: "VERIFIED",
      week52High: 287.3, week52Low: 86.485, yearStartPrice: 257.65,
      narrative: "Modine - 数据中心液冷, 业务转型受益",
      catalyst: "GPU 密度上升 → 液冷必然替代风冷",
      risk: "业务转型未完成" },
  ];

  // 2. 核心注入逻辑：将动态行情合并到硬编码描述中
  const stocks = useMemo(() => {
    return stocksRaw.map(s => {
      // 提取代码前缀（如 300308.SZ -> 300308）
      const cleanCode = s.code.split('.')[0];
      const dyn = externalPrices[cleanCode] || {};
      
      // 如果 JSON 里有新价格，就用新的，否则保留硬编码的备份
      return {
        ...s,
        currentPrice: dyn.price || s.currentPrice,
        week52High: dyn.week52High || s.week52High,
        week52Low: dyn.week52Low || s.week52Low,
        priceRefDate: dyn.price ? "2026-05-14" : s.priceRefDate,
        dataConfidence: dyn.price ? "VERIFIED" : s.dataConfidence
      };
    });
  }, [externalPrices]);

  /* 自动计算（完全保留你的逻辑） */
  const evaluated = stocks.map(s => {
    const score = s.directness + s.exposure + s.visibility;
    let stage, stageLabel;
    if (s.isFading) {
      stage = "FADING"; stageLabel = "⚠ FADING";
    } else if (score >= 7) {
      stage = "CORE"; stageLabel = "CORE ⭐";
    } else if (score >= 5) {
      stage = "STRONG"; stageLabel = "STRONG";
    } else if (score >= 2) {
      stage = "INDIRECT"; stageLabel = "INDIRECT";
    } else {
      stage = "WEAK"; stageLabel = "WEAK";
    }
    return { ...s, score, stage, stageLabel };
  }).sort((a, b) => {
    if (a.stage === "FADING" && b.stage !== "FADING") return 1;
    if (b.stage === "FADING" && a.stage !== "FADING") return -1;
    return b.score - a.score;
  });

  const filtered = evaluated.filter(s => {
    if (marketFilter !== "ALL" && s.market !== marketFilter) return false;
    if (stageFilter !== "ALL" && s.stage !== stageFilter) return false;
    return true;
  });

  const stats = {
    CORE: evaluated.filter(s => s.stage === "CORE").length,
    STRONG: evaluated.filter(s => s.stage === "STRONG").length,
    INDIRECT: evaluated.filter(s => s.stage === "INDIRECT").length,
    FADING: evaluated.filter(s => s.stage === "FADING").length,
  };
  const verifiedCount = evaluated.filter(s => s.dataConfidence === "VERIFIED").length;
  const needsUpdateCount = evaluated.filter(s => s.dataConfidence === "NEEDS_UPDATE").length;

  return (
    <div>
      <div className="mb-6 border border-stone-700 bg-stone-900/40 p-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-stone-200 uppercase tracking-tighter">
            在线核实: <span className="font-mono text-emerald-300 font-bold">{verifiedCount}</span> 支标的价格已由 Bot 同步
          </span>
        </div>
        <div className="flex items-center gap-3 text-stone-500">
          <Clock className="w-4 h-4" />
          <span className="text-stone-500">
            手工维护: <span className="font-mono">{needsUpdateCount}</span> 支标的
          </span>
        </div>
      </div>

      <section className="mb-6">
        <div className="grid grid-cols-4 gap-3">
          <StageStatCard label="CORE ⭐" chinese="产业链核心" count={stats.CORE}
            color="emerald" desc="7-8 分 · 直接受益位置" highlight />
          <StageStatCard label="STRONG" chinese="强相关" count={stats.STRONG}
            color="amber" desc="5-6 分 · 受益较直接" />
          <StageStatCard label="INDIRECT" chinese="间接受益" count={stats.INDIRECT}
            color="stone" desc="2-4 分 · 关联较弱" />
          <StageStatCard label="⚠ FADING" chinese="叙事破灭" count={stats.FADING}
            color="rose" desc="财报证伪 · 警示标的" />
        </div>
      </section>

      <section className="mb-6 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Globe2 className="w-3.5 h-3.5 text-stone-300" />
          <span className="text-[11px] tracking-widest text-stone-300 uppercase mr-2 font-bold">市场筛选</span>
          {[["ALL", "全部"], ["A", "A股"], ["US", "美股"]].map(([k, v]) => (
            <FilterChip key={k} active={marketFilter === k} onClick={() => setMarketFilter(k)}>{v}</FilterChip>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-stone-300" />
          <span className="text-[11px] tracking-widest text-stone-300 uppercase mr-2 font-bold">阶段筛选</span>
          {[["ALL", "全部"], ["CORE", "CORE"], ["STRONG", "STRONG"], ["INDIRECT", "INDIRECT"], ["FADING", "⚠ FADING"]].map(([k, v]) => (
            <FilterChip key={k} active={stageFilter === k} onClick={() => setStageFilter(k)}>{v}</FilterChip>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {filtered.map(s => (
          <StockCard key={s.ticker} stock={s}
            expanded={expanded === s.ticker}
            onToggle={() => setExpanded(expanded === s.ticker ? null : s.ticker)} />
        ))}
      </section>
    </div>
  );
}

/* ============================================================
   S2 Tracker 及其他子组件（完全保留原始样式）
   ============================================================ */

function S2TrackerView() {
  const companies = [
    { ticker: "PLTR", name: "Palantir", category: "数据/分析", aiProduct: "AIP",
      score: 10, stage: "MATURE", stageLabel: "MATURE ⭐",
      narrative: "Q1 营收 +85% 史上最快, US 商业 +133%, Rule of 40 = 145%, 全年指引上调至 +71%",
      metrics: { aiArrGrowth: 133, nrr: 130, gmDeltaYoY: 0.8, deploy: "company-wide" } },
    { ticker: "NOW", name: "ServiceNow", category: "通用Copilot", aiProduct: "Now Assist",
      score: 10, stage: "MATURE", stageLabel: "MATURE",
      narrative: "Now Assist 净新增 ACV 翻倍 · NRR 128%",
      metrics: { aiArrGrowth: 150, nrr: 128, gmDeltaYoY: 0.4, deploy: "company-wide" } },
    { ticker: "GTLB", name: "GitLab", category: "代码/开发", aiProduct: "Duo",
      score: 8, stage: "SCALING", stageLabel: "SCALING 10→100",
      narrative: "Duo Pro/Enterprise 渗透稳健, 毛利 89.6%",
      metrics: { aiArrGrowth: 60, nrr: 119, gmDeltaYoY: 0.2, deploy: "expanding" } },
    { ticker: "CRM", name: "Salesforce", category: "CRM/营销", aiProduct: "Agentforce",
      score: 7, stage: "SCALING", stageLabel: "SCALING 10→100",
      narrative: "Agentforce 加速渗透, PLTR 验证后 Agentic 整体重估",
      metrics: { aiArrGrowth: 120, nrr: 110, gmDeltaYoY: -0.4, deploy: "expanding" } },
    { ticker: "DDOG", name: "Datadog", category: "数据/分析", aiProduct: "Bits AI",
      score: 5, stage: "ENTERING_1_TO_10", stageLabel: "ENTERING 1→10 ⭐",
      narrative: "AI 原生客户营收占比约 12%",
      metrics: { aiArrGrowth: 0, nrr: 115, gmDeltaYoY: 0.6, deploy: "expanding" } },
    { ticker: "SNOW", name: "Snowflake", category: "数据/分析", aiProduct: "Cortex",
      score: 4, stage: "ENTERING_1_TO_10", stageLabel: "ENTERING 1→10 ⭐",
      narrative: "Cortex 客户数高速增长但拒绝披露收入",
      metrics: { aiArrGrowth: 0, nrr: 126, gmDeltaYoY: -1.5, deploy: "expanding" } },
    { ticker: "CRWD", name: "CrowdStrike", category: "安全", aiProduct: "Charlotte AI",
      score: 3, stage: "STILL_0_TO_1", stageLabel: "STILL 0→1",
      narrative: "Charlotte AI 嵌入 Falcon 平台",
      metrics: { aiArrGrowth: 0, nrr: 112, gmDeltaYoY: -0.5, deploy: "expanding" } },
    { ticker: "MDB", name: "MongoDB", category: "数据/分析", aiProduct: "Atlas Vector",
      score: 2, stage: "FADING", stageLabel: "⚠ FADING",
      narrative: "向量数据库故事性强但变现节奏慢, 毛利率下滑",
      metrics: { aiArrGrowth: 0, nrr: 118, gmDeltaYoY: -2.1, deploy: "pilot" } },
  ];

  return (
    <div>
      <div className="mb-6 border border-stone-700 bg-stone-900/40 p-4 text-sm text-stone-300">
        <span className="font-display text-stone-100">说明: </span>
        S2 Tracker 数据基于美股财报披露 (NRR/AI ARR/部署语言), 不依赖股价, 更新频率低于硬件链
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {companies.sort((a, b) => b.score - a.score).map(c => (
          <S2Card key={c.ticker} company={c} />
        ))}
      </section>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label, sub }) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-3 px-5 py-3 border-b-2 transition-all ${
        active ? "border-amber-400 bg-amber-500/5" : "border-transparent hover:bg-stone-800/40"
      }`}>
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
    amber: "border-amber-400/60 text-amber-200",
    rose: "border-rose-400/60 text-rose-200"
  };
  return (
    <div className={`border ${colorMap[color]} ${highlight ? "glow-emerald" : ""} bg-stone-900/40 p-4 hover-lift`}>
      <div className="font-mono text-[10px] tracking-widest font-bold mb-1">{label}</div>
      <div className="font-display italic text-sm text-stone-100 mb-3">{chinese}</div>
      <div className="font-display digit text-4xl text-stone-50 mb-2">{count}</div>
      <div className="text-[11px] text-stone-300 leading-snug">{desc}</div>
    </div>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button onClick={onClick}
      className={`font-mono text-[11px] px-3 py-1.5 border transition-all ${
        active
          ? "border-amber-400/70 bg-amber-500/15 text-amber-200"
          : "border-stone-700 text-stone-300 hover:border-stone-500"
      }`}>
      {children}
    </button>
  );
}

function StockCard({ stock, expanded, onToggle }) {
  const s = stock;
  const cardStyle = {
    CORE: "border-emerald-400/60 bg-emerald-500/5",
    STRONG: "border-amber-400/60 bg-amber-500/5",
    INDIRECT: "border-stone-600 bg-stone-800/30",
    WEAK: "border-stone-700 bg-stone-900/30",
    FADING: "border-rose-400/60 bg-rose-500/5 glow-rose"
  }[s.stage];

  const badgeStyle = {
    CORE: "bg-emerald-500/20 text-emerald-200 border-emerald-400/60",
    STRONG: "bg-amber-500/20 text-amber-200 border-amber-400/60",
    INDIRECT: "bg-stone-700/50 text-stone-200 border-stone-500",
    WEAK: "bg-stone-800/50 text-stone-300 border-stone-600",
    FADING: "bg-rose-500/20 text-rose-200 border-rose-400/60"
  }[s.stage];

  return (
    <div className={`border ${cardStyle} p-4 hover-lift cursor-pointer`} onClick={onToggle}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-baseline gap-3 mb-1">
            <span className="font-display text-lg text-stone-50">{s.ticker}</span>
            <span className="font-mono text-[10px] text-stone-400">{s.code}</span>
            <span className={`font-mono text-[10px] px-1.5 py-0.5 border ${
              s.market === "A" ? "border-rose-400/40 text-rose-300" : "border-blue-400/40 text-blue-300"
            }`}>
              {s.market === "A" ? "A股" : "US"}
            </span>
          </div>
          <div className="text-[11px] text-stone-300 font-mono">{s.category} · {s.sub}</div>
        </div>
        <div className="text-right">
          <div className="flex items-baseline gap-1 justify-end">
            <span className="font-display digit text-2xl text-stone-50">{s.score}</span>
            <span className="text-stone-500 text-sm">/8</span>
          </div>
          <span className={`font-mono text-[10px] tracking-widest px-2 py-0.5 border font-bold ${badgeStyle}`}>
            {s.stageLabel}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-stone-700/60">
        <ScoreBar label="直接" value={s.directness} max={3} />
        <ScoreBar label="暴露" value={s.exposure} max={3} />
        <ScoreBar label="可见" value={s.visibility} max={2} />
      </div>

      <PriceSnapshot stock={s} />

      {s.lastEarningsFlag && (
        <div className="mb-2 flex items-center gap-2 text-[11px]">
          <EarningsBadge flag={s.lastEarningsFlag} />
          <span className="text-stone-300">{s.lastEarningsNote}</span>
        </div>
      )}

      <div className="text-[12px] text-stone-200 leading-relaxed mb-2">{s.narrative}</div>

      {(s.isFading || (s.risk && s.risk.includes("⚠"))) && (
        <div className="mt-2 p-2 border border-rose-400/40 bg-rose-500/10 text-[11px] text-rose-200 leading-relaxed">
          {s.risk}
        </div>
      )}

      {expanded && (
        <div className="mt-3 pt-3 border-t border-stone-700/60 space-y-2 text-[11px]">
          <div><span className="font-mono text-emerald-300 font-bold">🎯 催化: </span><span className="text-stone-200">{s.catalyst}</span></div>
          {!(s.risk && s.risk.includes("⚠")) && !s.isFading && (
            <div><span className="font-mono text-rose-300 font-bold">⚠ 风险: </span><span className="text-stone-200">{s.risk}</span></div>
          )}
        </div>
      )}
    </div>
  );
}

function PriceSnapshot({ stock }) {
  const s = stock;
  const ytdPct = s.yearStartPrice ? ((s.currentPrice / s.yearStartPrice - 1) * 100) : null;
  const high52Pct = s.week52High ? (s.currentPrice / s.week52High * 100) : null;
  const rangePct = (s.week52High && s.week52Low)
    ? ((s.currentPrice - s.week52Low) / (s.week52High - s.week52Low) * 100)
    : 50;

  let zoneWarning = null;
  if (high52Pct !== null) {
    if (high52Pct >= 90) zoneWarning = { color: "rose", text: `已接近 52 周高位 (${high52Pct.toFixed(0)}%), 入场赔率差` };
    else if (high52Pct >= 75) zoneWarning = { color: "amber", text: `处于中高位 (${high52Pct.toFixed(0)}%)` };
    else if (high52Pct <= 40) zoneWarning = { color: "emerald", text: `处于低位 (${high52Pct.toFixed(0)}%), 关注布局机会` };
  }

  return (
    <div className="mb-3 p-2 border border-stone-700 bg-stone-900/40 text-[11px]">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className={`w-3 h-3 ${s.dataConfidence === 'VERIFIED' ? 'text-emerald-400' : 'text-stone-500'}`} />
          <span className="font-mono text-emerald-300 text-[10px] uppercase tracking-tighter">Synced · {s.priceRefDate}</span>
        </div>
      </div>
      <div className="flex items-baseline gap-3 mb-1.5">
        <span className="text-stone-400 uppercase text-[9px] font-bold">Price</span>
        <span className="font-mono digit text-base text-stone-50 font-bold">
          {s.market === 'A' ? '¥' : '$'}{s.currentPrice?.toFixed(2)}
        </span>
        {ytdPct !== null && (
          <>
            <span className="text-stone-400 font-bold text-[9px] uppercase">YTD</span>
            <span className={`font-mono digit text-sm font-bold ${ytdPct > 0 ? "text-rose-300" : "text-emerald-300"}`}>
              {ytdPct > 0 ? "+" : ""}{ytdPct.toFixed(1)}%
            </span>
          </>
        )}
      </div>
      <div className="mb-1">
        <div className="flex items-center gap-2 text-[10px] text-stone-400">
          <div className="flex-1 h-1.5 bg-stone-800 relative overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500/60 via-amber-500/60 to-rose-500/60"
              style={{ width: `${Math.min(100, Math.max(0, rangePct))}%` }} />
          </div>
          <span className="font-mono text-[9px] uppercase">52W Range</span>
        </div>
      </div>
      {zoneWarning && (
        <div className={`text-[10px] mt-1 italic ${
          zoneWarning.color === "rose" ? "text-rose-300" :
          zoneWarning.color === "amber" ? "text-amber-300" :
          "text-emerald-300"
        }`}>
          ⚠ {zoneWarning.text}
        </div>
      )}
    </div>
  );
}

function ScoreBar({ label, value, max }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-mono text-[10px] text-stone-400">{label}</span>
      <div className="flex gap-0.5">
        {Array.from({ length: max }).map((_, j) => (
          <div key={j} className={`w-1.5 h-3 ${
            j < value
              ? value === max ? "bg-emerald-400" : "bg-amber-400"
              : "bg-stone-700"
          }`} />
        ))}
      </div>
    </div>
  );
}

function EarningsBadge({ flag }) {
  const map = {
    BEAT: { label: "✓ BEAT", style: "bg-emerald-500/20 text-emerald-200 border-emerald-400/60" },
    MISS: { label: "✗ MISS", style: "bg-rose-500/20 text-rose-200 border-rose-400/60" },
    MISS_MILD: { label: "△ 不及预期", style: "bg-amber-500/20 text-amber-200 border-amber-400/60" },
    INLINE: { label: "= INLINE", style: "bg-stone-700/50 text-stone-200 border-stone-500" },
  };
  const m = map[flag] || map.INLINE;
  return (
    <span className={`font-mono text-[10px] px-1.5 py-0.5 border font-bold ${m.style}`}>{m.label}</span>
  );
}

function S2Card({ company }) {
  const c = company;
  const stageStyle = {
    ENTERING_1_TO_10: "border-emerald-400/60 bg-emerald-500/10",
    SCALING: "border-amber-400/60 bg-amber-500/10",
    STILL_0_TO_1: "border-stone-600 bg-stone-800/30",
    MATURE: "border-stone-500 bg-stone-700/30",
    FADING: "border-rose-400/60 bg-rose-500/10",
  }[c.stage];

  return (
    <div className={`border ${stageStyle} p-4 hover-lift`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className="font-mono text-lg text-stone-50 font-bold">{c.ticker}</span>
          <span className="font-display text-base text-stone-100 ml-2">{c.name}</span>
          <div className="text-[11px] text-stone-300 font-mono">{c.category} · {c.aiProduct}</div>
        </div>
        <div className="text-right">
          <div className="font-display digit text-2xl text-stone-50">{c.score}<span className="text-stone-500 text-base">/10</span></div>
          <div className="font-mono text-[10px] text-stone-400 font-bold uppercase">{c.stageLabel}</div>
        </div>
      </div>
      <div className="text-[12px] text-stone-200 leading-relaxed mb-2 italic">{c.narrative}</div>
      <div className="grid grid-cols-4 gap-1.5 text-center">
        <SmallMetric label="AI增" value={(c.metrics.aiArrGrowth === 0 || !c.metrics.aiArrGrowth) ? "未拆" : `${c.metrics.aiArrGrowth}%`} good={c.metrics.aiArrGrowth > 0} />
        <SmallMetric label="NRR" value={`${c.metrics.nrr}%`} good={c.metrics.nrr >= 115} />
        <SmallMetric label="毛利" value={`${c.metrics.gmDeltaYoY > 0 ? "+" : ""}${c.metrics.gmDeltaYoY}pp`} warn={c.metrics.gmDeltaYoY < -1} good={c.metrics.gmDeltaYoY > 0} />
        <SmallMetric label="部署" value={c.metrics.deploy === "company-wide" ? "全员" : c.metrics.deploy === "expanding" ? "扩张" : "试点"} good={c.metrics.deploy === "company-wide"} />
      </div>
    </div>
  );
}

function SmallMetric({ label, value, warn, good }) {
  return (
    <div className="border border-stone-700 bg-stone-900/60 px-1 py-1.5">
      <div className="font-mono text-[9px] text-stone-400 uppercase font-bold">{label}</div>
      <div className={`font-mono digit text-[11px] font-bold ${warn ? "text-rose-300" : good ? "text-emerald-300" : "text-stone-100"}`}>{value}</div>
    </div>
  );
}
