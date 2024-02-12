import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MegaMenu from "@/components/Menu/MenuBar";
import React, { FC, useMemo } from "react";
import { PuzzleWalletProvider } from '@puzzlehq/sdk';
import { ProgramProvider } from '../context/ProgramContext'; 


export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
    <PuzzleWalletProvider
      dAppName="Leo Token UI with Puzzle SDK"
      dAppDescription="<YOUR DAPP DESCRIPTION>"
      dAppUrl=""
      dAppIconURL=""
    >
        <ProgramProvider>
          <MegaMenu />
            <Component {...pageProps} />
        </ProgramProvider>
      </PuzzleWalletProvider>
    </>
  );

}
