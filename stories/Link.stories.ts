import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "~/components/Link";

const meta = {
  title: "Common/Link",
  component: Link,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "A React node to display as the link's content.",
    },
    href: {
      description: "Where the link goes. Probably a URL",
    },
  },
  args: {
    children: "Hello world!",
    href: "http://example.com",
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
