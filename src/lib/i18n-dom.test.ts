// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// 全站实时文本层：纯函数测试（译文全部来自 scripts/generate-i18n-terms.py 提取的开源词库）。
import { describe, expect, it } from 'vitest';
import dePack from '@/locales/ui-de.json';
import enPack from '@/locales/ui-en.json';
import { buildPattern, translateText } from './i18n-dom';

const dict = {
  '钾': 'Kalium',
  '钾含量': 'Kaliumgehalt',
  '铁': 'Eisen',
  '保存': 'Speichern',
};
const re = buildPattern(dict);

describe('全站实时文本层 · 纯函数', () => {
  it('按最长匹配替换，短词不会被长词抢先切碎', () => {
    expect(translateText('钾含量', dict, re)).toBe('Kaliumgehalt');
    expect(translateText('钾 / 铁', dict, re)).toBe('Kalium / Eisen');
  });

  it('整段命中时整段替换并保留首尾空白', () => {
    expect(translateText('  保存  ', dict, re)).toBe('  Speichern  ');
  });

  it('超过阈值的长段落保留中文，避免中德混杂', () => {
    const long = '全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。';
    expect(translateText(long, dict, re)).toBe(long);
  });

  it('无中文 / 空词典 / 未收录词一律原样返回', () => {
    expect(translateText('BMR 2000 kcal', dict, re)).toBe('BMR 2000 kcal');
    expect(translateText('钾', {}, null)).toBe('钾');
    expect(translateText('未收录的中文词', dict, re)).toBe('未收录的中文词');
    expect(buildPattern({})).toBeNull();
  });

  it('真实开源词条：OFF / wger 上游译文逐条可核验', () => {
    const deRe = buildPattern(dePack);
    const enRe = buildPattern(enPack);
    expect(translateText('钾', dePack, deRe)).toBe('Kalium');
    expect(translateText('铁', enPack, enRe)).toBe('Iron');
    expect(translateText('保存', dePack, deRe)).toBe('Speichern');
    // 食物名来自 OFF taxonomies，动作/营养术语来自 OFF PO 与 wger
    expect(dePack['鸡胸肉（生）']).toBe('Hähnchenbrust');
  });
});
