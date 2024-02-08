import React, { useState, useEffect } from "react";
import FunctionComponent from "@/components/FunctionCards/FunctionCard";
import { Inter } from "next/font/google";
import {
  Transaction,
  WalletAdapterNetwork,
  WalletNotConnectedError,
} from '@demox-labs/aleo-wallet-adapter-base';
import { useWallet } from '@demox-labs/aleo-wallet-adapter-react';
import { LeoWalletAdapter } from '@demox-labs/aleo-wallet-adapter-leo';
import { useProgram } from "@/context/ProgramContext";


const inter = Inter({ subsets: ["latin"] });
interface InputData {
  [key: string]: string;
}

interface Inputs {
  programId: string;
  functionName: string;
  amount: string;
  address: string;
  fee: number;
}


export default function Public() {
    const { wallet, publicKey } = useWallet();
    const [transactionId, setTransactionId] = useState<string | undefined>();
    const [inputData, setInputData] = useState<InputData>({});
    const [status, setStatus] = useState<string | undefined>();
    const [publicTransferInputs, setInputs] = useState<Inputs>({
      programId: '',
      functionName: '',
      amount: '',
      address: '',
      fee: 0,
    });

    const handleInputDataChange = (newInputData:any) => {
        setInputData(newInputData);
      };

      const { programName } = useProgram();

      console.log(inputData)

      //TODO Transfer Logics
    const handleSubmission = async () => {
      if (!publicKey) throw new WalletNotConnectedError();
      const newInputs = {
        programId: programName,
        functionName: inputData['1-StringBox-0'],
        amount: inputData['1-AmountBox-1'],
        address: inputData['1-AddressBox-2'],
        fee: Number(inputData['1-FeeBox-3'])
      };
    
      setInputs(newInputs);
      console.log("Public Transfer Inputs: ",publicTransferInputs)
  
      const values = [newInputs.address, newInputs.amount]
      console.log(values)
  
      const aleoTransaction = Transaction.createTransaction(
        publicKey,
        WalletAdapterNetwork.Testnet,
        publicTransferInputs.programId,
        publicTransferInputs.functionName,
        values,
        publicTransferInputs.fee!,
        false
      );
  
      console.log(newInputs);
    
      const txId =
      (await (wallet?.adapter as LeoWalletAdapter).requestTransaction(
        aleoTransaction
      )) || '';
      setTransactionId(txId);
      };

      const getTransactionStatus = async (txId: string) => {
        const status = await (
          wallet?.adapter as LeoWalletAdapter
        ).transactionStatus(txId);
        setStatus(status);
      };

    return(
        <div className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            <div className="flex flex-col items-center">
                <FunctionComponent 
                  titles={["Transfer From Public"]} 
                  inputTypes={[["StringBox", "AmountBox", "AddressBox", "FeeBox"]]}
                  onInputChange={handleInputDataChange} 
                />
                    <button
                      onClick={handleSubmission}
                      className="shadow-card dark:bg-gray-700 md:h-10 md:px-5 xl:h-12 xl:px-7"
                    >
                      {!publicKey ? 'Connect Your Wallet' : 'Submit'}
                    </button>
                </div>
        </div>
    )
}
