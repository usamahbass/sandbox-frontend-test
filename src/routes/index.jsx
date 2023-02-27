import { useRoutes } from "react-router-dom";
import { Routes } from "./Routes";

const RoutesApp = () => {
  const routing = useRoutes(Routes);

  return routing;
};

export default RoutesApp;
