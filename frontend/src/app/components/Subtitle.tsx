import { FC, ReactNode } from "react";

interface SubtitleProps {
  children?: ReactNode;
}

export const Subtitle: FC<SubtitleProps> = ({ children }) => (
  <div className="">
    <h1>{children}</h1>
  </div>
);
