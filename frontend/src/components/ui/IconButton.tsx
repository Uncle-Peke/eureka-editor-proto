"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "outline";
  children?: ReactNode;
}

export default function IconButton({
  icon,
  size = "md",
  variant = "ghost",
  children,
  className = "",
  ...props
}: IconButtonProps) {
  const sizeStyles = {
    sm: {
      padding: "6px",
      width: "28px",
      height: "28px",
    },
    md: {
      padding: "8px",
      width: "36px",
      height: "36px",
    },
    lg: {
      padding: "12px",
      width: "44px",
      height: "44px",
    },
  };

  const variants = {
    ghost: {
      backgroundColor: "transparent",
      color: "#6c757d",
    },
    outline: {
      backgroundColor: "transparent",
      color: "#6c757d",
      border: "1px solid #dee2e6",
    },
  };

  const buttonStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "transparent",
    color: "#6c757d",
    transition: "all 0.2s ease-in-out",
    ...sizeStyles[size],
    ...variants[variant],
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === "ghost") {
      e.currentTarget.style.backgroundColor = "#f8f9fa";
    } else if (variant === "outline") {
      e.currentTarget.style.backgroundColor = "#f8f9fa";
      e.currentTarget.style.borderColor = "#adb5bd";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant === "ghost") {
      e.currentTarget.style.backgroundColor = "transparent";
    } else if (variant === "outline") {
      e.currentTarget.style.backgroundColor = "transparent";
      e.currentTarget.style.borderColor = "#dee2e6";
    }
  };

  return (
    <button
      style={buttonStyles}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {icon}
      {children && <span style={{ marginLeft: "8px" }}>{children}</span>}
    </button>
  );
}
