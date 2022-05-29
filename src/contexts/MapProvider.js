import { createContext, useContext, useEffect, useState } from "react";
import mapboxGl from "mapbox-gl";

import config from "../config";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const mapId = "map";
  const [map, setMap] = useState(null);

  // set map layer and save to state
  useEffect(() => {
    mapboxGl.accessToken = config.mapbox_token;
    const mapLayer = new mapboxGl.Map({
      container: mapId, // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-94.5, 40], // starting position [lng, lat]
      zoom: 3, // starting zoom
    });

    setMap(mapLayer);
  }, []);

  const value = { map, mapId };
  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export const useMap = () => useContext(MapContext);

export default MapProvider;
