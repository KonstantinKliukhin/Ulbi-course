import { useEvent } from '../../optimization/useEvent/useEvent';
import { useEffect } from 'react';

type GetWindowEventType<Type extends string> = Type extends keyof WindowEventMap
  ? WindowEventMap[Type]
  : Event;

export function useWindowEvent<Type extends string> (
  type: Type,
  callback: (event: GetWindowEventType<Type>) => void
): void;
export function useWindowEvent (type: string, callback: (event: Event) => void) {
  const eventCallback = useEvent(callback);

  useEffect(() => {
    window.addEventListener(type, eventCallback);

    return () => {
      window.removeEventListener(type, eventCallback);
    };
  }, [eventCallback, type,]);
}
