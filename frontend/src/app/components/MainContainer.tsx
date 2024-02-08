"use client";

import { Analytics } from ".";
import { isClient } from "@/app/utils";

export const MainContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex items-center justify-center flex-col">
    {isClient() && <Analytics />}

    {children}
  </div>
);
