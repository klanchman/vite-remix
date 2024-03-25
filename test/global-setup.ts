import { PrismaClient } from "@prisma/client";
import { exec } from "node:child_process";
import * as OS from "node:os";
import { promisify } from "node:util";
import invariant from "tiny-invariant";
import { ResolvedConfig } from "vitest";

const execAsync = promisify(exec);

export async function setup({ config }: { config: ResolvedConfig }) {
  // Logic from https://github.com/vitest-dev/vitest/blob/fee7d8be9d6e6f710270600ae91fa35d861b7075/packages/vitest/src/node/pools/threads.ts#L41C1-L48C31
  const numCpus =
    typeof OS.availableParallelism === "function"
      ? OS.availableParallelism()
      : OS.cpus().length;

  const threadsCount = config.watch
    ? Math.max(Math.floor(numCpus / 2), 1)
    : Math.max(numCpus - 1, 1);

  const maxThreads =
    (config.poolOptions?.maxThreads as number | undefined) ??
    config.maxWorkers ??
    threadsCount;

  log("Max pool size:", maxThreads);

  const setupDbUrl = process.env.SETUP_DATABASE_URL;
  invariant(setupDbUrl, "SETUP_DATABASE_URL environment variable is required");
  const prisma = new PrismaClient({
    datasourceUrl: setupDbUrl,
  });

  const liveDbTemplateStr = process.env.DATABASE_URL_TEMPLATE;
  invariant(
    liveDbTemplateStr,
    "DATABASE_URL_TEMPLATE environment variable is required",
  );

  const liveDbTemplateUrl = new URL(liveDbTemplateStr);
  const baseDbName = liveDbTemplateUrl.pathname.replaceAll("/", "");

  if (process.env.VERBOSE_TEST_HARNESS === "true") {
    console.time("DB Setup");
  }

  await Promise.all(
    Array(maxThreads)
      .fill("")
      .map(async (_, i) => {
        const threadDbName = `${baseDbName}_${i + 1}`;

        log(`Dropping ${threadDbName}...`);
        await prisma.$executeRawUnsafe(
          `DROP DATABASE IF EXISTS ${threadDbName}`,
        );

        log(`Creating ${threadDbName}...`);
        await prisma.$executeRawUnsafe(`CREATE DATABASE ${threadDbName}`);

        liveDbTemplateUrl.pathname = threadDbName;
        log(`Migrating ${threadDbName}...`);
        await execAsync("prisma db push", {
          env: {
            ...process.env,
            DATABASE_URL: liveDbTemplateUrl.toString(),
          },
        });

        log(`Done setting up ${threadDbName}`);
      }),
  );

  if (process.env.VERBOSE_TEST_HARNESS === "true") {
    console.timeEnd("DB Setup");
  }
}

const log: typeof console.log = (...args) => {
  if (process.env.VERBOSE_TEST_HARNESS === "true") {
    console.log(...args);
  }
};
