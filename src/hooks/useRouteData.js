import { useState, useEffect, createRef } from "react";
import route1 from "../data/to_calgary.json";
import route2 from "../data/calgary_to_kc.json";
import route3 from "../data/kc_to_kc.json";
import route4 from "../data/kc_back_calgary.json";

const useRouteData = () => {
  const [routes, setRoutes] = useState({});
  const [loaded, setLoaded] = useState(false);
  const routeData = [route1, route2, route3, route4];

  const routeRefs =
    loaded && [...Array(routes.features.length)].map(() => createRef(null));

  const triggerRefs =
    loaded && [...Array(routes.features.length)].map(() => createRef(null));

  useEffect(() => {
    let features = [];
    routeData.forEach((route) => {
      features = features.concat(route.features);
    });
    const newRoutes = { ...route1, features: features };
    setRoutes(newRoutes);
    setLoaded(true);
  }, []);

  return { routes, loaded, routeRefs, triggerRefs };
};

export default useRouteData;
