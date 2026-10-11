// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache-2.0
import { describe, expect, it } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('合并类名', () => {
    expect(cn('a', 'b')).toBe('a b');
    expect(cn('a', undefined, 'b')).toBe('a b');
    expect(cn(false, 'y')).toBe('y');
  });

  it('tailwind-merge 解决冲突（后者胜出）', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });
});
