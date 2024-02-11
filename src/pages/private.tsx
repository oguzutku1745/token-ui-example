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
  record: string;
  amount: string;
  address: string;
  fee: number;
}


export default function Private() {
    const { wallet, publicKey } = useWallet();
    const [inputData, setInputData] = useState<InputData>({});
    const [transactionId, setTransactionId] = useState<string | undefined>();
    const [status, setStatus] = useState<string | undefined>();
    const [privTransferInputs, setInputs] = useState<Inputs>({
      programId: '',
      functionName: '',
      record: '',
      amount: '',
      address: '',
      fee: 0,
    });

    console.log(inputData)

    const handleInputDataChange = (newInputData:any) => {
        setInputData(newInputData);
      };

    const { programName} = useProgram()

    useEffect(() => {
      let intervalId: NodeJS.Timeout | undefined;
  
      if (transactionId) {
        intervalId = setInterval(() => {
          getTransactionStatus(transactionId!);
        }, 1000);
      }
  
      return () => {
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }, [transactionId]);

      const handleSubmission = async () => {
        if (!publicKey) throw new WalletNotConnectedError();
    
        const newInputs = {
          programId: programName,
          functionName: inputData['1-StringBox-0'],
          record: inputData['1-RecordBox-1'],
          amount: inputData['1-AmountBox-2'],
          address: inputData['1-AddressBox-3'],
          fee: Number(inputData['1-FeeBox-4'])
        };

      
        setInputs(newInputs);
    
        const values = [newInputs.address, newInputs.amount]
        console.log(values)
    
        const aleoTransaction = Transaction.createTransaction(
          publicKey,
          WalletAdapterNetwork.Testnet,
          newInputs.programId,
          newInputs.functionName,
          values,
          newInputs.fee!,
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
                  titles={["Transfer From Private"]} 
                  inputTypes={[["StringBox", "RecordBox", "AmountBox", "AddressBox", "FeeBox"], ["StringBox","StringBox","RecordBox", "AmountBox", "AddressBox", "FeeBox"]]}
                  onInputChange={handleInputDataChange}
                  onSubmission={handleSubmission}
                  isWalletConnected={!!publicKey} 
                />
                </div>
        </div>
    )
}
