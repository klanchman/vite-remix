import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="p-5">
      <h1 className="mb-4 text-3xl font-semibold">Welcome to Remix</h1>
      <ul className="ml-8 list-disc">
        <li>
          <Link href="https://remix.run/tutorials/blog">
            15m Quickstart Blog Tutorial
          </Link>
        </li>
        <li>
          <Link href="https://remix.run/tutorials/jokes">
            Deep Dive Jokes App Tutorial
          </Link>
        </li>
        <li>
          <Link href="https://remix.run/docs">Remix Docs</Link>
        </li>
      </ul>
    </div>
  );
}

const Link: React.FC<React.PropsWithChildren<{ href: string }>> = ({
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
