// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
/**
 * 全站实时文本层：把未接入 t() / i18n-pack 的中文短文案、标签、专名按语言切换。
 *
 * 词条只来自 src/locales/ui-{en,de,ru}.json（由 tools/generate-i18n-terms.py
 * 从 GitHub 开源上游机械提取：OFF gettext PO / taxonomies、wger .po 与专名映射，
 * 另加项目数据里本来就有的英文字段）。本站不自行撰写任何译文。
 *
 * 覆盖范围（刻意保守）：
 *  - 文本节点整段命中词典 → 整段替换；
 *  - 不超过 MAX_INLINE 字的短节点 → 按最长匹配替换其中收录的词；
 *  - 更长的正文段落保留中文，避免把长句翻成中德 / 中俄混杂；
 *  - placeholder / title / aria-label / alt 属性同上。
 * 切换语言时先回滚到原文再按新词典重译；MutationObserver 负责 React 异步渲染
 * 与路由切换后新增的节点，因此不需要每个页面单独订阅语言变化。
 */
import { getLang, onLangChange, type Lang } from './i18n';

type Dict = Record<string, string>;
type TargetLang = Exclude<Lang, 'zh'>;

const loaders: Record<TargetLang, () => Promise<Dict>> = {
  en: () => import('@/locales/ui-en.json').then((m) => m.default as Dict),
  de: () => import('@/locales/ui-de.json').then((m) => m.default as Dict),
  ru: () => import('@/locales/ui-ru.json').then((m) => m.default as Dict),
};

const ATTRS = ['placeholder', 'title', 'aria-label', 'alt'] as const;
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT', 'PRE', 'CODE']);
const MAX_INLINE = 24;
const HAS_ZH = /[\u4e00-\u9fff]/;

let dict: Dict = {};
let pattern: RegExp | null = null;
let activeLang: Lang = getLang();
let started = false;
let observer: MutationObserver | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
let generation = 0;
let pending: MutationRecord[] = [];

const originalText = new Map<Text, string>();
const appliedText = new Map<Text, string>();
const originalAttrs = new Map<Element, Partial<Record<(typeof ATTRS)[number], string>>>();

/** 纯函数：供单元测试与运行时共用。按最长匹配替换，短节点才做词级替换。 */
export function translateText(source: string, table: Dict, re: RegExp | null): string {
  if (!HAS_ZH.test(source) || !re) return source;
  const trimmed = source.trim();
  if (table[trimmed]) return source.replace(trimmed, table[trimmed]);
  if (source.length > MAX_INLINE) return source;
  re.lastIndex = 0;
  return source.replace(re, (match) => table[match] ?? match);
}

/**
 * 纯函数：把词典编译为按长度降序的最长匹配正则。
 * 单字条目（钾 / 铁 / 克 / 组…）只在前后都不是汉字时命中，
 * 避免把「其中」「生前」「水」这类语法字当成营养素 / 单位误译。
 */
export function buildPattern(table: Dict): RegExp | null {
  const keys = Object.keys(table)
    .filter((k) => k.length >= 1)
    .sort((a, b) => b.length - a.length || a.localeCompare(b));
  if (!keys.length) return null;
  const escape = (k: string) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = keys.map((k) => {
    const word = escape(k);
    return k.length === 1
      ? `(?<![\\u4e00-\\u9fff])${word}(?![\\u4e00-\\u9fff])`
      : word;
  });
  try {
    return new RegExp(parts.join('|'), 'g');
  } catch {
    // 老浏览器不支持 lookbehind：退回只用多字词，不影响其余词条
    const safe = keys.filter((k) => k.length >= 2).map(escape);
    return safe.length ? new RegExp(safe.join('|'), 'g') : null;
  }
}

function skip(element: Element | null): boolean {
  let node: Element | null = element;
  while (node && node !== document.body) {
    if (SKIP_TAGS.has(node.tagName) || node.hasAttribute('data-i18n-skip')) return true;
    if ((node as HTMLElement).isContentEditable) return true;
    node = node.parentElement;
  }
  return false;
}

