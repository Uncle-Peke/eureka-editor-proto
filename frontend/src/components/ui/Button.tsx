"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s ease-in-out",
  };

  const variants = {
    primary: {
      backgroundColor: "#0d6efd",
      color: "white",
      "&:hover": {
        backgroundColor: "#0b5ed7",
      },
    },
    secondary: {
      backgroundColor: "#6c757d",
      color: "white",
      "&:hover": {
        backgroundColor: "#5a6268",
      },
    },
    ghost: {
      backgroundColor: "transparent",
      color: "#6c757d",
      "&:hover": {
        backgroundColor: "#f8f9fa",
      },
    },
  };

  const sizes = {
    sm: {
      padding: "6px 12px",
      fontSize: "14px",
    },
    md: {
      padding: "8px 24px",
      fontSize: "14px",
    },
    lg: {
      padding: "12px 32px",
      fontSize: "16px",
    },
  };

  const buttonStyles = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
    ...(props.disabled && {
      backgroundColor: "#e9ecef",
      color: "#6c757d",
      cursor: "not-allowed",
      opacity: 0.6,
    }),
  };

  return (
    <button style={buttonStyles} className={className} {...props}>
      {children}
    </button>
  );
}
