import React from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import AppointmentItem from "../../components/appointment/AppointmentItem";
import moment from "moment";

const Appointment = () => {
  const [items, setItems] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://dealerproxapi.com/api/v1/users/6070db318e2dc574fe2ba277/appointments"
      );

      const { data } = await response.json();

      const mappedData = data.map((appointment) => {
        const date = appointment.createdAt;

        return {
          ...appointment,
          date: moment(date).format("YYYY-MM-DD"),
        };
      });

      const reduced = mappedData.reduce((acc, currentItem) => {
        const { date, ...app } = currentItem;

        acc[date] = [app];

        return acc;
      }, {});

      setItems(reduced);
    };
    getData();
  }, []);

  const renderEmptyDate = () => {
    return (
      <View>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const renderItem = (item) => {
    return <AppointmentItem item={item} />;
  };

  const getData = async () => {
    const response = await fetch(
      "https://dealerproxapi.com/api/v1/users/6070db318e2dc574fe2ba277/appointments"
    );

    const { data } = await response.json();

    const mappedData = data.map((appointment) => {
      const date = appointment.createdAt;

      return {
        ...appointment,
        date: moment(date).format("YYYY-MM-DD"),
      };
    });

    const reduced = mappedData.reduce((acc, currentItem) => {
      const { date, ...app } = currentItem;

      acc[date] = [app];

      return acc;
    }, {});

    setItems(reduced);
  };
  const handleRefresh = () => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  };

  return (
    <Agenda
      items={items}
      renderItem={renderItem}
      renderEmptyData={renderEmptyDate}
      onRefresh={() => handleRefresh()}
      // Set this true while waiting for new data from a refresh
      refreshing={refreshing}
    />
  );
};

export default Appointment;
