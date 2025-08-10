"use client";

import React, { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const headerH = 56;
  const gap = 24;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#000000" }}>
      <Header />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `200px minmax(0,1fr)`,
          columnGap: `${gap}px`,
          width: "100%",
          marginTop: `${headerH}px`,
          minHeight: `calc(100vh - ${headerH}px)`,
          alignItems: "start",
          overflow: "hidden",
        }}
      >
        {/* 左サイドバー（sticky / fixedは使わない） */}
        <div style={{ position: "sticky", top: `${headerH}px` }}>
          <Sidebar />
        </div>

        {/* メイン（残り幅を自動で埋める） */}
        <main
          style={{
            background: "white",
            minWidth: 0,
            overflow: "hidden",
            width: "100%",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
