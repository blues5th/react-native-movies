import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import Poster from "./Poster";
import { TouchableOpacity } from "react-native";
import { trimText, formatDate } from "../utils";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  padding: 0px 30px;
  margin: 15px 0;
  align-items: flex-start;
  flex-direction: row;
`;

const Data = styled.View`
  align-items: flex-start;
  width: 60%;
  margin-left: 25px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 500;
  margin-bottom: 10px;
`;

const ReleaseDate = styled.Text`
  color: white;
  font-size: 12px;
`;

const OverView = styled.Text`
  margin-top: 10px;
  color: white;
`;

const Horizontal = ({ isTv, id, poster, title, releaseDate, overview }) => {
  const navigation = useNavigation();
  const goDetail = () => {
    navigation.navigate("Detail", {
      isTv,
      id,
      poster,
      title,
      releaseDate,
      overview,
    });
  };

  return (
    <TouchableOpacity onPress={goDetail}>
      <Container>
        <Poster url={poster} />
        <Data>
          <Title>{trimText(title, 30)}</Title>
          {releaseDate ? (
            <ReleaseDate>{formatDate(releaseDate)}</ReleaseDate>
          ) : null}
          <OverView>{trimText(overview, 100)}</OverView>
        </Data>
      </Container>
    </TouchableOpacity>
  );
};

Horizontal.propTypes = {
  id: PropTypes.number.isRequired,
  poster: PropTypes.string,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string,
  overview: PropTypes.string.isRequired,
};

export default Horizontal;
