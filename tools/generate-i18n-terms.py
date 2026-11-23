# -*- coding: utf-8 -*-
"""从 GitHub 开源上游机械提取「中文 UI/术语 -> en/de/ru」词条。

只做提取与配对，不生成任何译文：
  - openfoodfacts/openfoodfacts-server  po/common/*.po、po/tags/*.po、taxonomies/*.txt
  - wger-project/wger                  已有 src/locales/wger-*.json（AGPL-3.0 gettext）
  - 已有 src/locales/extra-*.json      wger / OFF 专名映射
输出：src/locales/ui-{en,de,ru}.json，仅保留在本站源码中文语料中出现过的条目。

用法：GH_TOKEN=<github pat> python tools/generate-i18n-terms.py
无网络时可复用 %TEMP%/xw_off_src 下的缓存。
"""
import base64
import collections
import glob
import json
import os
import re
import sys
import tempfile
import urllib.request

WD = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API = "https://api.github.com"
OFF = "openfoodfacts/openfoodfacts-server"
TOKEN = os.environ.get("GH_TOKEN", "")
CACHE = os.path.join(tempfile.gettempdir(), "xw_off_src")
os.makedirs(CACHE, exist_ok=True)


def api(path):
    req = urllib.request.Request(
        API + path,
        headers={
            "Authorization": "Bearer " + TOKEN,
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "xw-i18n-terms",
        },
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read())


def fetch(repo, path):
    key = re.sub(r"[^A-Za-z0-9._-]", "_", repo + "_" + path)
    local = os.path.join(CACHE, key)
    if os.path.exists(local) and os.path.getsize(local) > 0:
        return open(local, encoding="utf-8").read()
    meta = api("/repos/%s/contents/%s" % (repo, path))
    if isinstance(meta, dict) and meta.get("encoding") == "base64" and "content" in meta:
        text = base64.b64decode(meta["content"]).decode("utf-8", "replace")
    else:
        blob = api("/repos/%s/git/blobs/%s" % (repo, meta["sha"]))
        text = base64.b64decode(blob["content"]).decode("utf-8", "replace")
    with open(local, "w", encoding="utf-8") as f:
        f.write(text)
    return text


def parse_po(text):
    """返回 [(msgctxt, msgid, msgstr)]，支持多行字符串。"""
    out, cur, field = [], {}, None
    keys = {"msgctxt": "ctxt", "msgid": "msgid", "msgstr": "msgstr"}
    for line in text.splitlines() + [""]:
        line = line.rstrip()
        if not line.strip():
            if cur.get("msgid"):
                out.append((cur.get("ctxt", ""), cur["msgid"], cur.get("msgstr", "")))
            cur, field = {}, None
            continue
        if line.startswith("#"):
            continue
        m = re.match(r'^(msgctxt|msgid|msgstr|msgid_plural|msgstr\[\d+])\s+"(.*)"\s*$', line)
        if m:
            tag, val = m.group(1), m.group(2)
            field = tag if tag in keys else None
            if field:
                cur[keys[field]] = cur.get(keys[field], "") + val
            continue
        m = re.match(r'^"(.*)"\s*$', line)
        if m and field:
            cur[keys[field]] = cur.get(keys[field], "") + m.group(1)
    return out


def usable(key, val):
    if not key or not val:
        return False
    if len(key) > 90 or len(val) > 120:
        return False
    # 占位符 / 模板 / HTML 会让静态替换破坏结构
    if re.search(r"%[sd]|%\(|\{\{?\w|<[^>]+>|\\n|\$\{", key + val):
        return False
    return key != val


TAXONOMIES = (
    "nutrients.txt", "minerals.txt", "amino_acids.txt", "labels.txt", "units.txt",
    "states.txt", "food_groups.txt", "allergens.txt", "ingredients_processing.txt",
    "additives_classes.txt", "other_nutritional_substances.txt", "nova_groups.txt",
    "data_quality.txt", "countries.txt", "languages.txt", "packaging_shapes.txt",
    "packaging_materials.txt", "storage_conditions.txt", "preservation.txt",
    "periods_after_opening.txt", "sizes.txt",
)
PO_FILES = (
    ("common", "zh", "zh.po"), ("common", "zh", "zh_CN.po"), ("common", "de", "de.po"),
    ("common", "ru", "ru.po"), ("tags", "zh", "zh_CN.po"), ("tags", "de", "de.po"),
    ("tags", "ru", "ru.po"),
)


