import type { Preview } from "@storybook/react";
import { initialize, mswDecorator } from "msw-storybook-addon";
import mockAPIHandlers from "./mock/api";
import Provider from "./mock/provider";

initialize({
  onUnhandledRequest: "bypass",
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: mockAPIHandlers,
    },
  },
  decorators: [Provider, mswDecorator],
};

export default preview;
