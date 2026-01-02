import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "記憶配對遊戲 - Memory Match",
  description: "挑戰你的記憶力！翻牌配對相同的圖案。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
