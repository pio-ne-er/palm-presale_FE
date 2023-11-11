import { useContext, useState, useEffect } from "react";
import { styled } from "styled-components";
import { useWallet } from "@solana/wallet-adapter-react";

import { IconButton, MainButton } from "@features/buttons";
import { HoverContext } from "@features/contexts";
import styles from "./Header.module.css";
import { WalletConnectBoard } from "@features/pads";
import { useUserData } from "@features/providers";

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

const Link = styled.a`
  cursor: none;
`;

export const LPHeader = ({ position = false }: { position: boolean }) => {
  const { hover } = useContext(HoverContext);
  const wallet = useWallet();
  const { sign } = useUserData();
  const [showConnedtBoard, setShowConnectBoard] = useState<boolean>(false);

  const handleShowBoard = () => {
    setShowConnectBoard((prev) => !prev);
  };

  const handleSignIn = async () => {
    await sign(false);
  };

  useEffect(() => {
    console.log("wallet.publicKey", wallet.publicKey?.toBase58());
  }, [wallet.publicKey]);

  useEffect(() => {
    console.log("Wallet", wallet.wallets);
  }, [wallet]);

  return (
    <Header $type={position}>
      <div className="group">
        <MainButton
          width={142}
          title={wallet.publicKey ? "Sign In" : "Connect Wallet"}
          color="white"
          onClick={wallet.publicKey ? handleSignIn : handleShowBoard}
        />
        {showConnedtBoard && <WalletConnectBoard />}
      </div>
      <div className={styles.header_social}>
        <Link
          href="https://x.com/pioneerlegendio/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton
            name="Facebook"
            color={hover === "Facebook" ? "#1D9BF0" : "white"}
            size="sm"
          />
        </Link>
        <Link
          href="https://discord.com/invite/pioneerlegends"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton
            name="Discord"
            color={hover === "Discord" ? "#5865F2" : "white"}
            size="sm"
          />
        </Link>
      </div>
    </Header>
  );
};
