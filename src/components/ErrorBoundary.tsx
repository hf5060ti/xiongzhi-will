// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { Component, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleReset = () => {
    // 不要默认清空 localStorage：chunk 加载失败 / 网络抖动不该丢用户数据
    // 只刷新一次；真正数据损坏时由用户主动点"清空数据"
    window.location.reload();
  };

  handleClearData = () => {
    if (window.confirm('确定清空所有本地数据？训练记录、身体数据、饮食记录都会丢失。建议先在「数据备份」页导出 JSON。')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center p-4">
          <Card className="max-w-md border-destructive/50 bg-card/80 backdrop-blur-xl">
            <CardContent className="p-6 text-center">
              <h1 className="font-display text-xl font-bold text-destructive">出问题了</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                页面加载时出错了。多数情况是网络抖动或资源加载失败，点「刷新重试」即可。
              </p>
              <p className="mt-1 text-xs text-muted-foreground break-all">
                {this.state.error?.message}
              </p>
              <div className="mt-4 flex gap-2 justify-center">
                <Button variant="default" onClick={this.handleReset}>
                  刷新重试
                </Button>
                <Button variant="outline" onClick={this.handleClearData}>
                  清空数据（慎用）
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                如果之前有导出过备份，导入备份即可恢复。
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
