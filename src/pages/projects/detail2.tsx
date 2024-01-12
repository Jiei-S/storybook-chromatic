import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import Heading1 from "../../components/typography/h1";
import useProjectStore from "../../store/projects/store";

const ProjectDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projectState, dispatchFindProject } = useProjectStore();

  useEffect(() => {
    if (!id) return;
    dispatchFindProject(id);
  }, [id, dispatchFindProject]);

  return (
    <div>
      <Heading1 text="Project Detail" />
      {projectState.data.name}
    </div>
  );
};

export default ProjectDetail;
