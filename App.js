import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
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

  const completeTask = async (index) => {
    const taskCopy = [...taskItems];
    taskCopy[index].completed = true;
    setTaskItems(taskCopy);
    await AsyncStorage.setItem("taskItems", JSON.stringify(taskCopy));
    checkDayCompletion(taskCopy);
  };

  const checkDayCompletion = async (taskList) => {
    const allTasksCompleted = taskList.every((task) => task.completed);
    if (allTasksCompleted) {
      setDayTracker((prevDay) => prevDay + 1);
      await AsyncStorage.setItem("dayTracker", (dayTracker + 1).toString());
      resetTasks();
    }
  };

  const resetTasks = async () => {
    const taskCopy = taskItems.map((task) => ({ ...task, completed: false }));
    setTaskItems(taskCopy);
    await AsyncStorage.setItem("taskItems", JSON.stringify(taskCopy));
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

  const handleReset = async () => {
    setDayTracker(0);
    resetTasks();
    await AsyncStorage.removeItem("dayTracker");
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

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedTaskItems = await AsyncStorage.getItem("taskItems");
        if (savedTaskItems) {
          setTaskItems(JSON.parse(savedTaskItems));
        }

        const savedDayTracker = await AsyncStorage.getItem("dayTracker");
        if (savedDayTracker) {
          setDayTracker(parseInt(savedDayTracker));
        }
      } catch (error) {
        console.log("Error loading data from AsyncStorage:", error);
      }
    };

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <View style={styles.logoContainer}>
          <Image source={LogoImage} style={styles.logo} />
        </View>
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
          style={styles.infoButton}
          onPress={() =>
            Alert.alert(
              "74+1HARD:",
              "A challenge that lasts for 75 consecutive days. It includes two daily workouts, a strict diet, drinking a gallon of water, reading/learning, no alcohol or cheat meals, and taking a progress picture every day. The challenge aims to test discipline, mental toughness, and commitment to self-improvement."
            )
          }
        >
          <Text style={styles.infoButtonText}>info</Text>
        </TouchableOpacity>
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
    paddingTop: 30,
    paddingHorizontal: 20,
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
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
    paddingHorizontal: 7,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "#01949a",
  },
  //   dayTrackerText: {
  //     color: "#01949a",
  //     borderWidth: 1,
  //     borderColor: "#191970",
  //     backgroundColor: "#191970",
  //     fontSize: 25,
  //     padding: 3,
  //     borderRadius: 5,
  //     fontWeight: "bold",
  //     // borderColor: "#FFF",
  //     // borderWidth: 1,
  //   },
  //   infoButton: {
  //     backgroundColor: "#191970",
  //     paddingVertical: 5,
  //     paddingHorizontal: 10,
  //     borderRadius: 5,
  //     borderColor: "#FFF",
  //     borderWidth: 1,
  //   },
  //   infoButtonText: {
  //     color: "#01949a",
  //     fontWeight: "bold",
  //     fontSize: 12,
  //   },
  //   resetButton: {
  //     backgroundColor: "#191970",
  //     paddingVertical: 5,
  //     paddingHorizontal: 10,
  //     borderRadius: 5,
  //     borderColor: "#9a0119",
  //     borderWidth: 1,
  //   },
  //   resetButtonText: {
  //     color: "#01949a",
  //     fontWeight: "bold",
  //     fontSize: 12,
  //   },
  dayTrackerText: {
    color: "#01949a",
    backgroundColor: "#FFF",
    fontSize: 25,
    padding: 3,
    borderRadius: 5,
    fontWeight: 300,
  },
  infoButton: {
    backgroundColor: "#FFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: "#01949a",
    borderWidth: 1,
  },
  infoButtonText: {
    color: "#01949a",
    fontWeight: 400,
    fontSize: 12,
  },
  resetButton: {
    backgroundColor: "#FFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: "#9a0119",
    borderWidth: 1,
  },
  resetButtonText: {
    color: "#9a0119",
    fontWeight: 400,
    fontSize: 12,
  },
});
