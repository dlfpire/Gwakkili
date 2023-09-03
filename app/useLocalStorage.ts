import { useState } from "react";

function useLocalStorage(key: string, initialValue: any) {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;

    const [value, setValue] = useState(initial);

    const setStoredValue = (newValue: any) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    };

    return { value, setStoredValue };
  }

  return { value: initialValue, setStoredValue: (newValue: any) => {} };
}

export default useLocalStorage;
