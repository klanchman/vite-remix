export const Link: React.FC<React.PropsWithChildren<{ href: string }>> = ({
  children,
  href,
}) => {
  return (
    <a
      className="text-blue-600 visited:text-purple-500"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};
