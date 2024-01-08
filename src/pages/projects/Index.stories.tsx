import { MemoryRouter, Route, Routes } from "react-router-dom";
import type { Meta, StoryObj } from "@storybook/react";
import { ProjectPageKey } from "../../const/page";
import ProjectNew from "./create";
import ProjectEdit from "./edit";
import ProjectList from "./index";

const meta: Meta<typeof ProjectList> = {
  title: "Pages/ProjectList",
  component: ProjectList,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={[`/${ProjectPageKey.ROOT}`]}>
        <Routes>
          <Route element={<Story />} path={`/${ProjectPageKey.ROOT}`} />
          <Route element={<ProjectNew />} path={`/${ProjectPageKey.ROOT}/${ProjectPageKey.NEW}`} />
          <Route element={<ProjectEdit />} path={`/${ProjectPageKey.ROOT}/:id/${ProjectPageKey.EDIT}`} />
        </Routes>
      </MemoryRouter>
    ),
  ],
};
