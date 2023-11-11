/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect } from "react";
import { styled } from "styled-components";

import { WalletConnectButton } from "@features/buttons";
import { useUserData } from "@features/providers";
import { useWallet } from "@solana/wallet-adapter-react";

const StyleBoard = styled.div`
  position: absolute;
  width: 238px;
  height: 168px;
  top: 56px;
  right: 0;
  padding: 12px 16px;
  display: grid;
  grid-template-rows: repeat(3 1fr);

  &:before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background: linear-gradient(180deg, #0f0902 0%, #26211e 100%);
    -webkit-clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - 6px),
      calc(100% - 6px) 100%,
      0 100%
    );
    clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - 6px),
      calc(100% - 6px) 100%,
      0 100%
    );
    opacity: 0.8;
  }
`;

const WalletConnectList = ["Phantom", "Backpack", "Ledger"];

export const WalletConnectBoard = () => {
  const { sign } = useUserData();
  const wallet = useWallet();

  const handleConnectProvider = async (type: string) => {
    switch (type) {
      case "Phantom":
        await sign(false);
        break;
    }
  };

  useEffect(() => {
    console.log("wallet", wallet.wallets);
  }, []);

  return (
    <StyleBoard>
      {WalletConnectList.map((prov) => (
        <WalletConnectButton
          key={prov}
          // @ts-ignore
          type={prov}
          onClick={() => handleConnectProvider(prov)}
        />
      ))}
    </StyleBoard>
  );
};
