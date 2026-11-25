// 提取源码中文文本节点，找出三语词典都未收录的漏翻文案
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== 'node_modules' && e.name !== 'locales') walk(p, out);
    } else if (/\.(tsx|ts)$/.test(e.name)) out.push(p);
  }
  return out;
}
const ZH = /[\u4e00-\u9fff]/;
const files = walk(path.join(process.cwd(), 'src'));
const found = new Map(); // text -> Set(files)
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  if (!ZH.test(src)) continue;
  let code;
  try {
    code = esbuild.transformSync(src, { loader: f.endsWith('.tsx') ? 'tsx' : 'ts', jsx: 'automatic' }).code;
  } catch { continue; }
  const strRe = /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g;
  let m;
  while ((m = strRe.exec(code))) {
    let s = m[2];
    try { if (m[1] !== '`') s = JSON.parse('"' + s.replace(/"/g, '\\"') + '"'); } catch {}
    if (!ZH.test(s)) continue;
    if (s.length > 300) continue;
    if (/import |export |from |require\(|=>|function |return |\$\{/.test(s)) continue;
    if (!found.has(s)) found.set(s, new Set());
    found.get(s).add(path.relative(process.cwd(), f));
  }
}
const dict = {};
for (const lang of ['de', 'ru', 'en']) {
  dict[lang] = {};
  for (const p of ['ui', 'fix', 'mt', 'extra'].map((n) => `src/locales/${n}-${lang}.json`)) {
    if (fs.existsSync(p)) Object.assign(dict[lang], JSON.parse(fs.readFileSync(p, 'utf8')));
  }
}
const missing = [];
for (const [s, fs_] of found) {
  const key = s.trim();
  if (!key || key.length < 2) continue;
  if (dict.de[key] || dict.ru[key] || dict.en[key]) continue;
  missing.push({ text: key, files: [...fs_] });
}
missing.sort((a, b) => b.text.length - a.text.length);
fs.writeFileSync('tools/zh-missing.json', JSON.stringify(missing, null, 2));
console.log('源码中文文本节点总数:', found.size);
console.log('词典完全未收录:', missing.length);
console.log('=== 前 120 条 ===');
missing.slice(0, 120).forEach((x, i) => console.log(String(i).padStart(3), x.text.slice(0, 130)));
