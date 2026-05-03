import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./util/i18n.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./pages/App.tsx";
import Login from "./pages/Login.tsx";

import ConfirmAuth from "./components/ConfirmAuth.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/email",
    element: (
      <ConfirmAuth>
        <App />
      </ConfirmAuth>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
