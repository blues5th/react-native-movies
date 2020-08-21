import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";

const Container = styled.View`
  display: flex;
  flex-direction: row;
  padding: 0 10px;
`;
const TimeContainer = styled.View`
  flex: 1;
  display: flex;
  padding: 10px 0;
  justify-content: space-around;
`;
const TimeText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: ${(props) => props.textColor};
`;

const ScheduleCard = ({ children, startTime, endTime }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity>
      <Container>
        <TimeContainer>
          <TimeText textColor={colors.text}>
            {startTime.substring(11, startTime.length)}
          </TimeText>
          <TimeText textColor={colors.text}>
            {endTime.substring(11, endTime.length)}
          </TimeText>
        </TimeContainer>
        {children}
      </Container>
    </TouchableOpacity>
  );
};

export default ScheduleCard;
