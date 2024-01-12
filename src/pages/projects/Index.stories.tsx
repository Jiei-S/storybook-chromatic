import { createMemoryRouter, RouterProvider } from "react-router-dom";
import type { Meta, StoryObj } from "@storybook/react";
import { ProjectPageKey } from "../../const/page";
import ProjectList from "./index";
import projectsRouter from "./routes";

const meta: Meta<typeof ProjectList> = {
  title: "Pages/ProjectList",
  component: ProjectList,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Render() {
    return (
      <RouterProvider
        router={createMemoryRouter(projectsRouter, {
          initialEntries: [`/${ProjectPageKey.ROOT}`],
        })}
      />
    );
  },
};
