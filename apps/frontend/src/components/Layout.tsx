import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface PageProps {
  children: ReactNode;
}

export const Layout = ({ children }: PageProps) => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 relative">{children}</main>
    </div>
  );
};
