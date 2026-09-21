import { Leaf, Combine, Award } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PROTEIN_QUALITY, PROTEIN_POWDERS } from '@/data/protein-quality';

export default function ProteinGuide() {
  return (
    <section className="space-y-6">
      {/* 氨基酸互补法 */}
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 sm:p-5">
        <p className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Combine className="h-4 w-4 text-primary" />
          氨基酸互补法：植物蛋白 × 动物蛋白同吃
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          动物蛋白系数为 <b className="text-foreground">1.0</b>（高质量、氨基酸完整），植物蛋白只有{' '}
          <b className="text-foreground">0.5–0.9</b>，且多数缺一种必需氨基酸（如谷物缺赖氨酸、豆类缺蛋氨酸）。
          把两者同吃能互相补齐：例如
          <b className="text-foreground"> 豆子 + 鸡蛋</b>、<b className="text-foreground">豆浆 + 牛奶</b>、
          <b className="text-foreground">燕麦 + 乳清</b>——蛋白质质量立刻接近动物蛋白水平。
          纯素饮食更要刻意搭配（豆类配谷物），否则吃够克数也白搭。
        </p>
      </div>

      {/* 植物蛋白有效系数 */}
      <div className="space-y-3 rounded-lg border border-border bg-card p-4 sm:p-5">
        <p className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Leaf className="h-4 w-4 text-primary" />
          植物性食物的蛋白有效系数
        </p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>类别</TableHead>
                <TableHead>示例</TableHead>
                <TableHead className="text-right">有效系数</TableHead>
                <TableHead>说明</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PROTEIN_QUALITY.map((row) => (
                <TableRow key={row.cat}>
                  <TableCell className="whitespace-nowrap font-medium text-foreground">{row.cat}</TableCell>
                  <TableCell className="text-muted-foreground">{row.examples}</TableCell>
                  <TableCell className="text-right font-semibold text-primary">{row.coeff}</TableCell>
                  <TableCell className="text-muted-foreground">{row.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          动物蛋白（肉、蛋、乳清）系数 1.0。植物蛋白按上表打折：同样吃 20g 燕麦蛋白，实际只有约
          10–14g 被身体利用——所以植物餐一定要搭动物蛋白。
        </p>
      </div>

      {/* 蛋白粉选购 */}
      <div className="space-y-3 rounded-lg border border-border bg-card p-4 sm:p-5">
        <p className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Award className="h-4 w-4 text-primary" />
          蛋白粉选购对照
        </p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>类型</TableHead>
                <TableHead>参考价</TableHead>
                <TableHead>质量评价</TableHead>
                <TableHead className="text-right">综合评分</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PROTEIN_POWDERS.map((row) => (
                <TableRow key={row.name}>
                  <TableCell className="whitespace-nowrap font-medium text-foreground">{row.name}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">{row.price}</TableCell>
                  <TableCell className="text-muted-foreground">{row.quality}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        row.score >= 8.5
                          ? 'font-display text-lg font-bold text-primary'
                          : 'font-semibold text-muted-foreground'
                      }
                    >
                      {row.score.toFixed(1)}
                    </span>
                    <span className="text-xs text-muted-foreground"> /10</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
