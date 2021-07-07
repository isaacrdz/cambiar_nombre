import React, { useEffect, useState } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import HeaderTitle from "../../components/header/HeaderTitle";
import {
  Layout,
  Divider,
  Text,
  Button,
  Icon,
  Input,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import moment from "moment/min/moment-with-locales";

const AppointmentDetail = ({ route }) => {
  const { item } = route.params;
  const [appointment, setAppointment] = useState({});
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `https://dealerproxapi.com/api/v1/appointments/${item._id}`
      );

      const { data } = await response.json();
      setAppointment(data);
    };

    getData();
  }, []);
  moment.locale("es-mx");
  const startDate = moment(appointment.startDate).format(
    "DD MMMM YYYY hh:mm a"
  );
  // const time = moment(appointment.startDate).format("hh:mm a");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderTitle title="Appointment Detail" />

      <ScrollView>
        <Layout style={{ marginBottom: 20 }}>
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
            level="1"
          >
            <Text category="s1">Nombre</Text>

            <Text category="s1" style={{ textTransform: "capitalize" }}>
              {appointment.lead && appointment.lead.name}
            </Text>
          </Layout>
          <Divider />
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
            level="1"
          >
            <Text category="s1">Email</Text>

            <Text category="s1">
              {appointment.lead && appointment.lead.email}
            </Text>
          </Layout>
          <Divider />
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
            level="1"
          >
            <Text category="s1">Phone</Text>

            <Text category="s1">
              {appointment.lead && appointment.lead.phone}
            </Text>
          </Layout>
          <Divider />
        </Layout>
        <Text
          category="s1"
          style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}
        >
          Appointment Information
        </Text>
        <Layout>
          <Layout
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            level="1"
          >
            <Text category="s1" style={{ marginBottom: 10 }}>
              Title
            </Text>

            <Input style={{ minWidth: 300 }} value={appointment.title} />
          </Layout>
        </Layout>
        <Layout>
          <Layout
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            level="1"
          >
            <Text category="s1" style={{ marginBottom: 10 }}>
              Information
            </Text>

            <Input style={{ minWidth: 300 }} value={appointment.description} />
          </Layout>
          <Layout>
            <Layout
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              level="1"
            >
              <Text category="s1" style={{ marginBottom: 10 }}>
                Start Date
              </Text>

              <Input style={{ minWidth: 300 }} value={startDate} />
            </Layout>
          </Layout>
          <Layout>
            <Layout
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              level="1"
            >
              <Text category="s1" style={{ marginBottom: 10 }}>
                Duration
              </Text>

              <Input style={{ minWidth: 300 }} value={"1 Hora"} />
              <Button style={{ marginBottom: 20, marginTop: 20 }}>Save</Button>
            </Layout>
          </Layout>

          <Divider style={{ marginBottom: 20 }} />

          <Layout
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            level="1"
          >
            <Text
              category="s1"
              style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}
            >
              Choose Appointment Status
            </Text>

            <Select
              size="large"
              style={{ marginBottom: 10 }}
              value="Selecciona"
            >
              <SelectItem title="Cliente NA" />
              <SelectItem title="Por Confirmar" />
              <SelectItem title="Reagendada" />
              <SelectItem title="Seguimiento" />
              <SelectItem title="Confirmada" />
            </Select>

            <Button style={{ marginBottom: 20, marginTop: 20 }}>
              Update Status
            </Button>
          </Layout>
          <Divider />
          <Layout
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            level="1"
          >
            <Text
              category="s1"
              style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}
            >
              Choose Visit Status
            </Text>

            <Input
              style={{ minWidth: 300, marginBottom: 10 }}
              value={"Deja Comentario"}
            />

            <Select
              size="large"
              style={{ marginBottom: 10 }}
              value="Selecciona un status"
            >
              <SelectItem title="Lleno Solicitud" />
              <SelectItem title="Solicitud Aprobada" />
              <SelectItem title="Solicitud Condicionada" />
              <SelectItem title="Solicitud Rechazada" />
            </Select>
          </Layout>
        </Layout>
        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Button>Create Visit</Button>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    margin: 2,
  },
  container: {
    marginBottom: 20,
  },
  ContainerDetail: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },

  ContainerTop: {
    justifyContent: "center",
    flexDirection: "row",

    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },

  mr: {
    marginRight: 20,
  },

  bottomMargin: {
    marginBottom: 70,
  },
  textCapitalize: {
    textTransform: "capitalize",
  },
  textUppercase: {
    textTransform: "uppercase",
  },
});

export default AppointmentDetail;
