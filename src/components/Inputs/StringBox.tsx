import React from "react";

interface StringBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const StringBox: React.FC<StringBoxProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Program Id / Function"
      className="mb-1 text-black"
      value={value}
      onChange={handleChange}
    />
  );
};

export default StringBox;
