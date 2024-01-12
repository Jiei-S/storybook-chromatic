import { BrowserRouter } from "react-router-dom";
import type { Meta, StoryObj } from "@storybook/react";
import Link, { LinkProps } from "./link";

const meta: Meta<typeof Link> = {
  title: "Components/Text",
  component: Link,
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultArgs: LinkProps = {
  href: "/",
  text: "Hello World",
};

export const LinkText: Story = {
  args: DefaultArgs,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
