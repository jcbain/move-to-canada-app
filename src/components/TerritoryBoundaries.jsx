import React from "react";
import styled from "styled-components";

const StyledPath = styled.path`
  fill: none;
  stroke: ${({ theme }) => theme.mapOutlineColor};
  stroke-width: 1px;
`;
const TerritoryBoundaries = (props) => {
  const { path, data } = props;
  const territories = data.features.map((feature, i) => {
    return <StyledPath className="territory" d={path(feature)} />;
  });

  return <>{territories}</>;
};

export default TerritoryBoundaries;
