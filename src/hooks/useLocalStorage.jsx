import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [savedValue, setSavedValue] = useState('');
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    const savedItem = window.localStorage.getItem(key);
    if (savedItem === null) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
      setSavedValue(initialValue);
    } else {
      setSavedValue(JSON.parse(savedItem));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const savedItem = window.localStorage.getItem(key);
    if (newValue !== savedItem && (newValue !== '' && newValue !== null)) {
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setSavedValue(newValue);
    }
  }, [newValue, key]);

  return [savedValue, setNewValue];
}
