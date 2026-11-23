// 雄性意志（Xiongzhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// EXPORTS: preloadI18nPack, preloadExtraPack, localizeTerm, localizeFoodName, localizeExerciseName, useI18nPack
/**
 * 开源多语言拓展包接入层（本站不自行翻译任何词条）。
 *
 * 词条来源（全部为 GitHub 开源仓库，机械提取、逐条来自上游）：
 *  1) UI 词条：wger-project/wger (AGPL-3.0) 的 wger/locale gettext .po
 *     → src/locales/wger-{de,ru,zh-Hans}.json（各 600+ 条）。
 *  2) 食物名：openfoodfacts/openfoodfacts-server 的
 *     taxonomies/food/{ingredients,categories}.txt 中 en/de/ru/zh 同义词
 *     → src/locales/extra-{en,de,ru}.json 的 food 字段。
 *  3) 动作名：wger (AGPL-3.0) 的 wger/exercises/fixtures/translations.json
 *     + wger/core/fixtures/languages.json；按英文动作名精确 / 同词集合匹配
 *     → extra-{de,ru}.json 的 exercise 字段，器械词冲突条目已确定性过滤。
 *  4) 英文食物名另有本项目既有 FOOD_NAME_EN 映射，优先级高于上游词条。
 *
 * 匹配规则确定、无人工翻译；上游为社区译文，未经人工校对，可能含上位词 / 近似
 * （如口味细分回退到基础食材名）。未命中一律回退：de/ru 食物名 → 英文 → 中文，
 * 动作名 → 英文原名，zh → 中文原名。出处与许可详见 NOTICE。
 *
 * 性能：所有 JSON 走动态 import，独立 chunk，不进首屏主 chunk；仅当前语言加载一次。
 */
import { useEffect, useState } from 'react';
import { getLang, onLangChange, type Lang } from './i18n';
import { FOOD_NAME_EN } from '@/data/foods/food-names-en';

type Pack = Record<string, string>;
type PackLang = Exclude<Lang, 'en'>;
type ExtraPack = { food?: Record<string, string>; exercise?: Record<string, string> };

const cache: Partial<Record<PackLang, Pack>> = {};
const pending: Partial<Record<PackLang, Promise<void>>> = {};
const extraCache: Partial<Record<Lang, ExtraPack>> = {};
const extraPending: Partial<Record<Lang, Promise<void>>> = {};

const loaders: Record<PackLang, () => Promise<Pack>> = {
  zh: () => import('@/locales/wger-zh-Hans.json').then((m) => m.default as Pack),
  de: () => import('@/locales/wger-de.json').then((m) => m.default as Pack),
  ru: () => import('@/locales/wger-ru.json').then((m) => m.default as Pack),
};

const extraLoaders: Record<Lang, () => Promise<ExtraPack>> = {
  zh: () => Promise.resolve({}),
  en: () => import('@/locales/extra-en.json').then((m) => m.default as ExtraPack),
  de: () => import('@/locales/extra-de.json').then((m) => m.default as ExtraPack),
  ru: () => import('@/locales/extra-ru.json').then((m) => m.default as ExtraPack),
};

/** 预加载 wger UI 词条；重复调用复用同一 Promise，失败静默回退。 */
function preloadWgerPack(lang: Lang): Promise<void> {
  if (lang === 'en' || cache[lang]) return Promise.resolve();
  if (!pending[lang]) {
    pending[lang] = loaders[lang]()
      .then((pack) => { cache[lang] = pack; })
      .catch(() => { /* 离线/加载失败：全部回退原文 */ });
  }
  return pending[lang]!;
}

/** 预加载专名映射（含英文）；失败时置空，全部走回退链。 */
export function preloadExtraPack(lang: Lang = getLang()): Promise<void> {
  if (extraCache[lang]) return Promise.resolve();
  if (!extraPending[lang]) {
    extraPending[lang] = extraLoaders[lang]()
      .then((pack) => { extraCache[lang] = pack; })
      .catch(() => { extraCache[lang] = {}; });
  }
  return extraPending[lang]!;
}

/** 预加载当前语言包（UI 词条 + 专名映射）；de/ru 额外加载英文补名用于回退。 */
export function preloadI18nPack(lang: Lang = getLang()): Promise<void> {
  const tasks = [preloadWgerPack(lang), preloadExtraPack(lang)];
  if (lang === 'de' || lang === 'ru') tasks.push(preloadExtraPack('en'));
  return Promise.all(tasks).then(() => undefined);
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

/** 本项目既有英文名 / 开源词库英文补名，作为 de/ru 未命中时的第一回退。 */
function englishFoodName(name: string): string {
  return FOOD_NAME_EN[name] ?? extraCache.en?.food?.[name] ?? '';
}

/** 食物名：中文原名 / 项目英文映射 / 开源词库译文；未命中逐级回退。 */
export function localizeFoodName(name: string, lang: Lang = getLang()): string {
  if (lang === 'zh') return name;
  if (lang === 'en') return englishFoodName(name) || name;
  const translated = extraCache[lang]?.food?.[name] ?? englishFoodName(name);
  return translated || name;
}

/** 动作名：de/ru 命中开源词库时显示译文，其余一律英文原名；中文名由调用方处理。 */
export function localizeExerciseName(name: string, lang: Lang = getLang()): string {
  if (lang !== 'de' && lang !== 'ru') return name;
  return extraCache[lang]?.exercise?.[name] ?? name;
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
