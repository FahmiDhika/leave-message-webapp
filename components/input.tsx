"use client";

import { KeyboardEvent, ReactNode } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  type: "text" | "number" | "color" | "email" | "password" | "date";
  className?: string;
  id: string;
  required?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  children?: ReactNode;
  label?: string;
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
};

export const Input = ({
  value,
  onChange,
  type,
  className,
  id,
  required,
  placeholder,
  onKeyUp,
}: Props) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`text-lg bg-red-500 ${className}`}
      required={required ? required : false}
      placeholder={placeholder || ""}
      onKeyUp={(e) => {
        if (onKeyUp) onKeyUp(e);
      }}
    />
  );
};
