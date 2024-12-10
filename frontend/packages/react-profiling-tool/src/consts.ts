// todo: change this to .env
export const API_URL = 'http://localhost:8000';
export const SESSION_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours
const STORAGE_KEY_PREFIX = 'react-profiling-tool--';
export const STORAGE_USER_ID_KEY = `${STORAGE_KEY_PREFIX}userID`;
export const STORAGE_SESSION_ID_KEY = `${STORAGE_KEY_PREFIX}sessionID`;
export const STORAGE_SESSION_TIMESTAMP_KEY = `${STORAGE_KEY_PREFIX}sessionTimestamp`;
