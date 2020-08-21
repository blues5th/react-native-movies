import React from "react";
import { BarChart, Grid } from "react-native-svg-charts";
import { useTheme } from "@react-navigation/native";

const ChartContainer = ({ data }) => {
  const { colors } = useTheme();
  const fill = colors.primary;
  const yData = data?.map((e) => e.y) || [0];
  return (
    <BarChart
      style={{ height: 200 }}
      data={yData}
      svg={{ fill }}
      contentInset={{ top: 30, bottom: 30 }}
    >
      <Grid />
    </BarChart>
  );
};

export default ChartContainer;