function applyText(node: Text): void {
  const current = node.nodeValue ?? '';
  // React 或业务代码重写了节点内容时，把新的中文当作原文，避免用旧译文覆盖。
  const last = appliedText.get(node);
  if (last !== undefined && current !== last) {
    originalText.delete(node);
    appliedText.delete(node);
  }
  const source = originalText.get(node) ?? current;
  if (!HAS_ZH.test(source)) return;
  const output = translateText(source, dict, pattern);
  if (output === current) {
    if (output !== source) appliedText.set(node, output);
    return;
  }
  if (!originalText.has(node)) originalText.set(node, source);
  node.nodeValue = output;
  appliedText.set(node, output);
}

function applyAttrs(element: Element): void {
  for (const attr of ATTRS) {
    const value = element.getAttribute(attr);
    if (!value) continue;
    const record = originalAttrs.get(element) ?? {};
    if (!HAS_ZH.test(value)) {
      // 外部写入的新文案：清掉旧原文，下一轮按新值处理
      if (record[attr] && value !== translateText(record[attr], dict, pattern)) delete record[attr];
      else continue;
    }
    if (!record[attr]) {
      record[attr] = value;
      originalAttrs.set(element, record);
    }
    const output = translateText(record[attr]!, dict, pattern);
    if (output !== value) element.setAttribute(attr, output);
  }
}

function walk(root: Node): void {
  if (root.nodeType === Node.TEXT_NODE) {
    const parent = (root as Text).parentElement;
    if (parent && !skip(parent)) applyText(root as Text);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!HAS_ZH.test(node.nodeValue ?? '')) return NodeFilter.FILTER_REJECT;
      if (skip(node.parentElement)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  while (walker.nextNode()) applyText(walker.currentNode as Text);
  const element = root as Element;
  if (element.nodeType === Node.ELEMENT_NODE) {
    if (!skip(element)) applyAttrs(element);
    element.querySelectorAll('*').forEach((child) => { if (!skip(child)) applyAttrs(child); });
  }
}

function restore(): void {
  for (const [node, source] of originalText) {
    if (node.isConnected && node.nodeValue !== source) node.nodeValue = source;
  }
  for (const [element, record] of originalAttrs) {
    if (!element.isConnected) continue;
    for (const [attr, source] of Object.entries(record)) {
      if (source && element.getAttribute(attr) !== source) element.setAttribute(attr, source);
    }
  }
  originalText.clear();
  appliedText.clear();
  originalAttrs.clear();
}

async function refresh(lang: Lang): Promise<void> {
  const ticket = ++generation;
  if (lang === 'zh') {
    suspendObserver();
    pending = [];
    restore();
    dict = {};
    pattern = null;
    activeLang = lang;
    resumeObserver();
    return;
  }
  const table = await loaders[lang]();
  if (ticket !== generation) return; // 语言又切了一次，丢弃过期结果
  suspendObserver();
  pending = [];
  restore();
  dict = table;
  pattern = buildPattern(table);
  activeLang = lang;
  walk(document.body);
  resumeObserver();
}

function suspendObserver(): void {
  observer?.disconnect();
  if (timer) { clearTimeout(timer); timer = undefined; }
}

function resumeObserver(): void {
  observer?.takeRecords();
  observer?.observe(document.body, {
    childList: true, subtree: true, characterData: true,
    attributes: true, attributeFilter: [...ATTRS],
  });
}

function flush(): void {
  suspendObserver();
  const records = pending;
  pending = [];
  if (activeLang !== 'zh' && pattern) {
    for (const record of records) {
      if (record.type === 'childList') {
        record.addedNodes.forEach((node) => { if (node.isConnected) walk(node); });
      } else if (record.type === 'characterData' && record.target.isConnected) {
        applyText(record.target as Text);
      } else if (record.type === 'attributes' && record.target.isConnected) {
        applyAttrs(record.target as Element);
      }
    }
  }
  resumeObserver();
}

/** 应用启动时调用一次；幂等。切换语言由内部订阅处理。 */
export function startDomI18n(): void {
  if (started || typeof document === 'undefined' || !document.body) return;
  started = true;
  observer = new MutationObserver((records) => {
    pending.push(...records);
    if (timer) clearTimeout(timer);
    timer = setTimeout(flush, 60);
  });
  // 语言切换：全站回滚后按新词典重译，无需刷新页面
  onLangChange(() => { void refresh(getLang()); });
  void refresh(activeLang);
}
