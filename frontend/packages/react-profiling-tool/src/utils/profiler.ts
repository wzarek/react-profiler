import { sendData } from './api';

export const useSafeProfiledCallback = (callback: () => any, name: string) => {
  return () => {
    const start = performance.now();
    try {
      return callback();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      const info =
        error instanceof Error ? error.stack : 'No stack trace available';

      sendData({
        event_type: 'error',
        location: 'ErrorBoundary',
        time_taken: 0,
        title: `Error in ErrorBoundary: ${message}`,
        description: `Error in ErrorBoundary: ${message}, ${info}`,
      });
    } finally {
      const end = performance.now();
      const timeTaken = end - start;

      sendData({
        event_type: 'performance',
        location: name,
        time_taken: timeTaken,
        title: `Function ${name} finished in ${timeTaken.toFixed(2)} ms`,
      });
    }
  };
};

export const useProfiledCallback = (callback: () => any, name: string) => {
  return () => {
    const start = performance.now();
    try {
      return callback();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An unknown error occurred';
      const info =
        error instanceof Error ? error.stack : 'No stack trace available';

      sendData({
        event_type: 'error',
        location: 'ErrorBoundary',
        time_taken: 0,
        title: `Error in ErrorBoundary: ${message}`,
        description: `Error in ErrorBoundary: ${message}, ${info}`,
      });

      throw error;
    } finally {
      const end = performance.now();
      const timeTaken = end - start;

      sendData({
        event_type: 'performance',
        location: name,
        time_taken: timeTaken,
        title: `Function ${name} finished in ${timeTaken.toFixed(2)} ms`,
      });
    }
  };
};
