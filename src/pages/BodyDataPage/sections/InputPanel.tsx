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

function NumberField({
  id,
  label,
  value,
  placeholder,
  unit,
  hint,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  unit: string;
  hint?: string;
  onChange: (v: string) => void;
}) {
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
          className="pr-12"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          {unit}
        </span>
      </div>
      {hint && <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{hint}</p>}
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
          onChange={(v) => onChange({ age: v })}
        />
        <NumberField
          id="bd-height"
          label="身高"
          value={profile.heightCm}
          placeholder="如 180"
          unit="cm"
          onChange={(v) => onChange({ heightCm: v })}
        />
        <NumberField
          id="bd-weight"
          label="体重"
          value={profile.weightKg}
          placeholder="如 80"
          unit="kg"
          onChange={(v) => onChange({ weightKg: v })}
        />
        <NumberField
          id="bd-fat"
          label="体脂率"
          value={profile.bodyFatPct}
          placeholder="如 25"
          unit="%"
          hint="估算值也行，公式误差本就 ±10–15%。"
          onChange={(v) => onChange({ bodyFatPct: v })}
        />
        <NumberField
          id="bd-wrist"
          label="手腕围"
          value={profile.wristCm}
          placeholder="选填"
          unit="cm"
          hint="骨架上限公式（Casey Butt）用。"
          onChange={(v) => onChange({ wristCm: v })}
        />
        <NumberField
          id="bd-ankle"
          label="脚踝围"
          value={profile.ankleCm}
          placeholder="选填"
          unit="cm"
          hint="同上，两个都填才计算。"
          onChange={(v) => onChange({ ankleCm: v })}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
