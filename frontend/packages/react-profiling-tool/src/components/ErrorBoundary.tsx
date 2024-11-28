import React, { ReactElement, Component } from 'react';
import { sendData } from '../utils/api';

type ErrorInfo = {
  componentStack: string;
};

type ErrorBoundaryProps = {
  children: ReactElement;
  fallback?: ReactElement;
  onError?: (error: Error, info: ErrorInfo) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
  errorInfo: Error | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
    this.setState({ errorInfo: error });
    if (this.props.onError) {
      this.props.onError(error, info);
    }

    sendData({
      event_type: 'error',
      location: 'ErrorBoundary',
      time_taken: 0,
      title: `Error in ErrorBoundary: ${error.message}`,
      description: `Error in ErrorBoundary: ${error.message}, ${info.componentStack}`,
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
