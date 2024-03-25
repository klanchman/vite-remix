import { render, screen, waitFor } from "@testing-library/react";

import { Link } from "./Link";

it("renders", async () => {
  render(<Link href="http://example.com">Hello</Link>);
  expect(await waitFor(() => screen.findByText("Hello")));
});
