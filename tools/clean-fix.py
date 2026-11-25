#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""清理 fix-{en,de,ru}.json 里的机翻幻觉条目，不动任何源码或数据。

过滤规则（确定性，只删明显坏样本）：
  - 译文含连续 5+ 个相同标点（如 ", , , , ,"）
  - 译文只由标点/空白组成
  - 译文长度异常（> 原文 6 倍且 > 120 字符）
  - 译文仍含中文
  - 译文含替换字符 / 疑问符
"""
import json
import os
import re

WD = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ZH = re.compile(r'[\u4e00-\u9fff]')
BAD = re.compile(r'[\ufffd\u2047]')
PUNCT_ONLY = re.compile(r'^[\s\W_]+$', re.UNICODE)
REPEAT_PUNCT = re.compile(r'(.)(?:\s*\1){5,}')

for lang in ('en', 'de', 'ru'):
    path = os.path.join(WD, 'src', 'locales', 'fix-%s.json' % lang)
    data = json.load(open(path, encoding='utf-8'))
    kept = {}
    removed = []
    for k, v in data.items():
        bad = (
            not v
            or BAD.search(v)
            or ZH.search(v)
            or PUNCT_ONLY.match(v)
            or REPEAT_PUNCT.search(v)
            or (len(v) > 120 and len(v) > 6 * len(k))
        )
        if bad:
            removed.append((k, v))
        else:
            kept[k] = v
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(kept, f, ensure_ascii=False, indent=0, sort_keys=True)
        f.write('\n')
    print('[%s] %d -> %d，移除 %d' % (lang, len(data), len(kept), len(removed)))
    for k, v in removed[:8]:
        print('  -', repr(k), '->', repr(v)[:90])
