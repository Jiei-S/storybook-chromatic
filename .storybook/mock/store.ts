import { configureStore, createSlice, EnhancedStore } from "@reduxjs/toolkit";
import { RootState } from "../../src/store";
import {
  initialProjectState,
  initialProjectsState,
  projectExtraReducers,
  projectsExtraReducers,
} from "../../src/store/projects/slice";
import { SliceName } from "../../src/store/projects/type";

export const mockStore = (): EnhancedStore<RootState> => {
  return configureStore({
    reducer: {
      project: createSlice({
        name: SliceName.project,
        initialState: initialProjectState,
        reducers: {},
        extraReducers: projectExtraReducers,
      }).reducer,
      projects: createSlice({
        name: SliceName.projects,
        initialState: initialProjectsState,
        reducers: {},
        extraReducers: projectsExtraReducers,
      }).reducer,
    },
  });
};
