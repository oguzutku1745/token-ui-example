import React, { useState, useEffect } from 'react';
import AddressBox from '../Inputs/AddressBox';
import AmountBox from '../Inputs/AmountBox';
import RecordBox from '../Inputs/RecordBox';
import StringBox from '../Inputs/StringBox';
import FeeBox from '../Inputs/FeeBox';
import { useProgram } from '@/context/ProgramContext';
import { useRouter } from 'next/router';

interface FunctionComponentProps {
  titles: string[];
  inputTypes: Array<Array<'StringBox' | 'AddressBox' | 'AmountBox' | 'RecordBox' | 'FeeBox'>>;
  onInputChange: (inputData: {[key: string]: string}) => void;
  onSubmission: () => void;
  isWalletConnected: boolean; 
}

type InputValues = {
  [key: string]: string;
};

const FunctionComponent: React.FC<FunctionComponentProps> = ({ titles, inputTypes, onInputChange, onSubmission, isWalletConnected }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [inputValues, setInputValues] = useState<InputValues>({});
  const [inputValuesChanged, setInputValuesChanged] = useState(false);

  const { mintFunctions, privateFunctions, publicFunctions } = useProgram();
  const router = useRouter();
  const currentPage = router.pathname.substring(1);

  useEffect(() => {
    if (inputValuesChanged) {
      onInputChange(inputValues);
      setInputValuesChanged(false);
    }
  }, [inputValues, inputValuesChanged, onInputChange]);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const handleInputChange = (tabIndex: number, inputType: string, index: number, value: string) => {
    setInputValues(prev => {
      const key = `${tabIndex}-${inputType}-${index}`;
      const newValues = { ...prev, [key]: value };
      return newValues;
    });
    setInputValuesChanged(true);
  };

  let filteredFunctionNames:any = [];
  
  // Rendering in related page w.r.t routing
  switch (currentPage) {
    case '':
      filteredFunctionNames = mintFunctions;
      break;
    case 'private':
      filteredFunctionNames = privateFunctions;
      break;
    case 'public':
      filteredFunctionNames = publicFunctions;
      break;
    default:
      filteredFunctionNames = [];
  }

  const renderInput = (tabIndex: number, type: 'StringBox' | 'AddressBox' | 'AmountBox' | 'RecordBox' | 'FeeBox', index: number) => {
    const key = `${tabIndex}-${type}-${index}`;
    let props;
    // Passing the filtered function names to StringBox
    if (type === 'StringBox') {
      props = {
        value: inputValues[key] || '',
        onChange: (value: string) => handleInputChange(tabIndex, type, index, value),
        functionNames: filteredFunctionNames 
      };
      return <StringBox {...props} />;
    } else {
      // For other input types
      props = {
        value: inputValues[key] || '',
        onChange: (value: string) => handleInputChange(tabIndex, type, index, value)
      };
    }

    switch (type) {
      case 'AddressBox':
        return <AddressBox {...props} />;
      case 'AmountBox':
        return <AmountBox {...props} />;
      case 'RecordBox':
        return <RecordBox {...props} />;
      case 'FeeBox':
        return <FeeBox {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="shadow-lg">
      <div className="flex flex-col w-screen max-w-sm p-4 bg-white border rounded-lg sm:p-6 dark:bg-gray-800 dark:border-gray-700 bg-opacity-25 shadow-lg border-white border-opacity-25 g-1">
        <div className="flex justify-around text-white">
          {titles.map((title, index) => (
            <button
              key={index}
              className={`p-2 text-lg ${activeTab === index ? 'text-white' : ''}`}
              onClick={() => handleTabChange(index)}
            >
              <span className="hover:text-sky-300">{title}</span>
            </button>
          ))}
        </div>

        {titles.map((title, tabIndex) => (
        <div key={tabIndex} className={`mt-4 ${activeTab === tabIndex ? 'block' : 'hidden'}`}>
          {inputTypes[tabIndex].map((type, index) => (
            <div key={index}>
              {renderInput(tabIndex+1, type, index)}
              </div>
            ))}
          </div>
        ))}

        <button
            onClick={onSubmission}
            className="mt-4 shadow-card dark:bg-gray-700 md:h-10 md:px-5 xl:h-12 xl:px-7 rounded-lg"
            disabled={!isWalletConnected}
          >
            {!isWalletConnected ? 'Connect Your Wallet First' : 'Submit'}
          </button>
      </div>
    </div>
  );
};

export default FunctionComponent;
