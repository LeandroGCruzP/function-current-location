import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
// expo install react-native-maps
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// expo install expo-location
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";

interface Position {
  latitude: number;
  longitude: number;
}

export default function App() {
  const [position, setPosition] = useState<Position>();

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync();

        setPosition(coords);
      }
    }

    loadInitialPosition();
  }, []);
  // Does not allow "position" to be possibly "undefined".
  if (!position) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      // Make IOS also use Google Maps
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      }}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
