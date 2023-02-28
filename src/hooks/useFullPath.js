import { useLocation } from "react-router-dom";

export const useFullPath = () => {
  const { pathname } = useLocation();

  const origin = window.location.origin;

  const fullPath = `${origin}${pathname}`;

  return fullPath;
};
