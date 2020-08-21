import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import Swiper from "react-native-web-swiper";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const SlideContainer = styled.View`
  width: 100%;
  height: ${HEIGHT / 3}px;
  margin-bottom: 35px;
`;

export default ({ children }) => (
  <SlideContainer>
    <Swiper controlsEnabled={false} loop timeout={3}>
      {children}
    </Swiper>
  </SlideContainer>
);
