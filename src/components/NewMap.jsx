import React, { useState } from "react";
import styled from "styled-components";
import { geoPath } from "d3-geo";

import { createProjection } from "../helpers/mapperHelpers";
import TerritoryBoundaries from "./TerritoryBoundaries";
import usStates from "../data/us-states";
import canadianProvinces from "../data/canada";
import AnimatedRoute from "./AnimatedRoute";

//will replace former MapContainer.js

const MapSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const Map = (props) => {
  const { route, routeRefs, triggerRefs } = props;

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
      <AnimatedRoute
        key={i}
        ref={routeRefs[i]}
        trigger={triggerRefs[i]}
        data={d}
        path={path}
      />
    );
  });

  return (
    <>
      <MapSVG viewBox={[centerLong, centerLat, width, height]}>
        <TerritoryBoundaries path={path} data={usStates} />
        <TerritoryBoundaries path={path} data={canadianProvinces} />

        {routes}
      </MapSVG>
    </>
  );
};

export default Map;
