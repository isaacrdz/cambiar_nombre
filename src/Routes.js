import React, { useState, useRef, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Stacks
import HomeStackScreen from "./navigation/HomeStackScreen";
import LeadStackScreen from "./navigation/LeadStackScreen";
import AuthStackScreen from "./navigation/AuthStackScreen";
import ProfileStackScreen from "./navigation/ProfileStackScreen";
import useAuth from "./hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import AppointmentStackScreen from "./navigation/AppointmentStackScreen";
import TaskStackScreen from "./navigation/TaskStackScreen";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "./utils/ExpoPushNotifications";
import { isAdmin, isRockstar, isUser } from "./utils/Authroles";
let notificationAmount = 0;

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const Routes = ({ token, ...rest }) => {
  const { isAuthenticated, loadUser, user, updateProfile } = useAuth();
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [tok, setTok] = useState(null);

  React.useEffect(() => {
    Notifications.setBadgeCountAsync(0);
  }, []);

  React.useEffect(() => {
    if (user && user._id) {
      registerForPushNotificationsAsync().then(
        (token) => {
          updateProfile({ pushNotificationToken: token });
        }
        // setExpoPushToken(token)}
      );

      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
          if (Platform.OS === "ios") {
            Notifications.setBadgeNumberAsync(notificationAmount);
            notificationAmount++;
          }
        });

      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener(
          async (response) => {
            // console.log(response.notification.request);
          }
        );

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
  }, [user]);

  const getToken = async () => {
    let t = await AsyncStorage.getItem("token");
    setTok(t);
  };

  React.useEffect(() => {
    if (tok) {
      loadUser();
    }
  }, [tok]);

  React.useEffect(() => {
    getToken();
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
              } else if (route.name === "Tareas") {
                iconName = focused ? "construct-sharp" : "construct-outline";
              } else if (route.name === "Leads") {
                iconName = focused ? "layers-sharp" : "layers-outline";
              } else if (route.name === "Citas") {
                iconName = focused ? "time-sharp" : "time-outline";
              } else if (route.name === "Perfil") {
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
          {user &&
            user.tier &&
            (isRockstar(user.tier._id) ||
              isAdmin(user.tier._id) ||
              isUser(user.tier._id)) && (
              <Tabs.Screen name="Tareas" component={TaskStackScreen} />
            )}
          {user &&
            user.tier &&
            (isRockstar(user.tier._id) ||
              isAdmin(user.tier._id) ||
              isUser(user.tier._id)) && (
              <Tabs.Screen name="Citas" component={AppointmentStackScreen} />
            )}
          <Tabs.Screen name="Perfil" component={ProfileStackScreen} />
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
