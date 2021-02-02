import { useState, useEffect } from "react";
import route1 from "../data/to_calgary.json";
import route2 from "../data/calgary_to_kc.json";
import route3 from "../data/kc_to_kc.json";
import route4 from "../data/kc_back_calgary.json";

const dummy1 = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "804 18 Avenue Southwest, Calgary, AB to Carway, AB T0K1Y0",
      },
      geometry: {
        type: "MultiLineString",
        coordinates: [
          [
            [-114.07966, 51.03693],
            [-114.08184, 51.03693],
          ],
        ],
      },
    },
  ],
};

const dummy2 = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "second name",
      },
      geometry: {
        type: "MultiLineString",
        coordinates: [
          [
            [-114.07966, 51.03693],
            [-114.08184, 51.03693],
          ],
        ],
      },
    },
  ],
};
const useRouteData = () => {
  const [routes, setRoutes] = useState({});
  const [loaded, setLoaded] = useState(false);
  const routeData = [route1, route2, route3, route4];

  useEffect(() => {
    let features = [];
    routeData.forEach((route) => {
      features = features.concat(route.features);
    });
    const newRoutes = { ...route1, features: features };
    setRoutes(newRoutes);
    setLoaded(true);
  }, []);

  return { routes, loaded };
};

export default useRouteData;
