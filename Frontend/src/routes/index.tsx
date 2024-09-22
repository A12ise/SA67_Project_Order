import { useRoutes, RouteObject } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import MainRoutes from "./MainRoutes";
import CustomerRoutes from "./CustomerRoutes";

function ConfigRoutes() {
  const isLoggedIn = localStorage.getItem("isLogin") === "true";
  let routes: RouteObject[] = [];

  if (isLoggedIn) {
    routes = [AdminRoutes(isLoggedIn), MainRoutes(), CustomerRoutes()];
  } else {
    routes = [CustomerRoutes(), MainRoutes()];
  }

  return useRoutes(routes);
}

export default ConfigRoutes;

