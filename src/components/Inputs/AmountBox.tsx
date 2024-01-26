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
      className="mb-1 text-black"
      value={displayValue}
      onChange={handleChange}
    />
  );
};

export default AmountBox;
