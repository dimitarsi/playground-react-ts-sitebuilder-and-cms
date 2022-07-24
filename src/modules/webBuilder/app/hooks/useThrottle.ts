import { useRef } from "react";

export const useThrottle = () => {
  const r = useRef<number>(-1);
  const m = useRef<CallableFunction>();
  return (method: Function, delay: number) => {
    if (r.current == -1) {
      r.current = window?.setTimeout(() => {
        m.current?.();
        r.current = -1;
      }, delay);
    }
    m.current = method;
  };
};
