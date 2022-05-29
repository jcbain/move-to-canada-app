import mapboxGl from "mapbox-gl";

export const projectPoints = (map, point) => {
  return map.project(new mapboxGl.LngLat(point[0], point[1]));
};
