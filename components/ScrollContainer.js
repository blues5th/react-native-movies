import React, { useState } from "react";
import { ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import PropTypes from "prop-types";

const ScrollContainer = ({
  refreshFunc,
  isLoading,
  children,
  contentContainerStyle,
}) => {
  const [refreshing, setReFreshing] = useState(false);

  const onRefresh = async () => {
    setReFreshing(true);
    await refreshFunc();
    setReFreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing}
          tintColor={"white"}
        />
      }
      style={{ backgroundColor: "black" }}
      contentContainerStyle={{
        flex: isLoading ? 1 : 0,
        justifyContent: isLoading ? "center" : "flex-start",
        ...contentContainerStyle,
      }}
    >
      {isLoading ? <ActivityIndicator color="white" size="large" /> : children}
    </ScrollView>
  );
};

ScrollContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  contentContainerStyle: PropTypes.object,
};

export default ScrollContainer;
