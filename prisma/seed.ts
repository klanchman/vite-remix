import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.user.upsert({
    where: { email: "bob@example.com" },
    create: {
      email: "bob@example.com",
      name: "Bob Smith",
      Post: {
        create: {
          title: "Hello World",
          content: "Et reprehenderit nostrud cupidatat do elit culpa sunt.",
        },
      },
    },
    update: {},
  });
};

await seed();
