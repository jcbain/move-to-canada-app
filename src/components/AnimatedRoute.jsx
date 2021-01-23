import React, { forwardRef } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import useAdvanceRoute from "../hooks/useAdvanceRoute";

const Path = styled(animated.path)`
  fill: none;
  stroke-width: 2px;
  stroke: ${({ theme }) => theme.routeColor};
  stroke-dasharray: ${({ dasharray }) => dasharray};
`;

const AnimatedRoute = forwardRef((props, ref) => {
  const { path, data, trigger } = props;
  const moveForward = useAdvanceRoute(ref, trigger);
  const pathMeasure = path.measure(data);
  const { dashOffset } = useSpring({
    dashOffset: moveForward ? 0 : pathMeasure,
  });

  return (
    <Path
      ref={ref}
      d={path(data)}
      dasharray={pathMeasure}
      strokeDashoffset={dashOffset}
    />
  );
});

export default AnimatedRoute;
