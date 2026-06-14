import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in component tree:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 flex items-center justify-center mb-6 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full text-2xl font-black">
            !
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
            Something went wrong
          </h2>
          <p className="text-white/40 text-sm max-w-md mb-8 leading-relaxed">
            {this.state.error?.message || "An unexpected rendering error occurred in the React component tree."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#FFFF00] text-[#0A0A0B] font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-colors cursor-pointer"
          >
            Reload Workspace
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
