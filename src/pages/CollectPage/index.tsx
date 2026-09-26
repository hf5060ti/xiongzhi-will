import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Bookmark, Sparkles, Trash2, Download, Link2, User, FileText } from 'lucide-react';

/* ─────────────────────────────────────────────
 * 收藏导入 · 本地智能分类总结
 * 合规设计：不做自动爬取，由你手动把抖音收藏的
 * 「分享文本」粘贴进来，本站解析标题/作者/链接，
 * 按训练部位、饮食、心智等维度分类并生成总结。
 * 数据只存在你自己的浏览器 localStorage 里。
 * ───────────────────────────────────────────── */

const STORE_KEY = 'xiongzhi-collect-items';

interface CollectItem {
  id: string;
  raw: string;
  title: string;
  author: string;
  url: string;
  category: string;
  createdAt: string; // ISO
}

interface CategoryDef {
  key: string;
  label: string;
  keywords: string[];
}

const CATEGORIES: CategoryDef[] = [
  { key: 'chest', label: '胸部训练', keywords: ['卧推', '胸', '夹胸', '飞鸟', '俯卧撑'] },
  { key: 'back', label: '背部训练', keywords: ['划船', '引体', '硬拉', '背', '下拉'] },
  { key: 'shoulders', label: '肩部训练', keywords: ['推举', '肩', '侧平举', '前平举', '飞鸟'] },
  { key: 'arms', label: '手臂训练', keywords: ['弯举', '臂', '三头', '二头', '锤式', '屈伸'] },
  { key: 'legs', label: '腿部训练', keywords: ['深蹲', '蹲', '腿', '臀', '腘绳', '股四头', '提踵', '箭步'] },
  { key: 'abs', label: '核心腹部', keywords: ['卷腹', '举腿', '核心', '腹', '平板', '旋转'] },
  { key: 'cardio', label: '有氧体能', keywords: ['跑步', '跑', '跳绳', '拳击', '游泳', '骑行', '有氧', '体能', '爬楼', '剑道', '刀', '斧', '冷兵器'] },
  { key: 'diet', label: '饮食营养', keywords: ['蛋白', '碳水', '脂肪', '增肌', '减脂', '食谱', '食物', '营养', '维生素', '补剂', '吃', '餐', '热量', '生酮', '碳循环'] },
  { key: 'mind', label: '心智意志', keywords: ['冥想', '心态', '压力', '自律', '习惯', '意志', '情绪', '专注', '拖延', '日记', '哲学'] },
  { key: 'wealth', label: '财富事业', keywords: ['赚钱', '存钱', '投资', '理财', '副业', '创业', '职场', '谈判', '写作', '编程'] },
  { key: 'wild', label: '荒野生存', keywords: ['生存', '户外', '露营', '打火', '刀具', '钢材', '荒野', '急救', '防身'] },
];

const CATEGORY_FALLBACK: Record<string, string> = {
  chest: '胸部训练', back: '背部训练', shoulders: '肩部训练', arms: '手臂训练',
  legs: '腿部训练', abs: '核心腹部', cardio: '有氧体能', diet: '饮食营养',
  mind: '心智意志', wealth: '财富事业', wild: '荒野生存', other: '其他',
};

function classify(text: string): string {
  const t = text.toLowerCase();
  for (const c of CATEGORIES) {
    if (c.keywords.some((k) => t.includes(k.toLowerCase()))) return c.key;
  }
  return 'other';
}

