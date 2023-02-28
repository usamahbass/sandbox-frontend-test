import { MapContainer, TileLayer } from "react-leaflet";
import PropTypes from "prop-types";

const Map = ({ children, ...rest }) => {
  return (
    <MapContainer center={[-7.857702, 110.272547]} zoom={13} {...rest}>
      <TileLayer
        maxZoom={20}
        url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      {children}
    </MapContainer>
  );
};

export default Map;
