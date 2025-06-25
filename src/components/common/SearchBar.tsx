/** @format */

import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type="text"
      className="border border-black text-black p-2 rounded-md w-full mb-4"
      placeholder={placeholder || "Buscar..."}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
