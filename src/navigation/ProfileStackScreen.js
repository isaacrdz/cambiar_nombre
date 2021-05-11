import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../screens/Profile/Profile";

const ProfileStack = createStackNavigator();
const RootStack = createStackNavigator();

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator mode="modal" headerMode="none">
      <RootStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
