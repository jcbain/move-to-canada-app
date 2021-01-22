import React, { useState } from "react";
import styled from "styled-components";
import { geoPath } from "d3-geo";

import { createProjection } from "../helpers/mapperHelpers";
import TerritoryBoundaries from "./TerritoryBoundaries";
import usStates from "../data/us-states";
import canadianProvinces from "../data/canada";
import AnimatedRoute from "./AnimatedRoute";
import route from "../data/to_calgary";
//will replace former MapContainer.js

const MapSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
`;

const Map = (props) => {
  const [moveForward, setMoveForward] = useState(false);

  const width = 500,
    height = 500,
    centerLong = 92.35361,
    centerLat = 38.95133,
    scale = 2;
  const projection = createProjection(
    width,
    height,
    scale,
    centerLong,
    centerLat
  );
  const path = geoPath().projection(projection);

  const routes = route.features.map((d, i) => {
    return (
      <AnimatedRoute key={i} data={d} path={path} moveForward={moveForward} />
    );
  });

  return (
    <>
      <Button onClick={() => setMoveForward((prev) => !prev)}>move</Button>
      <MapSVG viewBox={[centerLong, centerLat, width, height]}>
        <TerritoryBoundaries path={path} data={usStates} />
        <TerritoryBoundaries path={path} data={canadianProvinces} />
        <AnimatedRoute
          data={route.features[0]}
          path={path}
          moveForward={moveForward}
        />
        ;{/* {routes} */}
      </MapSVG>
    </>
  );
};

export default Map;
