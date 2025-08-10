import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Eureka",
  description: "Eureka",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
