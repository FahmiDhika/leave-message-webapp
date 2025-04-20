"use client";

import { KeyboardEvent } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  id: string;
  required?: boolean;
  placeholder?: string;
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export const Input = ({
  value,
  onChange,
  className,
  id,
  required,
  placeholder,
  onKeyUp,
}: Props) => {
  return (
    <input
      type="text"
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full text-lg bg-blue-500 text-white font-normal tracking-wide rounded-2xl py-3 px-4 ${className} focus:outline-none mb-4`}
      required={required ? required : false}
      placeholder={placeholder || ``}
      onKeyUp={(e) => {
        if (onKeyUp) onKeyUp(e);
      }}
    />
  );
};
