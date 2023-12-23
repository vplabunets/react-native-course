import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/Places/PlacesList";
import { StyleSheet, Text, View } from "react-native";
import { fetchPlaces } from "../util/database";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <PlacesList style={styles.container} places={loadedPlaces} />
    </View>
  );
}

export default AllPlaces;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "white",
    // marginTop: 100,
  },
});
