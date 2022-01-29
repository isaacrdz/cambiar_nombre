import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home/Home";
import { Icon } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native";
import Settings from "../screens/Home/Settings";

const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="DPX"
      component={Home}
      options={{
        headerShown: false,
      }}
    />
    <HomeStack.Screen name="Settings" component={Settings} />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
