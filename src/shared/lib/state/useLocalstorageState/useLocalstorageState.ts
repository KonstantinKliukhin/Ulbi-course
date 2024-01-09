import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react';
import { parseJSON } from '../../utils/parseJSON/parseJSON';
import { useEvent } from '../../optimization/useEvent/useEvent';
import { useWindowEvent } from '../../ui/useWindowEvent/useWindowEvent';

type SetValue<T> = Dispatch<SetStateAction<T>>;

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] => {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);

      return initialValue;
    }
  }, [initialValue, key,]);

  const [storedValue, setStoredValue,] = useState<T>(readValue);

  const setValue: SetValue<T> = useEvent(value => {
    if (typeof window === 'undefined') {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      );
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  });

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(readValue());
    },
    [key, readValue,]
  );

  useWindowEvent('storage', handleStorageChange);

  useWindowEvent('local-storage', handleStorageChange);

  return [storedValue, setValue,];
};
