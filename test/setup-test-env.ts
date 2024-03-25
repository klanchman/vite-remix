import { PrismaClient } from "@prisma/client";
import { installGlobals } from "@remix-run/node";
import "@testing-library/jest-dom/vitest";

import { server } from "~/mocks";

installGlobals();

// Set up MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Set up Prisma
beforeAll(() => {
  const dbTemplateUrl = new URL(process.env.DATABASE_URL_TEMPLATE!);
  dbTemplateUrl.pathname += `_${process.env.VITEST_POOL_ID}`;
  vitest.stubEnv("DATABASE_URL", dbTemplateUrl.toString());

  if (process.env.VERBOSE_TEST_HARNESS === "true") {
    console.log("Suite running on pool:", process.env.VITEST_POOL_ID);
  }
});

afterEach(async () => {
  if (process.env.VERBOSE_TEST_HARNESS === "true") {
    console.time("DB Cleanup");
  }

  const prisma = new PrismaClient();

  const rawNames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tablesToTruncate = rawNames
    .map((o) => o.tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"public"."${name}"`)
    .join(", ");

  await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tablesToTruncate} CASCADE;`);

  if (process.env.VERBOSE_TEST_HARNESS === "true") {
    console.timeEnd("DB Cleanup");
  }
});
