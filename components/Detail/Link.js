import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

const Text = styled.Text`
  color: white;
  font-weight: 600;
  margin-left: 10px;
`;

const Link = ({ text, icon, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Container>
      <FontAwesome name={icon} color="white" size={22} />
      <Text>{text}</Text>
    </Container>
  </TouchableOpacity>
);

export default Link;
