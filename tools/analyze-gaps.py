#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""扫描源码 + 数据文件中的中文文案，与现有语言词典做差集。仅诊断，不改文件。"""
import glob
import json
import os
import re

WD = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ZH = re.compile(r'[\u4e00-\u9fff]')

keys = set()
for n in ('ui', 'mt', 'fix', 'extra', 'wger'):
    for l in ('en', 'de', 'ru', 'zh-Hans'):
        p = os.path.join(WD, 'src', 'locales', '%s-%s.json' % (n, l))
        if os.path.exists(p):
            keys.update(json.load(open(p, encoding='utf-8')).keys())
print('现有词典 key 总数', len(keys))

found = set()
# JSON 数据文件：json.load 后递归收集字符串
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
        elif isinstance(v, str) and 0 < len(v) <= 200 and ZH.search(v):
            found.add(v.strip())

# ts / tsx：中文字符串字面量与 JSX 文本
str_pat = re.compile(r"'([^'\\\n]*[\u4e00-\u9fff][^'\\\n]*)'|\"([^\"\\\n]*[\u4e00-\u9fff][^\"\\\n]*)\"|`([^`\n]*[\u4e00-\u9fff][^`\n]*)`")
jsx_pat = re.compile(r'>\s*([^<>{}\n]*[\u4e00-\u9fff][^<>{}\n]*?)\s*<')
for p in glob.glob(os.path.join(WD, 'src', '**', '*.ts'), recursive=True) + glob.glob(os.path.join(WD, 'src', '**', '*.tsx'), recursive=True):
    if '/locales/' in p or '.test.' in p:
        continue
    text = open(p, encoding='utf-8').read()
    for m in str_pat.finditer(text):
        s = next((g for g in m.groups() if g), '').strip()
        if s:
            found.add(s)
    for m in jsx_pat.finditer(text):
        s = m.group(1).strip()
        if s:
            found.add(s)

print('数据+源码中文字符串', len(found))
missing = sorted(s for s in found if s not in keys)
print('未收录', len(missing))
print('--- 前 120 条 ---')
for s in missing[:120]:
    print(repr(s))
with open(os.path.join(WD, 'tools', 'gap-missing.json'), 'w', encoding='utf-8') as f:
    json.dump(missing, f, ensure_ascii=False, indent=0)
    f.write('\n')
