import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { TOKEN_EXPIRED } from "./constant";
import { getAuthToken, setToken } from "./auth";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const request = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 100000,
});

request.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {};
  }

  const token = getAuthToken();

  if (token) {
    config.headers["Authorization"] = `Bearer ${token?.access}`;
  }

  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const errorStatus = err.response.status;

    if (errorStatus === 500) {
      toast({
        status: "error",
        title: "Error",
        description: "Kesalahan dari server, harap coba lagi !",
      });

      return Promise.reject(err);
    }

    return Promise.reject(err);
  }
);

const refreshAuthLogic = (failedRequest) =>
  request
    .post("/api/auth/refresh/", {
      refresh: getAuthToken()?.refresh,
    })
    .then((tokenResponse) => {
      const newToken = tokenResponse.data;
      setToken(newToken);

      failedRequest.response.config.headers[
        "Authorization"
      ] = `Bearer ${newToken}`;

      return Promise.resolve();
    });
// .catch(() => {
//   setToken(null);
//   window.location.replace("/auth/masuk");
// });

createAuthRefreshInterceptor(request, refreshAuthLogic, {
  shouldRefresh: (err) => err.response.data?.code === TOKEN_EXPIRED.CODE,
});
