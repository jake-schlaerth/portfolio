import Link, { LinkProps } from "next/link";

interface InternalLinkProps extends LinkProps {
  children: React.ReactNode;
}

export const InternalLink = ({ children, ...rest }: InternalLinkProps) => (
  <Link className="text-gray-400 underline" {...rest}>
    {children}
  </Link>
);
