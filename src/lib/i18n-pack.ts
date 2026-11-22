// 雄性意志（Xiongzhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// EXPORTS: preloadI18nPack, localizeTerm, localizeFoodName, useI18nPack
/**
 * 开源多语言拓展包接入层（不自行翻译任何词条）。
 *
 * 词条来源：wger-project/wger 的 gettext 语言包，AGPL-3.0，
 *   https://github.com/wger-project/wger/tree/master/wger/locale
 *   de / ru / zh_Hans 各 600+ 条健身与营养 UI 术语（Exercises、Muscles、
 *   Protein、Fat、Carbohydrates、Sets、Reps、Weight、Search…）。
 * 原始 .po 经机械提取为 JSON 存于 src/locales/wger-*.json，译文逐条来自上游，
 * 本站未改写；未收录的专有名词（动作名、食物名、文章）按原文回退。
 * 英语无需语言包：上游 msgid 本身即英文。
 *
 * 合规：wger 为 AGPL-3.0；此处仅引用其翻译数据文件并在 NOTICE 署名，
 * 未引入其程序代码。若本项目后续商用，需由法务复核 AGPL 数据兼容性。
 *
 * 性能：三份 JSON 走动态 import，不进首屏主 chunk；仅当前语言加载一次。
 */
import { useEffect, useState } from 'react';
import { getLang, onLangChange, type Lang } from './i18n';
import { FOOD_NAME_EN } from '@/data/foods/food-names-en';

type Pack = Record<string, string>;
type PackLang = Exclude<Lang, 'en'>;

const cache: Partial<Record<PackLang, Pack>> = {};
const pending: Partial<Record<PackLang, Promise<void>>> = {};

const loaders: Record<PackLang, () => Promise<Pack>> = {
  zh: () => import('@/locales/wger-zh-Hans.json').then((m) => m.default as Pack),
  de: () => import('@/locales/wger-de.json').then((m) => m.default as Pack),
  ru: () => import('@/locales/wger-ru.json').then((m) => m.default as Pack),
};

/** 预加载当前语言包；重复调用复用同一 Promise，失败静默回退。 */
export function preloadI18nPack(lang: Lang = getLang()): Promise<void> {
  if (lang === 'en' || cache[lang]) return Promise.resolve();
  if (!pending[lang]) {
    pending[lang] = loaders[lang]()
      .then((pack) => { cache[lang] = pack; })
      .catch(() => { /* 离线/加载失败：全部回退原文 */ });
  }
  return pending[lang]!;
}

/**
 * 本地化一个 UI 词条。
 * @param key        wger 语言包里的英文 msgid
 * @param fallbackZh 中文环境原词（也是包未加载时的兜底）
 */
export function localizeTerm(key: string, fallbackZh: string, lang: Lang = getLang()): string {
  if (lang === 'zh') return fallbackZh;
  if (lang === 'en') return key; // 上游 msgid 本身即英文
  return cache[lang]?.[key] ?? key;
}

/** 食物名：中文原名 / 英文映射包 / 德俄无对应词条时回退中文。 */
export function localizeFoodName(name: string, lang: Lang = getLang()): string {
  if (lang === 'zh') return name;
  if (lang === 'en') return FOOD_NAME_EN[name] ?? name;
  return name;
}

/**
 * 在组件里调用：订阅语言切换 + 触发语言包加载 + 加载完成后重渲染。
 * 顺带修复「切换语言后已挂载页面不刷新文案」的问题。
 */
export function useI18nPack(): Lang {
  const [lang, setLangState] = useState<Lang>(getLang());
  const [, setReady] = useState(0);

  useEffect(() => onLangChange(() => setLangState(getLang())), []);
  useEffect(() => {
    let alive = true;
    void preloadI18nPack(lang).then(() => { if (alive) setReady((v) => v + 1); });
    return () => { alive = false; };
  }, [lang]);

  return lang;
}
