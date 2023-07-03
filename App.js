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
} from "react-native";

export default function App() {
  const [taskItems, setTaskItems] = useState([
    { label: "Drink 4 litres (1 gallon) of water", completed: false },
    { label: "Proper diet (no junk)", completed: false },
    { label: "Workout 1 (light workout 15min/above)", completed: false },
    { label: "Workout 2 (outdoor 45min/above)", completed: false },
    { label: "Self learning (productivity things)", completed: false },
    { label: "No alcohol / such stuff", completed: false },
    { label: "Take a picture of yourself", completed: false },
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
          { backgroundColor: task.completed ? "#66CC99" : "#FF0000" },
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
        <Text style={styles.sectionTitle}>75-Hard</Text>
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
          <Text style={styles.resetButtonText}>Reset 75 Hard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    flex: 1,
  },
  sectionTitle: {
    borderWidth: 1,
    borderColor: "#FF0000",
    textAlign: "center",
    color: "#FF0000",
    backgroundColor: "#000",
    fontSize: 30,
    fontWeight: 400,
    marginBottom: 10,
  },
  sectionSubTitle: {
    textAlign: "center",
    color: "#555",
    fontSize: 15,
    fontWeight: "normal",
    marginBottom: 10,
  },
  note: {
    textAlign: "center",
    color: "#888",
    fontSize: 10,
    marginBottom: 10,
  },
  itemsContainer: {
    flex: 1,
  },
  items: {
    marginTop: 20,
  },
  taskItem: {
    borderWidth: 1,
    borderColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#FFF",
    marginLeft: 10,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#FFF",
  },
  dayTrackerText: {
    // color: "#FF0000",
    borderWidth: 1,
    borderColor: "#FF0000",
    // backgroundColor: "#000",
    fontSize: 15,
    padding: 5,
    fontWeight: 400,
  },
  resetButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: "#FF0000",
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  resetButtonText: {
    color: "#FF0000",
    fontSize: 15,
    fontWeight: "bold",
  },
});
