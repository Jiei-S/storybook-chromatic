import { FC, useEffect } from "react";
import Heading1 from "../../components/typography/h1";
import Link from "../../components/typography/link";
import { ProjectPageKey } from "../../const/page";
import useProjectStore from "../../store/projects/store";

const ProjectList: FC = () => {
  const { projectsState, dispatchGetProjects } = useProjectStore();

  useEffect(() => {
    dispatchGetProjects();
  }, [dispatchGetProjects]);

  return (
    <div>
      <Heading1 text="Hello World" />
      <button>Click me</button>
    </div>
  );
};

export default ProjectList;
