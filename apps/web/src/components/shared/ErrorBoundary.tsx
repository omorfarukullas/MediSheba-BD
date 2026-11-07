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
          <div className="max-w-md w-full bg-canvas border border-border rounded-xl p-8 text-center space-y-4">
            <div className="w-10 h-10 rounded-lg bg-danger-bg text-danger-text flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-ink">
                Something went wrong
              </h2>
              <p className="text-sm text-text-3 leading-relaxed">
                An unexpected interface error occurred. You can reload this view or return to the main dashboard.
              </p>
            </div>
            {this.state.error?.message && (
              <pre className="text-xs bg-subtle p-2.5 rounded-lg text-danger-text overflow-x-auto text-left font-mono">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="secondary"
                size="compact"
                leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                onClick={this.handleReload}
              >
                Reload
              </Button>
              <Button
                variant="primary"
                size="compact"
                leftIcon={<Home className="w-3.5 h-3.5" />}
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
