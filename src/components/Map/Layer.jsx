import { GeoJSON } from "react-leaflet";
import useSWR from "swr";
import PropTypes from "prop-types";

const Layer = ({ url }) => {
  const {
    error: geoError,
    data: geoResponse,
    isLoading: geoLoading,
  } = useSWR(url ? url : null);

  const isGeoData = geoResponse?.data;

  if (geoLoading) {
    return <div>memuat data layer..</div>;
  }

  if (geoError) {
    return null;
  }

  return <GeoJSON data={isGeoData} />;
};

export default Layer;

Layer.propTypes = {
  url: PropTypes.string.isRequired,
};
