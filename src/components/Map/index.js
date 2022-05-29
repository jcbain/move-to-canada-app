import { useMap } from "../../contexts/MapProvider";
import { MapParent, MapContainer } from "./styles";

const Map = () => {
  const { mapContainer } = useMap();

  return (
    <MapParent>
      <MapContainer ref={mapContainer} />;
    </MapParent>
  );
};

export default Map;
