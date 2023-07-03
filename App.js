import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
// Import your logo image
import LogoImage from "./assets/iconnewnobg.png";

export default function App() {
  const [taskItems, setTaskItems] = useState([
    { label: "Drink 4 Litres (1 gallon) of Water", completed: false },
    { label: "Proper Diet (Nutrient-Rich Choices)", completed: false },
    { label: "Workout 1 \n(Light Workout 15min/above)", completed: false },
    { label: "Workout 2 \n(Outdoor Workout 45min/above)", completed: false },
    { label: "Learn Something / Read \n(Skill Development)", completed: false },
    { label: "No Alcohol / Unhealthy Temptations", completed: false },
    { label: "Take a Picture of Yourself", completed: false },
  ]);

  const [dayTracker, setDayTracker] = useState(0);

  const handleTaskCompletion = (index) => {
    Alert.alert("Task Completion", "Did you complete this task?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: () => completeTask(index) },
    ]);
  };

  const completeTask = (index) => {
    const taskCopy = [...taskItems];
    taskCopy[index].completed = true;
    setTaskItems(taskCopy);
    checkDayCompletion(taskCopy);
  };

  const checkDayCompletion = (taskList) => {
    const allTasksCompleted = taskList.every((task) => task.completed);
    if (allTasksCompleted) {
      setDayTracker((prevDay) => prevDay + 1);
      resetTasks();
    }
  };

  const resetTasks = () => {
    const taskCopy = taskItems.map((task) => ({ ...task, completed: false }));
    setTaskItems(taskCopy);
  };

  const handleResetConfirmation = () => {
    Alert.alert(
      "Reset 75 Hard",
      "Are you sure you want to reset your progress?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => handleReset() },
      ]
    );
  };

  const handleReset = () => {
    setDayTracker(0);
    resetTasks();
  };

  const renderTask = (task, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.taskItem,
          { backgroundColor: task.completed ? "#01949a" : "#FFF" },
        ]}
        onPress={() => handleTaskCompletion(index)}
      >
        <Text style={styles.taskText}>{task.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <View style={styles.logoContainer}>
          {/* Display the logo image */}
          <Image source={LogoImage} style={styles.logo} />
        </View>
        {/* <Text style={styles.sectionTitle}>74+1HARD</Text> */}
        <Text style={styles.sectionSubTitle}>
          Challenge yourself for 75 days and change your life!
        </Text>
        <Text style={styles.note}>
          Note: Once you complete a task, press on it to mark it as completed.
        </Text>
        <ScrollView style={styles.itemsContainer}>
          <View style={styles.items}>{taskItems.map(renderTask)}</View>
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.dayTrackerText}>Day Tracker: {dayTracker}</Text>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetConfirmation}
        >
          <Text style={styles.resetButtonText}>Reset 74+1Hard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    flex: 1,
  },
  logoContainer: {
    alignItems: "center", // Center the logo horizontally
    justifyContent: "center", // Center the logo vertically
    // marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  // sectionTitle: {
  //   // borderWidth: 1,
  //   // borderColor: "#FF0000",
  //   textAlign: "center",
  //   color: "#191970",
  //   // backgroundColor: "#000",
  //   fontSize: 20,
  //   fontWeight: 400,
  //   marginBottom: 10,
  // },
  sectionSubTitle: {
    textAlign: "center",
    color: "#555",
    fontSize: 10,
    fontWeight: "normal",
    marginBottom: 10,
  },
  note: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 10,
    marginBottom: 10,
    backgroundColor: "#191970",
  },
  itemsContainer: {
    flex: 1,
  },
  items: {
    marginTop: 10,
  },
  taskItem: {
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
  },
  taskText: {
    // #01949a #191970
    fontSize: 14,
    fontWeight: 400,
    color: "#191970",
    marginLeft: 10,
    textAlign: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "#01949a",
  },
  dayTrackerText: {
    color: "#01949a",
    borderWidth: 1,
    borderColor: "#191970",
    backgroundColor: "#191970",
    fontSize: 22,
    padding: 5,
    fontWeight: 400,
    borderRadius: 50,
    paddingVertical: 0,
  },
  resetButton: {
    padding: 40,
    borderWidth: 2,
    borderColor: "#FF0000",
    // backgroundColor: "#000",
    // paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: "#191970",
  },
  resetButtonText: {
    color: "#FF0000",
    fontSize: 10,
    backgroundColor: "#191970",
  },
});
