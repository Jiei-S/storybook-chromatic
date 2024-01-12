import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../../components/form";
import Heading1 from "../../components/typography/h1";
import Loading from "../../components/typography/loading";
import Submitting from "../../components/typography/submitting";
import { ProjectPageKey } from "../../const/page";
import useProjectForm from "../../hooks/projects/form";
import useProjectStore from "../../store/projects/store";

const ProjectEdit: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, isLoaded, isSubmitting, dispatchFindProject } = useProjectStore();
  const form = useProjectForm(ProjectPageKey.EDIT);

  useEffect(() => {
    if (!id) return;
    dispatchFindProject(id);
  }, [id, dispatchFindProject]);

  return (
    <div>
      <Heading1 text="Project Edit" />
      {isLoading ? (
        <Loading />
      ) : isSubmitting ? (
        <Submitting />
      ) : isLoaded ? (
        <Form {...form} disabled={!form.isValid() || isSubmitting} />
      ) : null}
    </div>
  );
};

export default ProjectEdit;
