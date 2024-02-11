import React from "react";

interface RecordBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const RecordBox: React.FC<RecordBoxProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Record"
      className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
      value={value}
      onChange={handleChange}
    />
  );
};

export default RecordBox;
