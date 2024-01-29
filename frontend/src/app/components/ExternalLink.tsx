import { AnchorHTMLAttributes } from "react";

export const ExternalLink = ({
  href,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a href={href} className="text-gray-400 underline" {...rest}>
    {children}
  </a>
);
