import { styled } from "styled-components";
import { useContext } from "react";

import { IconButton, MainButton } from "@features/buttons";
import styles from "./Header.module.css";
import { HoverContext } from "@features/contexts";

interface HeaderProps {
  $type: boolean;
}

const Header = styled.div<HeaderProps>`
  width: 100%;
  height: 100px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, transparent 100%);
  box-shadow: ${(props) => (props.$type ? "1px 1px 2px 0 #46484B inset" : "")};
  position: fixed;
  z-index: 4;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
  padding: 0 32px;

  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(110deg, #30353d 13.13%, #38291d 86.87%);
    opacity: ${(props) => (props.$type ? "1" : "0")};
    transition: all 0.2s ease-in-out;
    box-shadow: 0 16px 28px -7px #00000074;
  }
`;

export const LPHeader = ({ position = false }: { position: boolean }) => {
  const { hover } = useContext(HoverContext);

  return (
    <Header $type={position}>
      <MainButton width={142} title="Connect Wallet" color="white" />
      <div className={styles.header_social}>
        <IconButton
          name="Facebook"
          color={hover === "Facebook" ? "#1D9BF0" : "white"}
          size="sm"
        />
        <IconButton
          name="Discord"
          color={hover === "Discord" ? "#5865F2" : "white"}
          size="sm"
        />
      </div>
    </Header>
  );
};
