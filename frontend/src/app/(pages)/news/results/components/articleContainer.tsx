import { ReactNode } from "react";

interface ArticleContainerProps {
  children: ReactNode;
}

export const ArticleContainer = ({ children }: ArticleContainerProps) => (
  <div className="flex justify-center space-x-4">{children}</div>
);
