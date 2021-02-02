import React, { createRef } from "react";
import styled from "styled-components";
import Map from "./NewMap";
import useRouteData from "../hooks/useRouteData";

const StyledArticle = styled.article`
  position: relative;
  display: flex;
`;

const MapDiv = styled.div`
  position: sticky;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

const StoryDiv = styled.div`
  width: 30%;
  background: #9d9dc8;
`;

const StyledP = styled.p`
  margin-top: 100vh;
  margin-bottom: 100vh;
  border: 2px solid black;
`;

const Story = () => {
  const { routes, loaded } = useRouteData();
  const routeRefs =
    loaded && [...Array(routes.features.length)].map(() => createRef(null));

  const triggerRefs =
    loaded && [...Array(routes.features.length)].map(() => createRef(null));

  return (
    <StyledArticle>
      <MapDiv>
        {loaded && (
          <Map route={routes} routeRefs={routeRefs} triggerRefs={triggerRefs} />
        )}
      </MapDiv>
      <StoryDiv>
        <StyledP ref={triggerRefs[0]}>first styled p</StyledP>
        <StyledP ref={triggerRefs[1]}>second styled p</StyledP>
      </StoryDiv>
    </StyledArticle>
  );
};

export default Story;