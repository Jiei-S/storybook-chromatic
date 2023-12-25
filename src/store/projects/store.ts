import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "..";
import { createProject, findProject, getProjects, updateProject } from "./api";
import { reset } from "./slice";
import { ProjectParams, SliceName, StateStatus } from "./type";

const useProjectStore = () => {
  const dispatch = useDispatch<AppDispatch>();

  const projectState = useSelector<RootState, RootState[SliceName.project]>((state) => state.project);
  const projectsState = useSelector<RootState, RootState[SliceName.projects]>((state) => state.projects);

  const isLoading = useMemo(
    () => projectState.status === StateStatus.loading || projectsState.status === StateStatus.loading,
    [projectState.status, projectsState.status]
  );

  const isSubmitting = useMemo(() => projectState.status === StateStatus.submitting, [projectState.status]);

  const isLoaded = useMemo(() => projectState.status === StateStatus.loaded, [projectState.status]);

  const isSucceeded = useMemo(() => projectState.status === StateStatus.success, [projectState.status]);

  const dispatchFindProject = useCallback(
    async (id: string) => {
      await dispatch(findProject(id));
    },
    [dispatch]
  );

  const dispatchGetProjects = useCallback(async () => {
    await dispatch(getProjects());
  }, [dispatch]);

  const dispatchCreateProject = useCallback(
    async (params: ProjectParams) => {
      await dispatch(createProject(params));
    },
    [dispatch]
  );

  const dispatchUpdateProject = useCallback(
    async (params: ProjectParams) => {
      await dispatch(updateProject(params));
    },
    [dispatch]
  );

  const dispatchResetState = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return {
    projectState,
    projectsState,
    isLoading,
    isSubmitting,
    isLoaded,
    isSucceeded,
    dispatchResetState,
    dispatchFindProject,
    dispatchCreateProject,
    dispatchUpdateProject,
    dispatchGetProjects,
  };
};

export default useProjectStore;
