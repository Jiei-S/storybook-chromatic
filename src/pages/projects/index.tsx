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
      <Heading1 text="Project List" />
      <Link href={`/${ProjectPageKey.ROOT}/${ProjectPageKey.NEW}`} text={"New Project"} />
      <div>
        {projectsState.data.map((project) => (
          <div key={project.id}>
            <Link href={`/${ProjectPageKey.ROOT}/${project.id}/${ProjectPageKey.EDIT}`} text={project.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
