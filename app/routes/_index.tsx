import { MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ky from "ky";

import { DB } from "~/db.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const [userData, todoData] = await Promise.all([
    DB.client.user.findFirstOrThrow(),
    ky
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .json<{ title: string }>(),
  ]);

  return json({ todo: todoData.title, user: userData.name });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

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
      <p>Todo (from remote server): {data.todo}</p>
      <p>User (from database): {data.user}</p>
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
