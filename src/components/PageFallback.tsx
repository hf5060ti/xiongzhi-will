export default function PageFallback() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <div className="flex items-center gap-3">
        <span className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span className="font-display text-xl font-extrabold tracking-wide text-foreground">
          雄性意志
        </span>
      </div>
      <p className="max-w-md text-sm text-muted-foreground">正在加载内容……</p>
      <p className="max-w-md text-xs text-muted-foreground/70">
        本站只提供健康自然的健身方式，不提供任何极端和药物，请遵守当地法律法规。
      </p>
    </div>
  );
}
