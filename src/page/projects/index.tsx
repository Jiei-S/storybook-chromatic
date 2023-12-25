import { FC, useEffect } from "react";
import Heading1 from "../../component/typography/h1";
import Link from "../../component/typography/link";
import { ProjectPageKey } from "../../const/page";
import useProjectStore from "../../store/projects/store";
import { createPath } from "./routes";

const List: FC = () => {
  const { projectsState, dispatchGetProjects } = useProjectStore();

  useEffect(() => {
    dispatchGetProjects();
  }, [dispatchGetProjects]);

  return (
    <div>
      <Heading1 text="Project List" />
      <Link href={createPath(ProjectPageKey.NEW)} text={"New Project"} />
      <div>
        {projectsState.data.map((project) => (
          <div key={project.id}>
            <Link href={createPath(ProjectPageKey.EDIT, { id: project.id })} text={project.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
