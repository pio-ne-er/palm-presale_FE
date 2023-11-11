import { ReactNode, useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import "@solana/wallet-adapter-react-ui/styles.css";

export const WalletConnectProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const network = WalletAdapterNetwork.Mainnet;

  const endpoint = import.meta.env.VITE_SOL_RPC;

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new LedgerWalletAdapter()],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
