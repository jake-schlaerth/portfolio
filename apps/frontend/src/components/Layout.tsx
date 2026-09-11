import { ReactNode } from "react";
import { FluidBackground } from "../fluid/FluidBackground";

interface PageProps {
  children: ReactNode;
}

export const Layout = ({ children }: PageProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <FluidBackground />
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full">
        {children}
      </main>
    </div>
  );
};
