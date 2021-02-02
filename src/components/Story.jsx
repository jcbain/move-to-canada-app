import React from "react";
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
  const { routes, loaded, routeRefs, triggerRefs } = useRouteData();

  const storySections =
    loaded &&
    triggerRefs.map((ref, i) => {
      return (
        <StyledP key={i} ref={ref}>
          this is for route {i}
        </StyledP>
      );
    });
  return (
    <StyledArticle>
      <MapDiv>
        {loaded && (
          <Map route={routes} routeRefs={routeRefs} triggerRefs={triggerRefs} />
        )}
      </MapDiv>
      <StoryDiv>{storySections}</StoryDiv>
    </StyledArticle>
  );
};

export default Story;
