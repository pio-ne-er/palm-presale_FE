import { IconNames, Icons } from "./icons";

export const Icon = ({ name, color }: { name: IconNames; color: string }) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Icons[name](color)}
    </svg>
  );
};
