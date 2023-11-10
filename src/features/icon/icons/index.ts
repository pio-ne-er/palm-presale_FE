import ScrollDown from "./Scroll-Down";

export const Icons = {
  ScrollDown,
} as const;

export type IconNames = keyof typeof Icons;
