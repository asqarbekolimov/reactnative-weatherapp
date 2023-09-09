import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View } from "react-native";
import Loader from "./components/loader";
import { useEffect, useState } from "react";
import Weather from "./components/weather";
import * as Location from "expo-location";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [errorMsg, setErrorMsg] = useState(null);

  const getLoaction = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      const {
        coords: { altitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: altitude,
        longitude: longitude,
      });
    } catch (error) {
      Alert.alert("I can`t find your location, so bad");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      getLoaction();
    }, 2000);
  }, []);

  return isLoading ? <Loader /> : <Weather />;
}
