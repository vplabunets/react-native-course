import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";

import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import SubTitle from "../components/MealDetails/SubTitle";
import List from "../components/MealDetails/List";
import { useLayoutEffect } from "react";
import IconButton from "../components/IconButton";

function MealDetailsScreen({ route, navigation }) {
  const { mealId } = route.params;

  const selectedMeal = MEALS.find((meal) => mealId === meal.id);

  function headerButtonPressHandler() {}

  useLayoutEffect(
    () =>
      navigation.setOptions({
        headerRight: () => (
          //   <Button title="Hello" onPress={headerButtonPressHandler} />
          <IconButton
            icon="star"
            color="white"
            onPress={headerButtonPressHandler}
          />
        ),
      }),
    [navigation, headerButtonPressHandler]
  );

  const {
    imageUrl,
    ingredients,
    title,
    duration,
    complexity,
    affordability,
    steps,
  } = selectedMeal;

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <Text style={styles.title}>{title}</Text>
      <MealDetails
        duration={duration}
        complexity={complexity}
        affordability={affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <SubTitle>Ingredients</SubTitle>
          <List listData={ingredients} />
          <SubTitle>Steps</SubTitle>
          <List listData={steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    color: "white",
    textAlign: "center",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
