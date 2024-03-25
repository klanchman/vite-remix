import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Index from "./_index";

it("has a heading", async () => {
  render(<Index />);

  await screen.findByRole("heading");

  const heading = screen.getByRole("heading");
  expect(heading).toBeVisible();
  expect(heading).toHaveTextContent("asdf");
});
