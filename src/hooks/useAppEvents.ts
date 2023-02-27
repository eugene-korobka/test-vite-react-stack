import { useCallback, useEffect, useRef } from "react";

export function dispatchAppEvent<T extends any>(eventType: string, payload?: T) {
  const event = new CustomEvent(eventType, {
    detail: payload,
  });

  window.dispatchEvent(event);
}

export function useSubscribeToAppEvent(eventType: string, handler: () => void) {
  const handlerRef = useRef<() => void>();
  handlerRef.current = handler;

  const innerHandler = useCallback(() => {
    handlerRef.current?.();
  }, []);

  useEffect(() => {
    window.addEventListener(eventType, innerHandler);

    return () => {
      window.removeEventListener(eventType, innerHandler);
    };
  }, [eventType, innerHandler]);
};
