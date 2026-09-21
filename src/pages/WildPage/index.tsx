import { Card, CardContent } from '@/components/ui/card';
import { Mountain, Flame, Droplets, Tent, Compass, Sword, TreePine, Wind } from 'lucide-react';

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
