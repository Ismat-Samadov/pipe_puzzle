import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (v: T) => void] {
  const [stored, setStored] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) setStored(JSON.parse(item));
    } catch { /* ignore */ }
  }, [key]);

  const setValue = (value: T) => {
    try {
      setStored(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch { /* ignore */ }
  };

  return [stored, setValue];
}
