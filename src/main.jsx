import React from "react";
import ReactDOM from "react-dom/client";
import { AppStore } from "./context/Context";
import App from "./App";
import "./css/index.css";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppStore>
      <App />
    </AppStore>
  </React.StrictMode>
);
