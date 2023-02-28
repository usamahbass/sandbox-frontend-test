import React from "react";
import L from "leaflet";
import ReactDOM from "react-dom/client";
import { AppStore } from "./context/Context";
import App from "./App";
import "./css/index.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import RetinaIcon from "leaflet/dist/images/marker-icon-2x.png";
import LeafletIcon from "leaflet/dist/images/marker-icon.png";
import ShadowIcon from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: RetinaIcon,
  iconUrl: LeafletIcon,
  shadowUrl: ShadowIcon,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppStore>
      <App />
    </AppStore>
  </React.StrictMode>
);
