import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { APIError } from "../../config/api/axios";
import { createProject, findProject, getProjects, updateProject } from "./api";
import { SliceName, StateStatus } from "./type";

export type Project = {
  id: string;
  name: string;
};

const initialProject: Project = {
  id: "",
  name: "",
};

type ProjectState<T> = {
  data: T;
  status: StateStatus;
  error: APIError | null;
};

export const initialProjectState: ProjectState<Project> = {
  data: initialProject,
  status: StateStatus.idle,
  error: null,
};

export const projectExtraReducers = (builder: ActionReducerMapBuilder<ProjectState<Project>>) => {
  return builder
    .addCase(findProject.pending, (state) => {
      state.status = StateStatus.loading;
    })
    .addCase(findProject.fulfilled, (state, action) => {
      state.status = StateStatus.loaded;
      state.data = action.payload;
    })
    .addCase(findProject.rejected, (state, action) => {
      state.status = StateStatus.failed;
      state.error = action.payload as APIError;
    })
    .addCase(createProject.pending, (state) => {
      state.status = StateStatus.submitting;
    })
    .addCase(createProject.fulfilled, (state, action) => {
      state.status = StateStatus.success;
      state.data = action.payload;
    })
    .addCase(createProject.rejected, (state, action) => {
      state.status = StateStatus.failed;
      state.error = action.payload as APIError;
    })
    .addCase(updateProject.pending, (state) => {
      state.status = StateStatus.submitting;
    })
    .addCase(updateProject.fulfilled, (state, action) => {
      state.status = StateStatus.success;
      state.data = action.payload;
    })
    .addCase(updateProject.rejected, (state, action) => {
      state.status = StateStatus.failed;
      state.error = action.payload as APIError;
    });
};

const projectSlice = createSlice({
  name: SliceName.project,
  initialState: initialProjectState,
  reducers: {
    reset: (state) => {
      state.status = StateStatus.idle;
      state.error = null;
      state.data = initialProject;
    },
  },
  extraReducers: projectExtraReducers,
});

export const { reset } = projectSlice.actions;

export const projectReducer = projectSlice.reducer;

export const initialProjectsState: ProjectState<Project[]> = {
  data: [initialProject],
  status: StateStatus.idle,
  error: null,
};

export const projectsExtraReducers = (builder: ActionReducerMapBuilder<ProjectState<Project[]>>) => {
  return builder
    .addCase(getProjects.pending, (state) => {
      state.status = StateStatus.loading;
    })
    .addCase(getProjects.fulfilled, (state, action) => {
      state.status = StateStatus.loaded;
      state.data = action.payload;
    })
    .addCase(getProjects.rejected, (state, action) => {
      state.status = StateStatus.failed;
      state.error = action.payload as APIError;
    });
};

const projectsSlice = createSlice({
  name: SliceName.projects,
  initialState: initialProjectsState,
  reducers: {},
  extraReducers: projectsExtraReducers,
});

export const projectsReducer = projectsSlice.reducer;
