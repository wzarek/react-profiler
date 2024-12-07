export type AnalyticsEventType =
  | 'mount'
  | 'update'
  | 'unmount'
  | 'error'
  | 'performance'
  | 'custom';

export type AnalyticsEvent = {
  session_id: string;
  title: string;
  event_type: AnalyticsEventType;
  timestamp: number;
  os_name: string;
  os_version: string;
  browser_name: string;
  browser_version: string;
  location?: string;
  time_taken?: number;
  description?: string;
};
