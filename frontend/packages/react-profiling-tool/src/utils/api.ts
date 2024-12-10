/* eslint-disable @typescript-eslint/camelcase */
import { UAParser } from 'ua-parser-js';
import {
  API_URL,
  STORAGE_SESSION_ID_KEY,
  STORAGE_USER_ID_KEY,
} from '../consts';
import { AnalyticsEvent } from '../types/api';

export type AnalyticsEventSimplified = Omit<
  AnalyticsEvent,
  | 'timestamp'
  | 'os_name'
  | 'os_version'
  | 'browser_name'
  | 'browser_version'
  | 'user_id'
  | 'session_id'
>;

const prepareData = async (
  data: AnalyticsEventSimplified
): Promise<AnalyticsEvent> => {
  const { pathname, search } = window.location;
  const url = `${pathname}${search}`;

  const ua = new UAParser();
  const browser = await ua.getBrowser().withClientHints();
  const os = await ua.getOS().withClientHints();

  return {
    ...data,
    user_id: localStorage.getItem(STORAGE_USER_ID_KEY) ?? 'Unknown',
    session_id: localStorage.getItem(STORAGE_SESSION_ID_KEY) ?? 'Unknown',
    location: data.location ?? url,
    os_name: os.name ?? 'Unknown',
    os_version: os.version ?? 'Unknown',
    browser_name: browser.name ?? 'Unknown',
    browser_version: browser.version ?? 'Unknown',
    timestamp: Date.now(),
  };
};

export const sendData = async (data: AnalyticsEventSimplified) => {
  const preparedData = await prepareData(data);

  try {
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preparedData),
    });
    return response.json();
  } catch (error) {
    console.error('Error sending data:', error, preparedData);
  }
};
