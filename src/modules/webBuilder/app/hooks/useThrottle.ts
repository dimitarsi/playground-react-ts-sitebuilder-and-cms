import { useRef } from "react";

export const useThrottle = () => {
  const r = useRef<number>(-1);
  return (method: Function, delay: number) => {
    clearTimeout(r.current);
    r.current = window?.setTimeout(() => method(), delay);
  };
};
