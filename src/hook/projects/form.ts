import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FormInputProps } from "../../component/form";
import { ProjectPageKey } from "../../const/page";
import { initialProjectState } from "../../store/projects/slice";
import useProjectStore from "../../store/projects/store";
import { PROJECT_MAX_NAME_LENGTH, ProjectParams, ProjectStatus } from "../../store/projects/type";
import { FormInputType, FormValidator, useInput } from "../_shared/form";

const useProjectForm = (action: ProjectPageKey.NEW | ProjectPageKey.EDIT) => {
  const navigate = useNavigate();

  const { projectState, dispatchCreateProject, dispatchUpdateProject } = useProjectStore();

  const statusOptions = useMemo(() => Object.values(ProjectStatus).map((status) => status), []);

  const validateName: FormValidator = (name: string): string => {
    if (!name) return "required";
    if (name.length > PROJECT_MAX_NAME_LENGTH) return `max length is ${PROJECT_MAX_NAME_LENGTH}`;
    return "";
  };

  const validateStatus: FormValidator = (status: string): string => {
    if (!status) return "required";
    if (Object.values(ProjectStatus).indexOf(status as ProjectStatus) === -1) return "invalid status";
    return "";
  };

  const inputs = action === ProjectPageKey.NEW ? initialProjectState.data : projectState.data;
  const [id] = useInput(inputs.id, () => "");
  const [name] = useInput(inputs.name, validateName);
  const [status] = useInput(inputs.status, validateStatus);

  const idProps = useMemo(() => id, [id]);
  const nameProps: FormInputProps = useMemo(
    () => ({
      ...name,
      type: FormInputType.TEXT,
      label: "Name",
    }),
    [name]
  );
  const statusProps = useMemo(
    () => ({
      ...status,
      type: FormInputType.SELECT,
      label: "Status",
      options: statusOptions,
    }),
    [status, statusOptions]
  );

  const isValid = (): boolean => {
    return (
      !validateName(nameProps.value) && !nameProps.error && !validateStatus(statusProps.value) && !statusProps.error
    );
  };

  const onSubmit = async () => {
    const params: ProjectParams = {
      id: idProps.value,
      name: nameProps.value,
      status: statusProps.value,
    };

    if (action === ProjectPageKey.NEW) {
      await dispatchCreateProject(params);
    } else {
      await dispatchUpdateProject(params);
    }

    navigate(`/${ProjectPageKey.ROOT}`);
  };

  return {
    statusOptions,
    inputs: [nameProps, statusProps],
    isValid,
    onSubmit,
  };
};

export default useProjectForm;
