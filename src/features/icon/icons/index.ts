import Backpack from "./Backpack";
import Check from "./Check";
import Close from "./Close";
import Discord from "./Discord";
import Facebook from "./Facebook";
import Ledger from "./Ledger";
import Mark from "./Mark";
import Phantom from "./Phantom";
import ScrollDown from "./Scroll-Down";

export const Icons = {
  Backpack,
  Check,
  Close,
  Discord,
  Facebook,
  Ledger,
  Mark,
  Phantom,
  ScrollDown,
} as const;

export type IconNames = keyof typeof Icons;
