import React from "react";
import { IconProps } from "./types";

interface BaseIconProps extends IconProps {
  children: React.ReactNode;
  viewBox?: string;
}

export default function BaseIcon({
  size = 20,
  className = "",
  color = "currentColor",
  strokeWidth = 2,
  filled = false,
  viewBox = "0 0 24 24",
  children,
}: BaseIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      fill={filled ? color : "none"}
      stroke={filled ? "none" : color}
      viewBox={viewBox}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}
