import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor } from "@storybook/testing-library";
import { ProjectPageKey } from "../../const/page";
import ProjectList from "./index";
import projectsRouter from "./routes";

const meta: Meta<typeof ProjectList> = {
  title: "Pages/ProjectList/__Test__",
  component: ProjectList,
};

export default meta;
type Story = StoryObj<typeof meta>;

const LIST_PAGE_PATH = `/${ProjectPageKey.ROOT}`;

class PlayFactory {
  readonly canvas;
  readonly body;
  readonly user;
  readonly step;

  submitButton: HTMLElement | null = null;
  name: HTMLElement | null = null;

  readonly SUCCESS_INPUT_DATA = {
    name: "John",
  };

  constructor(canvasElement: HTMLElement, step: (label: string, play: () => Promise<void>) => Promise<void> | void) {
    this.canvas = within(canvasElement);
    // Portals are rendered outside of the canvas element. e.g. Dialog
    // So, need to get the body element from the canvas element.
    this.body = within(canvasElement.ownerDocument.body);
    this.user = userEvent.setup();
    this.step = step;
  }

  transitionToNew = async () => {
    await this.step("Transition to new page", async () => {
      await this.user.click(this.canvas.getByRole("link", { name: "New Project" }));
    });
  };

  enter = async () => {
    await this.step("Enter", async () => {
      await this.user.type(this.name!, this.SUCCESS_INPUT_DATA.name);
    });
  };

  viewInitialForm = async () => {
    await this.step("View Initial Form", async () => {
      this.submitButton = this.canvas.getByRole("button", { name: "Submit" });
      await expect(this.submitButton).toBeDisabled();
      this.name = this.canvas.getByLabelText("Name");
      await expect(this.name).toHaveValue("");
    });
  };

  submit = async (input?: { name: string }) => {
    await this.step("Submit", async () => {
      const payload = input ?? this.SUCCESS_INPUT_DATA;
      await expect(this.name).toHaveValue(payload.name);
      await expect(this.submitButton).toBeEnabled();
      await this.user.click(this.submitButton!);
    });
  };

  transitionToList = async (router: ReturnType<typeof createMemoryRouter>) => {
    await this.step("Transition to list page", async () => {
      await waitFor(() => expect(router.state.location.pathname).toEqual(LIST_PAGE_PATH), { timeout: 5000 });
    });
  };
}

// const router = createMemoryRouter(projectsRouter, {
//   initialEntries: [LIST_PAGE_PATH],
// });

// export const Success: Story = {
//   render: function Render() {
//     return <RouterProvider router={router} />;
//   },
//   play: async ({ canvasElement, step }) => {
//     const fac = new PlayFactory(canvasElement, step);
//     await fac.transitionToNew();
//     await fac.viewInitialForm();
//     await fac.enter();
//     await fac.submit();
//     await fac.transitionToList(router);
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
    await fac.transitionToNew();
    await fac.viewInitialForm();
    await fac.enter();

    await step("Enter Max", async () => {
      await fac.user.clear(fac.name!);
      await fac.user.type(fac.name!, "a".repeat(21));
      await expect(fac.canvas.getByText("max length is 20")).toBeInTheDocument();
      await expect(fac.submitButton).toBeDisabled();
    });

    await step("Enter Empty", async () => {
      await fac.user.clear(fac.name!);
      await expect(fac.canvas.getByText("required")).toBeInTheDocument();
      await expect(fac.submitButton).toBeDisabled();
    });
  },
};
