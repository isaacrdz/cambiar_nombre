import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Signin from "../screens/Signin";

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Signin"
      component={Signin}
      options={() => ({
        headerShown: false,
      })}
    />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
