import { RouteObject } from "react-router-dom";
import List from "..";
import { ProjectPageKey } from "../../../const/page";
import Edit from "../edit";
import New from "../new";

const projectsRouter: RouteObject[] = [
  {
    path: `/${ProjectPageKey.ROOT}`,
    element: <List />,
  },
  {
    path: `/${ProjectPageKey.ROOT}/${ProjectPageKey.NEW}`,
    element: <New />,
  },
  {
    path: `/${ProjectPageKey.ROOT}/:id/${ProjectPageKey.EDIT}`,
    element: <Edit />,
  },
];

type Option = {
  id: string;
};

export const createPath = (pageKey: ProjectPageKey, options?: Option) => {
  const base = `/${ProjectPageKey.ROOT}`;
  switch (pageKey) {
    case ProjectPageKey.LIST:
      return base;
    case ProjectPageKey.NEW:
      return `${base}/${ProjectPageKey.NEW}`;
    case ProjectPageKey.EDIT:
      if (!options?.id) return base;
      return `${base}/${options.id}/${ProjectPageKey.EDIT}`;
    default:
      return base;
  }
};

export default projectsRouter;
