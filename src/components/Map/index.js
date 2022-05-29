import { useMap } from "../../contexts/MapProvider";
import { MapParent, MapContainer } from "./styles";

const Map = () => {
  const { map, mapId } = useMap();

  return (
    <MapParent>
      <MapContainer id={mapId} />;
    </MapParent>
  );
};

export default Map;
