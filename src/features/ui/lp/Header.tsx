/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContext, useState } from "react";
import { styled } from "styled-components";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import bs58 from "bs58";

import { IconButton, MainButton } from "@features/buttons";
import { HoverContext } from "@features/contexts";
import styles from "./Header.module.css";
import { WalletConnectBoard } from "@features/pads";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { authorizeUser, getNonce } from "api";
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { solConnection } from "utilities";

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

const SocialItems = [
  {
    name: "Facebook",
    link: "https://x.com/pioneerlegendio",
  },
  {
    name: "Discord",
    link: "https://discord.com/invite/pioneerlegends",
  },
];

export const LPHeader = ({ position = false }: { position: boolean }) => {
  const { hover } = useContext(HoverContext);
  const wallet = useWallet();
  const walletModal = useWalletModal();
  const navigate = useNavigate();
  const [showConnedtBoard, setShowConnectBoard] = useState<boolean>(false);
  const [walletType, setWalletType] = useState<boolean>(false);
  const [isSignning, setIsSignning] = useState<boolean>(false);

  const handleShowBoard = () => {
    setShowConnectBoard((prev) => !prev);
  };

  const handleSignIn = async () => {
    setIsSignning(true);
    try {
      if (!wallet.publicKey) {
        walletModal.setVisible(true);
        return;
      }

      const nonce = await getNonce(wallet.publicKey.toBase58());
      const statement = `Authorize your wallet. nonce: ${nonce}`;
      localStorage.setItem("nonce", nonce);

      if (!walletType) {
        if (!wallet.signMessage) return;

        if (nonce && wallet.connected) {
          const message = new TextEncoder().encode(statement);
          const sig = await wallet.signMessage(message);

          if (sig) {
            const req = await authorizeUser(
              wallet.publicKey.toBase58(),
              bs58.encode(new Uint8Array(sig as unknown as ArrayBuffer)),
              nonce as string
            );

            if (req) {
              navigate("/map");
              localStorage.setItem("PLAuth", "Authlized");
            }
          }
        }
      } else {
        const MEMO_PROGRAM_ID = new PublicKey(
          "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
        );

        console.log(MEMO_PROGRAM_ID);

        const blackHash = (await solConnection.getLatestBlockhash()).blockhash;
        console.log("Blockhash", blackHash);
        const tx = new Transaction().add(
          new TransactionInstruction({
            programId: MEMO_PROGRAM_ID,
            keys: [],
            data: Buffer.from(statement, "utf8"),
          })
        );
        tx.feePayer = wallet.publicKey;
        tx.recentBlockhash = blackHash;
        console.log("TXXX", tx);

        const signedTx = await wallet.signTransaction!(tx);
        const serializedTx = signedTx.serialize();
        const bufferStr = JSON.stringify(Array.from(serializedTx));

        const req = await authorizeUser(
          wallet.publicKey.toBase58(),
          bufferStr,
          nonce as string,
          true
        );

        if (req) {
          navigate("/map");
          localStorage.setItem("PLAuth", "Authlized");
        }
      }
    } catch (error) {
      console.log("Sign error", error);
    } finally {
      setIsSignning(false);
    }
  };

  const handleClickSocial = (link: string) => {
    window.open(link, "rel=noopener noreferrer");
  };

  return (
    <Header $type={position}>
      <div className="group">
        <MainButton
          width={142}
          title={wallet.publicKey ? "Sign In" : "Connect Wallet"}
          color="white"
          loading={isSignning}
          onClick={wallet.publicKey ? handleSignIn : handleShowBoard}
        />
        {showConnedtBoard && <WalletConnectBoard getType={setWalletType} />}
      </div>
      <div className={styles.header_social}>
        {SocialItems.map((item) => (
          <IconButton
            key={item.name}
            // @ts-ignore
            name={item.name}
            color={
              hover === "Facebook" && item.name === "Facebook"
                ? "#1D9BF0"
                : hover === "Discord" && item.name === "Discord"
                ? "#5865F2"
                : "white"
            }
            size="sm"
            onClick={() => handleClickSocial(item.link)}
          />
        ))}
      </div>
    </Header>
  );
};
