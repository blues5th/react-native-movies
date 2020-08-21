import React, { useState, useEffect } from "react";
import { LocaleConfig, Calendar, CalendarList } from "react-native-calendars";
import { useTheme } from "@react-navigation/native";

LocaleConfig.locales["jp"] = {
  monthNames: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  monthNamesShort: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  dayNames: [
    "日曜日",
    "月曜日",
    "火曜日",
    "水曜日",
    "木曜日",
    "金曜日",
    "土曜日",
  ],
  dayNamesShort: ["日", "月", "火", "水", "木", "金", "土"],
};
LocaleConfig.defaultLocale = "jp";

const CalendarComponent = ({ selectedDate, markedDates, handleDate }) => {
  const [current, setCurrent] = useState(null);
  const { colors } = useTheme();
  useEffect(() => {
    if (selectedDate) {
      setCurrent(selectedDate);
    }
  }, [selectedDate, markedDates]);
  return (
    <>
      {current === selectedDate && (
        <Calendar
          current={current}
          monthFormat={"yyyy年MMM"}
          markedDates={markedDates}
          hideExtraDays
          onDayPress={(day) => {
            handleDate(day);
          }}
          onMonthChange={(date) => {}}
          theme={{
            calendarBackground: colors.background,
            monthTextColor: colors.text,
            dayTextColor: colors.text,
            selectedDayBackgroundColor: colors.success,
            dotColor: colors.danger,
          }}
        />
      )}
    </>
  );
};

export default CalendarComponent;
