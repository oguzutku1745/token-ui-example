import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ProgramContextType {
  programName: string;
  setProgramName: (name: string) => void;
  functionNames: string[];
  setFunctionNames: (names: string[]) => void;
  mintFunctions: string[];
  setMintFunctions: (names: string[]) => void;
  privateFunctions: string[];
  setPrivateFunctions: (names: string[]) => void;
  publicFunctions: string[];
  setPublicFunctions: (names: string[]) => void;
}

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

export const useProgram = () => {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error('useProgram must be used within a ProgramProvider');
  }
  return context;
};

interface ProgramProviderProps {
  children: ReactNode;
}

export const ProgramProvider: React.FC<ProgramProviderProps> = ({ children }) => {
  const [programName, setProgramName] = useState<string>('');
  const [functionNames, setFunctionNames] = useState<string[]>([]);
  const [mintFunctions, setMintFunctions] = useState<string[]>([]);
  const [privateFunctions, setPrivateFunctions] = useState<string[]>([]);
  const [publicFunctions, setPublicFunctions] = useState<string[]>([]);

  const value = {
    programName,
    setProgramName,
    functionNames,
    setFunctionNames,
    mintFunctions,
    setMintFunctions,
    privateFunctions,
    setPrivateFunctions,
    publicFunctions,
    setPublicFunctions
  };

  return <ProgramContext.Provider value={value}>{children}</ProgramContext.Provider>;
};
