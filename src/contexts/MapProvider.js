import { createContext, useContext, useEffect, useRef, useState } from "react";
import mapboxGl from "mapbox-gl";

import config from "../config";
import data from "../data/calgary_to_kc.json";

const MapContext = createContext();

const MapProvider = ({ children }) => {
  const mapContainer = useRef();
  const [map, setMap] = useState(null);

  const initMap = () => {
    mapboxGl.accessToken = config.mapbox_token;
    const mapLayer = new mapboxGl.Map({
      container: mapContainer.current, // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [-94.5, 40], // starting position [lng, lat]
      zoom: 3, // starting zoom
    });

    mapLayer.addControl(new mapboxGl.NavigationControl());
    mapLayer.addControl(new mapboxGl.FullscreenControl());
    mapLayer.on("load", () => {
      mapLayer.addSource("aoi", { type: "geojson", data: data.features[0] });
      mapLayer.addLayer({
        id: "aoi-solid-line",
        source: "aoi",
        type: "line",
        paint: { "line-color": "blue", "line-width": 4 },
      });
    });

    setMap(mapLayer);
  };

  // set map layer and save to state
  useEffect(() => {
    if (!map) {
      initMap();
    }
  }, [map]);

  //
  function projectPoint(point) {
    if (!map) return;
    const projectedPoint = map.project(new mapboxGl.LngLat(point[0], point[1]));
    return projectedPoint;
  }

  const value = {
    map,
    mapContainer,
    projectPoint,
  };
  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

export const useMap = () => useContext(MapContext);

export default MapProvider;
