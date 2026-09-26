import { Link } from 'react-router-dom';
import {
  BookOpen,
  Calculator,
  CheckCircle2,
  Code2,
  HeartPulse,
  HelpCircle,
  Search,
  ShieldCheck,
  Smartphone,
  Database,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FaqRow {
  q: string;
  a: string;
}

const FAQS: FaqRow[] = [
  {
    q: '雄性意志是什么？为什么叫这个名字？',
    a: '雄性意志是一个「自然健身 + 意志训练」的免费开源系统：帮你设定目标（肌肥大 / 斗腕 / 大力士 / 综合体能 / 街头健身）、生成训练计划、查动作与营养、算 BMR / TDEE / 肌肉量上限。意志的内核是自我掌控、承担责任、持续精进、尊重他人——健身只是入口，网站还包含心智、事业、财富、关系、技能、荒野等板块，让身体与意志一起变强。',
  },
  {
    q: '数据是怎么算出来的？公式可信吗？',
    a: '所有计算都在你本地浏览器里完成，没有云端黑箱。基础代谢提供 6 个公式对照（Mifflin-St Jeor / Harris-Benedict / Katch-McArdle / Cunningham / FAO / Owen），蛋白质按瘦体重 × 系数（减脂 2.3、增肌 2.2、维持 1.8），肌肉量上限用 FFMI / Casey Butt / BuiltLean / Martin Berkham 对照，食物热效应默认 10%。全部为估算模型，误差常见 ±10–15%，优先看基于瘦体重的 Katch / Cunningham。详细来源见「内容来源与循证」页。',
  },
  {
    q: '我的数据存在哪里？会上传吗？',
    a: '数据只存在你当前浏览器的本地存储（localStorage）里，不注册账号、不上传服务器、不追踪行为。换设备或清理缓存前，请到首页底部「数据备份」卡片导出 JSON，之后可随时导入恢复。',
  },
  {
    q: 'AI 教练和拍照估热量怎么用？',
    a: '这两项都是「自带模型 Key 直连」模式：在对应页面填入你自己的大模型 API Key（如硅基流动，支持 Qwen 等开源模型），输入即调用、不经过本站服务器。未配置 Key 时页面会引导你填写。AI 建议仅供参考，不构成医疗建议。',
  },
  {
    q: '动作百科里搜不到某个动作怎么办？',
    a: '搜索支持动作名、部位、器械关键词（如「卧推」「背部」「杠铃」），也会自动匹配相近变式（如「窄距卧推」会带出「窄握卧推」）。实在没有的动作，可以用同部位、同器械的相近动作替代——动作库里的「替换建议」会帮你挑。',
  },
  {
    q: '手机和电脑都能用吗？',
    a: '能。本站是响应式设计，手机、平板、电脑打开同一个地址即可；动作视频链接在手机上也能直接跳转观看。',
  },
  {
    q: '这个网站是免费的吗？代码开源吗？',
    a: '完全免费、无付费墙。代码在 GitHub 上以 MIT 协议开源（仓库：xiongzhi-will），任何人都可以查看、部署、提交改进。',
  },
  {
    q: '有疾病、孕期、老年或大病初愈的人能用吗？',
    a: '本站只提供健康自然的健身方式，不提供任何极端和药物方案，请遵守当地法律法规。糖尿病及有相关疾病人群、孕妇、老年人、大病初愈者，优先遵从医嘱，不建议逞强。',
  },
];

export default function FaqPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="border-b border-border pb-4 sm:pb-5">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          About · 雄性意志
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          关于本站 · 常见问题
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          项目初衷、数据方法论、隐私边界与常见问题。本站只提供健康自然的健身方式，不提供任何极端和药物，并且请遵守当地的法律法规。
        </p>
      </header>

      {/* 理念四则 */}
      <section className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
        {[
          { icon: <HeartPulse className="h-4 w-4" />, title: '自然训练', desc: '不提供任何极端和药物，肌肉量上限按自然统计边界' },
          { icon: <ShieldCheck className="h-4 w-4" />, title: '数据本地', desc: '不上传、不追踪、无账号，隐私是默认配置' },
          { icon: <Calculator className="h-4 w-4" />, title: '口径透明', desc: '每个公式都可追溯来源，误差与局限写清楚' },
          { icon: <Code2 className="h-4 w-4" />, title: '免费开源', desc: 'MIT 协议公开，任何人都能部署与改进' },
        ].map((c) => (
          <Card key={c.title} className="border-border/50 bg-card/60 backdrop-blur-xl">
            <CardContent className="p-3 sm:p-4">
              <span className="text-primary">{c.icon}</span>
              <h3 className="mt-1.5 font-display text-sm font-bold text-foreground">{c.title}</h3>
              <p className="mt-1 text-xs leading-snug text-muted-foreground">{c.desc}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* FAQ 折叠列表 */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground sm:text-xl">
          <HelpCircle className="h-4 w-4 text-primary" />
          常见问题
        </h2>
        <div className="space-y-2.5">
          {FAQS.map((f, i) => (
            <Card key={i} className="border-border/50 bg-card/60 backdrop-blur-xl">
              <CardContent className="p-3 sm:p-5">
                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="flex items-start gap-1.5 text-sm font-semibold leading-snug text-foreground">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {f.q}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 快速入口 */}
      <section className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { icon: <BookOpen className="h-4 w-4" />, label: '内容来源与循证', to: '/sources' },
          { icon: <Database className="h-4 w-4" />, label: '隐私政策', to: '/privacy' },
          { icon: <Search className="h-4 w-4" />, label: '动作百科', to: '/library' },
          { icon: <Smartphone className="h-4 w-4" />, label: 'AI 教练', to: '/coach' },
        ].map((c) => (
          <Link key={c.to} to={c.to}>
            <Card className="border-border/50 bg-card/60 backdrop-blur-xl transition-colors hover:border-primary/40">
              <CardContent className="flex items-center gap-2 p-3 text-sm font-medium text-foreground sm:p-4">
                <span className="text-primary">{c.icon}</span>
                {c.label}
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <div className="rounded-md border border-border bg-muted/30 p-3 text-xs leading-relaxed text-muted-foreground">
        <Badge variant="outline" className="mr-2 border-primary/40 text-primary">
          免责声明
        </Badge>
        本站所有内容（含 AI 建议）仅供健身参考，不构成医疗建议、诊断或治疗方案。如有疾病、伤痛或特殊健康状况，请咨询医生。数据只存本地，可随时导出备份。
      </div>
    </div>
  );
}
