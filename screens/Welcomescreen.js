import { StyleSheet, Text, View } from "react-native";
import Button from "../components/UI/Button";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen({ navigation }) {
  const [fetchedMessage, setFetchedMessage] = useState("");

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  useEffect(() => {
    axios
      .get(
        `https://expense-tracker-1f0f4-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=${token}`
      )
      .then((response) => setFetchedMessage(response.data));
  }, []);

  function nav() {
    navigation.navigate("App2");
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>

      <Button onPress={nav}> Go to App</Button>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
