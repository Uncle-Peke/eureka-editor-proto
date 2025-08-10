"use client";

import React, { ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main
      className="bg-primary"
      style={{
        background: "var(--color-bg-primary)",
        minWidth: 0,
        maxWidth: "100%",
        overflow: "auto",
        width: "100%",
        boxSizing: "border-box",
        padding: "var(--spacing-6)",
      }}
    >
      <div
        style={{
          maxWidth: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </main>
  );
}
