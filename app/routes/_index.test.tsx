import { createRemixStub } from "@remix-run/testing";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";

import { DB } from "~/db.server";
import { server } from "~/mocks";

import Index, { loader } from "./_index";

let IndexStub: ReturnType<typeof createRemixStub>;

beforeEach(() => {
  server.use(
    http.get("https://jsonplaceholder.typicode.com/todos/*", () =>
      HttpResponse.json({
        title: "I am in a test",
      }),
    ),
  );
});

beforeEach(async () => {
  await DB.client.user.create({
    data: {
      email: "bob@example.com",
      name: "Bob Test",
    },
  });

  IndexStub = createRemixStub([
    {
      path: "/",
      Component: Index,
      loader,
    },
  ]);
});

it("has a heading", async () => {
  render(<IndexStub />);

  await screen.findByRole("heading");

  const heading = screen.getByRole("heading");
  expect(heading).toBeVisible();
  expect(heading).toHaveTextContent("Welcome to Remix");
});

it("loads data", async () => {
  render(<IndexStub />);

  await waitFor(() =>
    screen.findByText("Todo (from remote server): I am in a test"),
  );
  await waitFor(() => screen.findByText("User (from database): Bob Test"));
});
