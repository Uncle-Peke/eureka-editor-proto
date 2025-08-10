"use client";

import React from "react";

type ResizeHandleProps = {
  onMouseDown: (e: React.MouseEvent) => void;
};

export default function ResizeHandle({ onMouseDown }: ResizeHandleProps) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 20,
        height: 20,
        cursor: "nw-resize",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseDown={onMouseDown}
      title="リサイズ"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22,2 13,11 2,22" />
        <polyline points="9,2 2,2 2,9" />
      </svg>
    </div>
  );
}
