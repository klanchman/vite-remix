import { json } from "@remix-run/node";
import { createRemixStub } from "@remix-run/testing";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

import Index, { loader } from "./_index";

let IndexStub: ReturnType<typeof createRemixStub>;

beforeEach(() => {
  IndexStub = createRemixStub([
    {
      path: "/",
      Component: Index,
      loader: (): ReturnType<typeof loader> => {
        return json({ message: "I am in a test" });
      },
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

  await waitFor(() => screen.findByText("Async data: I am in a test"));
});
