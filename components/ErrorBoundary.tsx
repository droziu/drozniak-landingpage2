import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
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
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#101820] flex items-center justify-center px-4">
          <div className="max-w-2xl w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
            <h1 className="font-[Montserrat] text-2xl font-bold text-red-400 mb-4">
              Wystąpił błąd
            </h1>
            <p className="text-gray-300 mb-4">
              {this.state.error?.message || 'Nieznany błąd'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-[#fee715] to-[#00C9A7] text-[#101820] font-[Montserrat] font-bold py-2 px-4 rounded-lg"
            >
              Odśwież stronę
            </button>
            <details className="mt-4">
              <summary className="text-gray-400 cursor-pointer">Szczegóły błędu</summary>
              <pre className="mt-2 text-xs text-gray-500 overflow-auto">
                {this.state.error?.stack}
              </pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

