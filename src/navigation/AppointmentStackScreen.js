import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Appointment from "../screens/Appointment/Appointment";

const AppointmentMainStack = createStackNavigator();
const AppointmentStack = createStackNavigator();

const AppointmentMainStackScreen = ({ navigation }) => {
  return (
    <AppointmentMainStack.Navigator>
      <AppointmentMainStack.Screen
        name="Appointments"
        component={Appointment}
      />
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
