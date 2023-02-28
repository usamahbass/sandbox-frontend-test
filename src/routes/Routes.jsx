import { lazy } from "react";

const HomePage = lazy(() => import("@app/pages/Home"));
const WisataDetailPage = lazy(() => import("@app/pages/wisata/Slug"));

// error
const ErrorPageNotFound = lazy(() => import("@app/pages/errors/404"));

// auth
const ChangePasswordPage = lazy(() =>
  import("@app/pages/profile/ChangePassword")
);

// profil
const MePage = lazy(() => import("@app/pages/profile/Me"));
const ListsWisataMePage = lazy(() =>
  import("@app/pages/profile/wisata/ListsWisataMe")
);
const CreateWisataPage = lazy(() =>
  import("@app/pages/profile/wisata/CreateWisata")
);

export const Routes = [
  {
    path: "*",
    element: <ErrorPageNotFound />,
  },
  {
    exact: true,
    path: "/",
    element: <HomePage />,
  },
  {
    exact: true,
    path: "/wisata/:slug",
    element: <WisataDetailPage />,
  },
  {
    exact: true,
    path: "/profil/ubah-password",
    element: <ChangePasswordPage />,
  },
  {
    exact: true,
    path: "/profil/profil-saya",
    element: <MePage />,
  },
  {
    exact: true,
    path: "/profil/wisata-saya",
    element: <ListsWisataMePage />,
  },
  {
    exact: true,
    path: "/profil/wisata-saya/tambah-wisata",
    element: <CreateWisataPage />,
  },
];
