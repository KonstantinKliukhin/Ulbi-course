import React, { type ErrorInfo, type PropsWithChildren, type ReactNode, Suspense } from 'react';
import { PageError } from 'widgets/PageError';

type ErrorBoundaryProps = PropsWithChildren;

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary
  extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor (props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, };
  }

  static getDerivedStateFromError (): { hasError: boolean } {
    return { hasError: true, };
  }

  componentDidCatch (error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render (): ReactNode {
    if (this.state.hasError) return <Suspense fallback=""><PageError/></Suspense>;

    return this.props.children;
  }
}
