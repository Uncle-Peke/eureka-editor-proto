"use client";

import { ReactNode } from "react";
import NavItem from "./NavItem";

interface NavMenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

interface NavMenuProps {
  items: NavMenuItem[];
  title?: string;
  className?: string;
}

export default function NavMenu({
  items,
  title,
  className = "",
}: NavMenuProps) {
  const containerStyles = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
    padding: "16px 0",
  };

  const titleStyles = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#212529",
    marginBottom: "16px",
    padding: "0 16px",
  };

  return (
    <nav style={containerStyles} className={className}>
      {title && <div style={titleStyles}>{title}</div>}
      {items.map((item) => (
        <NavItem
          key={item.id}
          href={item.href}
          isActive={item.isActive}
          icon={item.icon}
          onClick={item.onClick}
        >
          {item.label}
        </NavItem>
      ))}
    </nav>
  );
}
