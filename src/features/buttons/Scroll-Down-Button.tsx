import { Icon } from "@features/icon";
import { styled, keyframes } from "styled-components";

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

export const ScrollDownButton = () => {
  return (
    <StyleScrollDown>
      <Icon name="ScrollDown" color="black" />
    </StyleScrollDown>
  );
};
