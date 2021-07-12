import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Signin from "../screens/Signin";
import Register from "../screens/Register/Register";

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
    <AuthStack.Screen
      name="Register"
      component={Register}
      options={() => ({
        headerShown: false,
      })}
    />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
