import React from "react";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";

const Container = styled.View`
  border-radius: 10px;
  padding: 10px;
  background-color: ${(props) => props.background};
  margin-bottom: 20px;
`;

const Title = styled.Text`
  color: ${(props) => props.color};
  font-size: 25px;
  font-weight: bold;
  margin: 20px;
  text-align: center;
`;

const CardContainer = ({ title, children, background }) => {
  const { colors } = useTheme();
  return (
    <Container background={background ? background : colors.secondary}>
      {title && <Title color={colors.text}>{title}</Title>}
      {children ? children : null}
    </Container>
  );
};

export default CardContainer;
