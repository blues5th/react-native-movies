import React, { useState } from "react";
import { Image, StatusBar } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import Amplify from "aws-amplify";
import config from "./config";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeColors } from "./ThemeColors";
import { Asset } from "./node_modules/expo-asset";
import Stack from "./navigation/Stack";

Amplify.configure({
  // login
  // Auth: {
  // mandatorySignIn: true,
  // region: config.cognito.REGION,
  // userPoolId: config.cognito.USER_POOL_ID,
  // identityPoolId: config.cognito.IDENTITY_POOL_ID,
  // userPoolWebClientId: config.cognito.APP_CLIENT_ID
  // },
  API: {
    endpoints: [
      {
        name: "laonni-app",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

const cacheImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const loadAssets = () => {
    const fonts = cacheFonts([Ionicons.font, FontAwesome.font]);
    return Promise.all([...fonts]);
  };
  const onFinish = () => {
    setIsLoading(true);
  };
  const scheme = useColorScheme();
  return isLoading ? (
    <AppearanceProvider>
      <NavigationContainer theme={ThemeColors}>
        <Stack />
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </AppearanceProvider>
  ) : (
    <AppLoading
      startAsync={loadAssets}
      onFinish={onFinish}
      onError={console.warn}
    />
  );
}
