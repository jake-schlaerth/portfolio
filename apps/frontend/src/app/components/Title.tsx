export const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <h1 className={`${className}`}>{children}</h1>;