/** 健身相关关键词：只有命中这些的内容才是健身视频，其余自动过滤 */
const FITNESS_KEYWORDS = [
  // 训练动作
  '卧推', '深蹲', '硬拉', '引体', '划船', '推举', '弯举', '臂屈伸', '侧平举', '前平举',
  '飞鸟', '夹胸', '俯卧撑', '双杠', '卷腹', '举腿', '平板支撑', '箭步', '提踵',
  '农夫走', '泽奇', '土耳其起立', '悬垂', '耸肩', '面拉', '对握', '正手', '反手',
  // 训练概念
  '增肌', '减脂', '肌肉', '力量', '训练', '组', '次', '容量', '力竭', 'PR',
  '重量', '杠铃', '哑铃', '龙门架', '史密斯', '壶铃', '战绳', '弹力带', '自重',
  '胸', '背', '肩', '臂', '腿', '臀', '腹', '核心', '腘绳', '股四头', '二头', '三头',
  '分化', '周期化', '减载', '空腹训练', '练一休一', '轻断食', '金字塔',
  // 有氧与冷兵器
  '跑步', '跳绳', '拳击', '游泳', '骑行', '有氧', '体能', '爬楼', '马拉松',
  '剑道', '唐刀', '武士刀', '苗刀', '长枪', '斧头', '刀具', '冷兵器',
  // 饮食营养
  '蛋白', '碳水', '脂肪', '食谱', '食物', '营养', '维生素', '补剂', '热量',
  '生酮', '碳循环', '肌酸', '蛋白粉', '增肌粉', '减脂餐', '健康餐', '吃', '餐',
  '牛里脊', '鸡胸', '鸡蛋', '牛奶', '三文鱼', '牛肉', '酱牛肉', '卤鸡腿',
  // 身体数据
  '体重', '体脂', 'FFMI', 'BMR', 'TDEE', '围度', '体态', '瘦体重',
  // 健身账号常见词
  '健身', '教练', '自然健身', '雄性意志',
];

function isFitnessRelevant(text: string): boolean {
  const t = text.toLowerCase();
  return FITNESS_KEYWORDS.some((k) => t.includes(k.toLowerCase()));
}

