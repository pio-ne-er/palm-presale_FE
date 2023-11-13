import { useEffect, useRef } from "react";

export const useTimeout = ({
  callback,
  delay,
  auto,
}: {
  callback: () => void;
  delay: number;
  auto: boolean;
}) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null || !auto) return;
    const timerId = setTimeout(() => {
      savedCallback.current();
    }, delay * 1000);

    return () => clearTimeout(timerId);
  }, [delay, auto]);
};
