import React, { forwardRef } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const Path = styled(animated.path)`
  fill: none;
  stroke-width: 2px;
  stroke: ${({ theme }) => theme.routeColor};
`;

const AnimatedRoute = forwardRef((props, ref) => {
  const { path, data } = props;

  return <Path d={path(data)} />;
});

export default AnimatedRoute;
