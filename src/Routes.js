import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Stacks
import HomeStackScreen from "./navigation/HomeStackScreen";
import LeadStackScreen from "./navigation/LeadStackScreen";
import AuthStackScreen from "./navigation/AuthStackScreen";

import useAuth from "./hooks/useAuth";
import ProfileStackScreen from "./navigation/ProfileStackScreen";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export default () => {
  const { isAuthenticated, loadUser } = useAuth();

  React.useEffect(() => {
    loadUser();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tabs.Navigator>
          <Tabs.Screen name="Home" component={HomeStackScreen} />
          <Tabs.Screen name="Leads" component={LeadStackScreen} />
          <Tabs.Screen name="Profile" component={ProfileStackScreen} />
        </Tabs.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthStackScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
