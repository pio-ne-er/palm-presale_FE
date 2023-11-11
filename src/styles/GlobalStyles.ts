import { createGlobalStyle, keyframes } from "styled-components";

interface GlobalstylesProps {
  $hover: boolean;
}

const CursorAnim = keyframes`
0% {cursor: url('src/assets/cursor/normal/01.png'), auto;}
14% {cursor: url('src/assets/cursor/normal/02.png'), auto;}
28% {cursor: url('src/assets/cursor/normal/03.png'), auto;}
42% {cursor: url('src/assets/cursor/normal/04.png'), auto;}
56% {cursor: url('src/assets/cursor/normal/05.png'), auto;}
70% {cursor: url('src/assets/cursor/normal/06.png'), auto;}
84% {cursor: url('src/assets/cursor/normal/07.png'), auto;}
100% {cursor: url('src/assets/cursor/normal/08.png'), auto;}
`;

const CursorHoverAnim = keyframes`
0% {cursor: url('src/assets/cursor/hover/01.png'), auto;}
14% {cursor: url('src/assets/cursor/hover/02.png'), auto;}
28% {cursor: url('src/assets/cursor/hover/03.png'), auto;}
42% {cursor: url('src/assets/cursor/hover/04.png'), auto;}
56% {cursor: url('src/assets/cursor/hover/05.png'), auto;}
70% {cursor: url('src/assets/cursor/hover/06.png'), auto;}
84% {cursor: url('src/assets/cursor/hover/07.png'), auto;}
100% {cursor: url('src/assets/cursor/hover/08.png'), auto;}
`;

export const Globalstyles = createGlobalStyle<GlobalstylesProps>`
html {
    cursor: url('src/assets/cursor/normal/01.png'), auto;
    animation: ${(props) =>
      props.$hover ? CursorHoverAnim : CursorAnim} 0.7s infinite;
}
`;
