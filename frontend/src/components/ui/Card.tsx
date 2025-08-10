"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  padding?: "sm" | "md" | "lg";
  className?: string;
}

export default function Card({
  children,
  padding = "md",
  className = "",
}: CardProps) {
  const paddingStyles = {
    sm: "12px",
    md: "16px",
    lg: "24px",
  };

  const cardStyles = {
    backgroundColor: "white",
    border: "1px solid #e9ecef",
    borderRadius: "8px",
    padding: paddingStyles[padding],
  };

  return (
    <div style={cardStyles} className={className}>
      {children}
    </div>
  );
}
