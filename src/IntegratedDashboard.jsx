import React, { useState, useMemo } from "react";
import {
  Sparkles, Target, Filter, Layers, Wrench, Zap,
  TrendingUp, AlertCircle, ChevronDown, ChevronUp, Globe2,
  Cpu, Database, Snowflake, CircuitBoard, Network, HardDrive,
  Building2, BatteryCharging
} from "lucide-react";

export default function IntegratedDashboard() {
  const [activeTab, setActiveTab] = useState("picks"); // picks | s2

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
        .glow-amber   { box-shadow: 0 0 0 1px rgba(232,197,71,0.3), 0 0 30px -8px rgba(232,197,71,0.4); }
        .glow-emerald { box-shadow: 0 0 0 1px rgba(52,211,153,0.3), 0 0 30px -8px rgba(52,211,153,0.4); }
        .pulse-ring { animation: pulseRing 2s ease-in-out infinite; }
        @keyframes pulseRing { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>

      <div className="grain absolute inset-0" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-8 py-8">

        {/* ─────────── 顶部 ─────────── */}
        <header className="flex items-center justify-between mb-8 pb-6 border-b border-stone-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-amber-400/60 flex items-center justify-center bg-amber-500/10">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="font-display text-2xl text-stone-50 leading-none">AI Alpha Suite</div>
              <div className="text-[11px] tracking-[0.25em] text-stone-300 mt-1.5 uppercase font-medium">
                财报事件驱动 · 应用层 + 硬件链双视图
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-ring" />
              <span className="font-mono text-emerald-300 tracking-widest font-semibold">LIVE</span>
            </div>
            <div className="font-mono text-stone-300">2026·05·12 · 更新</div>
          </div>
        </header>

        {/* ─────────── 上下文事件提示 ─────────── */}
        <div className="mb-8 border border-amber-400/40 bg-amber-500/5 p-4 flex items-start gap-3">
          <Zap className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-display text-base text-amber-100 mb-1">
              最新事件 · 三重共振 · 应用层验证 + 算力链兑现 + GPU 万亿指引
            </div>
            <div className="text-sm text-stone-200 leading-relaxed">
              <span className="font-mono text-amber-200 font-bold">PLTR Q1 +85%</span>（史上最快, Rule of 40 = 145%）· <span className="font-mono text-amber-200 font-bold">中际旭创 Q1 +192%/+262%</span>（预付款 +1009% 锁料）· <span className="font-mono text-amber-200 font-bold">NVDA</span> 给出 <span className="font-mono text-amber-200 font-bold">Blackwell+Rubin 三年 $1T</span> 收入指引 · MSFT/META/GOOG/AMZN 2026 capex 上修至 <span className="font-mono text-amber-200 font-bold">$725B</span>
            </div>
          </div>
        </div>

        {/* ─────────── Tab 切换 ─────────── */}
        <div className="flex items-center gap-2 mb-6 border-b border-stone-800">
          <TabButton
            active={activeTab === "picks"}
            onClick={() => setActiveTab("picks")}
            icon={Wrench}
            label="Picks & Shovels"
            sub="硬件中游 · capex 直接传导"
          />
          <TabButton
            active={activeTab === "s2"}
            onClick={() => setActiveTab("s2")}
            icon={Cpu}
            label="S2 Tracker"
            sub="应用层 · 1→10 阶段判定"
          />
        </div>

        {/* ─────────── 内容 ─────────── */}
        {activeTab === "picks" ? <PicksShovelsView /> : <S2TrackerView />}

        <footer className="pt-6 mt-10 border-t border-stone-700 flex items-center justify-between text-[11px] text-stone-300">
          <div className="font-mono">DATA : 公司财报披露 · 卖方研报 · 不构成投资建议</div>
          <div className="font-mono">STAGE : capex 上修传导窗口期</div>
        </footer>
      </div>
    </div>
  );
}

/* ============================================================
   Picks & Shovels 视图 — 新模块
   ============================================================ */

