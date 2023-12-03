import { StyleSheet, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailsScreen from "./screens/MealDetailsScreen";
import FavoritesContextProvider from "./store/context/favorites-context";
import FavoritesScreen from "./screens/FavoritesScreen";
import { Ionicons } from "@expo/vector-icons";
import { store } from "./store/redux/store";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#25160d" },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "#77472c" },
        drawerContentStyle: { backgroundColor: "#25160d" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#25160d",
        drawerActiveBackgroundColor: "#ae998c",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <FavoritesContextProvider>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="CategoriesScreen"
              screenOptions={{
                headerStyle: { backgroundColor: "#25160d" },
                headerTintColor: "white",
                contentStyle: { backgroundColor: "#77472c" },
              }}
            >
              <Stack.Screen
                name="Drawer"
                component={DrawerNavigator}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="MealsOverview"
                component={MealsOverviewScreen}
                // options={({ route, navigation }) => {
                //   const categoryId = route.params.categoryId;
                //   return { title: categoryId };
                // }}
              />
              <Stack.Screen
                name="MealDetails"
                component={MealDetailsScreen}
                options={{
                  title: "About the meal",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </FavoritesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.26,
  },
});
