import { useEffect, useState } from "react";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

const Pinning = ({ onChange }) => {
  const [pinningCoordinate, setPinningCoordinate] = useState(null);

  const onDeletedPin = () => setPinningCoordinate(null);
  const onEditPin = ({ layer }) =>
    setPinningCoordinate(layer.toGeoJSON().geometry);
  const onCreatedPin = ({ layer }) =>
    setPinningCoordinate(layer.toGeoJSON().geometry);

  useEffect(() => {
    onChange(pinningCoordinate);
  }, [pinningCoordinate]);

  useEffect(() => {
    const drawToolbar = document.querySelector(".leaflet-draw-toolbar-top");

    if (pinningCoordinate) {
      drawToolbar.classList.add("d-none");
    }

    return () => drawToolbar.classList.remove("d-none");
  }, [pinningCoordinate]);

  return (
    <FeatureGroup>
      <EditControl
        position="topleft"
        onEdited={onEditPin}
        onCreated={onCreatedPin}
        onDeleted={onDeletedPin}
        draw={{
          rectangle: false,
          circle: false,
          circlemarker: false,
          polygon: false,
          polyline: false,
        }}
      />
    </FeatureGroup>
  );
};

export default Pinning;
