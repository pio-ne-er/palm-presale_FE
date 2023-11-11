import Backpack from "./Backpack";
import Discord from "./Discord";
import Facebook from "./Facebook";
import Ledger from "./Ledger";
import Phantom from "./Phantom";
import ScrollDown from "./Scroll-Down";

export const Icons = {
  Backpack,
  Discord,
  Facebook,
  Ledger,
  Phantom,
  ScrollDown,
} as const;

export type IconNames = keyof typeof Icons;
