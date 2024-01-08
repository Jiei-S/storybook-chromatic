import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectPageKey } from "../../const/page";
import { initialProjectState } from "../../store/projects/slice";
import useProjectStore from "../../store/projects/store";
import { PROJECT_MAX_NAME_LENGTH, ProjectParams } from "../../store/projects/type";
import { FormValidator, useInput } from "../_shared/form";

const useProjectForm = (action: ProjectPageKey.NEW | ProjectPageKey.EDIT) => {
  const navigate = useNavigate();

  const { projectState, dispatchCreateProject, dispatchUpdateProject } = useProjectStore();

  const validateName: FormValidator = (name: string): string => {
    if (!name) return "required";
    if (name.length > PROJECT_MAX_NAME_LENGTH) return `max length is ${PROJECT_MAX_NAME_LENGTH}`;
    return "";
  };

  const inputs = action === ProjectPageKey.NEW ? initialProjectState.data : projectState.data;
  const [id] = useInput(inputs.id, () => "");
  const [name] = useInput(inputs.name, validateName);

  const idProps = useMemo(() => id, [id]);
  const nameProps = useMemo(
    () => ({
      ...name,
      label: "Name",
    }),
    [name]
  );

  const isValid = (): boolean => {
    return !validateName(nameProps.value) && !nameProps.error;
  };

  const onSubmit = async () => {
    const params: ProjectParams = {
      id: idProps.value,
      name: nameProps.value,
    };

    if (action === ProjectPageKey.NEW) {
      await dispatchCreateProject(params);
    } else {
      await dispatchUpdateProject(params);
    }

    navigate(`/${ProjectPageKey.ROOT}`);
  };

  return {
    ...nameProps,
    isValid,
    onSubmit,
  };
};

export default useProjectForm;
