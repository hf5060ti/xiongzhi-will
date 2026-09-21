import { useEffect, useMemo, useRef, useState } from 'react';
import { Camera, Trash2, ShieldAlert, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// ---------- 数据：部位 × 类型 × 形态特征 × 优点 ----------
export interface PhysiqueType {
  id: string;
  name: string;
  trait: string; // 形态特征
  pros: string; // 优点
  iconPerson?: string; // 代表人物
  iconNote?: string; // 代表人物看点
}
export interface PhysiquePart {
  id: string;
  name: string;
  hint: string; // 拍摄建议
  types: PhysiqueType[];
}

export const PHYSIQUE_PARTS: PhysiquePart[] = [
  {
    id: 'chest',
    name: '胸肌',
    hint: '正面站立，手臂自然下垂，灯光均匀；同一姿势每隔 4–8 周拍一次。',
    types: [
      {
        id: 'square',
        name: '方胸',
        trait: '胸肌整体呈方形，上中下三块厚度接近，正面像两块"砖头"。',
        pros: '穿 T 恤撑得最满、正面最立体；比赛台上正面打分最高；卧推 / 飞鸟刺激最均衡。',
        iconPerson: '阿诺德·施瓦辛格',
        iconNote: '方胸教科书，上胸饱满、下缘清晰',
      },
      {
        id: 'angular',
        name: '八字胸',
        trait: '下胸外沿明显外扩，胸肌下沿呈 V 字弧线，锁骨下方内侧略有凹陷。',
        pros: '穿紧身衣有"线条感"；上胸视觉收缩、腰显窄；下胸厚度天生优势，双杠臂屈伸进步快。',
        iconPerson: '弗朗西斯·本霍伊斯',
        iconNote: '下胸外沿极度清晰，呈八字弧线',
      },
      {
        id: 'round',
        name: '圆形胸',
        trait: '整体圆润隆起，像两个半球，正面饱满但缺少棱角。',
        pros: '视觉上体积感强、充血后圆润饱满；穿圆领 T 恤最显大；新手最容易长出来的形态。',
        iconPerson: '弗莱克斯·惠勒',
        iconNote: '胸肌整体圆润饱满、像两个半球',
      },
      {
        id: 'teardrop',
        name: '水滴胸',
        trait: '下大上小，上胸薄弱，整体下垂感明显，像一滴水滴。',
        pros: '下胸厚度天然好、下沿清晰；缺点是上胸弱需要专门补上斜卧推，练出来后整体比例更协调。',
        iconPerson: '罗尼·库尔曼',
        iconNote: '下胸极厚，上胸相对偏薄的经典水滴型',
      },
      {
        id: 'mixed',
        name: '混合胸',
        trait: '介于方胸与水滴胸之间，上胸偏薄但下胸厚实，或左右略有不对称。',
        pros: '大多数人天然形态；可塑性最强，针对薄弱区（通常上胸）强化后容易过渡到方胸。',
        iconPerson: '菲尔·希思',
        iconNote: '从混合胸靠上斜卧推补成接近方胸',
      },
    ],
  },
  {
    id: 'biceps',
    name: '肱二头肌',
    hint: '侧面站立，手臂弯曲 90 度，握拳收紧；对比肌腹长度与肌峰高度。',
    types: [
      {
        id: 'long-belly',
        name: '长肌束型',
        trait: '肌腹长，从肩峰下方一直延伸到肘弯附近，肌峰偏低但线条长。',
        pros: '手臂围度上限高、充血后拉丝感强；弯举行程长、做功距离大；视觉上手臂"修长有料"。',
        iconPerson: '凯文·莱弗隆',
        iconNote: '长肌腹、拉丝感强，手臂线条修长',
      },
      {
        id: 'short-belly',
        name: '短肌束型',
        trait: '肌腹短而高，肌峰突出，手臂弯曲时像一座"小山包"。',
        pros: '弯举后视觉围度最大、肌峰立体；穿衣显粗；天生比例让手臂看起来比实际大一圈。',
        iconPerson: '李·普瑞斯特',
        iconNote: '肌峰高耸如小山头，手臂视觉围度极强',
      },
      {
        id: 'split',
        name: '分瓣型',
        trait: '肌腹中缝明显，二头分裂成两瓣甚至三瓣，像"马驹腿"。',
        pros: '清晰度最高、干身状态下最出片；比赛台上细节分高；需要低体脂 + 肌腹厚度同时到位。',
        iconPerson: '迈克·门泽尔',
        iconNote: '二头分瓣清晰、像马驹腿',
      },
    ],
  },
  {
    id: 'triceps',
    name: '肱三头肌',
    hint: '侧面 / 背面站立，手臂伸直放松；看三个头的分离度和外侧头形状。',
    types: [
      {
        id: 'horseshoe',
        name: '马蹄形',
        trait: '三个头明显分开，外侧头像马蹄铁一样扣在肱骨外侧，伸直时立体感最强。',
        pros: '三头最经典的形态；手臂伸直时 3D 感最强；臂围占比最大（三头占臂围约 2/3），马蹄形直接决定臂围上限。',
        iconPerson: '李·普瑞斯特',
        iconNote: '三头马蹄形教科书，外侧头如马蹄铁',
      },
      {
        id: 'sickle',
        name: '镰刀形',
        trait: '长头特别发达，从背后看像一把镰刀贴在背外侧，下垂感明显。',
        pros: '背面看手臂外侧轮廓长、从背到臂过渡自然；背阔肌下缘衔接好看；屈伸臂围视觉长。',
        iconPerson: '弗莱克斯·惠勒',
        iconNote: '长头从背后看如镰刀下垂',
      },
      {
        id: 'crab-claw',
        name: '蟹钳形',
        trait: '外侧头 + 长头都发达，从后侧上方看像蟹钳夹住肱骨，中间有明显凹槽。',
        pros: '从 3/4 后侧视角最立体；臂围视觉最粗；压臂屈伸 / 下压动作出效果最快。',
        iconPerson: '多里安·耶茨',
        iconNote: '后侧三头如蟹钳夹住肱骨',
      },
    ],
  },
  {
    id: 'back',
    name: '背部',
    hint: '背面自然站立，手臂微张；看肩宽与腰宽的比例。',
    types: [
      {
        id: 'v-taper',
        name: 'V 型',
        trait: '肩宽腰窄，背阔肌从腋下斜向腰收窄，经典倒三角。',
        pros: '穿任何衣服都显倒三角、腰显细；视觉上最有"健身感"；背阔肌宽度是主角，引体 / 划船重点。',
        iconPerson: '李·哈尼',
        iconNote: '八届奥赛先生，背阔宽度 V 型教科书',
      },
      {
        id: 't-block',
        name: 'T 型',
        trait: '整体宽度够但腰也粗，像一块横板。',
        pros: '厚度感强、背阔整体量足；视觉上稳重；腰偏粗需要靠减脂 / 腹斜肌训练收窄腰线。',
        iconPerson: '罗尼·库尔曼',
        iconNote: '背宽腰粗 T 型，靠整体厚度取胜',
      },
      {
        id: 'i-leaf',
        name: 'I 型',
        trait: '背部薄、宽度不够，正面看像一片叶子。',
        pros: '起点阶段，可塑性最强；重点加引体向上宽度变式（宽握正手）和划船重量，半年到一年能明显过渡到 V 型。',
        iconPerson: '—',
        iconNote: '起点形态，所有大神起步都是 I 型',
      },
    ],
  },
  {
    id: 'shoulders',
    name: '肩部',
    hint: '3/4 侧面站立，手臂自然下垂；看三角肌前中后三束的饱满度。',
    types: [
      {
        id: 'round',
        name: '圆形肩',
        trait: '三角肌前中后三束都饱满，从侧面看是一个圆球。',
        pros: '穿无袖最立体、肩宽显头小；腰细肩宽比例最上镜；中束是主角，侧平举决定宽度。',
        iconPerson: '阿诺德·施瓦辛格',
        iconNote: '三角肌三束 3D 饱满如球',
      },
      {
        id: 'flat',
        name: '平肩',
        trait: '三角肌中束宽但前束扁平，从正面看是一条横线。',
        pros: '正面肩线平直、穿正装好看；前束偏弱，重点练前平举和实力推即可补起来。',
        iconPerson: '弗兰克·赞恩',
        iconNote: '肩线平直、比例对称',
      },
      {
        id: 'uneven',
        name: '高低肩',
        trait: '左右肩一高一低，常见单侧训练失衡或姿势问题。',
        pros: '不是"天生的肩型"，而是体态问题；通过单侧弱侧多练、纠正姿势、放松上斜方肌可在数月内拉平。',
        iconPerson: '—',
        iconNote: '体态问题，可纠正，不算天赋型',
      },
    ],
  },
  {
    id: 'abs',
    name: '腹部',
    hint: '空腹、自然光下站立收腹；看分块与腹白线清晰度。',
    types: [
      {
        id: 'eight-pack',
        name: '八块清晰',
        trait: '上下腹四块都分块明显，腹白线 / 腹直肌腱划清楚。',
        pros: '腹直肌分块基因好、低体脂状态下最出片；上四块和下四块对称度高。',
        iconPerson: '弗兰克·赞恩',
        iconNote: '八块腹肌对称度教科书',
      },
      {
        id: 'four-pack',
        name: '四分块',
        trait: '上腹四块明显，下腹被腱划分成两块或一整块。',
        pros: '大多数人的天然形态；下腹需要更低体脂 + 吊杠举腿专门刺激才会清晰。',
        iconPerson: '—',
        iconNote: '大多数人天然形态',
      },
      {
        id: 'groove',
        name: '刀刻线',
        trait: '腹白线 / 腱划像刀刻一样深，但分块不一定多。',
        pros: '干身状态下最"锋利"；腹横肌收紧 + 体脂低的结果；视觉上比块数更显干。',
        iconPerson: '多里安·耶茨',
        iconNote: '腱划如刀刻、干度极高',
      },
      {
        id: 'v-line',
        name: '人鱼线明显',
        trait: '腹外斜肌与腹股沟形成 V 字线，人鱼线清晰。',
        pros: '穿低腰裤最性感；绳索伐木 / 侧腹训练重点；体脂男性约 12% 以下才会显现。',
        iconPerson: '杰森·斯塔森',
        iconNote: '人鱼线 + 低体脂经典',
      },
    ],
  },
  {
    id: 'legs',
    name: '腿部',
    hint: '侧面 / 背面站立，自然站直；看股四头肌分离度与小腿三头肌。',
    types: [
      {
        id: 'quad-separate',
        name: '股四分离',
        trait: '股四头肌四个头（股直肌 / 股外侧肌 / 股内侧肌 / 股中间肌）分离度好，像四根柱子。',
        pros: '腿训水平最高的标志；深蹲 / 腿举 / 腿屈伸都到位才会出；穿短裤最立体。',
        iconPerson: '汤姆·普拉茨',
        iconNote: '腿王，股四头肌分离度史上第一',
      },
      {
        id: 'ham-string',
        name: '股二突出',
        trait: '大腿后侧股二头肌突出，背面看大腿后侧有"双沟"。',
        pros: '背面比例好、腘绳肌强；硬拉 / 罗马尼亚硬拉进步快；前后侧平衡、膝盖稳定。',
        iconPerson: '罗尼·库尔曼',
        iconNote: '股二头肌与股四头肌背面双沟',
      },
      {
        id: 'calf',
        name: '小腿三头明显',
        trait: '腓肠肌两个头 + 比目鱼肌清晰，提踵后像两个圆球。',
        pros: '小腿是基因决定的部位，但训练痕迹明显的小腿视觉上最"练过"；站姿提踵重点。',
        iconPerson: '弗莱克斯·惠勒',
        iconNote: '小腿三头肌两个头如圆球',
      },
    ],
  },
];

// ---------- localStorage ----------
const NS = 'fitness-goal-app';
const KEY = 'physique-entries';

interface Entry {
  id: string;
  date: string; // ISO
  partId: string;
  typeId: string;
  image: string; // base64 data URL
  note?: string;
}

function load(): Entry[] {
  try {
    const raw = localStorage.getItem(`${NS}:${KEY}`);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
function save(entries: Entry[]) {
  localStorage.setItem(`${NS}:${KEY}`, JSON.stringify(entries));
}

// ---------- 页面 ----------
export default function PhysiquePage() {
  const [partId, setPartId] = useState(PHYSIQUE_PARTS[0].id);
  const [typeId, setTypeId] = useState<string>('');
  const [note, setNote] = useState('');
  const [image, setImage] = useState<string>('');
  const [entries, setEntries] = useState<Entry[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEntries(load());
  }, []);

  const part = useMemo(() => PHYSIQUE_PARTS.find((p) => p.id === partId)!, [partId]);
  const history = useMemo(
    () => entries.filter((e) => e.partId === partId).sort((a, b) => b.date.localeCompare(a.date)),
    [entries, partId],
  );

  const onPickImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      // 压缩到最长边 1200，避免 localStorage 撑爆
      const img = new Image();
      img.onload = () => {
        const max = 1200;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setImage(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSave = () => {
    if (!typeId) return;
    const entry: Entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      date: new Date().toISOString(),
      partId,
      typeId,
      image,
      note: note.trim() || undefined,
    };
    const next = [...entries, entry];
    save(next);
    setEntries(next);
    setNote('');
    setImage('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const onDelete = (id: string) => {
    const next = entries.filter((e) => e.id !== id);
    save(next);
    setEntries(next);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="font-display text-3xl font-extrabold tracking-wide text-foreground">形体记录</h1>
        <p className="text-sm text-muted-foreground">
          记录每个部位的肌肉形态类型。形状由基因决定，没有好坏——知道自己是哪一种，才知道该重点练哪里。
        </p>
      </header>

      {/* 部位 tab */}
      <div className="flex flex-wrap gap-1.5">
        {PHYSIQUE_PARTS.map((p) => (
          <Badge
            key={p.id}
            variant={p.id === partId ? 'default' : 'outline'}
            className={cn('cursor-pointer select-none px-3 py-1.5 text-sm', p.id !== partId && 'hover:bg-accent')}
            onClick={() => setPartId(p.id)}
          >
            {p.name}
          </Badge>
        ))}
      </div>

      {/* 类型参考 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-primary" />
            {part.name}的常见形态
          </CardTitle>
          <p className="text-xs text-muted-foreground">拍摄建议：{part.hint}</p>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {part.types.map((t) => {
            const active = typeId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTypeId(t.id)}
                className={cn(
                  'flex flex-col gap-1.5 rounded-lg border p-3.5 text-left transition-colors',
                  active
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/40 hover:bg-accent',
                )}
              >
                <span className="font-display text-lg font-bold tracking-wide text-foreground">
                  {t.name}
                </span>
                <span className="text-xs leading-relaxed text-muted-foreground">{t.trait}</span>
                {t.iconPerson && (
                  <span className="mt-0.5 inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px]">
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 font-medium text-primary">
                      代表：{t.iconPerson}
                    </span>
                    {t.iconNote && (
                      <span className="text-muted-foreground">{t.iconNote}</span>
                    )}
                  </span>
                )}
                <span className="mt-0.5 text-xs leading-relaxed text-primary/90">
                  <b className="font-semibold">优点：</b>
                  {t.pros}
                </span>
              </button>
            );
          })}
        </CardContent>
      </Card>

      {/* 录入 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Camera className="h-4 w-4 text-primary" />
            记录今天的{part.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            已选形态：
            {typeId ? (
              <b className="text-foreground">{part.types.find((t) => t.id === typeId)?.name}</b>
            ) : (
              <span className="text-warning">先在上方点选一个最接近的类型</span>
            )}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="w-full sm:w-64">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="user"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onPickImage(f);
                }}
                className="block w-full text-xs text-muted-foreground file:mr-2 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary hover:file:bg-primary/20"
              />
              {image ? (
                <img src={image} alt="预览" className="mt-2 w-full rounded-md border border-border object-cover" />
              ) : (
                <p className="mt-2 text-xs text-muted-foreground">照片存在本机浏览器，不上传服务器。</p>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <Input
                placeholder="备注（可选）：如「充血状态」「刚练完」「早晨空腹」"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button
                type="button"
                onClick={onSave}
                disabled={!typeId}
                className="w-full sm:w-auto"
              >
                保存记录
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 历史 */}
      {history.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
          还没有{part.name}的记录。第一次拍一张、选个类型，保存后就能长期对比。
        </p>
      ) : (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{part.name}的历史记录</CardTitle>
            <p className="text-xs text-muted-foreground">按时间倒序，越新的越靠前。</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {history.map((e) => {
                const t = part.types.find((x) => x.id === e.typeId);
                return (
                  <div key={e.id} className="relative overflow-hidden rounded-lg border border-border bg-card">
                    {e.image ? (
                      <img src={e.image} alt={t?.name} className="h-44 w-full object-cover" />
                    ) : (
                      <div className="flex h-44 items-center justify-center bg-muted/40 text-xs text-muted-foreground">
                        未上传照片
                      </div>
                    )}
                    <div className="p-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-bold text-foreground">{t?.name}</span>
                        <button
                          type="button"
                          onClick={() => onDelete(e.id)}
                          className="text-muted-foreground hover:text-destructive"
                          title="删除这条记录"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {new Date(e.date).toLocaleString('zh-CN')}
                      </p>
                      {e.note && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{e.note}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <p className="flex items-start gap-2 rounded-md border border-warning/40 bg-warning/5 p-3 text-[11px] leading-relaxed text-muted-foreground">
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
        <span>
          <b className="font-semibold text-foreground">说明：</b>
          肌肉形态（肌腹长度、分瓣、胸型、肩型）主要由基因决定，训练能改变厚度和清晰度，但很难改变"形状"本身。
          本板块用于长期记录与观察，不构成任何医疗 / 矫形建议；照片仅存于你本机浏览器 localStorage，换设备或清缓存会丢失。
        </span>
      </p>
    </div>
  );
}