def collect():
    terms = collections.defaultdict(dict)
    po = {}
    print("[1/4] 下载 OFF gettext PO")
    for sub, lang, fn in PO_FILES:
        entries = parse_po(fetch(OFF, "po/%s/%s" % (sub, fn)))
        po.setdefault((sub, lang), []).extend(entries)
        print("  po/%s/%-10s %5d entries" % (sub, fn, len(entries)))
    for sub in ("common", "tags"):
        zh = po[(sub, "zh")]
        de = {(c, m): s for c, m, s in po[(sub, "de")]}
        ru = {(c, m): s for c, m, s in po[(sub, "ru")]}
        for ctxt, msgid, zh_str in zh:
            if not usable(msgid, zh_str) or not re.search(r"[\u4e00-\u9fff]", zh_str):
                continue
            key = zh_str.strip()
            if msgid.strip():
                terms[key]["en"] = msgid.strip()
            for lang, table in (("de", de), ("ru", ru)):
                val = table.get((ctxt, msgid))
                if val and usable(msgid, val):
                    terms[key].setdefault(lang, val.strip())
    print("  OFF PO 词条 %d" % len(terms))

    print("[2/4] 下载 OFF taxonomies")
    for name in TAXONOMIES:
        text = fetch(OFF, "taxonomies/" + name)
        for block in re.split(r"\n\s*\n", text):
            langs = {}
            for line in block.splitlines():
                m = re.match(r"^([a-z]{2}):\s*(.+)$", line.strip())
                if m and m.group(1) in ("en", "de", "ru", "zh"):
                    langs.setdefault(m.group(1), [x.strip() for x in m.group(2).split(",") if x.strip()])
            if "zh" not in langs or "en" not in langs:
                continue
            rec = {"en": langs["en"][0]}
            for lang in ("de", "ru"):
                if langs.get(lang):
                    rec[lang] = langs[lang][0]
            for zh_syn in langs["zh"]:
                if not usable(zh_syn, rec["en"]):
                    continue
                for lang, val in rec.items():
                    terms[zh_syn].setdefault(lang, val)
        print("  %-34s %7d bytes" % (name, len(text)))
    print("  OFF taxonomy 累计词条 %d" % len(terms))

    print("[3/4] 合并 wger 与已有专名词条")
    zh = json.load(open(os.path.join(WD, "src/locales/wger-zh-Hans.json"), encoding="utf-8"))
    de = json.load(open(os.path.join(WD, "src/locales/wger-de.json"), encoding="utf-8"))
    ru = json.load(open(os.path.join(WD, "src/locales/wger-ru.json"), encoding="utf-8"))
    for en, zh_str in zh.items():
        if not usable(en, zh_str) or not re.search(r"[\u4e00-\u9fff]", zh_str):
            continue
        key = zh_str.strip()
        terms[key]["en"] = en.strip()
        for lang, table in (("de", de), ("ru", ru)):
            if en in table and usable(en, table[en]):
                terms[key].setdefault(lang, table[en].strip())
    packs = {
        "en": json.load(open(os.path.join(WD, "src/locales/extra-en.json"), encoding="utf-8")),
        "de": json.load(open(os.path.join(WD, "src/locales/extra-de.json"), encoding="utf-8")),
        "ru": json.load(open(os.path.join(WD, "src/locales/extra-ru.json"), encoding="utf-8")),
    }
    for lang, pack in packs.items():
        for section, mapping in pack.items():
            for key, val in mapping.items():
                terms[key].setdefault(lang, val)

    # 项目自带的英文名（不是译文，是数据里本来就有的英文字段）：
    # 食物中文名 -> FOOD_NAME_EN；动作中文名 -> name / nameZh 字段。
    food_src = open(os.path.join(WD, "src/data/foods/food-names-en.ts"), encoding="utf-8").read()
    for zh_name, en_name in re.findall(r"'([^']+)':\s*'([^']+)'", food_src):
        if usable(zh_name, en_name):
            terms[zh_name].setdefault("en", en_name)
    for rel in ("src/data/exercises-ext.json", "src/data/exercises-db.json"):
        rows = json.load(open(os.path.join(WD, rel), encoding="utf-8"))
        for row in rows:
            zh_name, en_name = row.get("nameZh"), row.get("name")
            if zh_name and en_name and usable(zh_name, en_name):
                terms[zh_name].setdefault("en", en_name)
    # fitwill 的 name 是 slug 标识（非展示用英文名），不纳入译文。
    print("  合并后 %d 条" % len(terms))
    return terms


