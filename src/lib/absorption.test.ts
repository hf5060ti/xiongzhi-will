// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache-2.0
import { describe, expect, it } from 'vitest';
import { getAbsorptionTips } from './absorption';
import type { IFood } from '@/data/foods/types';

function make(partial: Partial<IFood>): IFood {
  return {
    id: 't',
    name: '',
    cat: 'veg',
    kcal: 0,
    protein: 0,
    fat: 0,
    carb: 0,
    fiber: 0,
    sodium: 0,
    vitFat: [],
    vitWater: [],
    ...partial,
  } as IFood;
}

describe('getAbsorptionTips', () => {
  it('动物性 + 脂溶性A + 血红素铁 → 三类提示', () => {
    const tips = getAbsorptionTips(make({ cat: 'meat', name: '猪肝', vitFat: ['A'], minerals: ['铁'] }));
    expect(tips.some((t) => t.includes('维生素 A 为脂溶性'))).toBe(true);
    expect(tips.some((t) => t.includes('血红素铁'))).toBe(true);
    expect(tips.some((t) => t.includes('动物蛋白'))).toBe(true);
  });

  it('植物性铁 + 草酸钙（菠菜）→ 非血红素铁 + 草酸提示', () => {
    const tips = getAbsorptionTips(make({ cat: 'veg', name: '菠菜', minerals: ['铁', '钙'] }));
    expect(tips.some((t) => t.includes('非血红素铁'))).toBe(true);
    expect(tips.some((t) => t.includes('草酸会抑制钙吸收'))).toBe(true);
  });

  it('蛋奶钙 → 乳钙提示', () => {
    const tips = getAbsorptionTips(make({ cat: 'dairy', name: '牛奶', minerals: ['钙'] }));
    expect(tips.some((t) => t.includes('乳钙'))).toBe(true);
  });

  it('脂溶性 E/K → 对应提示，且结果不超过 4 条', () => {
    const tips = getAbsorptionTips(make({ cat: 'veg', name: '西兰花', vitFat: ['E', 'K'] }));
    expect(tips.some((t) => t.includes('脂溶性维生素 E/K'))).toBe(true);
    expect(tips.length).toBeLessThanOrEqual(4);
  });
});
