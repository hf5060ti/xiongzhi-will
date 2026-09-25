import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Dumbbell, ExternalLink, PlayCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import exercisesData from '@/data/exercises-db.json';
import extData from '@/data/exercises-ext.json';
import { EXERCISE_MEDIA } from '@/data/exercise-media';
import { TAN_CHENGYI, type CoachVideo } from '@/data/coach-videos';

// 图片 CDN 前缀
const IMG_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/';

// 动作百科（演示动图来源）
const SITE_HOME = 'https://fitness.xingshuwen.com/';

interface RawExercise {
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

interface ExtExercise {
  id: string;
  name: string;
  nameZh: string;
  equipment: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  image: string;
  gif: string;
  page: string;
  source: string;
}

// 页面统一视图模型
interface ExerciseView {
  id: string;
  name: string;
  nameZh: string;
  equipment: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  level: string;
  mechanic: string;
  images: string[];
  gif?: string;
  page?: string;
  source?: string;
  /** 近似演示：站上无同名动作，此处为最接近动作的演示 */
  approx?: boolean;
  /** 近似说明，如「近似动作：壶铃单臂高翻挺举」 */
  approxNote?: string;
  /** 站上暂无演示：详情页改为展示动作百科站内搜索入口 */
  none?: boolean;
  /** 站内搜索用的英文动作名 */
  searchName?: string;
}

// 肌群中英映射
const MUSCLE_CN: Record<string, string> = {
  quadriceps: '股四头肌', shoulders: '肩部', abdominals: '腹肌', chest: '胸肌',
  hamstrings: '腘绳肌', triceps: '三头肌', biceps: '二头肌', lats: '背阔肌',
  'middle back': '上背部', calves: '小腿', 'lower back': '下背部',
  forearms: '前臂', glutes: '臀肌', traps: '斜方肌', adductors: '内收肌',
  abductors: '外展肌', neck: '颈部', cardio: '心肺',
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
  'Dips - Triceps Version': '双杠臂屈伸（三头版）',
  'Wide-Grip Rear Pull-Up': '宽握引体向上',
};
// 难度中英
const LEVEL_CN: Record<string, string> = {
  beginner: '初级', intermediate: '中级', advanced: '高级',
};
// 训练类型中英
const MECHANIC_CN: Record<string, string> = {
  compound: '复合动作', isolation: '孤立动作',
};

// 全量动作：本地动作库（exercises-db）+ 动作百科补充动作（exercises-ext，已排除与本地库重复的条目）
const ALL_EXERCISES: ExerciseView[] = [
  ...(exercisesData as RawExercise[]).map((e) => {
    const media = EXERCISE_MEDIA[e.id];
    return {
      id: e.id,
      name: e.name,
      nameZh: NAME_CN[e.name] || (media && !media.none ? media.zh : '') || '',
      equipment: e.equipment,
      primaryMuscles: e.primaryMuscles,
      secondaryMuscles: e.secondaryMuscles,
      instructions: e.instructions,
      level: e.level,
      mechanic: e.mechanic,
      images: e.images.map((i) => IMG_BASE + i),
      gif: media?.gif,
      page: media?.page,
      // 仅在站上真有演示动图时才标注来源；近似演示另有显式标注
      source: media?.gif ? '动作百科' : undefined,
      approx: media?.approx,
      approxNote: media?.approxNote,
      none: media?.none,
      searchName: media?.searchName,
    };
  }),
  ...(extData as ExtExercise[]).map((e) => ({
    id: e.id,
    name: e.name,
    nameZh: e.nameZh,
    equipment: e.equipment,
    primaryMuscles: e.primaryMuscles,
    secondaryMuscles: e.secondaryMuscles,
    instructions: e.instructions,
    level: '',
    mechanic: '',
    images: [e.image],
    gif: e.gif,
    page: e.page,
    source: e.source,
  })),
];

const WITH_ANIM = ALL_EXERCISES.filter((e) => e.gif).length;
// 精确演示（站上同名动作）/ 近似演示 / 站上暂无演示
const EXACT_ANIM = ALL_EXERCISES.filter((e) => e.gif && !e.approx).length;
const APPROX_ANIM = ALL_EXERCISES.filter((e) => e.gif && e.approx).length;
const NO_ANIM = ALL_EXERCISES.length - WITH_ANIM;

// 动作百科站内搜索入口（站上暂无演示时使用；站内搜索框支持英文原名）
const SITE_SEARCH_URL = SITE_HOME;

// 每次渲染的卡片数量，避免一次性渲染全部 1500+ 张卡片
const PAGE_SIZE = 120;

function getCnName(ex: ExerciseView): string {
  return ex.nameZh || NAME_CN[ex.name] || '';
}

// 库内动作统一保留 B 站搜索入口作为兜底（无演示动图时使用）
function biliSearchUrl(ex: ExerciseView): string {
  const kw = `${getCnName(ex) || ex.name} 教学`;
  return `https://search.bilibili.com/all?keyword=${encodeURIComponent(kw)}`;
}

// 根据动作肌群匹配谭成义教学视频（按动作所属部位取最相关的）
function matchTanVideos(ex: ExerciseView): CoachVideo[] {
  const muscles = new Set([...ex.primaryMuscles, ...ex.secondaryMuscles]);
  const hit = TAN_CHENGYI.filter((v) => {
    const topic = v.topic;
    if (topic.includes('/')) {
      return topic.split('/').some((t) => {
        if (t === '胸部' && (muscles.has('chest') || muscles.has('shoulders'))) return true;
        if (t === '肩部' && muscles.has('shoulders')) return true;
        if (t === '背部' && (muscles.has('lats') || muscles.has('middle back') || muscles.has('lower back'))) return true;
        if (t === '腿部' && (muscles.has('quadriceps') || muscles.has('hamstrings') || muscles.has('glutes') || muscles.has('calves'))) return true;
        if (t === '三头' && muscles.has('triceps')) return true;
        return false;
      });
    }
    // 单一主题
    if (topic === '胸部' && (muscles.has('chest') || muscles.has('shoulders'))) return true;
    if (topic === '肩部' && muscles.has('shoulders')) return true;
    if (topic === '背部' && (muscles.has('lats') || muscles.has('middle back') || muscles.has('lower back'))) return true;
    if (topic === '腿部' && (muscles.has('quadriceps') || muscles.has('hamstrings') || muscles.has('glutes') || muscles.has('calves'))) return true;
    if (topic === '三头' && muscles.has('triceps')) return true;
    return false;
  });
  // 训练计划类视频不按肌群匹配，不在这里展示
  return hit.slice(0, 3);
}

export default function ExerciseLibraryPage() {
  // 支持从计划页带 ?q=动作名 跳转过来时自动搜索
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [muscle, setMuscle] = useState('all');
  const [equip, setEquip] = useState('all');
  const [selected, setSelected] = useState<ExerciseView | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const muscles = useMemo(
    () => ['all', ...new Set(ALL_EXERCISES.flatMap((e) => e.primaryMuscles))],
    [],
  );
  const equips = useMemo(() => ['all', ...new Set(ALL_EXERCISES.map((e) => e.equipment))], []);

  const filtered = useMemo(() => {
    return ALL_EXERCISES.filter((e) => {
      if (muscle !== 'all' && !e.primaryMuscles.includes(muscle)) return false;
      if (equip !== 'all' && e.equipment !== equip) return false;
      if (query) {
        const q = query.toLowerCase().trim();
        const enName = e.name.toLowerCase();
        const cnName = getCnName(e).toLowerCase();
        // 搜索英文名、中文名、肌群中文名
        const musclesCn = e.primaryMuscles.map((m) => (MUSCLE_CN[m] || m).toLowerCase()).join(' ');
        const equipCn = (EQUIP_CN[e.equipment] || '').toLowerCase();
        if (
          !enName.includes(q) &&
          !cnName.includes(q) &&
          !musclesCn.includes(q) &&
          !equipCn.includes(q)
        )
          return false;
      }
      return true;
    });
  }, [query, muscle, equip]);

  // 筛选条件变化后回到首批
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [query, muscle, equip]);

