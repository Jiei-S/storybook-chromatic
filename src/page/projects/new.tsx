import { FC } from "react";
import Form from "../../component/form";
import Heading1 from "../../component/typography/h1";
import Submitting from "../../component/typography/submitting";
import { ProjectPageKey } from "../../const/page";
import useProjectForm from "../../hook/projects/form";
import useProjectStore from "../../store/projects/store";

const New: FC = () => {
  const { isSubmitting } = useProjectStore();
  const form = useProjectForm(ProjectPageKey.NEW);

  return (
    <div>
      <Heading1 text="Project New" />
      {isSubmitting ? <Submitting /> : <Form {...form} disabled={!form.isValid() || isSubmitting} />}
    </div>
  );
};

export default New;
