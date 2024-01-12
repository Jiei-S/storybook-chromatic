import { RouteObject } from "react-router-dom";
import ProjectList from "..";
import { ProjectPageKey } from "../../../const/page";
import ProjectNew from "../create";
import ProjectDetail from "../detail";
import ProjectEdit from "../edit";

const projectsRouter: RouteObject[] = [
  {
    path: `/${ProjectPageKey.ROOT}`,
    element: <ProjectList />,
  },
  {
    path: `/${ProjectPageKey.ROOT}/${ProjectPageKey.NEW}`,
    element: <ProjectNew />,
  },
  {
    path: `/${ProjectPageKey.ROOT}/:id/${ProjectPageKey.EDIT}`,
    element: <ProjectEdit />,
  },
  {
    path: `/${ProjectPageKey.ROOT}/:id`,
    element: <ProjectDetail />,
  },
];

export default projectsRouter;
