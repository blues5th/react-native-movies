import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import Home from "../screens/Home";
import Schedule from "../screens/Schedule";
import Charts from "../screens/Charts";

const Tab = createBottomTabNavigator();
const getHeaderName = (route) =>
  route?.state?.routeNames[route.state.index] || "Home";

export default ({ navigation, route }) => {
  useLayoutEffect(() => {
    const title = getHeaderName(route);
    navigation.setOptions({
      title: title,
    });
  });
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          if (route.name === "Schedule") {
            iconName = "calendar";
          } else if (route.name === "Charts") {
            iconName = "chart";
          } else if (route.name === "Home") {
            iconName = "home";
          }
          return <SimpleLineIcons name={iconName} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        showLabel: false,
        style: {
          backgroundColor: colors.background,
          borderTopColor: "black",
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="Charts" component={Charts} />
    </Tab.Navigator>
  );
};
