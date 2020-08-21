import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { storeBookingData, getStoreBookingData } from "../Storage";
import CardContainer from "../components/CardContainer";
import BookInfoCard from "../components/BookInfoCard";
import ChartContainer from "../components/ChartContainer";

const Container = styled.View`
  padding: 10px;
  background-color: ${(props) => props.background};
`;

export default ({ navigation }) => {
  const [pendingList, setPendingList] = useState([]);
  const [todaysBookingList, setTodaysBookingList] = useState([]);
  const [salesAmount, setSalesAmount] = useState(0);
  const [chartData, setChartData] = useState();
  const { colors } = useTheme();

  const getData = async () => {
    // const error = await storeBookingData();
    const bookingList = await getStoreBookingData();
    setPendingList(bookingList?.filter((e) => e.pending));
    setTodaysBookingList(
      bookingList?.filter((e) => e.bookDate === moment().format("YYYY-MM-DD"))
    );
    const mList = bookingList?.filter(
      (e) =>
        !e.pending && e.bookDate.substr(0, 7) === moment().format("YYYY-MM")
    );
    setSalesAmount(mList?.reduce((a, b) => a + b.price, 0) || 0);

    setChartData(
      Array.from(Array(moment().daysInMonth()), (_, i) => ({
        x: i + 1,
        y: mList?.filter((e) => i + 1 === Number(e.bookDate.substr(8, 10)))
          .length,
      }))
    );
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container background={colors.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CardContainer background={"transparent"}>
          {pendingList?.map((e) => (
            <BookInfoCard
              key={e.bookId}
              title={"新しい予約があります"}
              detail={`${e.name},${e.service},${e.menu}`}
              background={colors.warning}
              bookId={e.bookId}
              bookDate={e.bookDate}
              navigateTo={"Schedule"}
              icon={
                <MaterialCommunityIcons
                  name="note-plus-outline"
                  size={35}
                  color="white"
                />
              }
            />
          ))}
        </CardContainer>
        <CardContainer title="今日の予約">
          {todaysBookingList?.map((e, i) => (
            <BookInfoCard
              key={i}
              background={colors.primary2}
              title={`${e.name},${e.service},${e.menu}`}
              bookId={e.bookId}
              bookDate={e.bookDate}
              navigateTo={"Schedule"}
              detail={`${e.startTime.substring(11, 16)}~${e.endTime.substring(
                11,
                16
              )}`}
            />
          ))}
        </CardContainer>
        <CardContainer title={"今月のまとめ"}>
          <ChartContainer data={chartData} />
          <CardContainer title={`売り上げ : ${salesAmount}円`} />
        </CardContainer>
      </ScrollView>
    </Container>
  );
};
