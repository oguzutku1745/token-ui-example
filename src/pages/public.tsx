import React, { useState, useEffect } from "react";
import FunctionComponent from "@/components/FunctionCards/FunctionCard";
import { Inter } from "next/font/google";
import { requestCreateEvent } from '@puzzlehq/sdk';
import { useProgram } from "@/context/ProgramContext";
import { useAccount } from "@puzzlehq/sdk";
import { EventType } from '@puzzlehq/types';


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
    const { account } = useAccount();
    const [error, setError] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);
    const [eventId, setEventId] = useState<string | undefined>();
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



      const handleSubmission = async () => {
        if (!account) return;
    
        const newInputs = {
          programId: programName,
          functionName: inputData['1-StringBox-0'],
          amount: inputData['1-AmountBox-1'],
          address: inputData['1-AddressBox-2'],
          fee: Number(inputData['1-FeeBox-3'])
        };

        setInputs(newInputs);
    
        const values = [newInputs.address, newInputs.amount]
        console.log(values)
    
        const createEventResponse = await requestCreateEvent({
          type: EventType.Execute,
          programId: newInputs.programId,
          functionId: newInputs.functionName,
          fee: newInputs.fee!,
          inputs: values
        });
        if (createEventResponse.error) {
          setError(createEventResponse.error);
        } else {
          setEventId(createEventResponse.eventId);
        }
        setLoading(false);
    
        console.log(newInputs);
      }

    return(
        <div className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            <div className="flex flex-col items-center">
                <FunctionComponent 
                  titles={["Transfer From Public"]} 
                  inputTypes={[["StringBox", "AmountBox", "AddressBox", "FeeBox"]]}
                  onInputChange={handleInputDataChange}
                  onSubmission={handleSubmission}
                  isWalletConnected={!!account} 
                />
                </div>
        </div>
    )
}
