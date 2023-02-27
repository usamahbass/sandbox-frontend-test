import { Navigate } from "react-router-dom";
import { isUserAuthenticated } from "@app/utils/auth";

const PrivateRoute = () => {
  const isLoggin = isUserAuthenticated();

  if (isLoggin) {
    return children;
  }

  return <Navigate to="?login=true" />;
};

export default PrivateRoute;
