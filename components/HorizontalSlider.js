import React from "react";
import PropTypes from "prop-types";
import Title from "./Title";
import { ScrollView, View } from "react-native";
import Vertical from "./Vertical";

export const HorizontalSlider = ({ isTv = false, title, props }) => (
  <View>
    <Title title={title} />
    <ScrollView
      horizontal
      style={{ marginTop: 20 }}
      contentContainerStyle={{ paddingLeft: 20 }}
      showsHorizontalScrollIndicator={false}
    >
      {props.map((prop) => (
        <Vertical
          isTv={isTv}
          key={prop.id}
          id={prop.id}
          title={prop.original_title || prop.name}
          poster={prop.poster_path}
          votes={prop.vote_average}
        />
      ))}
    </ScrollView>
  </View>
);

HorizontalSlider.propTypes = {
  title: PropTypes.string.isRequired,
  props: PropTypes.array.isRequired,
};

export default HorizontalSlider;
