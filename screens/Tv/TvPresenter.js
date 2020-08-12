import React from "react";
import ScrollContainer from "../../components/ScrollContainer";
import HorizontalSlider from "../../components/HorizontalSlider";
import styled from "styled-components/native";
import List from "../../components/List";
import Slide from "../../components/Slide";
import LoopSlideContainer from "../../components/LoopSlideContainer";

const Container = styled.View`
  margin-bottom: 30px;
`;

export default ({
  refreshFunc,
  isLoading,
  popular,
  topRated,
  today,
  onTheAir,
}) => (
  <ScrollContainer isLoading={isLoading} refreshFunc={refreshFunc}>
    <Container>
      <HorizontalSlider isTv={true} title={"Popualr Shows"} props={popular} />
    </Container>
    <LoopSlideContainer>
      {onTheAir.map((show) => (
        <Slide
          key={show.id}
          isTv={true}
          id={show.id}
          title={show.name}
          bgImage={show.backdrop_path}
          overview={show.overview}
          poster={show.poster_path}
        />
      ))}
    </LoopSlideContainer>
    <Container>
      <HorizontalSlider
        isTv={true}
        title={"Top Rated"}
        props={topRated}
      ></HorizontalSlider>
    </Container>
    <List isTv={true} title={"Airing Today"} props={today} />
  </ScrollContainer>
);
