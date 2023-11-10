import Discord from "./Discord";
import Facebook from "./Facebook";
import ScrollDown from "./Scroll-Down";

export const Icons = {
  Discord,
  Facebook,
  ScrollDown,
} as const;

export type IconNames = keyof typeof Icons;
