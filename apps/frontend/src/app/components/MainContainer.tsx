"use client";

import type { PropsWithChildren } from "react";

import { useInitializeAnalytics } from "@/utils/analytics";

export const MainContainer = ({ children }: PropsWithChildren) => {
  useInitializeAnalytics();

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      {children}
    </div>
  );
};
