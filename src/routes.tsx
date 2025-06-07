import { createBrowserRouter } from "react-router-dom";
import { Home } from "./features/Home/Home";
import { Layout } from "./components/Layout/Layout";

type BaseRoute = {
  path: string;
  element: React.ReactNode;
  shouldWrap?: boolean;
};

const baseRoutes: BaseRoute[] = [
  {
    path: "/",
    element: <Home />,
    shouldWrap: true,
  },
];

const routes = baseRoutes.map(({ shouldWrap, ...route }) => 
  shouldWrap 
    ? {
        path: route.path,
        element: <Layout />,
        children: [{ ...route, path: "" }],
      }
    : route
);

export const router = createBrowserRouter(routes);
