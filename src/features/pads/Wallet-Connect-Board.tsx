/* eslint-disable @typescript-eslint/ban-ts-comment */
import { styled } from "styled-components";

import { WalletConnectButton } from "@features/buttons";
import { useWallet } from "@solana/wallet-adapter-react";
import { Toast_Text_List } from "utilities";
import { useToast } from "@features/toast";

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
  const wallet = useWallet();
  const toast = useToast();

  const handleConnectProvider = async (type: string) => {
    try {
      const Twallet = wallet.wallets.find(
        (wallet) => wallet.adapter.name === type
      );

      if (Twallet) {
        if (Twallet.readyState === "Installed") {
          wallet.select(Twallet.adapter.name);
          const info = {
            title: Toast_Text_List.confirm_connect_wallet,
            state: true,
          };
          toast.open(info);
          return;
        } else {
          const info = {
            title: Toast_Text_List.err_connect_wallet,
            state: false,
          };
          toast.open(info);
          return;
        }
      }
      const info = {
        title: Toast_Text_List.err_install_wallet,
        state: false,
      };
      toast.open(info);
    } catch (error) {
      console.log("Error", error);
    }
  };

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
