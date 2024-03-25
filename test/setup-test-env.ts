import { installGlobals } from "@remix-run/node";
import "@testing-library/jest-dom/vitest";

import { server } from "~/mocks";

installGlobals();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
