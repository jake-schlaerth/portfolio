import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { MainContainer } from "./components";
import { Provider } from "jotai";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jake Schlaerth",
  description: "Software Engineer",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <MainContainer>{children}</MainContainer>
        </Provider>
      </body>
    </html>
  );
}
