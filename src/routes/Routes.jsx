import { lazy } from "react";

const HomePages = lazy(() => import("@app/pages/Home"));

export const Routes = [
  {
    exact: true,
    path: "/",
    element: <HomePages />,
  },
];
