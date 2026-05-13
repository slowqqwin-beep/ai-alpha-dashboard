#!/usr/bin/env python3
"""
AI Alpha Dashboard 价格自动更新脚本

数据源:
- A股当前价: 新浪财经 hq.sinajs.cn
- A股52周高低: 腾讯财经 qt.gtimg.cn
- 美股: yfinance (Yahoo Finance)

输出: public/prices.json
触发: .github/workflows/update-prices.yml
"""

import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import requests
import yfinance as yf

# ============ 配置: 标的清单 ============
# 修改这里来增删股票

A_STOCKS = {
    # === Picks & Shovels A股 ===
    "300308": "中际旭创",
    "688676": "金盘科技",
    "301200": "大族数控",
    "002837": "英维克",
    "002409": "雅克科技",
    "688368": "晶丰明源",
    "300229": "拓尔思",
    "002463": "沪电股份",
    "002916": "深南电路",
    "600183": "生益科技",
    "002179": "中航光电",
    "605111": "新洁能",
    "688720": "艾森股份",
    "603986": "兆易创新",
    "688111": "金山办公",
    "002230": "科大讯飞",
    "002335": "科华数据",
    "300693": "盛弘股份",
    "300153": "科泰电源",
}

US_STOCKS = [
    # Picks & Shovels 美股
    "VRT", "ETN", "GEV", "MU", "AVGO", "MRVL",
    "ALAB", "ANET", "CRDO", "MOD",
    # S2 Tracker 应用层
    "PLTR", "NOW", "GTLB", "CRM", "DDOG", "SNOW", "CRWD", "MDB",
]

# ============ A股代码 → 交易所前缀 ============

def market_prefix(code: str) -> str:
    """600/601/603/605/688/689 → sh, 其余 → sz"""
    if code.startswith(("6", "9")):
        return f"sh{code}"
    return f"sz{code}"


# ============ 新浪: A股当前价 ============

def fetch_sina_a(codes: list[str]) -> dict:
    """批量抓A股实时价格"""
    formatted = ",".join(market_prefix(c) for c in codes)
    url = f"https://hq.sinajs.cn/list={formatted}"
    headers = {
        "Referer": "https://finance.sina.com.cn",
        "User-Agent": "Mozilla/5.0",
    }
    resp = requests.get(url, headers=headers, timeout=15)
    resp.encoding = "gbk"

    result = {}
    pattern = re.compile(r'var hq_str_(s[hz])(\d+)="([^"]*)"')
    for line in resp.text.strip().split("\n"):
        m = pattern.match(line)
        if not m:
            continue
        code = m.group(2)
        fields = m.group(3).split(",")
        # 新浪字段: 0名称 1开盘 2昨收 3当前 4今高 5今低 ...
        if len(fields) < 6:
            result[code] = None
            continue
        try:
            current = float(fields[3])
            # 若 current 为 0,可能停牌,用昨收
            if current == 0:
                current = float(fields[2])
            result[code] = {
                "price": round(current, 2),
                "prevClose": round(float(fields[2]), 2),
            }
        except (ValueError, IndexError):
            result[code] = None
    return result


# ============ 腾讯: A股52周高低 ============

def fetch_tencent_52w(codes: list[str]) -> dict:
    """批量抓52周高低 (新浪实时接口不带52周)"""
    formatted = ",".join(market_prefix(c) for c in codes)
    url = f"https://qt.gtimg.cn/q={formatted}"
    headers = {"User-Agent": "Mozilla/5.0"}
    resp = requests.get(url, headers=headers, timeout=15)
    resp.encoding = "gbk"

    result = {}
    pattern = re.compile(r'v_(s[hz])(\d+)="([^"]*)"')
    for line in resp.text.strip().split("\n"):
        m = pattern.match(line)
        if not m:
            continue
        code = m.group(2)
        fields = m.group(3).split("~")
        # 腾讯字段: 47=52周高, 48=52周低 (个股标准格式)
        try:
            result[code] = {
                "week52High": round(float(fields[47]), 2),
                "week52Low": round(float(fields[48]), 2),
            }
        except (ValueError, IndexError):
            result[code] = None
    return result


# ============ yfinance: 美股 ============

def fetch_us(tickers: list[str]) -> dict:
    """逐个抓美股. fast_info 比 info 快很多"""
    result = {}
    for ticker in tickers:
        try:
            t = yf.Ticker(ticker)
            fi = t.fast_info
            result[ticker] = {
                "price": round(float(fi["last_price"]), 2),
                "week52High": round(float(fi["year_high"]), 2),
                "week52Low": round(float(fi["year_low"]), 2),
            }
            print(f"  ✓ {ticker}: ${result[ticker]['price']}")
        except Exception as e:
            print(f"  ✗ {ticker}: {e}", file=sys.stderr)
            result[ticker] = None
    return result


# ============ 主流程 ============

def main():
    print(f"[{datetime.now().isoformat()}] 开始抓取价格")

    print("\n→ 新浪: A股当前价")
    a_now = fetch_sina_a(list(A_STOCKS.keys()))
    ok = sum(1 for v in a_now.values() if v)
    print(f"  {ok}/{len(A_STOCKS)} 成功")

    print("\n→ 腾讯: A股52周高低")
    a_52w = fetch_tencent_52w(list(A_STOCKS.keys()))
    ok = sum(1 for v in a_52w.values() if v)
    print(f"  {ok}/{len(A_STOCKS)} 成功")

    print("\n→ yfinance: 美股")
    us = fetch_us(US_STOCKS)

    # === 合并 ===
    stocks = {}

    for code, name in A_STOCKS.items():
        now = a_now.get(code) or {}
        w52 = a_52w.get(code) or {}
        stocks[code] = {
            "name": name,
            "market": "A",
            "price": now.get("price"),
            "prevClose": now.get("prevClose"),
            "week52High": w52.get("week52High"),
            "week52Low": w52.get("week52Low"),
        }

    for ticker in US_STOCKS:
        data = us.get(ticker) or {}
        stocks[ticker] = {
            "name": ticker,
            "market": "US",
            "price": data.get("price"),
            "week52High": data.get("week52High"),
            "week52Low": data.get("week52Low"),
        }

    output = {
        "updatedAt": datetime.now(timezone.utc).isoformat(),
        "stocks": stocks,
    }

    out_path = Path("public/prices.json")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(
        json.dumps(output, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"\n✔ 写入 {out_path} ({len(stocks)} 只)")


if __name__ == "__main__":
    main()
