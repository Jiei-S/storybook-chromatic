export const PROJECT_MAX_NAME_LENGTH = 20;

export type ProjectParams = {
  id: string;
  name: string;
};

export enum StateStatus {
  idle,
  loading,
  submitting,
  loaded,
  success,
  failed,
}

export enum SliceName {
  project = "project",
  projects = "projects",
}
