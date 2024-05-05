import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Radionice from "./pages/Radionice";
import Predavaci from "./pages/Predavaci";
import Administracija from "./pages/Administracija";
import RadioniceAdmin from "./components/administracijaComponents/RadioniceAdmin";
import OrganizacijeAdmin from "./components/administracijaComponents/OrganizacijeAdmin";
import PredavaciAdmin from "./components/administracijaComponents/PredavaciAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Page Not Found</div>,
    children: [
      {
        path: "/",
        element: <Radionice />,
        errorElement: <div>404 Page Not Found</div>,
      },
      {
        path: "/predavaci",
        element: <Predavaci />,
        errorElement: <div>404 Page Not Found</div>,
      },
      {
        path: "/predavaci/:imepredavaca",
        element: <Radionice />,
        errorElement: <div>404 Page Not Found</div>,
      },
      {
        path: "/administracija",
        element: <Administracija />,
        errorElement: <div>404 Page Not Found</div>,
        children: [
          {
            path: "/administracija",
            element: <RadioniceAdmin />,
          },
          {
            path: "/administracija/organizacije",
            element: <OrganizacijeAdmin />,
          },
          {
            path: "/administracija/predavci",
            element: <PredavaciAdmin />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
