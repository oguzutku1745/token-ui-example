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
        className="mb-1 text-black"
        value={value}
        onChange={handleInputChange}
      />
    ) : (
      <select onChange={handleChange} value={value} className="mb-1 text-black">
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
