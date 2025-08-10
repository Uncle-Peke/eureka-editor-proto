// MainLayout.tsx
"use client";

import { ReactNode, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [rightSidebarWidth, setRightSidebarWidth] = useState(280);
  const headerH = 56;
  const gap = 24;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Header />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `200px minmax(0,1fr) ${rightSidebarWidth}px`,
          columnGap: `${gap}px`,
          width: "100%",
          marginTop: `${headerH}px`,
          minHeight: `calc(100vh - ${headerH}px)`,
          alignItems: "start",
        }}
      >
        {/* 左サイドバー（sticky / fixedは使わない） */}
        <div style={{ position: "sticky", top: `${headerH}px` }}>
          <Sidebar />
        </div>

        {/* メイン（残り幅を自動で埋める） */}
        <main
          style={{
            minWidth: 0, // 折返し時のはみ出し防止
            background: "white",
            // overflow: "hidden", // ← 削除（切れの原因）
            // 必要なら: overflowY: "auto"
          }}
        >
          {children}
        </main>

        {/* 右サイドバー（sticky / fixedは使わない） */}
        <div
          style={{
            position: "sticky",
            top: `${headerH}px`,
            height: `calc(100vh - ${headerH}px)`,
          }}
        >
          <RightSidebar
            width={rightSidebarWidth}
            onWidthChange={setRightSidebarWidth}
          />
        </div>
      </div>
    </div>
  );
}
