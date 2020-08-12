import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { apiImage } from "../api";
import Poster from "./Poster";
import { TouchableOpacity } from "react-native-gesture-handler";
import Votes from "./Votes";
import { trimText } from "../utils";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  height: 100%;
`;

const BG = styled.Image`
  width: 100%;
  height: 100%;
  opacity: 0.4;
  position: absolute;
`;

const Content = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
const Data = styled.View`
  width: 50%;
  align-items: flex-start;
`;
const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 19px;
  margin-bottom: 10px;
`;
const VotesContainer = styled.Text`
  margin-bottom: 7px;
`;
const Overview = styled.Text`
  color: rgb(220, 220, 220);
  font-size: 14px;
  font-weight: 500;
  opacity: 0.7;
`;

const Button = styled.View`
  margin-top: 10px;
  background-color: #e74c3c;
  padding: 7px 10px;
  border-radius: 3px;
`;

const ButtonText = styled.Text`
  color: white;
`;

const Slide = ({
  isTv = false,
  id,
  title,
  bgImage,
  votes,
  overview,
  poster,
}) => {
  const navigation = useNavigation();
  const goDetail = () => {
    navigation.navigate("Detail", {
      isTv,
      id,
      title,
      bgImage,
      votes,
      overview,
      poster,
    });
  };

  return (
    <Container>
      <BG source={{ uri: apiImage(bgImage) }} />
      <Content>
        <Poster url={poster} />
        <Data>
          <Title>{trimText(title, 40)}</Title>
          {votes ? (
            <VotesContainer>
              <Votes votes={votes} />
            </VotesContainer>
          ) : null}
          <Overview>{trimText(overview, 120)}</Overview>
          <TouchableOpacity onPress={goDetail}>
            <Button>
              <ButtonText>view details</ButtonText>
            </Button>
          </TouchableOpacity>
        </Data>
      </Content>
    </Container>
  );
};

Slide.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  bgImage: PropTypes.string,
  votes: PropTypes.number,
  overview: PropTypes.string.isRequired,
  poster: PropTypes.string,
};

export default Slide;
