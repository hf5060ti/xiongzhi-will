import { Card, CardContent } from '@/components/ui/card';
import { Mountain, Flame, Droplets, Tent, Compass, Sword, TreePine, Wind, Wrench, Axe, Sparkles } from 'lucide-react';

export default function WildPage() {
  return (
    <div className="space-y-8">
      <header className="border-b border-border pb-5">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Wild · 荒野
        </p>
        <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight text-foreground">
          回到荒野，找回人该有的样子
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          健身房里练的是肌肉，荒野里练的是本能。远离城市，才知道自己到底是谁。
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <WildCard
          icon={<Mountain className="h-5 w-5" />}
          title="徒步与登山"
          items={[
            '知道怎么看地图——GPS 没电了你还有指南针',
            '路线规划：先走 10 公里，再走 20 公里，别一上来就长线',
            '带够水——野外找不到干净水源',
            '天气变化快，带冲锋衣，哪怕是晴天',
          ]}
        />
        <WildCard
          icon={<Tent className="h-5 w-5" />}
          title="露营与庇护"
          items={[
            '搭帐篷是基本功——30 分钟内必须搭完',
            '营地选在高处，别在河床、悬崖下扎营',
            '防潮垫比睡袋重要——地面的寒意会穿透一切',
            '别在营地内生大火，小炉足够',
          ]}
        />
        <WildCard
          icon={<Flame className="h-5 w-5" />}
          title="生火"
          items={[
            '打火机、火柴、打火石——至少带两种',
            '别用汽油引火——会炸',
            '火堆三堆品排列，好烧又好控制',
            '离开前必须把火彻底浇灭——别留火种',
          ]}
        />
        <WildCard
          icon={<Droplets className="h-5 w-5" />}
          title="找水与净水"
          items={[
            '流动的水比死水安全，但都要净化',
            '净水片、过滤吸管、煮沸——至少带一种',
            '别喝溪水——看着干净，里面有寄生虫',
            '植物根部、岩石下、低洼处——可能有水',
          ]}
        />
        <WildCard
          icon={<Compass className="h-5 w-5" />}
          title="导航与方向"
          items={[
            '指南针 + 地图，比 GPS 可靠',
            '太阳东升西落，阴天也能靠影子定方向',
            '走丢了别慌——原地等，别乱走',
            '进山前告诉别人你去哪、什么时候回来',
          ]}
        />
        <WildCard
          icon={<Sword className="h-5 w-5" />}
          title="防身与格斗"
          items={[
            '最好的防身是——别去危险的地方',
            '跑比打重要——你打不过所有人',
            '真遇到事，大声喊、制造混乱、往人多的地方跑',
            '冷兵器训练的意义是——有准备，不是去打架',
          ]}
        />
        <WildCard
          icon={<TreePine className="h-5 w-5" />}
          title="可食用植物"
          items={[
            '不确定的别吃——野外中毒没有解药',
            '蒲公英、荨麻、松树皮——常见可食用',
            '颜色鲜艳的蘑菇——别碰',
            '学 5 种可食用植物，比背 100 种有用',
          ]}
        />
        <WildCard
          icon={<Wind className="h-5 w-5" />}
          title="独处与自然连接"
          items={[
            '每年至少独自进山一次——不带手机',
            '在荒野里待一天，比在健身房练一年更懂自己',
            '安静下来，你会听见自己真正想要什么',
            '自然不是敌人，它只是不在乎你——这就是真相',
          ]}
        />
      </div>

      {/* 工具与装备 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" />
          <h2 className="font-display text-2xl font-bold tracking-wide text-foreground">工具与装备</h2>
        </div>

        {/* 钢材知识 */}
        <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
          <CardContent className="p-6">
            <h3 className="font-display text-xl font-bold text-foreground">钢材分类与用途</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <SteelCard
                name="高碳钢（>0.6%）"
                hard="硬，保持锋利"
                cons="脆，容易生锈、崩口"
                best="生存刀、直刀、需要保持锋利的切削工具"
              />
              <SteelCard
                name="中碳钢（0.3–0.6%）"
                hard="韧性与硬度平衡"
                cons="硬度中等，需要经常磨"
                best="斧头、砍刀、野营刀——最实用的选择"
              />
              <SteelCard
                name="低碳钢（<0.3%）"
                hard="韧，不易断"
                cons="软，容易卷刃、不锋利"
                best="撬棍、开山刀、需要耐冲击的工具"
              />
            </div>
          </CardContent>
        </Card>

        {/* 生存刀 */}
        <WildCard
          icon={<Sword className="h-5 w-5" />}
          title="生存刀"
          items={[
            '直刀比折刀可靠——折刀的轴是弱点',
            '刀长 10–15cm 最合适——太短砍不动，太长不好带',
            '刃厚 4–5mm——太薄会弯，太重背着累',
            '全龙骨（tang）——刀柄和刀身是一整块钢，不断',
            '手柄材料：米卡塔、G10——防滑、不吸水、耐腐蚀',
            '别用生存刀切电线、撬东西——那不是它的活',
          ]}
        />

        {/* 斧头 */}
        <WildCard
          icon={<Axe className="h-5 w-5" />}
          title="斧类"
          items={[
            '手斧（hatchet）：1kg 左右，单手用，砍小树、处理树枝',
            '短柄斧：1.5kg，双手握，劈柴、清理营地',
            '长柄斧：2kg+，专门劈柴，不适合徒步带',
            '斧刃角度：25°–30°——太钝砍不动，太锋利容易崩',
            '斧头用中碳钢——韧性好，砍硬木不会崩口',
            '别用斧头砍金属、石头——刃口会废',
          ]}
        />

        {/* 打火工具 */}
        <WildCard
          icon={<Sparkles className="h-5 w-5" />}
          title="打火工具"
          items={[
            '打火机：最方便，但天冷、高海拔会失效',
            '火柴：防水火柴最好，普通火柴怕潮',
            '打火石（镁棒）：不怕水、不怕低温，就是需要技巧',
            '火镰：传统方式，最可靠，但火花小',
            '至少带两种——打火机 + 打火石',
            '引火物：桦树皮、火绒、棉花球——比直接点木头容易 100 倍',
          ]}
        />
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-6">
          <h2 className="font-display text-xl font-bold text-primary">荒野底线</h2>
          <div className="mt-4 space-y-2 text-sm text-foreground/90">
            <p>· 别逞强——你不是贝爷，你会死在山里</p>
            <p>· 别单独去未开发的野山——至少两人同行</p>
            <p>· 天气不好就改期——山永远在，命只有一条</p>
            <p>· 带走所有垃圾——荒野不是垃圾桶</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SteelCard({ name, hard, cons, best }: { name: string; hard: string; cons: string; best: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-background/40 p-3">
      <h4 className="font-display text-base font-bold text-primary">{name}</h4>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        <b className="text-foreground">特点：</b>{hard}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        <b className="text-foreground">缺点：</b>{cons}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        <b className="text-foreground">适合：</b>{best}
      </p>
    </div>
  );
}

function WildCard({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
      <CardContent className="p-5">
        <div className="flex items-center gap-2">
          <span className="text-primary">{icon}</span>
          <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
        </div>
        <ul className="mt-3 space-y-1.5">
          {items.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-primary" />
              {p}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
