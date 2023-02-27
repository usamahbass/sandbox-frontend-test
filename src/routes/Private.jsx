import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { isUserAuthenticated } from "@app/utils/auth";

const PrivateRoute = ({ children }) => {
  const isLoggin = isUserAuthenticated();

  if (isLoggin) {
    return children;
  }

  return <Navigate to="?login=true" />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
