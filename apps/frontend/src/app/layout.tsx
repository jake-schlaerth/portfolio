import "./globals.css";
import "leaflet/dist/leaflet.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { MainContainer } from "./components";
import { Provider } from "jotai";
import { Analytics } from "./components/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jake Schlaerth",
  description: "Software Engineer",
};

export default function RootLayout({ children }: PropsWithChildren) {
  const isAnalyticsEnabled = false;
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {isAnalyticsEnabled && <Analytics />}
          <MainContainer>{children}</MainContainer>
        </Provider>
      </body>
    </html>
  );
}
