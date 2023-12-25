import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../../component/form";
import Heading1 from "../../component/typography/h1";
import Loading from "../../component/typography/loading";
import Submitting from "../../component/typography/submitting";
import { ProjectPageKey } from "../../const/page";
import useProjectForm from "../../hook/projects/form";
import useProjectStore from "../../store/projects/store";

const Edit: FC = () => {
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

export default Edit;
