import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "K-Collusion Index",
  description: "Compare Korea's relative price index with G20 economies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
