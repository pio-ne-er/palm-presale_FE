import { styled } from "styled-components";

interface HeaderProps {
  $type: boolean;
}

const Header = styled.div<HeaderProps>`
  width: 100%;
  height: 100px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, transparent 100%);
  box-shadow: ${(props) => (props.$type ? "1px 1px 2px 0 #46484B inset" : "")};
  position: relative;

  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(110deg, #30353d 13.13%, #38291d 86.87%);
    opacity: ${(props) => (props.$type ? "0" : "1")};
    transition: all 0.2s ease-in-out;
  }
`;

export const LPHeader = ({ position = false }: { position: boolean }) => {
  return <Header $type={position}></Header>;
};
