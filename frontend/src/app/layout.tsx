import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "トップページ",
  description: "最小構成のトップページ",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
