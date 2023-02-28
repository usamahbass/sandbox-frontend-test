import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import useSWR from "swr";
import { Routes } from "./Routes";
import { isUserAuthenticated } from "@app/utils/auth";
import { useStore } from "@app/hooks/useStore";
import { setTriggerUser, setUserData } from "@app/context/actions";

const RoutesApp = () => {
  const { dispatch, state } = useStore();

  const isLoggin = isUserAuthenticated();

  const isFetchUser = isLoggin;

  const {
    data: userData,
    error: errorUserData,
    isLoading: isLoadingUserData,
    mutate: mutateUserData,
  } = useSWR(isFetchUser ? "/api/user/user/me/" : null);

  useEffect(() => {
    if (state?.user?.trigger) {
      mutateUserData("/api/user/user/me/");
    }

    return () => dispatch(setTriggerUser(false));
  }, [state?.user?.trigger]);

  useEffect(() => {
    if (userData || errorUserData || isLoadingUserData) {
      dispatch(
        setUserData({
          data: userData?.data,
          error: errorUserData,
          loading: isLoadingUserData,
        })
      );
    }
  }, [userData, errorUserData, isLoadingUserData]);

  const routing = useRoutes(Routes);

  return routing;
};

export default RoutesApp;
