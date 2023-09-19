import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { Alert, StyleSheet, Text, View } from "react-native";
import Loader from "./components/loader";
import { useEffect, useState } from "react";
import Weather from "./components/weather";
import * as Location from "expo-location";

const API_KEY = "6282e594376d230584878ff2aa9a5cc2";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    setLocation(data);
    setIsLoading(false);
  };

  const setWeather = async (query) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
    );
    setLocation(data);
    setIsLoading(false);
  };

  const getLoaction = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});

      getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("I can`t find your location, so bad ):");
    }
  };

  useEffect(() => {
    getLoaction();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Weather
      setWeather={setWeather}
      temp={location.main.temp}
      name={location.name}
      condition={location.weather[0].main}
    />
  );
}
