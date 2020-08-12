import React, { useState } from "react";
import SearchPresenter from "./SearchPresenter";
import { movieApi, tvApi } from "../../api";

export default () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState({
    movies: [],
    moviesError: null,
    shows: [],
    showsError: null,
  });

  const onChange = (text) => {
    setKeyword(text);
  };

  const search = async () => {
    if (keyword === "") {
      return;
    }
    const [movies, moviesError] = await movieApi.search(keyword);
    const [shows, showsError] = await tvApi.search(keyword);
    setResults({
      movies: movies,
      moviesError: moviesError,
      shows: shows,
      showsError: showsError,
    });
  };

  return (
    <SearchPresenter
      {...results}
      refreshFunc={search}
      keyword={keyword}
      onChange={onChange}
      onSubmit={search}
    />
  );
};
