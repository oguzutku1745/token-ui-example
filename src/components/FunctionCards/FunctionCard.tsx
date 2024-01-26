import React, { useState, useEffect } from 'react';
import AddressBox from '../Inputs/AddressBox';
import AmountBox from '../Inputs/AmountBox';
import RecordBox from '../Inputs/RecordBox';
import StringBox from '../Inputs/StringBox';
import FeeBox from '../Inputs/FeeBox';

interface FunctionComponentProps {
  titles: string[];
  inputTypes: Array<Array<'StringBox' | 'AddressBox' | 'AmountBox' | 'RecordBox' | 'FeeBox'>>;
  onInputChange: (inputData: {[key: string]: string}) => void; // New prop for the callback
}

type InputValues = {
  [key: string]: string;
};

const FunctionComponent: React.FC<FunctionComponentProps> = ({ titles, inputTypes, onInputChange }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [inputValues, setInputValues] = useState<InputValues>({});
  const [inputValuesChanged, setInputValuesChanged] = useState(false);

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

  const renderInput = (tabIndex: number, type: 'StringBox' | 'AddressBox' | 'AmountBox' | 'RecordBox' | 'FeeBox', index: number) => {
    const key = `${tabIndex}-${type}-${index}`;
    const props = {
      value: inputValues[key] || '',
      onChange: (value: string) => handleInputChange(tabIndex, type, index, value)
    };

    switch (type) {
      case 'StringBox':
        return <StringBox {...props} />;
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
    <div className="p-6 shadow-lg">
      <div className="flex flex-col bg-gradient-to-r from-gray-700 to-gray-500 rounded-lg shadow-xl p-4 items-center">
        <div className="flex justify-around text-white">
          {titles.map((title, index) => (
            <button
              key={index}
              className={`p-2 ${activeTab === index ? 'text-blue-300' : ''}`}
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
      </div>
    </div>
  );
};

export default FunctionComponent;