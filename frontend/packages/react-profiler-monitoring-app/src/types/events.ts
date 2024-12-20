export type EventResponse = {
  id: string;
  title: string;
  event_type: string;
  os_name: string;
  os_version: string;
  browser_name: string;
  browser_version: string;
  timestamp: number;
  location: string;
  time_taken: number;
  description: string;
  is_outlier: boolean;
};

export type AlgorithmType = "mad" | "lof" | "isolation-forest";
