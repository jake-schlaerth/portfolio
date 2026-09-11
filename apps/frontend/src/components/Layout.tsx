import { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

export const Layout = ({ children }: PageProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        {children}
      </main>
    </div>
  );
};
