import React from "react";

interface AddressBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const AddressBox: React.FC<AddressBoxProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Address"
      className="mb-1 text-black"
      value={value}
      onChange={handleChange}
    />
  );
};

export default AddressBox;
