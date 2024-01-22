import { FC, ReactNode } from "react";

interface MainContainerProps {
  children?: ReactNode;
}

export const MainContainer: FC<MainContainerProps> = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center flex-col">
    {children}
  </div>
);
