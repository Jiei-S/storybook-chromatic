import { Provider as ReduxProvider } from "react-redux";
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import Layout from "./component/layouts";
import Home from "./page";
import projectsRouter from "./page/projects/routes";
import store from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: `/`,
        element: <Home />,
      },
      ...projectsRouter,
      {
        path: "*",
        loader: async () => {
          return redirect("/");
        },
      },
    ],
  },
]);

function App() {
  return (
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  );
}

export default App;
