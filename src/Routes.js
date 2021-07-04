import React, { useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { registerForPushNotificationsAsync } from "/utils/ExpoPushNotifications";
import * as Notifications from "expo-notifications";

// Stacks
import HomeStackScreen from "./navigation/HomeStackScreen";
import LeadStackScreen from "./navigation/LeadStackScreen";
import AuthStackScreen from "./navigation/AuthStackScreen";
import ProfileStackScreen from "./navigation/ProfileStackScreen";
import useAuth from "./hooks/useAuth";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppointmentStackScreen from "./navigation/AppointmentStackScreen";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const Routes = ({ token }) => {
  const { isAuthenticated, loadUser, user, updateProfile } = useAuth();
  // const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  React.useEffect(() => {
    if (user && user._id) {
      registerForPushNotificationsAsync().then(
        (token) => {
          updateProfile({ pushNotificationToken: token });
          // console.log("token", token);
        }
        // setExpoPushToken(token)}
      );

      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {});

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
  }, [user]);

  React.useEffect(() => {
    loadUser();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tabs.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home-sharp" : "home-outline";
              } else if (route.name === "Leads") {
                iconName = focused ? "layers-sharp" : "layers-outline";
              } else if (route.name === "Appointments") {
                iconName = focused ? "time-sharp" : "time-outline";
              } else if (route.name === "Profile") {
                iconName = focused
                  ? "person-circle-sharp"
                  : "person-circle-outline";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "#5764b8",
            inactiveTintColor: "gray",
          }}
        >
          <Tabs.Screen name="Home" component={HomeStackScreen} />
          <Tabs.Screen name="Leads" component={LeadStackScreen} />
          <Tabs.Screen name="Appointments" component={AppointmentStackScreen} />
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

export default Routes;
