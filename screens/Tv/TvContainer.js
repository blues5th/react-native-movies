import React, { useEffect, useState } from "react";
import TvPresenter from "./TvPresenter";
import { tvApi } from "../../api";

export default () => {
  const [shows, setShows] = useState({
    isLoading: true,
    today: [],
    todayError: null,
    onTheAir: [],
    onTheAirError: null,
    topRated: [],
    topRatedError: null,
    popular: [],
    popularError: null,
  });
  const getData = async () => {
    const [today, todayError] = await tvApi.today();
    const [onTheAir, onTheAirError] = await tvApi.onTheAir();
    const [topRated, topRatedError] = await tvApi.topRated();
    const [popular, popularError] = await tvApi.popular();
    setShows({
      isLoading: false,
      today,
      todayError,
      onTheAir,
      onTheAirError,
      topRated,
      topRatedError,
      popular,
      popularError,
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return <TvPresenter refreshFunc={getData} {...shows} />;
};
