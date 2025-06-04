import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface PageProps {
  children: ReactNode;
}

export const Layout = ({ children }: PageProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        {children}
      </main>
    </div>
  );
};
