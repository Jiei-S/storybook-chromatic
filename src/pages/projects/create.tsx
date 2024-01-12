import { FC } from "react";
import Form from "../../components/form";
import Heading1 from "../../components/typography/h1";
import Submitting from "../../components/typography/submitting";
import { ProjectPageKey } from "../../const/page";
import useProjectForm from "../../hooks/projects/form";
import useProjectStore from "../../store/projects/store";

const ProjectNew: FC = () => {
  const { isSubmitting } = useProjectStore();
  const form = useProjectForm(ProjectPageKey.NEW);

  return (
    <div>
      <Heading1 text="Project New" />
      {isSubmitting ? <Submitting /> : <Form {...form} disabled={!form.isValid() || isSubmitting} />}
    </div>
  );
};

export default ProjectNew;
