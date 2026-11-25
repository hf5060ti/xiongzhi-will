// 提取指定页面编译后的中文文本节点（DOM 实际文本片段）
const esbuild = require('esbuild');
const fs = require('fs');

const TARGETS = [
  'src/pages/BodyDataPage/index.tsx',
  'src/pages/NutritionPage/NutritionPage.tsx',
  'src/pages/SourcesPage.tsx',
];
const ZH = /[\u4e00-\u9fff]/;
const out = [];
for (const f of TARGETS) {
  const src = fs.readFileSync(f, 'utf8');
  const code = esbuild.transformSync(src, { loader: 'tsx', jsx: 'automatic' }).code;
  const strRe = /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g;
  let m;
  while ((m = strRe.exec(code))) {
    let s = m[2];
    try { if (m[1] !== '`') s = JSON.parse('"' + s.replace(/"/g, '\\"') + '"'); } catch {}
    if (!ZH.test(s)) continue;
    if (s.length > 400) continue;
    if (/import |export |from |require\(|=>|function |return |\$\{/.test(s)) continue;
    if (!out.some((x) => x.text === s)) out.push({ file: f, text: s });
  }
}
out.sort((a, b) => a.text.localeCompare(b.text, 'zh'));
fs.writeFileSync('tools/page-texts.json', JSON.stringify(out, null, 2));
console.log('共', out.length, '个中文文本节点');
out.forEach((x, i) => console.log(String(i).padStart(3), '[' + x.file.split('/')[2] + ']', JSON.stringify(x.text)));
