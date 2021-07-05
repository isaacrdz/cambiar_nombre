import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import HeaderTitle from "../../components/header/HeaderTitle";

const AppointmentDetail = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderTitle title="Appointment Detail" />
    </SafeAreaView>
  );
};

export default AppointmentDetail;
