import React from "react";

interface KebabMenuProps {
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export default function KebabMenu({ onClick, className }: KebabMenuProps) {
  return (
    <button
      onClick={onClick}
      className={className}
      aria-label="メニューを開く"
      type="button"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="6" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="12" cy="18" r="2" />
      </svg>
    </button>
  );
}
