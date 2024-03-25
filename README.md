# Remix + Vite Template

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.

This template is similar to the [Blues Stack](https://github.com/remix-run/blues-stack), written at a time when that stack didn't support Vite yet.

## What's in the Stack

- Database ORM with [Prisma](https://prisma.io/)
- Styling with [Tailwind](https://tailwindcss.com/)
- Local third party request mocking with [MSW](https://mswjs.io/)
- Unit testing with [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/)
- Component previews and documentation with [Storybook](https://storybook.js.org/)
- Code formatting with [Prettier](https://prettier.io/)
- Linting with [ESLint](https://eslint.org/)
- Static types with [TypeScript](https://typescriptlang.org/)

## First-Time Setup

- Copy `.env.sample` to `.env` and update it as needed.
- You'll need a Postgres server running somewhere for development and unit tests. For convenience, you can use the one provided by Docker Compose in this repo:
    ```shell
    docker-compose up -d db
    ```
    Otherwise, update `.env` and `.env.test` as needed to change your database URLs.

Much of the code here just illustrates how to use the various tools in the template. You'll probably want to delete most of it! In particular, refer to [Prisma's guide on getting starting](https://www.prisma.io/docs/orm/prisma-migrate/getting-started) for an example of how to create your own database schema and initial migration.

## Development

Run the Vite dev server:

```sh
npm run dev
```

## Test

```sh
npm test
```

### Database Access in Tests

The tests have access to Postgres, so you don't need to mock Prisma. Each test suite receives its own database on the Postgres server, with as many databases as there are test workers in the pool. The databases are migrated one time at the beginning of test execution. Tables are cleared out after each test.

This means you can run multiple suites in parallel, as Vitest does by default. You may not be able to run tests concurrently within a single suite, though.

The convenience of using Postgres in your tests comes with some overhead. If your tests are running slowly, set `VERBOSE_TEST_HARNESS=true` in `.env.test` to see some extra logging output to check whether Postgres setup and teardown is slowing them down more than you'd like.