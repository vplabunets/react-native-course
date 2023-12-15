import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { GlobalStyles } from "./constants/styles";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/Signupscreen";
import WelcomeScreen from "./screens/Welcomescreen";
import App2 from "./App2";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import IconButton from "./components/UI/IconButton";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colorsAuth.primary500,
        },
        headerTintColor: "white",
        contentStyle: { backgroundColor: GlobalStyles.colorsAuth.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colorsAuth.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: GlobalStyles.colorsAuth.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              size={24}
              color={tintColor}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      {/* <Stack.Screen name="Welcome" component={App2} /> */}
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    <AppLoading />;
  }
  return <Navigation />;
}

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar style="light" />
      <Root />
    </AuthContextProvider>
  );
}
