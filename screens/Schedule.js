import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components/native";
import moment from "moment";
import { SimpleLineIcons } from "@expo/vector-icons";
import { getStoreBookingData } from "../Storage";
import ScheduleCard from "../components/Schedule/ScheduleCard";
import CalendarComponent from "../components/Schedule/CalendarComponent";
import { useTheme } from "@react-navigation/native";
import BookInfoCard from "../components/BookInfoCard";

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.background};
`;
const ScheduleContainer = styled.View`
  flex: 4;
`;

export default ({ route: { params } }) => {
  const [bookingList, setBookingList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState({});
  const { colors } = useTheme();

  const handleDate = (date) => {
    setSelectedDate(date?.dateString || "");
  };

  const getData = async () => {
    const list = await getStoreBookingData();
    setBookingList(list);
    setMarked(list);
  };

  const setMarked = (list) => {
    let dotted = {};
    list.map((e) => {
      dotted[e.bookDate] = {
        marked: true,
        selected: selectedDate === e.bookDate,
      };
    });

    setMarkedDates({
      [selectedDate]: { selected: true },
      ...dotted,
    });
  };

  useLayoutEffect(() => {
    if (params) {
      setSelectedDate(params.bookDate);
    }
    getData();
    console.log(selectedDate);
  }, [selectedDate, params]);

  return (
    <>
      <CalendarComponent
        selectedDate={selectedDate}
        markedDates={markedDates}
        handleDate={handleDate}
      />
      <Container background={colors.background}>
        {bookingList
          .filter((e) => selectedDate === e.bookDate)
          .map((e) => (
            <ScheduleCard
              key={e.bookId}
              startTime={e.startTime}
              endTime={e.endTime}
            >
              <ScheduleContainer>
                <BookInfoCard
                  title={e.name}
                  detail={`${e.service} ${e.menu}`}
                  bookId={e.bookId}
                  navigateTo={"Detail"}
                  background={e.pending ? colors.warning : colors.primary2}
                  icon={
                    e.pending && (
                      <SimpleLineIcons
                        name="exclamation"
                        size={24}
                        color="white"
                      />
                    )
                  }
                />
              </ScheduleContainer>
            </ScheduleCard>
          ))}
      </Container>
    </>
  );
};
