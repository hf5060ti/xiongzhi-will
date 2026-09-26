import { Ruler, User, Flame, Dumbbell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { cn } from '@/lib/utils';
import {
  ACTIVITY_FACTORS,
  LEVEL_LABEL,
  PHASE_LABEL,
  type TrainLevel,
  type Phase,
} from '@/lib/body-math';
import type { BodyProfile } from '@/lib/store';

interface InputPanelProps {
  profile: BodyProfile;
  onChange: (patch: Partial<BodyProfile>) => void;
}

const LEVELS: TrainLevel[] = ['beginner', 'intermediate', 'advanced'];
const PHASES: Phase[] = ['bulk', 'cut', 'maintain'];

/** 每个数值字段的合理范围（超出即提示，防止身高 300cm / 体脂 120% 这类误输入） */
const RANGES: Record<string, { min: number; max: number; error: string; emptyOk?: boolean }> = {
  age: { min: 5, max: 120, error: '年龄请在 5–120 岁之间' },
  heightCm: { min: 100, max: 250, error: '身高请在 100–250 cm 之间' },
  weightKg: { min: 20, max: 300, error: '体重请在 20–300 kg 之间' },
  bodyFatPct: { min: 3, max: 70, error: '体脂率请在 3–70% 之间（估算值也行）' },
  wristCm: { min: 10, max: 35, error: '手腕围请在 10–35 cm 之间', emptyOk: true },
  ankleCm: { min: 10, max: 45, error: '脚踝围请在 10–45 cm 之间', emptyOk: true },
};

function rangeError(key: string, raw: string): string | null {
  const r = RANGES[key];
  if (!r) return null;
  const trimmed = raw.trim();
  if (trimmed === '') return r.emptyOk ? null : '请填写该数值';
  const v = Number(trimmed);
  if (!Number.isFinite(v)) return '请输入有效数字';
  if (v < r.min || v > r.max) return r.error;
  return null;
}

function NumberField({
  id,
  label,
  value,
  placeholder,
  unit,
  hint,
  rangeKey,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  unit: string;
  hint?: string;
  rangeKey: string;
  onChange: (v: string) => void;
}) {
  const error = rangeError(rangeKey, value);
  return (
    <div>
      <Label htmlFor={id} className="text-sm">
        {label}
      </Label>
      <div className="relative mt-1.5">
        <Input
          id={id}
          type="number"
          min={0}
          step="any"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          className={cn('pr-12', error && 'border-destructive focus-visible:ring-destructive/40')}
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          {unit}
        </span>
      </div>
      {error ? (
        <p className="mt-1 text-[11px] leading-snug text-destructive">{error}</p>
      ) : (
        hint && <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

export default function InputPanel({ profile, onChange }: InputPanelProps) {
  return (
    <section className="space-y-5 rounded-lg border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Ruler className="h-4 w-4 text-primary" />
        输入你的身体数据
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
        <div className="col-span-2 sm:col-span-1">
          <span className="text-sm text-foreground">性别</span>
          <div className="mt-1.5 flex gap-1.5">
            {(['male', 'female'] as const).map((s) => (
              <Badge
                key={s}
                variant={profile.sex === s ? 'default' : 'outline'}
                className={cn('cursor-pointer select-none px-4', profile.sex !== s && 'hover:bg-accent')}
                onClick={() => onChange({ sex: s })}
              >
                {s === 'male' ? '男' : '女'}
              </Badge>
            ))}
          </div>
        </div>
        <NumberField
          id="bd-age"
          label="年龄"
          value={profile.age}
          placeholder="如 25"
          unit="岁"
          rangeKey="age"
          onChange={(v) => onChange({ age: v })}
        />
        <NumberField
          id="bd-height"
          label="身高"
          value={profile.heightCm}
          placeholder="如 180"
          unit="cm"
          rangeKey="heightCm"
          onChange={(v) => onChange({ heightCm: v })}
        />
        <NumberField
          id="bd-weight"
          label="体重"
          value={profile.weightKg}
          placeholder="如 80"
          unit="kg"
          rangeKey="weightKg"
          onChange={(v) => onChange({ weightKg: v })}
        />
        <NumberField
          id="bd-fat"
          label="体脂率"
          value={profile.bodyFatPct}
          placeholder="如 25"
          unit="%"
          hint="估算值也行，公式误差本就 ±10–15%。"
          rangeKey="bodyFatPct"
          onChange={(v) => onChange({ bodyFatPct: v })}
        />
        <NumberField
          id="bd-wrist"
          label="手腕围"
          value={profile.wristCm}
          placeholder="选填"
          unit="cm"
          hint="骨架上限公式（Casey Butt）用。"
          rangeKey="wristCm"
          onChange={(v) => onChange({ wristCm: v })}
        />
        <NumberField
          id="bd-ankle"
          label="脚踝围"
          value={profile.ankleCm}
          placeholder="选填"
          unit="cm"
          hint="同上，两个都填才计算。"
          rangeKey="ankleCm"
          onChange={(v) => onChange({ ankleCm: v })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div>
          <Label htmlFor="bd-level" className="text-sm">
            <Dumbbell className="mr-1 inline h-3.5 w-3.5 text-muted-foreground" />
            训练水平
          </Label>
          <NativeSelect
            id="bd-level"
            className="mt-1.5"
            value={profile.level}
            onChange={(e) => onChange({ level: e.target.value })}
          >
            {LEVELS.map((l) => (
              <NativeSelectOption key={l} value={l}>
                {LEVEL_LABEL[l]}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <div>
          <Label htmlFor="bd-activity" className="text-sm">
            <Flame className="mr-1 inline h-3.5 w-3.5 text-muted-foreground" />
            日常活动水平
          </Label>
          <NativeSelect
            id="bd-activity"
            className="mt-1.5"
            value={profile.activity}
            onChange={(e) => onChange({ activity: e.target.value })}
          >
            {ACTIVITY_FACTORS.map((a) => (
              <NativeSelectOption key={a.id} value={a.id}>
                {a.label}（×{a.value}）
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
        <div>
          <Label htmlFor="bd-phase" className="text-sm">
            <User className="mr-1 inline h-3.5 w-3.5 text-muted-foreground" />
            当前阶段
          </Label>
          <NativeSelect
            id="bd-phase"
            className="mt-1.5"
            value={profile.phase}
            onChange={(e) => onChange({ phase: e.target.value })}
          >
            {PHASES.map((p) => (
              <NativeSelectOption key={p} value={p}>
                {PHASE_LABEL[p]}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>
      </div>
    </section>
  );
}
