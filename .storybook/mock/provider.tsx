import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { mockStore } from "./store";

const Provider = (Story, context) => {
  return (
    <ReduxProvider store={mockStore()}>
      <Story />
    </ReduxProvider>
  );
};

export default Provider;
