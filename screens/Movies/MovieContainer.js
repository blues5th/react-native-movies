import React, { useEffect, useState } from "react";
import { movieApi } from "../../api";
import MoviePresenter from "./MoviePresenter";

export default () => {
  const [movies, setMovies] = useState({
    isLoading: true,
    nowPlaying: [],
    nowPlayingError: null,
    popular: [],
    popularError: null,
    upcoming: [],
    upcomingError: null,
  });
  const getData = async () => {
    const [nowPlaying, nowPlayingError] = await movieApi.nowPlaying();
    const [popular, popularError] = await movieApi.popular();
    const [upcoming, upcomingError] = await movieApi.upcoming();
    setMovies({
      isLoading: false,
      nowPlaying,
      nowPlayingError,
      popular,
      popularError,
      upcoming,
      upcomingError,
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return <MoviePresenter refreshFunc={getData} {...movies} />;
};
