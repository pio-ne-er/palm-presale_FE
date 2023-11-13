import { IconNames, Icons } from "./icons";

export const Icon = ({
  name,
  color,
  size = "base",
}: {
  name: IconNames;
  color: string;
  size?: string;
}) => {
  const getSize = (size: string) => {
    let viewBox;
    let width;
    let height;
    switch (size) {
      case "base":
        width = height = 40;
        break;
      case "sm":
        width = height = 32;
        break;
      case "xs":
        width = height = 24;
        break;
      case "xxs":
        width = height = 16;
        break;
    }
    return { width: width, height: height, viewBox: viewBox };
  };
  return (
    <svg
      width={getSize(size).width}
      height={getSize(size).height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Icons[name](color)}
    </svg>
  );
};
