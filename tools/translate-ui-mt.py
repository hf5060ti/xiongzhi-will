#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
从本项目源码机械抽取中文可见文案，用开源离线翻译模型 NLLB-200-distilled-600M
（CTranslate2 int8 量化版）翻译为 en / de / ru，输出静态词条 JSON。

模型与许可
  模型: JustFrederik/nllb-200-distilled-600M-ct2-int8 （基于 facebook/nllb-200-distilled-600M）
  许可: CC BY-NC 4.0 —— 非商业使用。译文仅用于本项目（免费开源、非商业）UI 展示，
        商用前必须替换为可商用译源。详见 NOTICE。

依赖（隔离 venv）
  pip install ctranslate2==4.9.1 sentencepiece==0.2.3

用法
  python tools/translate-ui-mt.py --model <模型目录> [--venv <python.exe>]
  断点续跑：每条译文即时写入临时缓存；重跑时自动跳过已翻译条目。

本站不自行撰写译文：所有输出均为开源模型预测值，需人工抽检。
"""
import argparse
import glob
import json
import os
import re
import sys
import time

WD = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(WD, "src", "locales")
MAX_CHARS = 200
LANGS = (("en", "eng_Latn"), ("de", "deu_Latn"), ("ru", "rus_Cyrl"))
ZH = re.compile(r"[\u4e00-\u9fff]")
NOISE = re.compile(
    r"\$\{|[{}<>]|\\n|https?://|\.replace|\.split|\.match|=>|"
    r"\bfunction\b|\breturn\b|\bconst\b|\bimport\b|/\\|\\s\+|`",
)
CODE_TOKEN = re.compile(r"[A-Za-z_][A-Za-z0-9_]{2,}")


def extract() -> list[str]:
    """抽取源码中的中文字符串字面量与 JSX 文本节点；排除测试与已有词库。"""
    found: set[str] = set()
    paths = (
        glob.glob(os.path.join(WD, "src", "**", "*.ts"), recursive=True)
        + glob.glob(os.path.join(WD, "src", "**", "*.tsx"), recursive=True)
    )
    for path in paths:
        rel = os.path.relpath(path, WD).replace("\\", "/")
        if rel.startswith("src/locales/") or ".test." in rel:
            continue
        text = re.sub(r"/\*.*?\*/", "", open(path, encoding="utf-8").read(), flags=re.S)
        text = re.sub(r"//[^\n]*", "", text)
        for m in re.finditer(
            r"(['\"`])((?:\\\1|(?!\1).)*[\u4e00-\u9fff](?:\\\1|(?!\1).)*?)\1", text, re.S
        ):
            s = m.group(2).strip()
            if usable(s):
                found.add(s)
        if path.endswith(".tsx"):
            for m in re.finditer(r">\s*([^<>{}\n]*[\u4e00-\u9fff][^<>{}\n]*?)\s*<", text):
                s = m.group(1).strip()
                if usable(s):
                    found.add(s)
    return sorted(found)


def usable(s: str) -> bool:
    if not s or len(s) > MAX_CHARS or not ZH.search(s):
        return False
    # 代码块 / 正则 / 多行文档不是界面文案，交给源码本身不翻译
    if "\n" in s or ");" in s or "if (" in s or s.count("/") >= 2:
        return False
    if NOISE.search(s):
        return False
    # 代码标识符 / 正则片段通常 ASCII 远多于汉字，不是面向用户的文案
    if len(CODE_TOKEN.findall(s)) > len(ZH.findall(s)):
        return False
    return True


REPEAT = re.compile(r"\b(\w+)\b(?:\s+\1){3,}", re.I)
BAD_CHAR = re.compile(r"[\ufffd\u2047\uff1f]")


def acceptable(src: str, out: str) -> bool:
    """确定性过滤模型幻觉：未知字符、残留中文、重复词、异常长度。"""
    if not out or BAD_CHAR.search(out) or ZH.search(out):
        return False
    if REPEAT.search(out):
        return False
    if "\n" in src or ");" in src or "if (" in src or src.count("/") >= 2:
        return False
    # 单字 / 标点碎片交给开源人工词条与词级替换，机翻不可靠
    if len(src) <= 2 or src[0] in ",:'\"[]()[]" or src[-1] in ",:'\"[]()":
        return False
    if len(out) > max(80, 4 * len(src)):
        return False
    if len(src) <= 2 and len(out) > 16:
        return False
    return True


def clean_outputs() -> None:
    """对已生成的 mt-*.json 重新执行过滤，便于增量修正。"""
    for code, _ in LANGS:
        path = os.path.join(OUT_DIR, "mt-%s.json" % code)
        if not os.path.exists(path):
            continue
        data = json.load(open(path, encoding="utf-8"))
        kept = {s: t for s, t in data.items() if acceptable(s, t)}
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(kept, f, ensure_ascii=False, indent=0, sort_keys=True)
            f.write("\n")
        print("[%s] 过滤 %d → %d 条" % (code, len(data), len(kept)), flush=True)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", help="CT2 量化模型目录（--clean 时不需要）")
    ap.add_argument("--clean", action="store_true", help="只过滤已有 mt-*.json")
    ap.add_argument("--batch", type=int, default=24, help="每批句数，默认 24")
    args = ap.parse_args()
    if args.clean:
        clean_outputs()
        return
    if not args.model:
        ap.error("需要 --model 或 --clean")

    import ctranslate2
    import sentencepiece

    strings = extract()
    print("待译中文字符串 %d 条，字符 %d" % (len(strings), sum(map(len, strings))), flush=True)

    sp = sentencepiece.SentencePieceProcessor(
        model_file=os.path.join(args.model, "sentencepiece.bpe.model")
    )
    translator = ctranslate2.Translator(
        args.model, device="cpu", compute_type="int8", inter_threads=4, intra_threads=4
    )
    cache_dir = os.path.join(os.environ.get("TEMP", "/tmp"), "xw_mt_cache")
    os.makedirs(cache_dir, exist_ok=True)

    for code, lang_tag in LANGS:
        cache_path = os.path.join(cache_dir, "mt-%s.json" % code)
        cache: dict[str, str] = {}
        if os.path.exists(cache_path):
            cache = json.load(open(cache_path, encoding="utf-8"))
        todo = [s for s in strings if s not in cache]
        print("[%s] 缓存 %d，待译 %d" % (code, len(cache), len(todo)), flush=True)
        if not todo:
            continue
        # 按 token 长度分桶，减少 padding 浪费；桶内保持原顺序便于阅读
        buckets: dict[int, list[str]] = {}
        for s in todo:
            n = len(sp.encode(s, out_type=str))
            key = min((n // 16) * 16, 128)
            buckets.setdefault(key, []).append(s)
        started = time.time()
        done = 0
        for key in sorted(buckets):
            items = buckets[key]
            for i in range(0, len(items), args.batch):
                chunk = items[i : i + args.batch]
                src = [sp.encode(s, out_type=str) + ["</s>"] for s in chunk]
                result = translator.translate_batch(
                    src,
                    target_prefix=[[lang_tag]] * len(src),
                    beam_size=1,
                    max_decoding_length=max(24, key + 32),
                    max_batch_size=args.batch,
                )
                for s, r in zip(chunk, result):
                    tokens = r.hypotheses[0]
                    if tokens and tokens[0] == lang_tag:
                        tokens = tokens[1:]
                    translated = sp.decode(tokens).strip()
                    if translated != s and acceptable(s, translated):
                        cache[s] = translated
                    else:
                        # 记下占位，避免下次重跑时反复翻译同一条坏样本
                        cache[s] = ''
                done += len(chunk)
                with open(cache_path, "w", encoding="utf-8", newline="\n") as f:
                    json.dump(cache, f, ensure_ascii=False, indent=0, sort_keys=True)
                if done % 600 < len(chunk):
                    print(
                        "  [%s] %d/%d  %.0fs" % (code, done, len(todo), time.time() - started),
                        flush=True,
                    )
        out_path = os.path.join(OUT_DIR, "mt-%s.json" % code)
        with open(out_path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(cache, f, ensure_ascii=False, indent=0, sort_keys=True)
            f.write("\n")
        print("[%s] 写出 %s 共 %d 条，用时 %.0fs" % (code, out_path, len(cache), time.time() - started), flush=True)


if __name__ == "__main__":
    sys.exit(main())
