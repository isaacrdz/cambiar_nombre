import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/Profile/Profile";

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
