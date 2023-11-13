import { HoverContext } from "@features/contexts";
import { Icon } from "@features/icon";
import { IconNames } from "@features/icon/icons";
import { useContext } from "react";

export const IconButton = ({
  name,
  color,
  size = "base",
  onClick,
}: {
  name: IconNames;
  color: string;
  size: string;
  onClick?: () => void;
}) => {
  const { setHover } = useContext(HoverContext);

  return (
    <div
      onMouseEnter={() => setHover(name)}
      onMouseLeave={() => setHover("")}
      onClick={onClick}
      className="center_position"
    >
      <Icon name={name} color={color} size={size} />
    </div>
  );
};