/** 解析一行抖音分享文本：提取标题 / 作者 / 链接 */
function parseShareLine(line: string): { title: string; author: string; url: string } {
  const urlMatch = line.match(
    /https?:\/\/(?:v\.douyin\.com\/[^\s，。、）)\]；;]+|www\.douyin\.com\/video\/[^\s，。、）)\]；;]+)/,
  );
  const url = urlMatch ? urlMatch[0] : '';
  const authorMatch = line.match(/【([^】]+)的作品】/);
  const author = authorMatch ? authorMatch[1] : '';
  // 标题候选：先取链接后面的文字，再取【作者的作品】与链接之间的文字
  let title = '';
  if (url) {
    const idx = line.indexOf(url);
    const after = line.slice(idx + url.length).replace(/复制此链接.*$/s, '').replace(/[，。！？、\s]+$/g, '').trim();
    const before = line.slice(0, idx);
    const between = (() => {
      const am = before.match(/【[^】]+的作品】\s*(.+)$/);
      return am ? am[1].trim() : '';
    })();
    title = after || between;
  }
  if (!title) {
    // 无链接时的降级：去掉“复制打开抖音”等平台话术
    title = line
      .replace(/^\d+(\.\d+)?\s*/, '')
      .replace(/复制打开抖音.*$/s, '')
      .replace(/【[^】]+的作品】/, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[，。！？、；：]+$/, '')
      .trim();
  }
  // 标题里若还残留平台话术再清一遍
  title = title.replace(/^.*?看看/, '').replace(/，.*?直接观看视频$/, '').trim();
  if (!title) title = line.trim().slice(0, 40) || '未命名收藏';
  return { title: title.slice(0, 60), author, url };
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function loadItems(): CollectItem[] {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function saveItems(items: CollectItem[]) {
  localStorage.setItem(STORE_KEY, JSON.stringify(items));
}

/** 周维度分组：ISO 周（周一为一周开始） */
function weekKey(iso: string): string {
  const d = new Date(iso);
  const day = (d.getDay() + 6) % 7; // 周一=0
  const monday = new Date(d);
  monday.setDate(d.getDate() - day);
  return monday.toISOString().slice(0, 10);
}

function formatWeek(isoWeek: string): string {
  const d = new Date(`${isoWeek}T00:00:00`);
  const end = new Date(d);
  end.setDate(d.getDate() + 6);
  const fmt = (x: Date) => `${x.getMonth() + 1}月${x.getDate()}日`;
  return `${fmt(d)} - ${fmt(end)}`;
}

export default function CollectPage() {
  const [text, setText] = useState('');
  const [items, setItems] = useState<CollectItem[]>([]);
  const [notice, setNotice] = useState('');
  const [onlyFitness, setOnlyFitness] = useState(true); // 默认只收健身相关

  useEffect(() => {
    setItems(loadItems());
  }, []);

  const persist = (next: CollectItem[]) => {
    setItems(next);
    saveItems(next);
  };

  /** 批量导入：按行切分，解析 + 分类 + 健身相关过滤 */
  const importText = () => {
    const lines = text.split(/\n+/).map((s) => s.trim()).filter(Boolean);
    if (lines.length === 0) return;
    const now = new Date().toISOString();
    const added: CollectItem[] = [];
    let filtered = 0;
    for (const line of lines) {
      const { title, author, url } = parseShareLine(line);
      const full = `${title} ${author} ${line}`;
      // 过滤：只保留健身相关内容
      if (onlyFitness && !isFitnessRelevant(full)) {
        filtered++;
        continue;
      }
      added.push({
        id: makeId(),
        raw: line.slice(0, 200),
        title,
        author,
        url,
        category: classify(full),
        createdAt: now,
      });
    }
    persist([...added, ...items]);
    const filterMsg = filtered > 0 ? `，已自动过滤 ${filtered} 条非健身内容` : '';
    setNotice(`已导入 ${added.length} 条健身相关收藏${filterMsg}（重复内容请自行检查，本站不去重）`);
    setText('');
  };

  const removeItem = (id: string) => persist(items.filter((i) => i.id !== id));
  const clearAll = () => {
    if (window.confirm('确定清空全部收藏记录？此操作不可撤销。')) {
      persist([]);
      setNotice('已清空全部收藏记录');
    }
  };

  /** 导出为 JSON（与其他备份一致，含版本号便于未来迁移） */
  const exportJson = () => {
    const payload = {
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      items,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `雄性意志-收藏-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  /** 本地规则生成周总结（诚实标注：非云端 AI，为本地关键词统计） */
  const weeklySummary = useMemo(() => {
    const groups: Record<string, CollectItem[]> = {};
    for (const it of items) {
      const wk = weekKey(it.createdAt);
      (groups[wk] = groups[wk] || []).push(it);
    }
    const weeks = Object.keys(groups).sort((a, b) => b.localeCompare(a));
    if (weeks.length === 0) return null;
    const wk = weeks[0];
    const list = groups[wk];
    const byCat: Record<string, number> = {};
    for (const it of list) byCat[it.category] = (byCat[it.category] || 0) + 1;
    const total = list.length;
    const top = Object.entries(byCat).sort((a, b) => b[1] - a[1]).slice(0, 3);
    const topText = top.map(([k, n]) => `${CATEGORY_FALLBACK[k] || k} ${n} 条`).join('、');
    const itemsText = list.slice(0, 5).map((i) => `· ${i.title}`).join('\n');
    const sum = `本周（${formatWeek(wk)}）你收藏了 ${total} 条内容，主要集中在：${topText}。\n\n最近收藏：\n${itemsText}\n\n提示：收藏只是起点——建议从里面挑 1-2 个动作或 1 个食谱，本周实际执行一次，比收藏 100 条更有用。`;
    return { week: wk, weekLabel: formatWeek(wk), total, byCat, sum };
  }, [items]);

  const groups = useMemo(() => {
    const g: Record<string, CollectItem[]> = {};
    for (const it of items) {
      const wk = weekKey(it.createdAt);
      (g[wk] = g[wk] || []).push(it);
    }
    return Object.keys(g).sort((a, b) => b.localeCompare(a));
  }, [items]);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="font-display text-3xl font-extrabold tracking-wide text-foreground">收藏导入</h1>
        <p className="text-sm text-muted-foreground">
          把抖音收藏的「分享文本」粘贴进来（一次可粘多条），本站解析标题 / 作者 / 链接，
          按训练部位、饮食、心智等维度分类并生成周总结。数据只存本地，不做自动爬取。
        </p>
      </header>

      {/* 导入区 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bookmark className="h-5 w-5 text-primary" /> 批量导入
          </CardTitle>
          <CardDescription>
            在抖音里对收藏的视频点「分享」→「复制链接」，把复制的整段文字粘贴到下面，一行一条。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={'示例：\n7.77 复制打开抖音，看看【张三的作品】平板卧推 3 个细节让你胸部更强 https://v.douyin.com/abc123/ 复制此链接，打开Dou音搜索，直接观看视频！\n9.99 复制打开抖音，看看【李四的作品】高蛋白减脂餐食谱分享 https://v.douyin.com/def456/ 复制此链接，打开Dou音搜索，直接观看视频！'}
            rows={6}
            className="font-mono text-xs leading-relaxed"
          />
          <label className="flex cursor-pointer items-start gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={onlyFitness}
              onChange={(e) => setOnlyFitness(e.target.checked)}
              className="mt-0.5 accent-[#FACC15]"
            />
            <span>
              <strong className="text-foreground">仅导入健身相关内容</strong>（默认开启）：
              只保留训练动作、饮食营养、有氧、冷兵器、补剂、身体数据等健身视频；
              娱乐、搞笑、新闻、生活等无关内容会自动过滤掉。
              如果想全收，可以取消勾选。
            </span>
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={importText} className="gap-1.5">
              <Sparkles className="h-4 w-4" /> 解析并导入
            </Button>
            <Button variant="outline" onClick={exportJson} className="gap-1.5">
              <Download className="h-4 w-4" /> 导出备份
            </Button>
            <Button variant="ghost" onClick={clearAll} className="gap-1.5 text-destructive">
              <Trash2 className="h-4 w-4" /> 清空全部
            </Button>
            {notice && <span className="text-xs text-primary">{notice}</span>}
          </div>
          <p className="text-[11px] text-muted-foreground">
            说明：本站不做自动爬取收藏（官方无个人收藏接口，非官方抓取有风险且不合规）。
            手动粘贴一样能获得分类与总结；已导入数据可随时导出备份。
          </p>
        </CardContent>
      </Card>

      {/* 周总结 */}
      {weeklySummary && (
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-primary" /> 周总结 · {weeklySummary.weekLabel}
            </CardTitle>
            <CardDescription>本地规则统计生成（非云端 AI，结果可随时核对）</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
              {weeklySummary.sum}
            </pre>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {Object.entries(weeklySummary.byCat).map(([k, n]) => (
                <Badge key={k} variant="outline">
                  {CATEGORY_FALLBACK[k] || k} · {n}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 收藏列表（按周分组） */}
      {groups.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-12 text-center">
            <FileText className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              还没有收藏记录。从抖音复制收藏的分享文本，粘贴到上方导入即可。
            </p>
          </CardContent>
        </Card>
      ) : (
        groups.map((wk) => (
          <section key={wk} className="space-y-2">
            <h2 className="pt-2 text-sm font-semibold text-foreground">
              {formatWeek(wk)} 周
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {items.filter((i) => weekKey(i.createdAt) === wk).map((it) => (
                <Card key={it.id} className="group">
                  <CardContent className="space-y-2 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant="secondary" className="shrink-0 text-[10px]">
                        {CATEGORY_FALLBACK[it.category] || '其他'}
                      </Badge>
                      <button
                        type="button"
                        aria-label="删除这条收藏"
                        onClick={() => removeItem(it.id)}
                        className="text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-sm font-medium text-foreground">{it.title}</p>
                    {it.author && (
                      <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <User className="h-3 w-3" /> {it.author}
                      </p>
                    )}
                    {it.url ? (
                      <a
                        href={it.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] text-primary underline-offset-2 hover:underline"
                      >
                        <Link2 className="h-3 w-3" /> 打开原视频
                      </a>
                    ) : (
                      <p className="text-[11px] text-muted-foreground">无链接</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
