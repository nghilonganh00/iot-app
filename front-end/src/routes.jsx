import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import Dashboard from "./pages/dashboard";
import DataSensors from "./pages/datasensors";
import ActionHistory from "./pages/actionHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/data-sensors", element: <DataSensors /> },
      { path: "/action-history", element: <ActionHistory /> },
    ],
  },
]);
