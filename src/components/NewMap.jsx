import React, { useState } from "react";
import { useSpring, animated, to } from "react-spring";
import styled from "styled-components";
import { geoPath } from "d3-geo";

import { createProjection } from "../helpers/mapperHelpers";
import TerritoryBoundaries from "./TerritoryBoundaries";
import usStates from "../data/us-states";
import canadianProvinces from "../data/canada";
import AnimatedRoute from "./AnimatedRoute";

//will replace former MapContainer.js
const TempBtn = styled.button`
  position: absolute;
  left: 5px;
  top: 5px;
  z-index: 1000;
`;
const MapSVG = styled(animated.svg)`
  width: 100%;
  height: 100%;
`;

const Map = (props) => {
  const { route, routeRefs, triggerRefs } = props;
  const [moveMap, setMoveMap] = useState(false);

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

  const calculateMapMove = (coords, projection, height, width) => {
    const [lonMove, latMove] = projection(coords);
    const lonDelta = lonMove - height / 2;
    const latDelta = latMove - width / 2;
    return { lonDelta, latDelta };
  };
  const { lonDelta, latDelta } = calculateMapMove(
    [-111.96755, 48.99651],
    projection,
    height,
    width
  );
  const { x, y } = useSpring({
    x: moveMap ? latDelta : centerLat,
    y: moveMap ? lonDelta : centerLong,
  });

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
      <TempBtn onClick={() => setMoveMap((prev) => !prev)}>click me</TempBtn>
      <MapSVG viewBox={to([x, y], (x, y) => `${x},${y},${width},${height}`)}>
        <TerritoryBoundaries path={path} data={usStates} />
        <TerritoryBoundaries path={path} data={canadianProvinces} />
        {routes}
      </MapSVG>
    </>
  );
};

export default Map;
