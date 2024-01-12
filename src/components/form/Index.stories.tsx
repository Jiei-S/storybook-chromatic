import type { Meta, StoryObj } from "@storybook/react";
import Form, { FormProps } from ".";
import { useInput } from "../../hooks/_shared/form";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: FormProps = {
  label: "Name",
  disabled: false,
  value: "",
  error: "",
  onChange: () => {},
  onSubmit: () => {},
};

export const Default: Story = {
  args: defaultArgs,
  // Use preview-api
  // render: function Render(args) {
  //   const [{ value }, updateArgs] = useArgs();
  //   const onChange = (e: ChangeEvent) => {
  //     const newValue = (e.target as HTMLInputElement).value;
  //     updateArgs({ value: newValue });
  //   };
  //   return <Form {...args} onChange={onChange} value={value} />;
  // },
  // Use custom hook
  render: function Render(args) {
    const [input] = useInput(args.value, () => "");
    return <Form {...args} {...input} />;
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: "Error occurred",
    disabled: true,
  },
};
