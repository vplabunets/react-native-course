import { Text, View, StyleSheet } from "react-native";

function List({ listData }) {
  return listData.map((listItem) => (
    <View style={styles.listItemContainer}>
      <Text key={listItem}>{listItem}</Text>
    </View>
  ));
}

export default List;

const styles = StyleSheet.create({
  listItemContainer: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#eca276",
    color: "#25160d",
  },
});