function PicksShovelsView() {
  const [marketFilter, setMarketFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [stageFilter, setStageFilter] = useState("ALL");
  const [expanded, setExpanded] = useState(null);

  // ============ Picks & Shovels 数据 ============
  const stocks = [
    // ===== A股 =====
    // ----- 新增 (2026-05-12): 中际旭创 / 大族数控 / Agentic 应用三件套 -----
    { ticker: "中际旭创", code: "300308.SZ", market: "A", category: "光模块", sub: "800G/1.6T 光模块",
      directness: 3, exposure: 3, underpriced: 0, visibility: 3, ytdReturn: 32,
      narrative: "Q1 营收 +192% 净利 +262%, 单季利润超 2024 全年, 预付款 +1009% 锁料信号极强",
      catalyst: "1.6T 全球市占 50-70%, 12.8T XPO 全球首发, 订单已排至 2027",
      risk: "PE 90+ 估值已极端, 应收账款 +98% 存货 +24% 警惕以量补价" },
    { ticker: "大族数控", code: "301200.SZ", market: "A", category: "PCB/CCL", sub: "PCB 钻孔/曝光设备",
      directness: 2, exposure: 3, underpriced: 2, visibility: 2, ytdReturn: 18,
      narrative: "二阶受益 - 所有 AI PCB 厂商扩产都要买它设备, 比 PCB 自身更纯粹",
      catalyst: "沪电/深南/景旺等 AI PCB 厂商订单饱满 → 设备扩产需求",
      risk: "设备订单确认有滞后, 业绩节奏比 PCB 厂商晚 1-2 个季度" },
    { ticker: "金山办公", code: "688111.SH", market: "A", category: "Agentic应用", sub: "WPS AI / Copilot",
      directness: 2, exposure: 2, underpriced: 2, visibility: 2, ytdReturn: 10,
      narrative: "国内最接近消费级 Copilot, PLTR Q1 验证 Agentic 商业化后估值重估",
      catalyst: "WPS AI 付费用户突破临界点, 政企订单加速",
      risk: "AI 变现节奏不及预期, 国资委采购周期长" },
    { ticker: "科大讯飞", code: "002230.SZ", market: "A", category: "Agentic应用", sub: "星火 AI Agent",
      directness: 2, exposure: 2, underpriced: 2, visibility: 2, ytdReturn: 8,
      narrative: "星火大模型 + Agent 商业化推进, 教育/医疗/汽车多场景落地",
      catalyst: "星火 5.0 发布 + 智能体平台开放, 国资云合作深化",
      risk: "ToG 业务回款慢, 国产算力依赖" },
    { ticker: "拓尔思", code: "300229.SZ", market: "A", category: "Agentic应用", sub: "政企 AI 应用",
      directness: 3, exposure: 3, underpriced: 1, visibility: 2, ytdReturn: 22,
      narrative: "对标 PLTR Gotham, 政企数据智能 + AI Agent 双重逻辑",
      catalyst: "PLTR 验证后 A 股 Agentic 估值重估窗口",
      risk: "市值小 (流通市值 <100 亿) 波动大, 业绩兑现节奏不稳定" },
    // ----- 既有 A 股 -----
    { ticker: "金盘科技", code: "688676.SH", market: "A", category: "电力配电", sub: "干式变压器/SST",
      directness: 3, exposure: 2, underpriced: 0, visibility: 3, ytdReturn: 35,
      narrative: "国内干变龙头, AIDC 收入 +337% 占比 20%, SST 拿到英伟达/微软/亚马逊订单",
      catalyst: "2026 年 SST 小批量出货, 美国弗吉尼亚工厂筹备",
      risk: "2025 年股价已 +120%, 估值偏高" },
    { ticker: "英维克", code: "002837.SZ", market: "A", category: "冷却", sub: "液冷",
      directness: 3, exposure: 3, underpriced: 1, visibility: 2, ytdReturn: 28,
      narrative: "国内液冷龙头, AI 算力密度上升直接驱动液冷渗透率提升",
      catalyst: "字节/阿里/腾讯液冷采购加速, 海外客户突破",
      risk: "竞争加剧 (申菱/同飞/高澜)" },
    { ticker: "科华数据", code: "002335.SZ", market: "A", category: "电力管理", sub: "UPS/IDC运营",
      directness: 3, exposure: 2, underpriced: 2, visibility: 1, ytdReturn: 12,
      narrative: "国内 UPS 第一梯队 + IDC 运营双业务",
      catalyst: "UPS 出货量随 AIDC 建设放量",
      risk: "IDC 运营业务现金流压力" },
    { ticker: "盛弘股份", code: "300693.SZ", market: "A", category: "电力管理", sub: "APF/SVG",
      directness: 2, exposure: 2, underpriced: 2, visibility: 2, ytdReturn: 15,
      narrative: "800V/HVDC 场景下的电能质量治理, 与维谛技术合作",
      catalyst: "HVDC 渗透率提升带动 APF/SVG 需求",
      risk: "充电桩业务波动" },
    { ticker: "晶丰明源", code: "688368.SH", market: "A", category: "电源芯片", sub: "DrMOS/多相电源",
      directness: 3, exposure: 3, underpriced: 1, visibility: 3, ytdReturn: 42,
      narrative: "国内 DrMOS 龙头, 第二代 Smart DrMOS 已发布, AI 服务器电源专用",
      catalyst: "高性能计算电源芯片业务收入 +420%, 出货量 +121%",
      risk: "估值已不便宜, 上游晶圆代工产能受限" },
    { ticker: "新洁能", code: "605111.SH", market: "A", category: "电源芯片", sub: "MOSFET",
      directness: 3, exposure: 2, underpriced: 1, visibility: 2, ytdReturn: 22,
      narrative: "MOSFET 已在 AI 算力领域海外头部客户实现批量销售",
      catalyst: "SJ MOS 第四代量产, AI 服务器 PSU 端需求放量",
      risk: "AI 算力业务占比仍仅 9%, 主营受工控/汽车周期影响" },
    { ticker: "雅克科技", code: "002409.SZ", market: "A", category: "HBM材料", sub: "前驱体",
      directness: 3, exposure: 3, underpriced: 1, visibility: 3, ytdReturn: 25,
      narrative: "国内唯一 HBM 前驱体国产替代, 全球前三大 HBM 厂商共同供应商, 全球市占 ~15%",
      catalyst: "HBM4 已通过 SK 海力士独家认证, 与华为联合开发首年订单 8 亿, 2026Q1 量产",
      risk: "20 亿商誉, 实控人套现历史" },
    { ticker: "艾森股份", code: "688720.SH", market: "A", category: "HBM材料", sub: "电子化学品/光刻胶",
      directness: 2, exposure: 2, underpriced: 1, visibility: 2, ytdReturn: 32,
      narrative: "先进封装负性光刻胶已稳定量产用于 HBM 封装, 电镀液 + 光刻胶双工艺",
      catalyst: "2025 全年营收 +37% 净利 +53%, HBM/3D NAND 验证推进",
      risk: "体量较小, 业绩弹性大但波动也大" },
    { ticker: "科泰电源", code: "300153.SZ", market: "A", category: "备用电源", sub: "柴油发电机组",
      directness: 3, exposure: 3, underpriced: 0, visibility: 1, ytdReturn: 65,
      narrative: "高功率柴发, AI 数据中心备用电源, 海外厂商产能扩张有限",
      catalyst: "AIDC 备电需求, 涨价预期",
      risk: "已大幅炒作 (4日 +30%)" },
    // ----- 新增: PCB/CCL/ABF 链 + DDR4 涨价链 -----
    { ticker: "生益科技", code: "600183.SH", market: "A", category: "PCB/CCL", sub: "高速覆铜板",
      directness: 3, exposure: 2, underpriced: 2, visibility: 2, ytdReturn: 18,
      narrative: "国内高速 CCL 龙头, AI 服务器 PCB 价值量提升直接受益",
      catalyst: "M8/M9 等高端 CCL 出货占比提升, 毛利率改善",
      risk: "CCL 仍受 PCB 整体景气度影响" },
    { ticker: "深南电路", code: "002916.SZ", market: "A", category: "PCB/CCL", sub: "ABF 载板/AI PCB",
      directness: 3, exposure: 3, underpriced: 1, visibility: 2, ytdReturn: 28,
      narrative: "国内 ABF 载板第一梯队, AI 芯片 (GPU/ASIC) 价值量翻倍直接受益",
      catalyst: "B200 等下一代 AI 芯片对 ABF 层数/面积要求大幅提升",
      risk: "ABF 国产化客户验证仍在推进" },
    { ticker: "中航光电", code: "002179.SZ", market: "A", category: "冷却", sub: "液冷接头/连接器",
      directness: 3, exposure: 2, underpriced: 2, visibility: 2, ytdReturn: 12,
      narrative: "液冷接头 + 高速连接器双业务, AI 服务器双重受益",
      catalyst: "液冷渗透率提升 + 国产 AI 服务器份额扩大",
      risk: "军工业务波动仍是主要业绩变量" },
    { ticker: "沪电股份", code: "002463.SZ", market: "A", category: "PCB/CCL", sub: "AI 服务器 PCB",
      directness: 3, exposure: 3, underpriced: 0, visibility: 3, ytdReturn: 55,
      narrative: "AI 服务器 PCB 主供应商, 北美超大规模云厂客户群完整",
      catalyst: "1.6T 时代 PCB 价值量再次跃升",
      risk: "估值已透支, 适合回调入场" },
    { ticker: "兆易创新", code: "603986.SH", market: "A", category: "内存存储", sub: "NOR Flash + DDR4",
      directness: 2, exposure: 3, underpriced: 2, visibility: 1, ytdReturn: 8,
      narrative: "DDR4 利基存储龙头, 三大原厂产能切 HBM 导致 DDR4 供给收缩涨价",
      catalyst: "DDR4 价格 Q2-Q3 持续上涨 + NOR Flash 高景气延续",
      risk: "DDR4 终究是过渡产品, 故事生命周期 1-2 年" },
    // ===== 美股 =====
    { ticker: "VRT", code: "VRT", market: "US", category: "电力管理", sub: "数据中心电源/冷却整机",
      directness: 3, exposure: 3, underpriced: 1, visibility: 3, ytdReturn: 22,
      narrative: "数据中心电源/冷却龙头, 订单 backlog 跟随 hyperscaler capex 上修",
      catalyst: "MSFT $190B capex / META $145B 直接传导",
      risk: "估值已较高" },
    { ticker: "ETN", code: "ETN", market: "US", category: "电力配电", sub: "电力管理/变压器",
      directness: 3, exposure: 2, underpriced: 2, visibility: 2, ytdReturn: 8,
      narrative: "Eaton 数据中心电力管理 + 工业自动化双驱动",
      catalyst: "美国电网升级 + 数据中心 capex",
      risk: "工业周期暴露" },
    { ticker: "GEV", code: "GEV", market: "US", category: "电力配电", sub: "燃气轮机/电网设备",
      directness: 3, exposure: 2, underpriced: 1, visibility: 3, ytdReturn: 32,
      narrative: "GE Vernova - 数据中心自备电厂核心供应商, 燃气轮机交期到 2028",
      catalyst: "MSFT/META 自建电厂趋势",
      risk: "已涨幅较高" },
    { ticker: "MU", code: "MU", market: "US", category: "内存存储", sub: "HBM/DRAM",
      directness: 3, exposure: 3, underpriced: 2, visibility: 2, ytdReturn: 18,
      narrative: "HBM3E 已锁单 HBM4 量产爬坡, MSFT 明说 capex 增量来自内存涨价",
      catalyst: "MSFT $25B 涨价影响直接确认 MU 定价权",
      risk: "内存周期顾虑" },
    { ticker: "AVGO", code: "AVGO", market: "US", category: "ASIC", sub: "Google TPU/Meta MTIA",
      directness: 3, exposure: 2, underpriced: 0, visibility: 3, ytdReturn: 28,
      narrative: "Google TPU + Meta MTIA 设计伙伴, AI 营收同比翻倍",
      catalyst: "推理需求 (Copilot) 验证定制 ASIC 路线",
      risk: "已被充分定价" },
    { ticker: "MRVL", code: "MRVL", market: "US", category: "ASIC", sub: "Trainium/Maia",
      directness: 3, exposure: 2, underpriced: 2, visibility: 2, ytdReturn: 5,
      narrative: "Marvell - Amazon Trainium / Microsoft Maia 设计伙伴",
      catalyst: "Amazon 维持 $200B capex, Trainium 2 放量",
      risk: "落后 AVGO 一档" },
    { ticker: "ALAB", code: "ALAB", market: "US", category: "网络互联", sub: "PCIe/CXL retimer",
      directness: 3, exposure: 3, underpriced: 1, visibility: 2, ytdReturn: 25,
      narrative: "Astera Labs - 定制 ASIC 系统必备, 集群规模线性放大",
      catalyst: "推理负载扩张直接驱动需求",
      risk: "客户集中度高" },
    { ticker: "ANET", code: "ANET", market: "US", category: "网络互联", sub: "数据中心交换机",
      directness: 3, exposure: 3, underpriced: 1, visibility: 3, ytdReturn: 30,
      narrative: "800G/1.6T 数据中心交换机龙头",
      catalyst: "AI 集群规模超线性增长 → 网络成本",
      risk: "估值充分" },
    { ticker: "CRDO", code: "CRDO", market: "US", category: "网络互联", sub: "AEC 有源铜缆",
      directness: 3, exposure: 3, underpriced: 1, visibility: 2, ytdReturn: 22,
      narrative: "AEC 有源铜缆, 规模化 ASIC 集群必用",
      catalyst: "AVGO/MRVL ASIC 集群放量",
      risk: "竞争从 Marvell 等" },
    { ticker: "MOD", code: "MOD", market: "US", category: "冷却", sub: "数据中心液冷",
      directness: 3, exposure: 2, underpriced: 2, visibility: 2, ytdReturn: 15,
      narrative: "Modine - 数据中心液冷, 业务转型受益",
      catalyst: "GPU 密度上升 → 液冷必然替代风冷",
      risk: "业务转型未完成" },
  ];

  // 计算总分和阶段
  const evaluated = stocks.map(s => {
    const score = s.directness + s.exposure + s.underpriced + s.visibility;
    let stage, stageLabel;
    if (score >= 9) { stage = "PRIME"; stageLabel = "PRIME ⭐⭐"; }
    else if (score >= 7) { stage = "STRONG"; stageLabel = "STRONG ⭐"; }
    else if (score >= 4) { stage = "INDIRECT"; stageLabel = "INDIRECT"; }
    else { stage = "STORY"; stageLabel = "STORY"; }
    return { ...s, score, stage, stageLabel };
  }).sort((a, b) => b.score - a.score);

  // 过滤
  const filtered = evaluated.filter(s => {
    if (marketFilter !== "ALL" && s.market !== marketFilter) return false;
    if (categoryFilter !== "ALL" && s.category !== categoryFilter) return false;
    if (stageFilter !== "ALL" && s.stage !== stageFilter) return false;
    return true;
  });

  const stats = {
    PRIME: evaluated.filter(s => s.stage === "PRIME").length,
    STRONG: evaluated.filter(s => s.stage === "STRONG").length,
    INDIRECT: evaluated.filter(s => s.stage === "INDIRECT").length,
    STORY: evaluated.filter(s => s.stage === "STORY").length,
  };

  const categories = [...new Set(stocks.map(s => s.category))];

  return (
    <div>
      {/* 阶段分布 */}
      <section className="mb-6">
        <div className="grid grid-cols-4 gap-3">
          <StageStatCard
            label="PRIME ⭐⭐" chinese="最直接 + 未定价" count={stats.PRIME}
            color="emerald" desc="9-10分 · 直供 hyperscaler 且故事未充分反映" highlight />
          <StageStatCard
            label="STRONG ⭐" chinese="强受益" count={stats.STRONG}
            color="amber" desc="7-8分 · 直接受益但部分已定价" />
          <StageStatCard
            label="INDIRECT" chinese="间接受益" count={stats.INDIRECT}
            color="stone" desc="4-6分 · 通过其他叙事间接关联" />
          <StageStatCard
            label="STORY" chinese="谨慎" count={stats.STORY}
            color="rose" desc="0-3分 · 故事股, 暴露度低" />
        </div>
      </section>

      {/* 过滤器 */}
      <section className="mb-6 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Globe2 className="w-3.5 h-3.5 text-stone-300" />
          <span className="text-[11px] tracking-widest text-stone-300 uppercase mr-2">市场</span>
          {[["ALL", "全部"], ["A", "A股"], ["US", "美股"]].map(([k, v]) => (
            <FilterChip key={k} active={marketFilter === k} onClick={() => setMarketFilter(k)}>{v}</FilterChip>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Layers className="w-3.5 h-3.5 text-stone-300" />
          <span className="text-[11px] tracking-widest text-stone-300 uppercase mr-2">板块</span>
          <FilterChip active={categoryFilter === "ALL"} onClick={() => setCategoryFilter("ALL")}>全部</FilterChip>
          {categories.map(c => (
            <FilterChip key={c} active={categoryFilter === c} onClick={() => setCategoryFilter(c)}>{c}</FilterChip>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-stone-300" />
          <span className="text-[11px] tracking-widest text-stone-300 uppercase mr-2">阶段</span>
          {[["ALL", "全部"], ["PRIME", "PRIME"], ["STRONG", "STRONG"], ["INDIRECT", "INDIRECT"]].map(([k, v]) => (
            <FilterChip key={k} active={stageFilter === k} onClick={() => setStageFilter(k)}>{v}</FilterChip>
          ))}
        </div>
      </section>

      {/* 排行榜表格视图 */}
      <section className="mb-8">
        <div className="border border-stone-700 bg-stone-900/40">
          <div className="grid grid-cols-12 px-5 py-3 bg-stone-800/60 border-b border-stone-700 text-[10px] tracking-widest text-stone-300 uppercase font-semibold">
            <div className="col-span-1">#</div>
            <div className="col-span-2">Ticker</div>
            <div className="col-span-1">市场</div>
            <div className="col-span-2">板块</div>
            <div className="col-span-1">YTD</div>
            <div className="col-span-3">评分构成</div>
            <div className="col-span-1 text-right">总分</div>
            <div className="col-span-1 text-right">阶段</div>
          </div>
          {filtered.map((s, i) => (
            <RankRow
              key={s.ticker}
              stock={s}
              rank={i + 1}
              onToggle={() => setExpanded(expanded === s.ticker ? null : s.ticker)}
              expanded={expanded === s.ticker}
            />
          ))}
          {filtered.length === 0 && (
            <div className="text-center text-stone-400 py-10">无符合条件的标的</div>
          )}
        </div>
      </section>

      {/* PRIME 标的卡片精选 */}
      {stageFilter === "ALL" && marketFilter === "ALL" && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
            <span className="text-[11px] tracking-[0.25em] text-emerald-300 uppercase font-semibold">⭐⭐ PRIME 重点标的</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {evaluated.filter(s => s.stage === "PRIME").slice(0, 6).map(s => (
              <PrimeCard key={s.ticker} stock={s} />
            ))}
          </div>
        </section>
      )}

      {/* 算法说明 */}
      <section className="mb-6">
        <div className="border border-stone-700 bg-stone-900/40 p-5">
          <div className="flex items-center gap-2 mb-3">
            <CircuitBoard className="w-3.5 h-3.5 text-stone-300" />
            <span className="text-[11px] tracking-[0.25em] text-stone-300 uppercase font-medium">评分算法 · 4 维</span>
          </div>
          <div className="grid grid-cols-4 gap-5">
            <MethodItem title="传导直接性" weight="0-3 分"
              desc="是否直接进 hyperscaler 数据中心 BOM。直供 hyperscaler=3, 一级供应商=2, 间接受益=1, 关联弱=0" />
            <MethodItem title="业务暴露度" weight="0-3 分"
              desc="AI/数据中心收入占总营收比例。>50%=3, 20-50%=2, 10-20%=1, <10%=0" />
            <MethodItem title="未定价程度" weight="0-2 分"
              desc="股价对 capex 故事的反应充分度 (YTD反向)。<10%=2, 10-30%=1, >30%=0" />
            <MethodItem title="订单可见性" weight="0-2 分"
              desc="是否有公开披露大单/RPO/客户名。明确客户=3, 行业披露=2, 间接=1, 无=0" />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   S2 Tracker 视图 (简化版)
   ============================================================ */

function S2TrackerView() {
  const companies = [
    { ticker: "NOW", name: "ServiceNow", category: "通用Copilot", aiProduct: "Now Assist",
      score: 10, stage: "MATURE", stageLabel: "MATURE",
      narrative: "Now Assist 净新增 ACV 翻倍 · NRR 128%",
      metrics: { aiArrGrowth: 150, nrr: 128, gmDeltaYoY: 0.4, deploy: "company-wide" } },
    { ticker: "PLTR", name: "Palantir", category: "数据/分析", aiProduct: "AIP",
      score: 10, stage: "MATURE", stageLabel: "MATURE ⭐",
      narrative: "Q1 营收 +85% 史上最快, US 商业 +133%, Rule of 40 = 145%, 全年指引上调至 +71%",
      metrics: { aiArrGrowth: 133, nrr: 130, gmDeltaYoY: 0.8, deploy: "company-wide" } },
    { ticker: "GTLB", name: "GitLab", category: "代码/开发", aiProduct: "Duo",
      score: 8, stage: "SCALING", stageLabel: "SCALING 10→100",
      narrative: "Duo Pro/Enterprise 渗透稳健, 毛利 89.6%",
      metrics: { aiArrGrowth: 60, nrr: 119, gmDeltaYoY: 0.2, deploy: "expanding" } },
    { ticker: "CRM", name: "Salesforce", category: "CRM/营销", aiProduct: "Agentforce",
      score: 7, stage: "SCALING", stageLabel: "SCALING 10→100",
      narrative: "Agentforce 加速渗透, PLTR 验证后 Agentic AI 整体重估窗口",
      metrics: { aiArrGrowth: 120, nrr: 110, gmDeltaYoY: -0.4, deploy: "expanding" } },
    { ticker: "DDOG", name: "Datadog", category: "数据/分析", aiProduct: "Bits AI",
      score: 5, stage: "ENTERING_1_TO_10", stageLabel: "ENTERING 1→10 ⭐",
      narrative: "AI 原生客户营收占比约 12%",
      metrics: { aiArrGrowth: 0, nrr: 115, gmDeltaYoY: 0.6, deploy: "expanding" } },
    { ticker: "SNOW", name: "Snowflake", category: "数据/分析", aiProduct: "Cortex",
      score: 4, stage: "ENTERING_1_TO_10", stageLabel: "ENTERING 1→10 ⭐",
      narrative: "Cortex 客户数高速增长, 但拒绝披露收入",
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

  const stats = {
    ENTERING_1_TO_10: companies.filter(c => c.stage === "ENTERING_1_TO_10").length,
    SCALING: companies.filter(c => c.stage === "SCALING").length,
    STILL_0_TO_1: companies.filter(c => c.stage === "STILL_0_TO_1").length,
    FADING: companies.filter(c => c.stage === "FADING").length,
    MATURE: companies.filter(c => c.stage === "MATURE").length,
  };

  return (
    <div>
      <section className="mb-6">
        <div className="grid grid-cols-5 gap-3">
          <StageStatCard label="STILL 0→1" chinese="还在画饼" count={stats.STILL_0_TO_1} color="stone" desc="AI收入未单拆" />
          <StageStatCard label="ENTERING 1→10" chinese="黄金窗口 ⭐" count={stats.ENTERING_1_TO_10} color="emerald" desc="α 集中区" highlight />
          <StageStatCard label="SCALING" chinese="规模化中" count={stats.SCALING} color="amber" desc="已被定价" />
          <StageStatCard label="MATURE" chinese="α 走完" count={stats.MATURE} color="stone" desc="完全反映在估值" />
          <StageStatCard label="FADING" chinese="警示" count={stats.FADING} color="rose" desc="毛利率红牌" />
        </div>
      </section>

      <section>
        <div className="grid grid-cols-2 gap-3">
          {companies.sort((a, b) => b.score - a.score).map(c => (
            <S2Card key={c.ticker} company={c} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─────────── 子组件 ─────────── */

function TabButton({ active, onClick, icon: Icon, label, sub }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-3 border-b-2 transition-all ${
        active
          ? "border-amber-400 bg-amber-500/5"
          : "border-transparent hover:bg-stone-800/40"
      }`}
    >
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
    stone:   "border-stone-600 text-stone-200",
    emerald: "border-emerald-400/60 text-emerald-200",
    amber:   "border-amber-400/60 text-amber-200",
    rose:    "border-rose-400/60 text-rose-200"
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
    <button
      onClick={onClick}
      className={`font-mono text-[11px] px-3 py-1.5 border transition-all ${
        active
          ? "border-amber-400/70 bg-amber-500/15 text-amber-200"
          : "border-stone-700 text-stone-300 hover:border-stone-500"
      }`}
    >
      {children}
    </button>
  );
}

function RankRow({ stock, rank, onToggle, expanded }) {
  const s = stock;
  const stageColor = {
    PRIME:    "text-emerald-300 bg-emerald-500/10 border-emerald-400/40",
    STRONG:   "text-amber-200 bg-amber-500/10 border-amber-400/40",
    INDIRECT: "text-stone-300 bg-stone-700/40 border-stone-500",
    STORY:    "text-rose-300 bg-rose-500/10 border-rose-400/40",
  }[s.stage];

  const ytdColor = s.ytdReturn > 30 ? "text-rose-300" :
                   s.ytdReturn > 10 ? "text-amber-200" :
                   s.ytdReturn >= 0 ? "text-emerald-300" : "text-emerald-400";

  return (
    <>
      <div
        onClick={onToggle}
        className="grid grid-cols-12 px-5 py-3 border-b border-stone-800 hover:bg-stone-800/40 cursor-pointer items-center"
      >
        <div className="col-span-1 font-mono text-stone-400 text-sm">{rank}</div>
        <div className="col-span-2">
          <div className="font-display text-base text-stone-50 leading-tight">{s.ticker}</div>
          <div className="font-mono text-[10px] text-stone-400">{s.code}</div>
        </div>
        <div className="col-span-1">
          <span className={`font-mono text-[10px] px-1.5 py-0.5 border ${
            s.market === "A" ? "border-rose-400/40 text-rose-300 bg-rose-500/5"
                             : "border-blue-400/40 text-blue-300 bg-blue-500/5"
          }`}>
            {s.market === "A" ? "A股" : "US"}
          </span>
        </div>
        <div className="col-span-2">
          <div className="text-sm text-stone-100">{s.category}</div>
          <div className="text-[10px] text-stone-400">{s.sub}</div>
        </div>
        <div className={`col-span-1 font-mono digit text-sm ${ytdColor}`}>
          {s.ytdReturn > 0 ? "+" : ""}{s.ytdReturn}%
        </div>
        <div className="col-span-3">
          <ScoreBreakdownInline directness={s.directness} exposure={s.exposure} underpriced={s.underpriced} visibility={s.visibility} />
        </div>
        <div className="col-span-1 text-right">
          <span className="font-display digit text-2xl text-stone-50">{s.score}</span>
          <span className="text-stone-500 text-sm">/10</span>
        </div>
        <div className="col-span-1 text-right">
          <span className={`font-mono text-[10px] tracking-widest px-2 py-1 border font-bold ${stageColor}`}>
            {s.stageLabel}
          </span>
        </div>
      </div>
      {expanded && (
        <div className="px-5 py-4 bg-stone-900/60 border-b border-stone-800">
          <div className="grid grid-cols-3 gap-5 text-xs">
            <div>
              <div className="font-mono text-[10px] text-stone-400 uppercase tracking-widest mb-1.5">叙事</div>
              <div className="text-stone-200 leading-relaxed">{s.narrative}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest mb-1.5">催化</div>
              <div className="text-stone-200 leading-relaxed">{s.catalyst}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] text-rose-400 uppercase tracking-widest mb-1.5">风险</div>
              <div className="text-stone-200 leading-relaxed">{s.risk}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ScoreBreakdownInline({ directness, exposure, underpriced, visibility }) {
  const items = [
    { label: "直接", value: directness, max: 3 },
    { label: "暴露", value: exposure, max: 3 },
    { label: "未价", value: underpriced, max: 2 },
    { label: "可见", value: visibility, max: 2 },
  ];
  return (
    <div className="flex items-center gap-2">
      {items.map((it, i) => (
        <div key={i} className="flex items-center gap-1">
          <span className="font-mono text-[9px] text-stone-400">{it.label}</span>
          <div className="flex gap-0.5">
            {Array.from({ length: it.max }).map((_, j) => (
              <div key={j} className={`w-1.5 h-3 ${
                j < it.value
                  ? it.value === it.max ? "bg-emerald-400" : "bg-amber-400"
                  : "bg-stone-700"
              }`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PrimeCard({ stock }) {
  const s = stock;
  return (
    <div className="border border-emerald-400/40 bg-emerald-500/5 p-4 hover-lift">
      <div className="flex items-baseline justify-between mb-2">
        <div>
          <span className="font-display text-lg text-stone-50">{s.ticker}</span>
          <span className="font-mono text-[10px] text-stone-400 ml-2">{s.code}</span>
        </div>
        <span className={`font-mono text-[10px] px-1.5 py-0.5 border ${
          s.market === "A" ? "border-rose-400/40 text-rose-300"
                           : "border-blue-400/40 text-blue-300"
        }`}>
          {s.market === "A" ? "A股" : "US"}
        </span>
      </div>
      <div className="text-[11px] text-stone-300 mb-2">{s.category} · {s.sub}</div>
      <div className="text-[12px] text-stone-200 leading-relaxed mb-3 min-h-[3.5rem]">{s.narrative}</div>
      <div className="flex items-baseline justify-between pt-2 border-t border-stone-700/60">
        <span className="font-mono text-[10px] text-emerald-300 font-bold">{s.stageLabel}</span>
        <div>
          <span className="font-display digit text-xl text-stone-50">{s.score}</span>
          <span className="text-stone-500 text-xs">/10</span>
        </div>
      </div>
    </div>
  );
}

function MethodItem({ title, weight, desc }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="font-display text-sm text-stone-50">{title}</span>
        <span className="font-mono text-[10px] text-amber-200 font-semibold">{weight}</span>
      </div>
      <p className="text-[11px] text-stone-300 leading-relaxed">{desc}</p>
    </div>
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
          <div className="font-mono text-[10px] text-stone-400">{c.stageLabel}</div>
        </div>
      </div>
      <div className="text-[12px] text-stone-200 leading-relaxed mb-2">{c.narrative}</div>
      <div className="grid grid-cols-4 gap-1.5 text-center">
        <SmallMetric label="AI增" value={c.metrics.aiArrGrowth ? `${c.metrics.aiArrGrowth}%` : "未拆"} good={c.metrics.aiArrGrowth > 0} />
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
      <div className="font-mono text-[9px] text-stone-400 uppercase">{label}</div>
      <div className={`font-mono digit text-[11px] font-bold ${warn ? "text-rose-300" : good ? "text-emerald-300" : "text-stone-100"}`}>{value}</div>
    </div>
  );
}
