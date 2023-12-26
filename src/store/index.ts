import { configureStore } from "@reduxjs/toolkit";
import { projectReducer, projectsReducer } from "./projects/slice";

const store = configureStore({
  reducer: {
    project: projectReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
