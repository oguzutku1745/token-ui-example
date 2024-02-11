import React from "react";

interface AmountBoxProps {
  value: string;
  onChange: (newValue: string) => void;
}

const AmountBox: React.FC<AmountBoxProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    onChange(e.target.value + 'u64');
  };

  const displayValue = value.replace('u64', '');

  return (
    <input
      type="text"
      placeholder="Amount"
      className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
      value={displayValue}
      onChange={handleChange}
    />
  );
};

export default AmountBox;
