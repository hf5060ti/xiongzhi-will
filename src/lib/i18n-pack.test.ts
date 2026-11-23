// 雄性意志（Xiongzhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// 开源语言包接入层：译名来自 GitHub 开源词库，本站只做机械映射与回退。
import { describe, expect, it } from 'vitest';
import {
  preloadI18nPack,
  localizeTerm,
  localizeFoodName,
  localizeExerciseName,
} from './i18n-pack';

describe('开源语言包接入层', () => {
  it('中文返回原名；英文优先用项目自有 FOOD_NAME_EN', () => {
    expect(localizeFoodName('鸡胸肉（生）', 'zh')).toBe('鸡胸肉（生）');
    expect(localizeFoodName('鸡胸肉（生）', 'en')).toBe('Chicken Breast (raw)');
  });

  it('词库未加载时 de / ru 逐级回退英文或原名', () => {
    expect(localizeFoodName('鸡胸肉（生）', 'de')).toBe('Chicken Breast (raw)');
    expect(localizeFoodName('不存在的食物', 'ru')).toBe('不存在的食物');
    expect(localizeExerciseName('Plank', 'ru')).toBe('Plank');
  });

  it('UI 词条：中文用原词，英文用上游 msgid，未收录时回退英文', () => {
    expect(localizeTerm('All', '全部', 'zh')).toBe('全部');
    expect(localizeTerm('All', '全部', 'en')).toBe('All');
    expect(localizeTerm('NotInPack', '未在包内', 'de')).toBe('NotInPack');
  });

  it('加载后命中上游词条：食物 en/de/ru、动作 ru，冲突条目被过滤', async () => {
    await Promise.all([
      preloadI18nPack('en'),
      preloadI18nPack('de'),
      preloadI18nPack('ru'),
    ]);
    expect(localizeFoodName('丁香（干花蕾）', 'en')).toBe('clove');
    expect(localizeFoodName('鸡胸肉（生）', 'de')).toBe('Hähnchenbrust');
    expect(localizeFoodName('南瓜', 'ru')).toBe('тыква');
    expect(localizeFoodName('丁香（干花蕾）', 'ru')).toBe('гвоздика');
    // 本语言无词条、项目自有英文名也缺失时，回退到开源词库的英文补名
    expect(localizeFoodName('亚麻籽油', 'ru')).toBe('Linseed oils');
    expect(localizeExerciseName('Plank', 'ru')).toBe('Планка');
    expect(localizeExerciseName('Leg Press', 'de')).toBe('Beinpresse');
    // 上游 de 译名与英文器械词冲突（Barbell ↔ Kurzhantel），确定性过滤后回退英文
    expect(localizeExerciseName('Barbell Squat', 'de')).toBe('Barbell Squat');
    // 未命中的动作名保持英文原名
    expect(localizeExerciseName('Not An Exercise', 'de')).toBe('Not An Exercise');
  });

  it('localizeTerm 在 de / ru 语言包加载后命中上游译文', async () => {
    await Promise.all([preloadI18nPack('de'), preloadI18nPack('ru')]);
    expect(localizeTerm('Protein', '蛋白', 'de')).toBe('Eiweiß');
    expect(localizeTerm('Protein', '蛋白', 'ru')).toBe('Белки');
  });
});
