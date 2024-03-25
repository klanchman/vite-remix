import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

const isStorybook = process.argv[1]?.includes("storybook");

export default defineConfig({
  plugins: [
    !isStorybook &&
      remix({
        ignoredRouteFiles: ["**/*.test.*"],
      }),
    tsconfigPaths(),
  ],
});
