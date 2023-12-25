export const PROJECT_MAX_NAME_LENGTH = 20;

export enum ProjectStatus {
  active = "active",
  inactive = "inactive",
}

export type ProjectParams = {
  id: string;
  name: string;
  status: string;
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
