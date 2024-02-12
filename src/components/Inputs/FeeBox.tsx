import React from "react";

interface FeeBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const FeeBox: React.FC<FeeBoxProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Amount"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
      value={value} 
      onChange={handleChange}
    />
  );
};

export default FeeBox;
