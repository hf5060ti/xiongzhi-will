#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把 tools/new-translations.json 的译文注入 fix-{en,de,ru}.json（最高优先级层）。
每个文件注入前备份为 .bak-newtrans。"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOCALES = os.path.join(ROOT, "src", "locales")
TRANS = {}
for _fn in ("new-translations.json", "new-translations-2.json"):
    _fp = os.path.join(ROOT, "tools", _fn)
    if os.path.exists(_fp):
        TRANS.update(json.load(open(_fp, encoding="utf-8")))

for lang in ("en", "de", "ru"):
    path = os.path.join(LOCALES, f"fix-{lang}.json")
    data = json.load(open(path, encoding="utf-8"))
    # 备份
    bak = path + ".bak-newtrans"
    if not os.path.exists(bak):
        with open(bak, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    added = 0
    overwritten = 0
    for zh, tr in TRANS.items():
        if lang not in tr:
            continue
        val = tr[lang]
        # 原文（带首尾空格）供词级正则命中
        variants = {zh: val}
        # trim 版本供整段命中：translateText 用 source.trim() 查表，
        # 带空格且 >24 字的 key 既进不了词级正则、又无法整段命中。
        stripped = zh.strip()
        if stripped != zh:
            variants[stripped] = val.strip()
        for key, value in variants.items():
            if key in data and data[key] != value:
                overwritten += 1
            elif key not in data:
                added += 1
            data[key] = value
    # 保留原有 key 顺序（新条目追加到末尾），并用原文件格式 LF / 顶格无缩进，
    # 避免整份重排 + 换行/缩进变化产生巨大 diff
    lines = ["{"]
    items = list(data.items())
    for i, (k, v) in enumerate(items):
        key = json.dumps(k, ensure_ascii=False)
        val = json.dumps(v, ensure_ascii=False)
        comma = "," if i < len(items) - 1 else ""
        lines.append(f"{key}: {val}{comma}")
    lines.append("}")
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lines) + "\n")
    print(f"{lang}: 新增 {added}, 覆盖 {overwritten}, 总计 {len(data)}")
