import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components/native";
import { apiImage } from "../../api";
import { Dimensions, PanResponder, Animated } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  background-color: black;
  align-items: center;
`;

const style = {
  top: 40,
  height: HEIGHT / 1.5,
  width: "90%",
  position: "absolute",
};

const Poster = styled.Image`
  border-radius: 20px;
  width: 100%;
  height: 100%;
`;

export default ({ result }) => {
  const [topIndex, setTopIndex] = useState(0);
  const pan = new Animated.ValueXY();

  const nextCard = () => setTopIndex((currentValue) => currentValue + 1);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, { dx, dy }) => {
      pan.setValue({ x: dx, y: dy });
    },
    onPanResponderRelease: (evt, { dx, dy }) => {
      if (dx >= 200) {
        Animated.spring(pan, {
          toValue: {
            x: WIDTH + dx,
            y: dy,
          },
        }).start(nextCard);
      } else if (dx <= -200) {
        Animated.spring(pan, {
          toValue: {
            x: -WIDTH + dx,
            y: dy,
          },
        }).start(nextCard);
      } else {
        Animated.spring(pan, {
          toValue: {
            x: 0,
            y: 0,
          },
        }).start();
      }
    },
  });

  // useEffect(() => console.log(topIndex));

  const rotateValue = pan.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ["-5deg", "0deg", "5deg"],
    extrapolate: "clamp",
  });
  const cardOpacity = pan.x.interpolate({
    inputRange: [-255, 0, 255],
    outputRange: [1, 0.5, 1],
    extrapolate: "clamp",
  });
  const cardScale = pan.x.interpolate({
    inputRange: [-255, 0, 255],
    outputRange: [1, 0.95, 1],
    extrapolate: "clamp",
  });

  return (
    <Container>
      {result.map((movie, index) => {
        if (index < topIndex) {
          return null;
        } else if (index === topIndex) {
          return (
            <Animated.View
              style={{
                ...style,
                transform: [
                  { rotate: rotateValue },
                  ...pan.getTranslateTransform(),
                ],
              }}
              key={movie.id}
              {...panResponder.panHandlers}
            >
              <Poster source={{ uri: apiImage(movie.poster_path) }} />
            </Animated.View>
          );
        } else if (index === topIndex + 1) {
          return (
            <Animated.View
              style={{
                ...style,
                zIndex: -index,
                opacity: cardOpacity,
                transform: [{ scale: cardScale }],
              }}
              key={movie.id}
              {...panResponder.panHandlers}
            >
              <Poster source={{ uri: apiImage(movie.poster_path) }} />
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              style={{
                ...style,
                zIndex: -index,
                opacity: 0,
              }}
              key={movie.id}
              {...panResponder.panHandlers}
            >
              <Poster source={{ uri: apiImage(movie.poster_path) }} />
            </Animated.View>
          );
        }
      })}
    </Container>
  );
};
