import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 15px;
  background-color: ${(props) => props.background};
`;

const TextWrapper = styled.View`
  display: flex;
  flex-direction: column;
`;

const TitleText = styled.Text`
  font-size: 20px;
  color: ${(props) => props.textColor};
  margin-bottom: 5px;
`;

const SubText = styled.Text`
  font-weight: 600;
  font-size: 15px;
  color: ${(props) => props.textColor};
  opacity: 0.8;
`;

const BookInfoCard = ({
  title,
  detail,
  icon,
  background,
  bookId,
  bookDate,
  navigateTo,
}) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const handlePress = () => {
    navigation.navigate(navigateTo, {
      bookId,
      bookDate,
    });
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Container background={background ? background : colors.background}>
        {icon ? <View style={{ marginRight: 10 }}>{icon}</View> : null}
        <TextWrapper>
          <TitleText textColor={colors.text}>{title}</TitleText>
          <SubText textColor={colors.text}>{detail}</SubText>
        </TextWrapper>
      </Container>
    </TouchableOpacity>
  );
};

export default BookInfoCard;
