"use client";

import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* ヘッダー */}
      <Header />

      {/* メインコンテンツエリア */}
      <div style={{ display: "flex", width: "100vw", minWidth: "100%" }}>
        {/* 左サイドバー */}
        <Sidebar />

        {/* 中央のメインコンテンツ */}
        <main
          style={{
            flex: "1 1 auto",
            backgroundColor: "white",
            minHeight: "calc(100vh - 60px)",
            minWidth: 0,
            overflow: "hidden",
            paddingRight: "24px",
          }}
        >
          {children}
        </main>

        {/* 右サイドバー */}
        <RightSidebar />
      </div>
    </div>
  );
}
