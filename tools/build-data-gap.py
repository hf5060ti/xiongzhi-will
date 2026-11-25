#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""从数据文件 + 源码提取中文文案候选，生成待翻译 JSON（供 translate-visible-mt.py 复用）。

过滤规则：
  - 排除现有词典已收录
  - 排除模板字符串（含 ${ 或反引号插值）、代码碎片、正则片段
  - 保留数据文件里的份量/描述/说明与 UI 可见文案
输出：tools/data-gap.json
"""
import glob
import json
import os
import re

WD = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ZH = re.compile(r'[\u4e00-\u9fff]')
NOISE = re.compile(r'\$\{|[{}<>\\]|https?://|\.replace|\.split|\.match|=>|\bfunction\b|\breturn\b|\bconst\b|/\\|\s\+')
CODE_TOKEN = re.compile(r'[A-Za-z_][A-Za-z0-9_]{2,}')

keys = set()
for n in ('ui', 'mt', 'fix', 'extra', 'wger'):
    for l in ('en', 'de', 'ru', 'zh-Hans'):
        p = os.path.join(WD, 'src', 'locales', '%s-%s.json' % (n, l))
        if os.path.exists(p):
            keys.update(json.load(open(p, encoding='utf-8')).keys())

candidates = set()


def add(s):
    s = s.strip()
    if not s or len(s) > 260 or not ZH.search(s):
        return
    if s in keys or '\n' in s or '\\n' in s:
        return
    if NOISE.search(s):
        return
    if len(CODE_TOKEN.findall(s)) > len(ZH.findall(s)):
        return
    # 形如 ", 上:" / "', 举:" 的 split 碎片，翻译无意义且会污染词级正则
    if s and (not ZH.match(s[0]) and not s[0].isdigit()):
        return
    if s and s[-1] in ',:、，。；;:':
        return
    if len(s) < 2:
        return
    candidates.add(s)


# 数据文件：递归收集字符串
for p in glob.glob(os.path.join(WD, 'src', 'data', '**', '*.json'), recursive=True):
    try:
        data = json.load(open(p, encoding='utf-8'))
    except Exception:
        continue
    stack = [data]
    while stack:
        v = stack.pop()
        if isinstance(v, dict):
            stack.extend(v.values())
        elif isinstance(v, list):
            stack.extend(v)
        elif isinstance(v, str):
            add(v)

# ts / tsx：字符串字面量 + JSX 文本（与 translate-ui-mt 同逻辑，补漏）
str_pat = re.compile(r"'([^'\\\n]*[\u4e00-\u9fff][^'\\\n]*)'|\"([^\"\\\n]*[\u4e00-\u9fff][^\"\\\n]*)\"")
jsx_pat = re.compile(r'>\s*([^<>{}\n]*[\u4e00-\u9fff][^<>{}\n]*?)\s*<')
for p in glob.glob(os.path.join(WD, 'src', '**', '*.ts'), recursive=True) + glob.glob(os.path.join(WD, 'src', '**', '*.tsx'), recursive=True):
    if '/locales/' in p or '.test.' in p:
        continue
    text = open(p, encoding='utf-8').read()
    for m in str_pat.finditer(text):
        add(next((g for g in m.groups() if g), ''))
    for m in jsx_pat.finditer(text):
        add(m.group(1))

out = sorted(candidates)
with open(os.path.join(WD, 'tools', 'data-gap.json'), 'w', encoding='utf-8') as f:
    json.dump(out, f, ensure_ascii=False, indent=0)
    f.write('\n')
print('待译候选 %d 条，字符 %d' % (len(out), sum(map(len, out))))
for s in out[:40]:
    print(repr(s))
