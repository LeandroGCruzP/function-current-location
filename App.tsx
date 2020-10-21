import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

export default function App() {
  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          // enableWighAccuracy: true
        });

        const { latitude, longitude } = coords;
      }
    }
    console.log("aqui");
    loadInitialPosition();
  }, []);

  return <MapView style={styles.map} />;
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
