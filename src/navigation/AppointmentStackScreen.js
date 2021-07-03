import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Icon } from "@ui-kitten/components";
import Appointment from "../screens/Appointment/Appointment";

const AppointmentMainStack = createStackNavigator();
const AppointmentStack = createStackNavigator();

const AppointmentMainStackScreen = ({ navigation }) => {
  return (
    <AppointmentMainStack.Navigator>
      <AppointmentMainStack.Screen name="Appointents" component={Appointment} />
    </AppointmentMainStack.Navigator>
  );
};

const AppointmentStackScreen = () => (
  <AppointmentStack.Navigator mode="modal" headerMode="none">
    <AppointmentStack.Screen
      name="AppointmentMain"
      component={AppointmentMainStackScreen}
    />
  </AppointmentStack.Navigator>
);

export default AppointmentStackScreen;
