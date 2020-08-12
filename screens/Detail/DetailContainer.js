import React, { useLayoutEffect, useState, useEffect } from "react";
import DetailPresenter from "./DetailPresenter";
import { movieApi, tvApi } from "../../api";
import * as WebBrowser from "expo-web-browser";
import {
  TransitionSpecs,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";

export default ({
  navigation,
  route: {
    params: { isTv, id, title, bgImage, votes, overview, poster },
  },
}) => {
  const [detail, setDetail] = useState({
    isLoading: true,
    result: {
      title,
      bgImage,
      votes,
      overview,
      poster,
      videos: {
        results: [],
      },
    },
  });

  const getData = async () => {
    const [info, error] = isTv
      ? await tvApi.show(id)
      : await movieApi.movie(id);
    setDetail({
      isLoading: false,
      result: {
        ...info,
        title: info.name || info.title,
        bgImage: info.backdrop_path,
        votes: info.vote_average,
        overview: info.overview,
        poster: info.poster_path,
      },
    });
  };

  const MyTransition = {
    // transitionSpec: {
    //   open: TransitionSpecs.TransitionIOSSpec,
    //   close: TransitionSpecs.TransitionIOSSpec,
    // },
    // headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateY: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.height / 10, 0],
              }),
            },
            // {
            //   scale: next
            //     ? next.progress.interpolate({
            //         inputRange: [0, 1],
            //         outputRange: [1, 0.9],
            //       })
            //     : 1,
            // },
          ],
          opacity: current.progress,
        },
        // overlayStyle: {
        //   opacity: current.progress.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [0, 1],
        //   }),
        // },
      };
    },
  };

  useEffect(() => {
    getData();
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: title, ...MyTransition });
  });

  const openBrowser = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };
  return <DetailPresenter openBrowser={openBrowser} {...detail} />;
};
