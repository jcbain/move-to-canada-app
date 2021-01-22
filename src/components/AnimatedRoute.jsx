import React, { forwardRef, useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const Path = styled(animated.path)`
  fill: none;
  stroke-width: 2px;
  stroke: ${({ theme }) => theme.routeColor};
  stroke-dasharray: ${({ dasharray }) => dasharray};
`;

const AnimatedRoute = forwardRef((props, ref) => {
  const { path, data, moveForward } = props;
  const pathMeasure = path.measure(data);
  const { dashOffset } = useSpring({
    dashOffset: moveForward ? 0 : pathMeasure,
  });

  return (
    <Path
      d={path(data)}
      dasharray={pathMeasure}
      strokeDashoffset={dashOffset}
    />
  );
});

export default AnimatedRoute;
