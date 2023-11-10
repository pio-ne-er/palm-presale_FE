import { styled, keyframes } from "styled-components";
import { useContext } from "react";

import { Icon } from "@features/icon";
import { HoverContext } from "@features/contexts";

const ScrollAnim = keyframes`
0, 100% {
    transform: translateY(0);
    opacity: 1;
},
50% {
    opacity: 0.6;
    transform: translateY(10px);
}`;

const StyleScrollDown = styled.div`
  animation-name: ${ScrollAnim};
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

export const ScrollDownButton = ({
  className,
  onClick,
}: {
  className: string;
  onClick: () => void;
}) => {
  const { setHover } = useContext(HoverContext);

  return (
    <StyleScrollDown
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <Icon name="ScrollDown" color="white" />
    </StyleScrollDown>
  );
};
