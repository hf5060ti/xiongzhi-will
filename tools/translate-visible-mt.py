#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从真实浏览器抓取的「英文模式下仍含中文」的可见文案（scan-result.json），
用开源 NLLB 离线模型逐条翻译为 en/de/ru，输出 fix-{lang}.json。

与 translate-ui-mt.py 的区别：
  本脚本的语料来自真实页面 DOM（含动态拼接、属性、标题），是用户实际看到的漏网文本；
  作为最高优先级词典覆盖 ui-* / mt-*。

模型: JustFrederik/nllb-200-distilled-600M-ct2-int8 (CC BY-NC 4.0, 非商用)
站点不自行撰写译文，均为模型预测值，需人工抽检。

用法:
  python tools/translate-visible-mt.py --model <模型目录> --scan <scan-result.json>
"""
import argparse
import json
import os
import re
import sys
import time

WD = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(WD, "src", "locales")
LANGS = (("en", "eng_Latn"), ("de", "deu_Latn"), ("ru", "rus_Cyrl"))
ZH = re.compile(r"[\u4e00-\u9fff]")
REPEAT = re.compile(r"\b(\w+)\b(?:\s+\1){3,}", re.I)
BAD = re.compile(r"[\ufffd\u2047]")


def load_texts(path):
    rows = json.load(open(path, encoding="utf-8"))
    out = []
    for r in rows:
        t = r.get("text", "").strip()
        if not t or not ZH.search(t):
            continue
        # 属性类记录以 "attr|text" 为 key，只取 text 部分
        if r.get("attr"):
            t = t
        if len(t) > 260 or "http" in t or "\\n" in t:
            continue
        out.append(t)
    return sorted(set(out))


def acceptable(src, out):
    if not out or BAD.search(out) or REPEAT.search(out):
        return False
    if ZH.search(out):  # 译文仍含中文 = 模型没翻干净，丢弃
        return False
    if len(out) > max(120, 3 * len(src)):
        return False
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", required=True)
    ap.add_argument("--scan", required=True)
    ap.add_argument("--extra", help="额外中文语料 JSON 数组（如路由标题）")
    ap.add_argument("--titles-only", action="store_true", help="只翻 --extra，不读扫描结果")
    ap.add_argument("--langs", help="只跑指定语言，逗号分隔（如 de,ru）；用于中断续跑")
    args = ap.parse_args()

    import ctranslate2
    import sentencepiece

    texts = [] if args.titles_only else load_texts(args.scan)
    if args.extra:
        texts += [t.strip() for t in json.load(open(args.extra, encoding="utf-8"))
                  if isinstance(t, str) and t.strip() and ZH.search(t)]
    texts = sorted(set(texts))
    print("可见残留文本 %d 条" % len(texts), flush=True)
    sp = sentencepiece.SentencePieceProcessor(model_file=os.path.join(args.model, "sentencepiece.bpe.model"))
    tr = ctranslate2.Translator(args.model, device="cpu", compute_type="int8", inter_threads=4, intra_threads=4)

    only = set(args.langs.split(',')) if args.langs else None
    for code, tag in LANGS:
        if only and code not in only:
            continue
        started = time.time()
        done = {}
        # 按长度分桶减少 padding
        buckets = {}
        for t in texts:
            n = len(sp.encode(t, out_type=str))
            buckets.setdefault(min((n // 16) * 16, 128), []).append(t)
        for key in sorted(buckets):
            items = buckets[key]
            for i in range(0, len(items), 16):
                chunk = items[i:i + 16]
                src = [sp.encode(t, out_type=str) + ["</s>"] for t in chunk]
                res = tr.translate_batch(src, target_prefix=[[tag]] * len(src),
                                         beam_size=2, max_decoding_length=max(32, key + 48))
                for t, r in zip(chunk, res):
                    h = r.hypotheses[0]
                    if h and h[0] == tag:
                        h = h[1:]
                    out = sp.decode(h).strip()
                    if acceptable(t, out):
                        done[t] = out
            if len(done) % 200 < 16:
                print("  [%s] %d  %.0fs" % (code, len(done), time.time() - started), flush=True)
        path = os.path.join(OUT_DIR, "fix-%s.json" % code)
        if os.path.exists(path):
            try:
                prev = json.load(open(path, encoding="utf-8"))
                prev.update(done)
                done = prev
            except Exception:
                pass
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(done, f, ensure_ascii=False, indent=0, sort_keys=True)
            f.write("\n")
        print("[%s] 写出 %d 条 -> %s (%.0fs)" % (code, len(done), path, time.time() - started), flush=True)


if __name__ == "__main__":
    sys.exit(main())
