import type { Meta, StoryObj } from "@storybook/react";
import Heading1, { Heading1Props } from "./h1";

const meta: Meta<typeof Heading1> = {
  title: "Components/Text",
  component: Heading1,
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultArgs: Heading1Props = {
  text: "Hello World",
};

export const H1: Story = {
  args: DefaultArgs,
};
