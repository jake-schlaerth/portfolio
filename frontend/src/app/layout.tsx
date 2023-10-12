import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { MainContainer } from "@components/layout/MainContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jake Schlaerth",
  description: "Software Engineer",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainContainer>{children}</MainContainer>
      </body>
    </html>
  );
}
