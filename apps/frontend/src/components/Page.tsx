import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface PageProps {
  children: ReactNode;
}

export const Page = ({ children }: PageProps) => {
  return (
    <>
      <Navbar />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center">{children}</div>
      </div>
    </>
  );
};
