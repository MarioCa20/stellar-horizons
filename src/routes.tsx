import { createBrowserRouter } from "react-router-dom";
import { Home } from "./features/Home/Home";
import { Booking } from "./features/Booking/Booking";
import { Layout } from "./components/Layout/Layout";
import { NotFound } from "./features/NotFound/NotFound";
import { TourResultsByActivity } from "./features/SearchResult/TourResultsByActivity";
import { AllTours } from "./features/SearchResult/AllTours";
import { AccommodationResultsByPlanet } from "./features/SearchResult/AccommodationResultsByPlanet";
import { AllAccommodations } from "./features/SearchResult/AllAccommodations";
import { AuthGuard } from "./guards/AuthGuard";
import { Login } from "./features/Auth/Login/Login";
import { Register } from "./features/Auth/Register/Register";

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
  {
    path: "tours/activity/:activityId", // ruta dinamica para tours por actividad
    element: <TourResultsByActivity />,
  },
  {
    path: "tours/all",
    element: <AllTours />,
  },
  {
    path: "accommodations/planet/:planetId", // ruta dinamica para alojamiento por planeta
    element: <AccommodationResultsByPlanet />,
  },
  {
    path: "accommodations/all",
    element: <AllAccommodations />,
  },
  {
    path: "register",
    element: <Register />,
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
