import React from "react";
import { Agenda } from "react-native-calendars";
import AppointmentItem from "../../components/appointment/AppointmentItem";
import moment from "moment";
import EmpyDate from "../../components/appointment/EmptyDate";
import useAppointment from "../../hooks/useAppointment";
import useAuth from "../../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";

const Appointment = () => {
  const [items, setItems] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(false);
  const { getAppointmentsByUser, appointments, loading } = useAppointment();
  const { user } = useAuth();

  React.useEffect(() => {
    if (appointments) {
      const mappedData = appointments.map((appointment) => {
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
    }
  }, [appointments]);

  useFocusEffect(
    React.useCallback(() => {
      if (user && user._id) getAppointmentsByUser(user._id);
    }, [user])
  );

  const renderEmptyDate = () => {
    return <EmpyDate />;
  };

  const renderItem = (item) => {
    return <AppointmentItem item={item} />;
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
      // onRefresh={() => handleRefresh()}
      // refreshing={refreshing}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={"2012-05-10"}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={"2025-05-30"}
      showClosingKnob={true}
    />
  );
};

export default Appointment;
