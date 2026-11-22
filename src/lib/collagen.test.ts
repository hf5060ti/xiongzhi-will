// 雄性意志（Xiongzhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache-2.0
import { describe, expect, it } from 'vitest';
import { getAbsorptionTips, ABSORPTION_GUIDE } from './absorption';
import type { IFood } from '@/data/foods/types';
import { CONNECTIVE_TISSUE_FOODS } from '@/data/foods/connective-tissue';
import { FOODS } from '@/data/foods';

function make(partial: Partial<IFood>): IFood {
  return {
    id: 't', name: '', cat: 'meat', kcal: 0, protein: 0, fat: 0, carb: 0,
    fiber: 0, sodium: 0, vitFat: [], vitWater: [], ...partial,
  } as IFood;
}

describe('胶原蛋白类食物（不完全蛋白）', () => {
  it('给出 4 条提示：不完全蛋白 / 氨基酸互补 / 维 C / 证据边界', () => {
    const tips = getAbsorptionTips(make({ proteinProfile: 'collagen', name: '牛蹄筋' }));
    expect(tips).toHaveLength(4);
    expect(tips.some((t) => t.includes('不完全蛋白'))).toBe(true);
    expect(tips.some((t) => t.includes('氨基酸互补'))).toBe(true);
    expect(tips.some((t) => t.includes('维生素 C'))).toBe(true);
    expect(tips.some((t) => t.includes('不定向沉积'))).toBe(true);
  });

  it('不再误报「动物蛋白必需氨基酸齐全」', () => {
    const tips = getAbsorptionTips(make({ cat: 'meat', proteinProfile: 'collagen' }));
    expect(tips.some((t) => t.includes('是增肌主力蛋白'))).toBe(false);
  });

  it('普通肉类仍保留动物蛋白提示', () => {
    const tips = getAbsorptionTips(make({ cat: 'meat', name: '牛里脊' }));
    expect(tips.some((t) => t.includes('是增肌主力蛋白'))).toBe(true);
  });

  it('吸收指南含胶原蛋白条目', () => {
    expect(ABSORPTION_GUIDE.some((g) => g.title.includes('胶原蛋白'))).toBe(true);
  });
});

describe('结缔组织食物数据', () => {
  it('5 条：脆骨 / 筋膜 / 肌腱，均标记 collagen', () => {
    expect(CONNECTIVE_TISSUE_FOODS).toHaveLength(5);
    for (const f of CONNECTIVE_TISSUE_FOODS) {
      expect(f.proteinProfile).toBe('collagen');
      expect(f.protein).toBeGreaterThan(0);
      expect(f.note).toContain('实测');
    }
  });

  it('id 唯一且已并入 FOODS', () => {
    const ids = CONNECTIVE_TISSUE_FOODS.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(FOODS.some((f) => f.id === id)).toBe(true);
  });

  it('权威条目数值与公开数据库一致', () => {
    const tendon = CONNECTIVE_TISSUE_FOODS.find((f) => f.id === 'beef-tendon')!;
    expect({ kcal: tendon.kcal, protein: tendon.protein, fat: tendon.fat, carb: tendon.carb })
      .toEqual({ kcal: 151, protein: 34.1, fat: 0.5, carb: 2.6 });
    const feet = CONNECTIVE_TISSUE_FOODS.find((f) => f.id === 'chicken-feet')!;
    expect({ kcal: feet.kcal, protein: feet.protein, fat: feet.fat })
      .toEqual({ kcal: 215, protein: 19.4, fat: 14.6 });
  });
});
