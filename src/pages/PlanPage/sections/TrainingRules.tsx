import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dumbbell, Timer, Egg, Repeat, ShieldAlert } from 'lucide-react';

export default function TrainingRules() {
  const [restDay, setRestDay] = useState(false);
  const [fasting, setFasting] = useState(false);
  const [doubleDay, setDoubleDay] = useState(false);

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Dumbbell className="h-5 w-5 text-primary" />
        <h2 className="font-display text-2xl font-bold tracking-wide text-foreground">
          训练法则与进阶策略
        </h2>
      </div>
      <p className="text-sm text-muted-foreground">
        基础训练架构之上，你可以叠加以下策略。选你需要的，不选也不影响基础计划。
      </p>

      <Tabs defaultValue="rest">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <TabsTrigger value="rest">练一休一</TabsTrigger>
          <TabsTrigger value="fasting">轻断食</TabsTrigger>
          <TabsTrigger value="protein">蛋白质摄入</TabsTrigger>
          <TabsTrigger value="double">一天两练</TabsTrigger>
        </TabsList>

        {/* 练一休一 */}
        <TabsContent value="rest" className="space-y-4">
          <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-foreground">练一休一（Full Body × Rest）</h3>
                <Button
                  size="sm"
                  variant={restDay ? 'default' : 'outline'}
                  onClick={() => setRestDay(!restDay)}
                >
                  {restDay ? '已启用' : '启用'}
                </Button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                每次训练练全身，练一天、歇一天。一周练 3–4 次。
              </p>
              <div className="mt-4 space-y-3">
                <RuleBlock
                  title="适合人群"
                  items={[
                    "每周只能去 3–4 次健身房的人",
                    "恢复能力强、年龄在 30 岁以下",
                    "想要快速积累训练量的初学者",
                  ]}
                />
                <RuleBlock
                  title="好处"
                  items={[
                    "每个肌群每周被刺激 2–3 次，频率高、增肌快",
                    "训练密度大，单次要练全身所有主要肌群",
                    "时间利用率高——少跑几次健身房",
                    "神经募集效率高，动作熟练快",
                  ]}
                />
                <RuleBlock
                  title="注意事项"
                  items={[
                    "单次训练时长可以达到 2 小时，具体根据个人恢复能力调整",
                    "如果连续两周关节酸痛、睡眠变差，降级为练二休一或练三休一",
                    "不适合年龄 35+ 或恢复能力差的人",
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 轻断食 */}
        <TabsContent value="fasting" className="space-y-4">
          <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-foreground">轻断食（16:8 / 14:10）</h3>
                <Button
                  size="sm"
                  variant={fasting ? 'default' : 'outline'}
                  onClick={() => setFasting(!fasting)}
                >
                  {fasting ? '已启用' : '启用'}
                </Button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                每天禁食 14–16 小时，进食窗口压缩到 8–10 小时。
              </p>
              <div className="mt-4 space-y-3">
                <RuleBlock
                  title="14 小时断食（入门）"
                  items={[
                    "比如晚 8 点吃完 → 第二天早 10 点吃早餐",
                    "对训练表现影响小，容易坚持",
                    "有一定的胰岛素敏感性提升效果",
                  ]}
                />
                <RuleBlock
                  title="16 小时断食（进阶）"
                  items={[
                    "比如晚 8 点吃完 → 第二天早 12 点吃第一餐",
                    "生长激素分泌更旺盛，脂肪代谢效率更高",
                    "自噬（细胞自清洁）激活更明显",
                    "空腹训练建议喝淡盐水，防止抽筋",
                  ]}
                />
                <RuleBlock
                  title="注意事项"
                  items={[
                    "增肌期不建议长期 16:8，蛋白质合成窗口被压缩",
                    "训练日最好把训练放在进食窗口内或刚结束断食时",
                    "有胃病、糖尿病、低血糖的人慎用",
                    "断食期间可以喝水、黑咖啡、无糖茶，不能喝热量饮料",
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 蛋白质摄入 */}
        <TabsContent value="protein" className="space-y-4">
          <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
            <CardContent className="p-4 sm:p-6">
              <h3 className="font-display text-xl font-bold text-foreground">
                每公斤瘦体重该吃多少蛋白质？
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                按训练年限分级，不要一上来就吃最高量——过量蛋白质不被吸收，只会增加肾脏负担。
              </p>
              <div className="mt-4 space-y-3">
                <ProteinRow
                  level="新手（0–1 年）"
                  amount="1.5 g / kg 瘦体重"
                  desc="刚开始训练，肌肉合成效率高，不需要吃太多就够。吃多了浪费。"
                />
                <ProteinRow
                  level="中级（1–3 年）"
                  amount="1.8 g / kg 瘦体重"
                  desc="大多数健身者的标准线。够用、经济、肾脏负担小。"
                />
                <ProteinRow
                  level="高级（3 年+ / 备赛期）"
                  amount="2.4–3.1 g / kg 瘦体重"
                  desc="肌肉接近上限、需要极致保留肌肉时才吃到这个量。普通人别照搬。"
                />
              </div>
              <div className="mt-4 rounded-xl border border-warning/40 bg-warning/5 p-3 text-xs leading-relaxed text-muted-foreground">
                <b className="text-foreground">例子：</b>
                体重 80kg、体脂 25% → 瘦体重 60kg。
                新手吃 60×1.5 = 90g；中级吃 60×1.8 = 108g；高级吃 60×2.4 = 144g。
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 一天两练 */}
        <TabsContent value="double" className="space-y-4">
          <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-foreground">一天两练（Split in Two）</h3>
                <Button
                  size="sm"
                  variant={doubleDay ? 'default' : 'outline'}
                  onClick={() => setDoubleDay(!doubleDay)}
                >
                  {doubleDay ? '已启用' : '启用'}
                </Button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                早晚各练一次，每次 45–60 分钟。允许，但要严格看恢复。
              </p>
              <div className="mt-4 space-y-3">
                <RuleBlock
                  title="什么时候适合"
                  items={[
                    "备赛期需要堆积训练量",
                    "某一天的计划被推迟，必须补回来",
                    "早练技术动作（神经要求高），晚练力量（状态好）",
                  ]}
                />
                <RuleBlock
                  title="红线（必须遵守）"
                  items={[
                    "两练间隔至少 6 小时，让神经系统恢复",
                    "总训练时长单次最高 70 分钟左右，超过这个时间就是垃圾容量，只影响恢复，完全没用（除非是长跑等有氧耐力运动），具体根据个人恢复情况调整",
                    "连续两练期间，睡眠保持 8–9 小时，因人而异，恢复不够就停",
                    "出现持续疲劳、关节酸痛、睡眠变差 → 立刻回到一天一练",
                  ]}
                />
                <RuleBlock
                  title="不适合的人"
                  items={[
                    "训练不到 1 年的新手",
                    "年龄 35+ 恢复能力下降的人",
                    "睡眠不足 7 小时、压力大、生病初愈者",
                  ]}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <p className="flex items-start gap-2 rounded-xl border border-warning/40 bg-warning/5 p-3 text-[11px] leading-relaxed text-muted-foreground">
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
        <span>
          以上策略为进阶选项，基础计划已经足够绝大多数人增肌。如果你不确定自己适不适合，先按基础计划练 3 个月，再考虑叠加这些。
        </span>
      </p>
    </section>
  );
}

function RuleBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-border/50 bg-background/40 p-3">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <ul className="mt-1.5 space-y-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-primary" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProteinRow({ level, amount, desc }: { level: string; amount: string; desc: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-background/40 p-3">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-semibold text-foreground">{level}</p>
        <p className="font-display text-lg font-bold text-primary">{amount}</p>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
