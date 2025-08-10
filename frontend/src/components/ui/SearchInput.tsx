"use client";

import { useState, InputHTMLAttributes } from "react";

interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  placeholder?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
}

export default function SearchInput({
  placeholder = "検索...",
  onChange,
  onSearch,
  ...props
}: SearchInputProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch?.(value);
    }
  };

  const inputStyles = {
    width: "100%",
    padding: "10px 12px 10px 44px",
    border: "1px solid #dee2e6",
    borderRadius: "20px",
    fontSize: "14px",
    backgroundColor: isFocused ? "white" : "#e9ecef",
    borderColor: isFocused ? "#0d6efd" : "#dee2e6",
    outline: "none",
    transition: "all 0.2s ease-in-out",
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <svg
        style={{
          position: "absolute",
          left: "12px",
          width: "20px",
          height: "20px",
          color: "#6c757d",
          zIndex: 1,
        }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={inputStyles}
        {...props}
      />
    </div>
  );
}
