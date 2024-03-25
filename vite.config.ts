import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

const isVitest = !!process.env.VITEST;
const isStorybook = process.argv[1]?.includes("storybook");
const loadRemix = !isVitest && !isStorybook;

export default defineConfig({
  plugins: [
    loadRemix &&
      remix({
        ignoredRouteFiles: ["**/*.test.*"],
      }),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: "happy-dom",
    globalSetup: ["./test/global-setup.ts"],
    setupFiles: ["./test/setup-test-env.ts"],
  },
});
