import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import {
  SESSION_EXPIRATION_TIME,
  STORAGE_SESSION_ID_KEY,
  STORAGE_SESSION_TIMESTAMP_KEY,
  STORAGE_USER_ID_KEY,
} from '../consts';

const useSession = () => {
  const [userID, setUserID] = useState<string | null>(null);
  const [sessionID, setSessionID] = useState<string | null>(null);

  useEffect(() => {
    const storedUserID = localStorage.getItem(STORAGE_USER_ID_KEY);
    if (!storedUserID) {
      const newUserID = nanoid();
      localStorage.setItem(STORAGE_USER_ID_KEY, newUserID);
      setUserID(newUserID);
    } else {
      setUserID(storedUserID);
    }

    const storedSessionID = sessionStorage.getItem(STORAGE_SESSION_ID_KEY);
    const storedTimestamp = sessionStorage.getItem(
      STORAGE_SESSION_TIMESTAMP_KEY
    );

    const currentTimestamp = Date.now();

    if (storedSessionID && storedTimestamp) {
      const sessionAge = currentTimestamp - parseInt(storedTimestamp);
      if (sessionAge < SESSION_EXPIRATION_TIME) {
        setSessionID(storedSessionID);
      } else {
        const newSessionID = nanoid();
        sessionStorage.setItem(STORAGE_SESSION_ID_KEY, newSessionID);
        setSessionID(newSessionID);
      }
    }

    return () => {
      sessionStorage.removeItem('sessionID');
      setSessionID(null);
    };
  }, []);

  return {
    userID,
    sessionID,
  };
};

export default useSession;
