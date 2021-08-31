import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import LeadsList from "../../components/leads/LeadsList";

import useAuth from "../../hooks/useAuth";
import LeadSearch from "../../components/leads/LeadSearch";
import Header from "../../components/header/Header";
import { useFocusEffect } from '@react-navigation/native';
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../../utils/ExpoPushNotifications";
let notificationAmount = 0;

const Lead = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [pageCurrent, setpageCurrent] = useState(1);
  const [currentSearch, setCurrentSearch] = useState({});
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const { user, updateProfile } = useAuth();

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
        Notifications.addNotificationResponseReceivedListener(async(response) => {
          console.log(response.notification.request)
          navigation.navigate('LeadTabs', {item: {_id: response.notification.request.data._id}})

        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
  }, [user]);


  useFocusEffect(
    React.useCallback(() => {
      setQuery('')
     setCurrentSearch({
      title: "Todos",
      value: "all",
      type: "all",
    })
    }, [])
  );

  return (
    <>
      <LeadSearch
        setQuery={setQuery}
        query={query}
        pageCurrent={pageCurrent}
        setpageCurrent={setpageCurrent}
        currentSearch={currentSearch}
      />

      <LeadsList
        user={user}
        query={query}
        pageCurrent={pageCurrent}
        setpageCurrent={setpageCurrent}
        currentSearch={currentSearch}
        setCurrentSearch={setCurrentSearch}
      />
    </>
  );
};

export default Lead;
