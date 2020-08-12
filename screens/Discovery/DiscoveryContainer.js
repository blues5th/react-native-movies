import React, { useState, useEffect } from "react";
import { movieApi } from "../../api";
import DiscoveryPresenter from "./DiscoveryPresenter";

export default () => {
  const [discovery, setDiscovery] = useState({
    result: [],
    error: null,
  });
  const getData = async () => {
    const [result, error] = await movieApi.discover();
    setDiscovery({
      result,
      error,
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return <DiscoveryPresenter {...discovery} />;
};
