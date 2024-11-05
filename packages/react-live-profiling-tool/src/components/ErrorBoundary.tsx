import React, { ReactElement, Component } from 'react';

type ErrorInfo = {
  componentStack: string;
}

type ErrorBoundaryProps = {
  children: ReactElement;
  fallback?: ReactElement;
  onError?: (error: Error, info: ErrorInfo) => void;
}

type ErrorBoundaryState = {
  hasError: boolean;
  errorInfo: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(_error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, info);
    this.setState({ errorInfo: error });
    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback ?? <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };