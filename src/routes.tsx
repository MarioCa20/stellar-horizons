import { createBrowserRouter } from "react-router-dom";
import { Home } from "./features/Home/Home";
import { Booking } from "./features/Booking/Booking";
import { Layout } from "./components/Layout/Layout";
import { NotFound } from "./features/NotFound/NotFound";
import { Login } from "./features/Login/Login";
import { AuthGuard } from "./guards/AuthGuard";

type BaseRoute = {
  path: string;
  element: React.ReactNode;
  children?: BaseRoute[];
};

// Routes that need the Layout wrapper
const wrappedRoutes: BaseRoute[] = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "bookings",
    element: (
      <AuthGuard>
        <Booking />
      </AuthGuard>
    ),
  },
  {
    path: "login",
    element: <Login />,
  },
];

// Main routes configuration
const baseRoutes: BaseRoute[] = [
  {
    // Wrapped routes under Layout
    path: "/",
    element: <Layout />,
    children: wrappedRoutes,
  },
  // Unwrapped routes
  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(baseRoutes);
