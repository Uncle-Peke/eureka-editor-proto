import "./globals.css";
import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MainContent from "@/components/layout/MainContent";

export const metadata = {
  title: "Eureka",
  description: "Eureka",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <div
          className="bg-dark"
          style={{
            minHeight: "100vh",
            backgroundColor: "var(--color-bg-dark)",
          }}
        >
          <Header />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `var(--sidebar-width) minmax(0,1fr)`,
              columnGap: "var(--layout-gap)",
              width: "100%",
              marginTop: "var(--header-height)",
              minHeight: `calc(100vh - var(--header-height))`,
              alignItems: "start",
              overflow: "visible",
              paddingRight: "var(--layout-padding)",
            }}
          >
            {/* 左サイドバー（sticky / fixedは使わない） */}
            <div style={{ position: "sticky", top: "var(--header-height)" }}>
              <Sidebar />
            </div>

            {/* メインコンテンツ */}
            <MainContent>{children}</MainContent>
          </div>
        </div>
      </body>
    </html>
  );
}
