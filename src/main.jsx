import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./Router/Route";
import AuthProvider from "./Auth/AuthProvider";
import { ToastContainer } from "react-toastify";
import { CardProvider } from "./Auth/Cardprover";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CardProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </CardProvider>
    </AuthProvider>
  </StrictMode>
);
