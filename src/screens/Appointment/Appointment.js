import React from "react";
import { Agenda } from "react-native-calendars";
import AppointmentItem from "../../components/appointment/AppointmentItem";
import moment from "moment";
import EmpyDate from "../../components/appointment/EmptyDate";

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
        const date = appointment.startDate;

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
    return <EmpyDate />;
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
      const date = appointment.startDate;

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
      refreshing={refreshing}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={"2012-05-10"}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={"2025-05-30"}
    />
  );
};

export default Appointment;