def corpus():
    """本站源码中的中文语料（含长句），用于过滤无效词条。"""
    texts = []
    for path in glob.glob(os.path.join(WD, "src", "**", "*.ts"), recursive=True) + glob.glob(
        os.path.join(WD, "src", "**", "*.tsx"), recursive=True
    ):
        rel = os.path.relpath(path, WD).replace("\\", "/")
        # 数据文件里的食物名 / 动作中文名 / 提示语同样会在页面上渲染，必须纳入语料
        if rel.startswith("src/locales/") or ".test." in rel:
            continue
        text = open(path, encoding="utf-8").read()
        text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
        text = re.sub(r"//[^\n]*", "", text)
        texts.append(text)
    return texts


def short_fragments(texts):
    frags = collections.Counter()
    for text in texts:
        for m in re.finditer(r"['\"`]([^'\"`\n]*[\u4e00-\u9fff][^'\"`\n]*)['\"`]", text):
            s = m.group(1).strip()
            if 1 <= len(s) <= 30 and not re.search(r"[{}<>]|\\n|\$\{", s):
                frags[s] += 1
        for m in re.finditer(r">\s*([^<>{}\n]*[\u4e00-\u9fff][^<>{}\n]*?)\s*<", text):
            s = m.group(1).strip()
            if 1 <= len(s) <= 30 and not re.search(r"\$\{|//", s):
                frags[s] += 1
    return frags


def main():
    terms = collect()
    texts = corpus()
    joined = "\n".join(texts)
    frags = short_fragments(texts)
    print("[4/4] 按本站语料过滤并输出")
    kept = {}
    for key, val in terms.items():
        if not re.search(r"[\u4e00-\u9fff]", key) or len(key) > 40:
            continue
        if key not in joined:
            continue
        kept[key] = val
    for lang in ("en", "de", "ru"):
        out = {k: v[lang] for k, v in kept.items() if v.get(lang)}
        path = os.path.join(WD, "src/locales/ui-%s.json" % lang)
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            json.dump(out, f, ensure_ascii=False, indent=2, sort_keys=True)
            f.write("\n")
        hit = sum(c for s, c in frags.items() if s in out)
        print("  ui-%-2s.json %5d 条 %7d bytes  短片段精确命中 %d/%d (%.1f%%)" % (
            lang, len(out), os.path.getsize(path), hit, sum(frags.values()),
            100.0 * hit / max(1, sum(frags.values()))))
    # 短语级覆盖：短片段内按最长匹配可译出的中文字符比例
    for lang in ("en", "de", "ru"):
        out = {k: v for k, v in kept.items() if v.get(lang)}
        keys = sorted(out, key=len, reverse=True)
        total = covered = 0
        for frag, count in frags.items():
            zh_chars = len(re.findall(r"[\u4e00-\u9fff]", frag))
            if not zh_chars:
                continue
            tmp = frag
            got = 0
            for key in keys:
                if len(key) < 2 or key not in tmp:
                    continue
                got += len(re.findall(r"[\u4e00-\u9fff]", key)) * tmp.count(key)
                tmp = tmp.replace(key, " " * len(key))
            total += zh_chars * count
            covered += min(zh_chars, got) * count
        print("  %-2s 短语级中文字符覆盖 %.1f%%" % (lang, 100.0 * covered / max(1, total)))
    print("样本：")
    for key in ("保存", "取消", "钾", "铁", "钙", "臀部", "大腿", "卧推", "蛋白质", "重量"):
        if key in kept:
            print("  %-8s %s" % (key, json.dumps(kept[key], ensure_ascii=False)))


if __name__ == "__main__":
    main()
