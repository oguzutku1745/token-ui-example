import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MegaMenu from "@/components/Menu/MenuBar";
import React, { FC, useMemo } from "react";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";

// Default styles that can be overridden by your app
require("@demox-labs/aleo-wallet-adapter-reactui/styles.css");
import { ProgramProvider } from '../context/ProgramContext'; // Adjust the import path as needed


export default function App({ Component, pageProps }: AppProps) {

  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: 'Leo Demo App',
      }),
    ],
    []
  );

  return (
    <>
     <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.Testnet}
      autoConnect
    >
      <WalletModalProvider>
        <ProgramProvider>
          <MegaMenu />
            <Component {...pageProps} />
        </ProgramProvider>
      </WalletModalProvider>
    </WalletProvider>
    </>
  );

}
