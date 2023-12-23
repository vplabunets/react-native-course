import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Image, ScrollView, Text } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { fetchPlaceDetails } from "../util/database";
import Map from "./Map";

function PlaceDetails({ route, navigation }) {
  const [fetchPlace, setFetchedPlace] = useState();
  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchPlace.location.lat,
      initialLng: fetchPlace.location.lng,
    });
  }
  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    //use selectedPlaceId to fetch data for single
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
      // console.log(place);
    }
    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}></OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
