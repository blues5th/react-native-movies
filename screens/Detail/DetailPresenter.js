import React from "react";
import { Dimensions, ActivityIndicator } from "react-native";
import ScrollContainer from "../../components/ScrollContainer";
import Poster from "../../components/Poster";
import styled from "styled-components/native";
import { apiImage } from "../../api";
import Votes from "../../components/Votes";
import { formatDate } from "../../utils";
import Link from "../../components/Detail/Link";

const Header = styled.View`
  height: ${Dimensions.get("window").height / 3}px;
  align-items: center;
  justify-content: flex-end;
`;

const BG = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0.4;
`;
const Container = styled.View`
  flex-direction: row;
  align-items: center;
  top: 30px;
`;

const Info = styled.View`
  width: 50%;
  margin-left: 40px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 10px;
`;

const Data = styled.View`
  padding: 0px 30px;
  margin-top: 30px;
`;

const DataName = styled.Text`
  color: white;
  opacity: 0.8;
  font-weight: 800;
  margin-bottom: 15px;
`;

const DataValue = styled.Text`
  color: white;
  opacity: 0.8;
  font-weight: 500;
  margin-bottom: 20px;
`;

export default ({ isLoading, result, openBrowser }) => {
  return (
    <ScrollContainer
      isLoading={false}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <Header>
        <BG source={{ uri: apiImage(result.bgImage) }}></BG>
        <Container>
          <Poster url={result.poster}></Poster>
          <Info>
            <Title>{result.title}</Title>
            {result.votes ? <Votes votes={result.votes}></Votes> : null}
          </Info>
        </Container>
      </Header>
      <Data>
        {result.overview ? (
          <>
            <DataName>Overview</DataName>
            <DataValue>{result.overview}</DataValue>
          </>
        ) : null}
        {isLoading ? (
          <ActivityIndicator
            style={{ marginTop: 30 }}
            color="white"
            size="large"
          />
        ) : null}
        {result.spoken_languages ? (
          <>
            <DataName>Languages</DataName>
            <DataValue>
              {result.spoken_languages.map((e) => `${e.name} `)}
            </DataValue>
          </>
        ) : null}
        {result.release_date ? (
          <>
            <DataName>Release Date</DataName>
            <DataValue>{formatDate(result.release_date)}</DataValue>
          </>
        ) : null}
        {result.status ? (
          <>
            <DataName>Status</DataName>
            <DataValue>{result.status}</DataValue>
          </>
        ) : null}
        {result.runtime ? (
          <>
            <DataName>Runtime</DataName>
            <DataValue>{result.runtime} minutes</DataValue>
          </>
        ) : null}
        {result.first_air_date ? (
          <>
            <DataName>First Air Date</DataName>
            <DataValue>{formatDate(result.first_air_date)}</DataValue>
          </>
        ) : null}
        {result.genres ? (
          <>
            <DataName>Genres</DataName>
            <DataValue>
              {result.genres.map((g, index) =>
                index + 1 === result.genres.length ? g.name : `${g.name}, `
              )}
            </DataValue>
          </>
        ) : null}
        {result.number_of_episodes ? (
          <>
            <DataName>Seasons / Episodes</DataName>
            <DataValue>
              {result.number_of_seasons} / {result.number_of_episodes}
            </DataValue>
          </>
        ) : null}
        {result.imdb_id ? (
          <Link
            text={"IMDB Page"}
            icon={"imdb"}
            onPress={() =>
              openBrowser(`https://www.imdb.com/title/${result.imdb_id}`)
            }
          />
        ) : null}
        {result.videos.results?.length > 0 && (
          <>
            <DataName>Videos</DataName>
            {result.videos.results.map((video) => (
              <Link
                text={video.name}
                key={video.id}
                icon="youtube-play"
                onPress={() =>
                  openBrowser(`https://www.youtube.com/watch?v=${video.key}`)
                }
              />
            ))}
          </>
        )}
      </Data>
    </ScrollContainer>
  );
};
