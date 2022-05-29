import { useState, useEffect } from "react";

import Reset from "./styles/Reset";
import MapProvider, { useMap } from "./contexts/MapProvider";

import RoutePath from "./components/RoutePath";
import { geoEquirectangular, geoPath, geoMercator, geoTransform } from "d3-geo";
import Map from "./components/Map";
import routes from "./data/calgary_to_kc.json";

// import { projectPoints } from "./lib/helpers/mappers";

function App() {
  // const { map, projectPoint } = useMap();

  // useEffect(() => {
  //   if (map) {
  //     const transform = geoTransform({
  //       point: function ([x, y]) {
  //         this.stream.point(x, -y);
  //       },
  //     });
  //     console.log(transform);
  //     const pathGenerator = geoPath().projection(transform);
  //     const pathData = pathGenerator(routes.features);
  //     console.log(pathData);
  //   }
  // }, [map, projectPoint]);

  return (
    <div className="App">
      <Reset />
      <Map />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
        {/* <g
            transform={`translate(120, 0) scale(${scale})`}
            width="100%"
            height="100%"
          > */}
        {/* <RoutePath pathData={pathData} percentShown={100} /> */}
        {/* </g> */}
      </svg>
    </div>
  );
}

export default App;
