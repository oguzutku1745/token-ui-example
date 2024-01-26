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
      className="mb-1 text-black"
      value={value}
      onChange={handleChange}
    />
  );
};

export default RecordBox;
