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
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center p-4">
          <Card className="max-w-md border-destructive/50 bg-card/80 backdrop-blur-xl">
            <CardContent className="p-6 text-center">
              <h1 className="font-display text-xl font-bold text-destructive">出问题了</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                页面加载时出错了。可能是数据损坏。
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {this.state.error?.message}
              </p>
              <div className="mt-4 flex gap-2 justify-center">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  刷新重试
                </Button>
                <Button variant="destructive" onClick={this.handleReset}>
                  清空数据并重置
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
