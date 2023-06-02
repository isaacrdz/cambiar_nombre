import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Appointment from "../screens/Appointment/Appointment";
import AppointmentDetail from "../screens/Appointment/AppointmentDetail";

const AppointmentMainStack = createStackNavigator();
const AppointmentStack = createStackNavigator();

const AppointmentMainStackScreen = () => {
  return (
    <AppointmentMainStack.Navigator>
      <AppointmentMainStack.Screen name="Citas" component={Appointment} />
    </AppointmentMainStack.Navigator>
  );
};

const AppointmentStackScreen = () => (
  <AppointmentStack.Navigator
    screenOptions={{ presentation: "modal", headerShown: false }}
  >
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
