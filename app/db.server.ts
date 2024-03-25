import { PrismaClient } from "@prisma/client";
import invariant from "tiny-invariant";

export class DB {
  private static _client: PrismaClient;
  static get client(): PrismaClient {
    invariant(
      process.env.DATABASE_URL,
      "DATABASE_URL environment variable is required",
    );

    return DB._client || (DB._client = new PrismaClient() || DB._client);
  }
}
