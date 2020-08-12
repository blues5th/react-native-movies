import React from "react";
import styled from "styled-components/native";
import Slide from "../../components/Slide";
import ScrollContainer from "../../components/ScrollContainer";
import HorizontalSlider from "../../components/HorizontalSlider";
import List from "../../components/List";
import LoopSlideContainer from "../../components/LoopSlideContainer";

export default ({ refreshFunc, isLoading, nowPlaying, popular, upcoming }) => (
  <ScrollContainer isLoading={isLoading} refreshFunc={refreshFunc}>
    <>
      <LoopSlideContainer>
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            id={movie.id}
            title={movie.original_title}
            bgImage={movie.backdrop_path}
            votes={movie.vote_average}
            overview={movie.overview}
            poster={movie.poster_path}
          />
        ))}
      </LoopSlideContainer>
      <HorizontalSlider title={"Popular Movies"} props={popular} />
      <List title={"Coming Soon"} props={upcoming} />
    </>
  </ScrollContainer>
);
