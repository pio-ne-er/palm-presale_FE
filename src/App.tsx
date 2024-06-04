import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from 'react'

import { PageLayout } from "./features/layout";
import { Palm } from "./pages";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as web3 from "@solana/web3.js";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";

import "./App.css";
import "./styles/global.css";

function App() {
  const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

  const endpoint = "https://denny-wuerxw-fast-devnet.helius-rpc.com/";
  
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<PageLayout />}>
                <Route path="/" element={<Palm />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
