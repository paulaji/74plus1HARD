import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Task = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      {/* <View style={styles.circular}></View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 20,
    height: 20,
    backgroundColor: "#95D8C7",
    borderWidth: 0.5,
    borderColor: "#95D8C7",
    borderRadius: 10,
    opacity: 0.7,
    marginRight: 10,
  },
  itemText: {
    maxWidth: "90%",
    fontSize: 19,
    color: "#333",
  },
  circular: {
    width: 15,
    height: 15,
    borderColor: "#95D8C7",
    borderWidth: 1,
  },
});

export default Task;
