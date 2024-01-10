import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { ProjectPageKey } from "../../const/page";
import ProjectList from "./index";
import projectsRouter from "./routes";

const meta: Meta<typeof ProjectList> = {
  title: "Pages/ProjectList/Test",
  component: ProjectList,
};

export default meta;
type Story = StoryObj<typeof meta>;

const LIST_PAGE_PATH = `/${ProjectPageKey.ROOT}`;

class PlayFactory {
  readonly canvas;
  readonly user;
  readonly step;

  submitButton: HTMLElement | null = null;
  name: HTMLElement | null = null;

  readonly SUCCESS_INPUT_DATA = {
    name: "John",
  };

  constructor(canvasElement: HTMLElement, step: (label: string, play: () => Promise<void>) => Promise<void> | void) {
    this.canvas = within(canvasElement);
    this.user = userEvent.setup();
    this.step = step;
  }

  setup = async () => {
    await this.step("Transition to new page", async () => {
      await this.user.click(this.canvas.getByRole("link", { name: "New Project" }));
    });
    this.getAllElements();
  };

  getAllElements = () => {
    this.submitButton = this.canvas.getByRole("button", { name: "Submit" });
    this.name = this.canvas.getByLabelText("Name");
  };

  enterSuccessData = async () => {
    await this.step("Enter", async () => {
      await this.user.type(this.name!, this.SUCCESS_INPUT_DATA.name);
    });
  };

  testInitial = async () => {
    await this.step("Initial", async () => {
      await expect(this.submitButton).toBeInTheDocument();
      await expect(this.submitButton).toBeDisabled();
      await expect(this.name).toBeInTheDocument();
      await expect(this.name).toHaveValue("");
    });
  };

  testSubmit = async (input?: { name: string }) => {
    await this.step("Submit", async () => {
      const payload = input ?? this.SUCCESS_INPUT_DATA;
      await expect(this.name).toHaveValue(payload.name);
      await expect(this.submitButton).toBeEnabled();
      await this.user.click(this.submitButton!);
    });
  };

  testTransitionToListPage = async (router: ReturnType<typeof createMemoryRouter>) => {
    await this.step("Transition to list page", async () => {
      await waitFor(() => expect(router.state.location.pathname).toEqual(LIST_PAGE_PATH), { timeout: 5000 });
    });
  };
}

const router = createMemoryRouter(projectsRouter, {
  initialEntries: [LIST_PAGE_PATH],
});

// export const Success: Story = {
//   render: function Render() {
//     return <RouterProvider router={router} />;
//   },
//   play: async ({ canvasElement, step }) => {
//     const fac = new PlayFactory(canvasElement, step);
//     await fac.setup();
//     await fac.testInitial();
//     await fac.enterSuccessData();
//     await fac.testSubmit();
//     await fac.testTransitionToListPage(router);
//   },
// };

export const NameError: Story = {
  render: function Render() {
    return (
      <RouterProvider
        router={createMemoryRouter(projectsRouter, {
          initialEntries: [LIST_PAGE_PATH],
        })}
      />
    );
  },
  play: async ({ canvasElement, step }) => {
    const fac = new PlayFactory(canvasElement, step);
    await fac.setup();
    await fac.testInitial();
    await fac.enterSuccessData();

    await step("Max", async () => {
      await fac.user.clear(fac.name!);
      await fac.user.type(fac.name!, "a".repeat(21));
      await expect(fac.canvas.getByText("max length is 20")).toBeInTheDocument();
      await expect(fac.submitButton).toBeDisabled();
    });

    await step("Empty", async () => {
      await fac.user.clear(fac.name!);
      await expect(fac.canvas.getByText("required")).toBeInTheDocument();
      await expect(fac.submitButton).toBeDisabled();
    });
  },
};
