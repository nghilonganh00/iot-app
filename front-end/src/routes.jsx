import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import Dashboard from "./pages/dashboard";
import DataSensors from "./pages/datasensors";
import ActionHistory from "./pages/actionHistory";
import UserProfile from "./pages/userProfile";
import Dashboard2 from "./pages/dashboard2";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/data-sensors", element: <DataSensors /> },
      { path: "/action-history", element: <ActionHistory /> },
      { path: "/user-profile", element: <UserProfile /> },
      // { path: "/dashboard2", element: <Dashboard2 /> },
    ],
  },
]);
