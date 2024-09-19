import { lazy } from "react";
import React from "react";
import { RouteObject } from "react-router-dom";
import MinimalLayout from "../components/MinimalLayout";
import Loadable from "../components/third-party/Loadable";


const CustomerPages = Loadable(lazy(() => import("../components/Pages/customer/customer")));
const LoginPages = Loadable(lazy(() => import("../components/Pages/login/login")));


const MainRoutes = (): RouteObject => {
  return {
    path: "/",
    element: <MinimalLayout />,
    children: [
      {
        path: "/",
        element: <LoginPages/>,
      },
      {
        path: "/login",
        element: <LoginPages />,
      },
      {
        path: "/customer",
        element: <CustomerPages />,
      },
    ],
  };
};

export default MainRoutes;