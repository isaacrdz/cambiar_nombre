import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Appointment from "../screens/Appointment/Appointment";
import AppointmentDetail from "../screens/Appointment/AppointmentDetail";

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

    <AppointmentStack.Screen
      name="AppointmentDetail"
      component={AppointmentDetail}
    />
  </AppointmentStack.Navigator>
);

export default AppointmentStackScreen;
