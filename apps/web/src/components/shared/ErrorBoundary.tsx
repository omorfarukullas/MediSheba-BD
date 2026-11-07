import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '../ui/Button';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public handleReload = () => {
    window.location.reload();
  };

  public handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-panel border border-rule rounded-panel p-8 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="font-display text-xl font-bold text-ink">
                Something went wrong
              </h2>
              <p className="text-[13px] text-ink-secondary leading-relaxed">
                An unexpected interface error occurred. You can reload this view or return to the main dashboard.
              </p>
            </div>
            {this.state.error?.message && (
              <pre className="text-[11px] bg-ground-muted p-2 rounded text-red-600 overflow-x-auto text-left font-mono">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<RefreshCw className="w-4 h-4" />}
                onClick={this.handleReload}
              >
                Reload
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Home className="w-4 h-4" />}
                onClick={this.handleGoHome}
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
