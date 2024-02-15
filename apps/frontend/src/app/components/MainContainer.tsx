import type { PropsWithChildren } from "react";

export const MainContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      {children}
    </div>
  );
};