  const shown = filtered.slice(0, visible);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="font-display text-3xl font-extrabold tracking-wide text-foreground">动作百科</h1>
        <p className="text-sm text-muted-foreground">
          共 {ALL_EXERCISES.length} 个动作，其中 {WITH_ANIM} 个带演示动图（{EXACT_ANIM} 个为站上同名动作，
          {APPROX_ANIM} 个为近似演示，鼠标悬停即可播放）
          {NO_ANIM > 0
            ? `；${NO_ANIM} 个动作在动作百科站上暂无演示，详情页可一键跳转站内搜索该动作英文名。`
            : '。'}
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
      <p className="text-xs text-muted-foreground">
        找到 {filtered.length} 个动作，已显示 {shown.length} 个
      </p>

      {/* 卡片网格 */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {shown.map((ex) => {
          const cnName = getCnName(ex);
          // 有演示动图的动作：悬停播放动图；其余用静态图（悬停切第二张）
          const animating = hovered === ex.id && !!ex.gif;
          const src = animating
            ? (ex.gif as string)
            : ex.images[0] || ex.gif || '';
          return (
            <div
              key={ex.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelected(ex)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelected(ex);
              }}
              onMouseEnter={() => setHovered(ex.id)}
              onMouseLeave={() => setHovered(null)}
              className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-card text-left transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="relative aspect-square overflow-hidden bg-muted/30">
                <img
                  src={src}
                  alt={cnName || ex.name}
                  loading="lazy"
                  className="h-full w-full object-contain transition-opacity duration-200"
                />
                {ex.gif && (
                  <span className="absolute right-1 top-1 inline-flex items-center gap-0.5 rounded bg-black/60 px-1 py-0.5 text-[9px] font-medium text-white">
                    <PlayCircle className="h-2.5 w-2.5" />
                    动图
                  </span>
                )}
                {ex.approx && (
                  <span className="absolute left-1 top-1 rounded bg-amber-500/90 px-1 py-0.5 text-[9px] font-bold text-white">
                    近似演示
                  </span>
                )}
                {!ex.gif && (
                  <span className="absolute left-1 top-1 rounded bg-black/50 px-1 py-0.5 text-[9px] font-medium text-white">
                    站上暂无演示
                  </span>
                )}
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
                {ex.gif ? (
                  <span className="mt-1 inline-flex items-center gap-0.5 text-[10px] font-medium text-primary">
                    <PlayCircle className="h-3 w-3" />
                    {ex.approx ? '近似演示·悬停播放' : '悬停看演示'}
                  </span>
                ) : (
                  <div className="mt-1 space-y-0.5">
                    <p className="text-[10px] text-muted-foreground">站上暂无演示</p>
                    <div className="flex flex-wrap items-center gap-x-2">
                      <a
                        href={SITE_SEARCH_URL}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-0.5 text-[10px] font-medium text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        站内搜索
                      </a>
                      <a
                        href={biliSearchUrl(ex)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-0.5 text-[10px] font-medium text-muted-foreground hover:underline"
                      >
                        <ExternalLink className="h-3 w-3" />
                        B 站
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 加载更多 */}
      {shown.length < filtered.length && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50"
          >
            加载更多（剩余 {filtered.length - shown.length} 个）
          </button>
        </div>
      )}

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
                <div className="flex shrink-0 flex-col gap-2">
                  {selected.gif ? (
                    <div className="flex flex-col gap-1">
                      <img
                        src={selected.gif}
                        alt={`${getCnName(selected) || selected.name}${selected.approx ? '（近似演示）' : ''} 演示动图`}
                        className="h-40 w-40 rounded-lg border border-border bg-muted/30 object-contain"
                      />
                      <span
                        className={
                          selected.approx
                            ? 'rounded bg-amber-500/90 px-1.5 py-0.5 text-center text-[10px] font-bold text-white'
                            : 'text-center text-[10px] text-muted-foreground'
                        }
                      >
                        {selected.approx ? '近似演示' : '站上同名演示'}
                      </span>
                    </div>
                  ) : (
                    selected.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${selected.name} ${i + 1}`}
                        className="h-32 w-32 rounded-lg border border-border bg-muted/30 object-contain"
                      />
                    ))
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    {getCnName(selected) || selected.name}
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
                    {selected.approx && (
                      <Badge className="bg-amber-500 text-white hover:bg-amber-500">近似演示</Badge>
                    )}
                    {!selected.gif && <Badge variant="outline">站上暂无演示</Badge>}
                  </div>
                  {selected.secondaryMuscles.length > 0 && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      <b className="text-foreground">协同肌群：</b>
                      {selected.secondaryMuscles.map((m) => MUSCLE_CN[m] || m).join('、')}
                    </div>
                  )}
                  {selected.source && (
                    <p className="mt-2 text-[11px] text-muted-foreground">
                      演示动图来源：{selected.source}
                    </p>
                  )}
                </div>
              </div>

              {selected.approx && (
                <div className="rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300">
                  <b>近似演示：</b>
                  动作百科站上没有收录这个动作的同名演示，此处展示的是站内最接近的
                  {selected.approxNote ? `「${selected.approxNote.replace(/^近似动作：/, '')}」` : '相关动作'}
                  动图。器械、握距或身体角度可能与标准动作有差异，仅供动作轨迹参考，请以上方文字步骤为准。
                </div>
              )}

              {!selected.gif && (
                <div className="rounded-md border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
                  <b className="text-foreground">站上暂无演示：</b>
                  动作百科（fitness.xingshuwen.com）站内暂无「{selected.name}」的演示动图，
                  可打开站内搜索并在搜索框粘贴英文名「{selected.name}」（站内支持英文原名检索），查看相关动作。
                </div>
              )}

              <div className="rounded-md border border-primary/20 bg-primary/5 p-3 text-xs text-primary">
                <b>安全提示：</b>在安全的范围内去运动。糖尿病、孕妇、老年人、大病初愈者优先遵从医嘱。出现头晕、关节刺痛、异常气短时立即停止。
              </div>

              {(() => {
                const vids = matchTanVideos(selected);
                if (!vids.length) return null;
                return (
                  <div className="rounded-lg border border-border bg-card p-3.5">
                    <h3 className="mb-2 flex items-center gap-2 font-display text-base font-bold text-foreground">
                      <PlayCircle className="h-4 w-4 text-primary" />
                      名师教学视频 · 谭成义
                      <span className="text-[10px] font-normal text-muted-foreground">（跳转原平台观看）</span>
                    </h3>
                    <div className="space-y-1.5">
                      {vids.map((v, vi) => (
                        <a
                          key={vi}
                          href={v.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-start gap-2 rounded-md border border-border bg-muted/30 p-2.5 transition-colors hover:border-primary/50"
                        >
                          <PlayCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-foreground group-hover:text-primary">
                              {v.title}
                            </span>
                            {v.note && (
                              <span className="block text-[11px] text-muted-foreground">{v.note}</span>
                            )}
                          </span>
                          <Badge variant="outline" className="shrink-0">{v.platform}</Badge>
                        </a>
                      ))}
                    </div>
                    <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                      视频版权归原作者谭成义所有，仅作学习参考。
                    </p>
                  </div>
                );
              })()}

              <div className="flex flex-wrap gap-2">
                {!selected.gif && (
                  <a
                    href={SITE_SEARCH_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    去动作百科站内搜索「{selected.name}」
                  </a>
                )}
                {selected.page && (
                  <a
                    href={selected.page}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/50"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {selected.approx ? '查看近似动作详情' : '查看动作百科详情'}
                  </a>
                )}
                <a
                  href={biliSearchUrl(selected)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  去 B 站搜索「{getCnName(selected) || selected.name}」教学视频
                </a>
                <a
                  href={SITE_HOME}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  访问动作百科
                </a>
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
