import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="font-display text-3xl font-extrabold tracking-wide text-foreground">隐私政策</h1>
        <p className="mt-1 text-sm text-muted-foreground">最后更新：2026-09-21</p>
      </header>

      <Card>
        <CardContent className="space-y-4 p-6 text-sm leading-relaxed text-foreground/90">
          <section>
            <h2 className="font-display text-lg font-bold text-foreground">我们收集什么数据？</h2>
            <p className="mt-2">
              <b>什么都不收集。</b>
            </p>
            <p className="mt-2">
              本应用是纯前端应用，所有数据（你的目标、饮食记录、身体数据、形体记录等）
              全部存储在你自己浏览器的 localStorage 里。我们没有后端服务器，没有数据库，
              不会上传任何数据。
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">数据存在哪里？</h2>
            <p className="mt-2">
              数据只存在你当前使用的浏览器里。换浏览器、换手机、清理浏览器数据，
              这些数据就会丢失。建议定期使用「数据备份」功能导出 JSON 文件。
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">我们追踪你吗？</h2>
            <p className="mt-2">
              <b>不追踪。</b>没有 Google Analytics、没有埋点、没有用户行为分析。
              你用什么功能、用了多久，我们完全不知道。
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">我们分享你的数据吗？</h2>
            <p className="mt-2">
              <b>不分享。</b>我们没有数据可以分享。
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">第三方服务</h2>
            <p className="mt-2">
              本应用使用以下开源库：React、Vite、Tailwind CSS、shadcn/ui 等。
              这些库不会收集你的数据。动作演示图片来自 free-exercise-db 开源项目，
              通过 CDN 加载。
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">你的权利</h2>
            <p className="mt-2">
              你完全控制自己的数据：
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>导出：随时导出为 JSON 文件</li>
              <li>删除：清理浏览器数据即可删除所有记录</li>
              <li>不使用：不想用就直接关掉，没有任何副作用</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">免责</h2>
            <p className="mt-2">
              本应用提供的所有内容仅供一般健身参考，不构成医疗建议。
              如有疾病、伤痛或特殊健康状况，请咨询医生。
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-bold text-foreground">联系我们</h2>
            <p className="mt-2">
              通过 GitHub Issues 联系：https://github.com/hf5060ti/xiongzhi-will/issues
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
