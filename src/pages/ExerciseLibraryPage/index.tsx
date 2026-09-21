import { useMemo, useState } from 'react';
import { Search, Dumbbell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import exercisesData from '@/data/exercises-db.json';

// 图片 CDN 前缀
const IMG_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises/';

interface Exercise {
  name: string;
  force: string;
  level: string;
  mechanic: string;
  equipment: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
  id: string;
}

const EXERCISES = exercisesData as Exercise[];

// 肌群中英映射
const MUSCLE_CN: Record<string, string> = {
  quadriceps: '股四头肌', shoulders: '肩部', abdominals: '腹肌', chest: '胸肌',
  hamstrings: '腘绳肌', triceps: '三头肌', biceps: '二头肌', lats: '背阔肌',
  'middle back': '上背部', calves: '小腿', 'lower back': '下背部',
  forearms: '前臂', glutes: '臀肌', traps: '斜方肌', adductors: '内收肌',
  abductors: '外展肌', neck: '颈部',
};
// 器械中英映射
const EQUIP_CN: Record<string, string> = {
  barbell: '杠铃', dumbbell: '哑铃', 'body only': '自重', cable: '绳索',
  machine: '固定器械', kettlebells: '壶铃', bands: '弹力带',
  'medicine ball': '药球', 'exercise ball': '健身球', 'foam roll': '泡沫轴',
  'e-z curl bar': '曲杆', other: '其他',
};
// 动作名常见翻译（高频动作）
const NAME_CN: Record<string, string> = {
  'Barbell Bench Press': '平板杠铃卧推',
  'Incline Dumbbell Press': '上斜哑铃卧推',
  'Decline Barbell Bench Press': '下斜杠铃卧推',
  'Dumbbell Bench Press': '平板哑铃卧推',
  'Barbell Curl': '杠铃弯举',
  'Dumbbell Curl': '哑铃弯举',
  'Hammer Curl': '锤式弯举',
  'Preacher Curl': '牧师凳弯举',
  'Lateral Raise': '侧平举',
  'Front Raise': '前平举',
  'Overhead Press': '实力推',
  'Upright Row': '直立划船',
  'Bent Over Row': '俯身划船',
  'Pull Up': '引体向上',
  'Chin Up': '反握引体向上',
  'Deadlift': '硬拉',
  'Squat': '深蹲',
  'Romanian Deadlift': '罗马尼亚硬拉',
  'Leg Press': '腿举',
  'Leg Curl': '腿弯举',
  'Leg Extension': '腿屈伸',
  'Calf Raise': '提踵',
  'Push Up': '俯卧撑',
  'Dips': '双杠臂屈伸',
  'Plank': '平板支撑',
  'Crunch': '卷腹',
  'Hanging Leg Raise': '吊杠举腿',
  'Russian Twist': '俄罗斯转体',
  'Burpee': '波比跳',
  'Jump Rope': '跳绳',
};
// 难度中英
const LEVEL_CN: Record<string, string> = {
  beginner: '初级', intermediate: '中级', advanced: '高级',
};
// 训练类型中英
const MECHANIC_CN: Record<string, string> = {
  compound: '复合动作', isolation: '孤立动作',
};

function getCnName(name: string): string {
  return NAME_CN[name] || '';
}

export default function ExerciseLibraryPage() {
  const [query, setQuery] = useState('');
  const [muscle, setMuscle] = useState('all');
  const [equip, setEquip] = useState('all');
  const [selected, setSelected] = useState<Exercise | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const muscles = useMemo(() => ['all', ...new Set(EXERCISES.flatMap((e) => e.primaryMuscles))], []);
  const equips = useMemo(() => ['all', ...new Set(EXERCISES.map((e) => e.equipment))], []);

  const filtered = useMemo(() => {
    return EXERCISES.filter((e) => {
      if (muscle !== 'all' && !e.primaryMuscles.includes(muscle)) return false;
      if (equip !== 'all' && e.equipment !== equip) return false;
      if (query) {
        const q = query.toLowerCase();
        const enName = e.name.toLowerCase();
        const cnName = (NAME_CN[e.name] || '').toLowerCase();
        if (!enName.includes(q) && !cnName.includes(q)) return false;
      }
      return true;
    });
  }, [query, muscle, equip]);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="font-display text-3xl font-extrabold tracking-wide text-foreground">动作百科</h1>
        <p className="text-sm text-muted-foreground">
          {EXERCISES.length} 个动作，悬停查看动画演示，点击卡片看分步讲解。
        </p>
      </header>

      {/* 筛选栏 */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜索动作，如 卧推、深蹲、bench press"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={muscle}
          onChange={(e) => setMuscle(e.target.value)}
          className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground"
        >
          <option value="all">全部肌群</option>
          {muscles.filter((m) => m !== 'all').map((m) => (
            <option key={m} value={m}>{MUSCLE_CN[m] || m}</option>
          ))}
        </select>
        <select
          value={equip}
          onChange={(e) => setEquip(e.target.value)}
          className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground"
        >
          <option value="all">全部器械</option>
          {equips.filter((e) => e !== 'all').map((e) => (
            <option key={e} value={e}>{EQUIP_CN[e] || e}</option>
          ))}
        </select>
      </div>

      {/* 结果数 */}
      <p className="text-xs text-muted-foreground">找到 {filtered.length} 个动作</p>

      {/* 卡片网格 */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filtered.map((ex) => {
          const cnName = getCnName(ex.name);
          const img2 = hovered === ex.id && ex.images.length > 1 ? ex.images[1] : ex.images[0];
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => setSelected(ex)}
              onMouseEnter={() => setHovered(ex.id)}
              onMouseLeave={() => setHovered(null)}
              className="group overflow-hidden rounded-lg border border-border bg-card text-left transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden bg-muted/30">
                <img
                  src={IMG_BASE + img2}
                  alt={ex.name}
                  loading="lazy"
                  className="h-full w-full object-contain transition-opacity duration-200"
                />
              </div>
              <div className="p-2">
                <p className="truncate text-xs font-medium text-foreground">
                  {cnName || ex.name}
                </p>
                <p className="truncate text-[10px] text-muted-foreground">{ex.name}</p>
                <div className="mt-1 flex flex-wrap gap-0.5">
                  {ex.primaryMuscles.slice(0, 2).map((m) => (
                    <Badge key={m} variant="outline" className="px-1 py-0 text-[9px]">
                      {MUSCLE_CN[m] || m}
                    </Badge>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 详情弹窗 */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelected(null)}
        >
          <Card
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent className="space-y-4 p-6">
              <div className="flex items-start gap-4">
                <div className="flex gap-2">
                  {selected.images.map((img, i) => (
                    <img
                      key={i}
                      src={IMG_BASE + img}
                      alt={`${selected.name} ${i + 1}`}
                      className="h-32 w-32 rounded-lg border border-border bg-muted/30 object-contain"
                    />
                  ))}
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    {getCnName(selected.name) || selected.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">{selected.name}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selected.primaryMuscles.map((m) => (
                      <Badge key={m} variant="secondary">{MUSCLE_CN[m] || m}</Badge>
                    ))}
                    <Badge variant="outline">{EQUIP_CN[selected.equipment] || selected.equipment}</Badge>
                    {selected.level && (
                      <Badge variant="outline">{LEVEL_CN[selected.level] || selected.level}</Badge>
                    )}
                    {selected.mechanic && (
                      <Badge variant="outline">{MECHANIC_CN[selected.mechanic] || selected.mechanic}</Badge>
                    )}
                  </div>
                  {selected.secondaryMuscles.length > 0 && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      <b className="text-foreground">协同肌群：</b>
                      {selected.secondaryMuscles.map((m) => MUSCLE_CN[m] || m).join('、')}
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-md border border-primary/20 bg-primary/5 p-3 text-xs text-primary">
                <b>安全提示：</b>在安全的范围内去运动。糖尿病、孕妇、老年人、大病初愈者优先遵从医嘱。出现头晕、关节刺痛、异常气短时立即停止。
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2 font-display text-lg font-bold text-foreground">
                  <Dumbbell className="h-4 w-4 text-primary" />
                  动作步骤
                </h3>
                <ol className="space-y-2">
                  {selected.instructions.map((step, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
