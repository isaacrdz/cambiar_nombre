import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Task from "../screens/Task/Task";
import TaskDetail from "../screens/Task/TaskDetail";

const TaskDetailMainStack = createStackNavigator();
const TaskDetailStack = createStackNavigator();

const TaskMainStackScreen = ({ navigation }) => {
  return (
    <TaskDetailMainStack.Navigator>
      <TaskDetailMainStack.Screen name="Tareas" component={Task} />
    </TaskDetailMainStack.Navigator>
  );
};

const TaskStackScreen = () => (
  <TaskDetailStack.Navigator
    screenOptions={{ presentation: "modal", headerShown: false }}
  >
    <TaskDetailStack.Screen name="TaskMain" component={TaskMainStackScreen} />

    <TaskDetailStack.Screen name="TaskDetail" component={TaskDetail} />
  </TaskDetailStack.Navigator>
);

export default TaskStackScreen;
