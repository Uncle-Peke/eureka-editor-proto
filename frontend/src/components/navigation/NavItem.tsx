"use client";

import { ReactNode } from "react";

interface NavItemProps {
  href?: string;
  isActive?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  onClick?: () => void;
}

export default function NavItem({
  href,
  isActive = false,
  icon,
  children,
  onClick,
}: NavItemProps) {
  const baseStyles = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    textDecoration: "none",
    color: isActive ? "#0d6efd" : "#495057",
    backgroundColor: isActive ? "#e7f3ff" : "transparent",
    fontWeight: isActive ? "600" : "400",
    transition: "all 0.2s ease-in-out",
    fontSize: "16px",
  };

  const hoverStyles = {
    backgroundColor: isActive ? "#d1ecf1" : "#f8f9fa",
    color: isActive ? "#0d6efd" : "#212529",
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    Object.assign(e.currentTarget.style, hoverStyles);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    Object.assign(e.currentTarget.style, baseStyles);
  };

  if (href) {
    return (
      <a
        href={href}
        style={baseStyles}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {icon && <span style={{ fontSize: "20px" }}>{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <div
      style={baseStyles}
      onClick={handleClick}
      onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyles)}
      onMouseLeave={(e) => Object.assign(e.currentTarget.style, baseStyles)}
    >
      {icon && <span style={{ fontSize: "20px" }}>{icon}</span>}
      <span>{children}</span>
    </div>
  );
}
