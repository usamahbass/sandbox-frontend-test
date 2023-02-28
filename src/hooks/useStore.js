import { useContext } from "react";
import { AppContext } from "@app/context/Context";

export const useStore = () => {
  const { state, dispatch } = useContext(AppContext);

  return { state, dispatch };
};
