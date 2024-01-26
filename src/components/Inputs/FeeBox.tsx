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
      className="mb-1 text-black"
      value={Number(value)}
      onChange={handleChange}
    />
  );
};

export default FeeBox;
