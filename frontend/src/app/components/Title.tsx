import { FC, ReactNode } from "react";

interface TitleProps {
  children?: ReactNode;
}

export const Title: FC<TitleProps> = ({ children }) => (
  <div className="">
    <h2>{children}</h2>
  </div>
);
