import React, { useState } from 'react';
import { useProgram } from '../../context/ProgramContext';
import { useRouter } from 'next/router';

interface StringBoxProps {
  value: string;
  onChange: (value: string) => void;
  functionNames?: string[];  
}

const StringBox: React.FC<StringBoxProps> = ({ value, onChange, functionNames = [] }) => {
  const [isManualInput, setIsManualInput] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.value === "other") {
      setIsManualInput(true);
    } else {
      setIsManualInput(false);
      onChange(e.target.value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    isManualInput ? (
      <input
        type="text"
        placeholder="Enter manually"
        className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        value={value}
        onChange={handleInputChange}
      />
    ) : (
      <select onChange={handleChange} value={value} className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
        <option value="">Select a function</option>
        {functionNames.map((name:string, index:number) => (
          <option key={index} value={name}>{name}</option>
        ))}
        <option value="other">Other</option>
      </select>
    )
  );
};

export default StringBox;
