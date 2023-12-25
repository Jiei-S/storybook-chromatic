import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosConfiguration } from "../../config/api/axios";
import { Project } from "./slice";
import { ProjectParams } from "./type";

export const findProject = createAsyncThunk<Project, string>(
  "projects/findProject",
  async (id: string, { rejectWithValue }) => {
    const axios = new AxiosConfiguration().axios;
    return axios
      .get(`/projects/${id}`)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const getProjects = createAsyncThunk<Project[]>("projects/getProjects", async (_, { rejectWithValue }) => {
  const axios = new AxiosConfiguration().axios;
  return axios
    .get("/projects")
    .then((res) => res.data)
    .catch((err) => rejectWithValue(err.response.data));
});

export const createProject = createAsyncThunk<Project, ProjectParams>(
  "projects/createProject",
  async (params, { rejectWithValue }) => {
    const axios = new AxiosConfiguration().axios;
    return axios
      .post("/projects", params)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);

export const updateProject = createAsyncThunk<Project, ProjectParams>(
  "projects/updateProject",
  async (params, { rejectWithValue }) => {
    const axios = new AxiosConfiguration().axios;
    return axios
      .put(`/projects/${params.id}`, params)
      .then((res) => res.data)
      .catch((err) => rejectWithValue(err.response.data));
  }
);
