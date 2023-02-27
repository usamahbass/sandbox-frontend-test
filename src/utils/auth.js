import { Cookies } from "react-cookie";

const isUserAuthenticated = () => {
  const token = getAuthToken();

  if (!token) {
    setToken(null);

    return false;
  }

  return true;
};

const getAuthToken = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  return token;
};

const setToken = (token) => {
  let cookies = new Cookies();
  if (token) cookies.set("token", JSON.stringify(token), { path: "/" });
  else cookies.remove("token", { path: "/" });
};

export { isUserAuthenticated, getAuthToken, setToken };
