import { useEffect, useState } from "react";

interface ScrollPosition {
  y: number;
}

export const useScrollPosition = (): ScrollPosition => {
  const [position, setPosition] = useState<ScrollPosition>({ y: 0 });

  useEffect(() => {
    const handleGetScrollPosition = () => {
      setPosition({ y: window.scrollY });
    };

    window.addEventListener("scroll", handleGetScrollPosition, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleGetScrollPosition);
    };
  }, []);

  return position;
};
