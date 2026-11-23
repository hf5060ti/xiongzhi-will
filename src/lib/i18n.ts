// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// 轻量 i18n：字典翻译导航 / 搜索 / 页脚等框架文字（t()）。
// 其余页面的中文短文案由 i18n-dom.ts 的全站实时文本层按语言切换，
// 词条来自 i18n-pack.ts 与 src/locales/ui-*.json 的开源词库（本站不自撰译文）。
// 长正文段落保留中文，避免机翻专名降低可检索性。
// 语言存 localStorage，切换时全站即时生效，无需刷新。

export type Lang = 'zh' | 'en' | 'ru' | 'de';

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

const STORAGE_KEY = 'xw-lang';

let current: Lang = 'zh';
try {
  const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (saved && LANGS.some((l) => l.code === saved)) current = saved;
} catch { /* file:// 桌面版无 localStorage */ }

const listeners = new Set<() => void>();

export function getLang(): Lang { return current; }

export function setLang(l: Lang) {
  current = l;
  try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  listeners.forEach((fn) => fn());
  document.documentElement.lang = l === 'zh' ? 'zh-CN' : l;
}

export function onLangChange(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// 字典：key -> 各语言翻译。缺省回落到中文。
const DICT: Record<Lang, Record<string, string>> = {
  zh: {
    brand: '雄性意志',
    nav_body: '身体', nav_plan: '方案', nav_library: '动作百科', nav_training: '训练',
    nav_nutrition: '营养', nav_bodydata: '数据', nav_coach: 'AI教练',
    nav_strength: '力量',
    nav_tools: '工具', nav_light: '轻盈',
    nav_stomach: '胃部', nav_isometric: '等长', nav_diet: '饮食', nav_mind: '心智',
    nav_career: '事业', nav_wealth: '财富', nav_relation: '关系', nav_skills: '技能',
    nav_wild: '荒野', nav_life: '人生', nav_collect: '收藏',
    nav_group_train: '训练', nav_group_special: '专项', nav_group_life: '生活',
    nav_all: '全部', lang_current: '当前语言',
    login: '登录', logout: '退出登录', cancel: '取消',
    search_ph: '搜索动作 / 食物 / 公式 / 讲解，如「卧推」「牛里脊」「BMR」',
    search_ph_mobile: '搜索动作 / 食物 / 公式 / 讲解',
    search_empty: '没有找到匹配的内容，换个词试试。',
    search_loading: '正在载入搜索索引…',
    search_typing: '输入关键词，可搜动作、食物、公式与饮食讲解。',
    feedback: '反馈 / 提 Bug', github: 'GitHub 仓库', privacy: '隐私政策',
    sources: '内容来源与循证', faq: '关于 / FAQ',
    disclaimer: '本站只提供健康自然的健身方式，不提供任何极端训练或药物方案；请遵守你所在国家 / 地区的法律法规。',
    suitable: '适合健康成年人的力量 / 体能训练与营养参考。慢性病患者、孕期 / 哺乳期女性、老年人、大病初愈者及关节旧伤者，开始训练或调整饮食前请优先遵从医嘱。出现头晕、胸痛、关节刺痛、异常气短时立即停止并就医。',
    lang_settings: '语言 / Language',
    lang_scope: '全站文案与专名按开源词库和离线模型词条实时切换；机器译文为预测值，供参考。未收录的超长正文保留中文，切换无需刷新。',
    type_movement: '动作', type_food: '食物', type_formula: '公式', type_knowledge: '讲解',
  },
  en: {
    brand: 'XiongZhi Will',
    nav_body: 'Body', nav_plan: 'Plan', nav_library: 'Exercises', nav_training: 'Logs',
    nav_nutrition: 'Nutrition', nav_bodydata: 'Stats', nav_coach: 'AI Coach',
    nav_strength: 'Strength',
    nav_tools: 'Tools', nav_light: 'Cutting',
    nav_stomach: 'Gut', nav_isometric: 'Isometric', nav_diet: 'Diet', nav_mind: 'Mind',
    nav_career: 'Career', nav_wealth: 'Wealth', nav_relation: 'Relations', nav_skills: 'Skills',
    nav_wild: 'Wild', nav_life: 'Life', nav_collect: 'Saved',
    nav_group_train: 'Training', nav_group_special: 'Special', nav_group_life: 'Life',
    nav_all: 'All', lang_current: 'Current',
    login: 'Sign in', logout: 'Sign out', cancel: 'Cancel',
    search_ph: 'Search exercises / foods / formulas / notes, e.g. Bench Press, Beef Loin, BMR',
    search_ph_mobile: 'Search exercises, foods, formulas, notes',
    search_empty: 'No matches. Try another keyword.',
    search_loading: 'Loading search index…',
    search_typing: 'Type to search exercises, foods, formulas and nutrition notes.',
    feedback: 'Feedback / Report bug', github: 'GitHub repo', privacy: 'Privacy',
    sources: 'Sources & Evidence', faq: 'About / FAQ',
    disclaimer: 'This site provides only healthy, natural fitness guidance. No extreme training or drugs. Follow your local laws.',
    suitable: 'For healthy adults doing strength / conditioning training. If you have chronic disease, are pregnant / nursing, elderly, recovering from illness, or have old joint injuries, consult a doctor before training or changing diet. Stop immediately and seek help for dizziness, chest pain, joint sharp pain, or unusual shortness of breath.',
    lang_settings: 'Language',
    lang_scope: 'UI text and proper names switch instantly via open-source dictionaries plus offline-model entries. Machine translations are predictions for reference. Unlisted long articles stay in Chinese. No reload needed.',
    type_movement: 'Exercise', type_food: 'Food', type_formula: 'Formula', type_knowledge: 'Note',
  },
  ru: {
    brand: 'XiongZhi Will',
    nav_body: 'Тело', nav_plan: 'План', nav_library: 'Упражнения', nav_training: 'Журнал',
    nav_nutrition: 'Питание', nav_bodydata: 'Данные', nav_coach: 'ИИ-тренер',
    nav_strength: 'Сила',
    nav_tools: 'Тулингс', nav_light: 'Сушка',
    nav_stomach: 'Желудок', nav_isometric: 'Изометрия', nav_diet: 'Диета', nav_mind: 'Разум',
    nav_career: 'Карьера', nav_wealth: 'Деньги', nav_relation: 'Отношения', nav_skills: 'Навыки',
    nav_wild: 'Дикая', nav_life: 'Жизнь', nav_collect: 'Избранное',
    nav_group_train: 'Тренировка', nav_group_special: 'Спецразделы', nav_group_life: 'Жизнь',
    nav_all: 'Все', lang_current: 'Текущий',
    login: 'Войти', logout: 'Выйти', cancel: 'Отмена',
    search_ph: 'Поиск: упражнения / еда / формулы, напр. Жим лёжа, Вырезка, BMR',
    search_ph_mobile: 'Поиск упражнений, еды, формул',
    search_empty: 'Ничего не найдено. Попробуйте другое слово.',
    search_loading: 'Загрузка поискового индекса…',
    search_typing: 'Введите запрос: упражнения, еда, формулы, заметки.',
    feedback: 'Обратная связь / Баг', github: 'GitHub', privacy: 'Конфиденциальность',
    sources: 'Источники', faq: 'О нас / FAQ',
    disclaimer: 'Сайт даёт только здоровые естественные рекомендации. Никакого экстрима и фармы. Соблюдайте закон.',
    suitable: 'Для здоровых взрослых. При хронических болезнях, беременности, после травм — сначала к врачу. Головокружение, боль в груди, резкая боль в суставе — сразу остановиться.',
    lang_settings: 'Язык',
    lang_scope: 'Текст интерфейса и названия переключаются мгновенно по открытым словарям и офлайн-модели. Машинный перевод — прогноз, требующий проверки. Не найденные длинные статьи остаются на китайском.',
    type_movement: 'Упр.', type_food: 'Еда', type_formula: 'Формула', type_knowledge: 'Заметка',
  },
  de: {
    brand: 'XiongZhi Will',
    nav_body: 'Körper', nav_plan: 'Plan', nav_library: 'Übungen', nav_training: 'Log',
    nav_nutrition: 'Ernährung', nav_bodydata: 'Daten', nav_coach: 'KI-Coach',
    nav_strength: 'Kraft',
    nav_tools: 'Tools', nav_light: 'Cutting',
    nav_stomach: 'Magen', nav_isometric: 'Isometrie', nav_diet: 'Diät', nav_mind: 'Geist',
    nav_career: 'Karriere', nav_wealth: 'Geld', nav_relation: 'Beziehung', nav_skills: 'Fähigkeiten',
    nav_wild: 'Wildnis', nav_life: 'Leben', nav_collect: 'Gemerkt',
    nav_group_train: 'Training', nav_group_special: 'Spezial', nav_group_life: 'Leben',
    nav_all: 'Alle', lang_current: 'Aktuell',
    login: 'Anmelden', logout: 'Abmelden', cancel: 'Abbrechen',
    search_ph: 'Suche: Übungen / Lebensmittel / Formeln, z.B. Bankdrücken, Rinderfilet, BMR',
    search_ph_mobile: 'Übungen, Lebensmittel, Formeln suchen',
    search_empty: 'Nichts gefunden. Anderes Wort versuchen.',
    search_loading: 'Suchindex wird geladen…',
    search_typing: 'Suchbegriff eingeben: Übungen, Essen, Formeln.',
    feedback: 'Feedback / Bug melden', github: 'GitHub', privacy: 'Datenschutz',
    sources: 'Quellen', faq: 'Über / FAQ',
    disclaimer: 'Diese Seite bietet nur gesunde, natürliche Fitness. Kein Extremtraining, keine Drogen. Gesetze beachten.',
    suitable: 'Für gesunde Erwachsene. Bei chronischen Krankheiten, Schwangerschaft, alten Verletzungen: zuerst Arzt fragen. Bei Schwindel, Brustschmerz, Gelenkschmerz sofort aufhören.',
    lang_settings: 'Sprache',
    lang_scope: 'UI-Texte und Namen wechseln sofort über Open-Source-Wörterbücher und ein Offline-Modell. Maschinelle Übersetzungen sind Vorhersagen und sollten geprüft werden. Nicht erfasste lange Artikel bleiben Chinesisch.',
    type_movement: 'Übung', type_food: 'Essen', type_formula: 'Formel', type_knowledge: 'Notiz',
  },
};

export function t(key: string): string {
  return DICT[current]?.[key] ?? DICT.zh[key] ?? key;
}
