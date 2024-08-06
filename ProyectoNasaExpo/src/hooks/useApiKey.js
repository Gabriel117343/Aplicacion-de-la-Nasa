import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useApiKey = () => {
  const [apiKey, setApiKey] = useState(null);

  const loadApiKey = async () => {
    try {
      const storedApiKey = await AsyncStorage.getItem("NASA_API_KEY");
      if (storedApiKey !== null) {
        setApiKey(storedApiKey);
      }
    } catch (e) {
      console.error(e);
      
    }
  };

  useEffect(() => {
    loadApiKey();
  }, []);

  return apiKey;
};

export default useApiKey;