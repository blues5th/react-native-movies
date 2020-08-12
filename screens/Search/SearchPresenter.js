import React from "react";
import Input from "../../components/Input/Input";
import HorizontalSlider from "../../components/HorizontalSlider";
import ScrollContainer from "../../components/ScrollContainer";

export default ({
  refreshFunc,
  movies,
  shows,
  keyword,
  onChange,
  onSubmit,
}) => (
  <ScrollContainer
    refreshFunc={refreshFunc}
    isLoading={false}
    contentContainerStyle={{ paddingTop: 10 }}
  >
    <Input
      placeholder={"input keyword"}
      value={keyword}
      onChange={onChange}
      onSubmit={onSubmit}
    />
    {movies.length !== 0 && (
      <HorizontalSlider title={"Movie Results"} props={movies} />
    )}
    {movies.length !== 0 && (
      <HorizontalSlider isTv={true} title={"TV Results"} props={shows} />
    )}
  </ScrollContainer>
);
