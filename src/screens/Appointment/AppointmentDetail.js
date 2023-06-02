import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import HeaderTitle from "../../components/header/HeaderTitle";
import Toast from "react-native-toast-message";
import useAppointment from "../../hooks/useAppointment";
import useVisit from "../../hooks/useVisit";
import useLead from "../../hooks/useLead";
import useAuth from "../../hooks/useAuth";
import useSubstatus from "../../hooks/useSubstatus";
import useComment from "../../hooks/useComment";
import {
  Layout,
  Divider,
  Text,
  Button,
  Input,
  Select,
  IndexPath,
  SelectItem,
} from "@ui-kitten/components";
import moment from "moment/min/moment-with-locales";
import { useFocusEffect } from "@react-navigation/native";
import { translateSubstatus } from "../../utils/tranlsateSubstatus";
import { isAdmin, isRockstar, isSuper, isUser } from "../../utils/Authroles";
import DatePicker from "react-native-modern-datepicker";

const AppointmentDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const { appointment, getAppointment, updateAppointment } = useAppointment();
  const { createVisit } = useVisit();

  const { user } = useAuth();
  const { updateLead } = useLead();
  const { substatuses, getSubstatuses } = useSubstatus();
  const { updateComment, createComment } = useComment();
  const times = ["1 Hora", "2 Horas"];

  const [hour, setHour] = useState("");
  const [date, setDate] = React.useState("");

  const [finalDate, setFinalDate] = useState("");
  const [time, setTime] = useState({ row: 0 });
  const [textVisit, setTextVisit] = useState("");
  const displayValueTime = times[time.row];
  const [currentAppointment, setCurrentAppointment] = useState({
    startDate: new Date(),
  });

  const [substatusAppointment, setSubstatusAppointment] = useState([]);
  const [substatusVisit, setSubstatusVisit] = useState([]);

  const [substatusAppointmentIndex, setSubstatusAppointmentIndex] = useState(
    new IndexPath(0)
  );
  const displaySubstatusAppointment =
    substatusAppointment[substatusAppointmentIndex.row];

  const [substatusVisitIndex, setSubstatusVisitIndex] = useState(
    new IndexPath(0)
  );
  const displaySubstatusVisit = substatusVisit[substatusVisitIndex.row];

  const handleSaveVisit = async () => {
    if (date === "") {
      setStatusButton(false);

      return Toast.show({
        text1: "Elige una fecha",
        type: "error",
        position: "bottom",
      });
    }

    if (hour === "") {
      setStatusButton(false);

      return Toast.show({
        text1: "Elige una hora",
        type: "error",
        position: "bottom",
      });
    }
    if (textVisit === "") {
      return Toast.show({
        text1: "Deja un comentario",
        type: "error",
        position: "bottom",
      });
    }

    if (
      currentAppointment &&
      currentAppointment.lead &&
      currentAppointment.lead.agent
    ) {
      let author = "";
      let userId = "";
      if (
        user &&
        user.tier &&
        (isRockstar(user.tier._id) ||
          isAdmin(user.tier._id) ||
          isSuper(user.tier._id)) &&
        currentAppointment.lead.agent &&
        currentAppointment.lead.agent._id
      ) {
        userId = currentAppointment.lead.agent._id;
        author = user._id;
      }

      if (user && user.tier && isUser(user.tier._id)) {
        userId = user._id;
      }

      let BodyComment = {
        comment: textVisit,
        user: userId,
        action: ["visit"],
        pending: true,
        store: currentAppointment.lead.store._id,
      };

      if (author !== "") {
        BodyComment.assignedBy = author;
      }

      BodyComment.reschedule = moment(`${date} ${hour}`).format();

      await updateLead(
        {
          status: "6064f8065b21e51052eed547",
          substatus: substatusVisit[substatusVisitIndex.row]._id,
        },
        currentAppointment.lead._id
      );
      await createComment(BodyComment, currentAppointment.lead._id);
      await createVisit({
        substatus: substatusVisit[substatusVisitIndex.row]._id,
        lead: currentAppointment.lead._id,
        store: currentAppointment.lead.store._id,
        user: currentAppointment.lead.agent._id,
      });
      await updateAppointment({ status: false }, item._id);
      if (
        currentAppointment &&
        currentAppointment.lead &&
        currentAppointment.lead.comments &&
        currentAppointment.lead.comments[0]
      ) {
        await updateComment(
          { pending: false },
          currentAppointment.lead.comments[
            currentAppointment.lead.comments.length - 1
          ]._id
        );
      }
      navigation.pop();
    } else {
      Toast.show({
        text1: "Agrega un agente primero",
        type: "error",
        position: "bottom",
      });
    }
  };

  const handleSaveSubstatusAppointment = async () => {
    let bodyAppointment = {
      substatus: substatusAppointment[substatusAppointmentIndex.row]._id,
    };

    if (
      substatusAppointment[substatusAppointmentIndex.row]._id ===
        "605bd729bed49524ae40f889" ||
      substatusAppointment[substatusAppointmentIndex.row]._id ===
        "605bd717bed49524ae40f888"
    ) {
      bodyAppointment.status = false;
    }

    await updateLead(
      {
        status: "604f80222b372e0cb11966dc",
        substatus: substatusAppointment[substatusAppointmentIndex.row]._id,
      },
      currentAppointment.lead._id
    );

    await updateAppointment(bodyAppointment, item._id);

    Toast.show({
      text1: "Cita Actualizada",
      type: "success",
      position: "bottom",
    });
    if (
      substatusAppointment[substatusAppointmentIndex.row]._id ===
        "605bd729bed49524ae40f889" ||
      substatusAppointment[substatusAppointmentIndex.row]._id ===
        "605bd717bed49524ae40f888"
    ) {
      navigation.pop();
    }
  };

  const handleSaveAppointment = async () => {
    if (
      currentAppointment.description === "" ||
      currentAppointment.title === ""
    ) {
      return Toast.show({
        text1: "Por favor llena todos los campos",
        type: "error",
        position: "bottom",
      });
    }

    let endDate;
    let startDate;
    if (Platform.OS === "ios") {
      startDate = currentAppointment.startDate;
      endDate = moment(startDate).add(time.row + 1, "hours");
    } else {
      startDate = finalDate;
      endDate = moment(startDate).add(time.row + 1, "hours");
    }

    await updateAppointment(
      {
        title: currentAppointment.title,
        description: currentAppointment.description,
        endDate,
        startDate,
      },
      item._id
    );

    Toast.show({
      text1: "Cita Actualizada",
      type: "success",
      position: "bottom",
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      if (item && item._id) getAppointment(item._id);
    }, [item])
  );

  useFocusEffect(
    React.useCallback(() => {
      getSubstatuses();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (substatuses && currentAppointment && currentAppointment.lead) {
        let sA = [];
        let sV = [];

        let cA = 0;
        let cV = 0;
        substatuses.map((item) => {
          if (item.status === "604f80222b372e0cb11966dc") {
            sA.push(item);
            if (item._id.toString() === currentAppointment.substatus._id) {
              setSubstatusAppointmentIndex(new IndexPath(cA));
            }
            cA++;
          }

          if (
            item.status === "6064f8065b21e51052eed547" &&
            item.name !== "frontdesk"
          ) {
            sV.push(item);
            cV++;
          }
        });
        setSubstatusAppointment(sA);
        setSubstatusVisit(sV);
      }
    }, [substatuses, currentAppointment])
  );

  useEffect(() => {
    if (appointment && appointment._id) {
      let timeDif = moment(appointment.endDate).diff(
        appointment.startDate,
        "hours"
      );

      setFinalDate(appointment.startDate);
      setTime({ row: timeDif - 1 });

      setCurrentAppointment({
        substatus: appointment.substatus,
        lead: {
          agent: appointment.lead.agent,
          _id: appointment.lead._id,
          name: appointment.lead.name,
          email: appointment.lead.email,
          phone: appointment.lead.phone,
          store: appointment.lead.store,
          comments: appointment.lead.comments,
        },
        title: appointment.title,
        description: appointment.description,
        startDate: new Date(appointment.startDate),
      });
    }
  }, [appointment]);

  moment.locale("es-mx");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setCurrentAppointment({ ...currentAppointment, startDate: currentDate });
  };

  let paddingTop = 0;

  if (Platform.OS === "android") {
    paddingTop = 30;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop }}>
      <HeaderTitle title="Detalle de la Cita" />

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
              {currentAppointment.lead && currentAppointment.lead.name}
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
              {currentAppointment.lead && currentAppointment.lead.email}
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
            <Text category="s1">Teléfono</Text>

            <Text category="s1">
              {currentAppointment.lead && currentAppointment.lead.phone}
            </Text>
          </Layout>
          <Divider />
        </Layout>
        <Text category="s1" style={{ textAlign: "center", marginBottom: 20 }}>
          Información de Cita
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
              Título
            </Text>

            <Input
              style={{ minWidth: 300 }}
              onChangeText={(string) =>
                setCurrentAppointment({ ...currentAppointment, title: string })
              }
              value={currentAppointment.title}
            />
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
              Información
            </Text>

            <Input
              style={{ minWidth: 300 }}
              onChangeText={(string) =>
                setCurrentAppointment({
                  ...currentAppointment,
                  description: string,
                })
              }
              value={currentAppointment.description}
            />
            <Input
              disabled
              style={{ minWidth: 300, marginTop: 5 }}
              value={`Fecha de Inicio: ${
                finalDate && moment(finalDate).format("DD, MMMM YYYY - hh:mm a")
              }`}
            />
          </Layout>
          <Layout>
            <Text style={{ ...styles.text, marginTop: 20 }} category="s1">
              Reagendar Fecha
            </Text>
            <Layout
              level="1"
              style={{
                paddingHorizontal: 20,
                paddingVertical: 2,
                minHeight: 256,
              }}
            >
              <DatePicker
                minimumDate={moment().add(1, "day").format("YYYY-MM-DD")}
                onTimeChange={(time) => {
                  setHour(time);
                }}
                onDateChange={(date) => {
                  setDate(date);
                }}
              />
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
                Duración
              </Text>
              <Select
                size="large"
                style={{ marginBottom: 10 }}
                onSelect={(index) => setTime(index)}
                value={displayValueTime}
              >
                {times.map((action, i) => (
                  <SelectItem title={action} key={i} />
                ))}
              </Select>
              {/* <Input style={{ minWidth: 300 }} value={"1 Hora"} /> */}
              <Button
                style={{ marginBottom: 20, marginTop: 20 }}
                onPress={handleSaveAppointment}
              >
                Guardar
              </Button>
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
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              Elige el Estatus de la Cita
            </Text>

            <Select
              size="large"
              style={{ marginBottom: 10 }}
              onSelect={(index) => setSubstatusAppointmentIndex(index)}
              selectedIndex={substatusAppointmentIndex}
              value={
                displaySubstatusAppointment &&
                translateSubstatus(displaySubstatusAppointment.name)
              }
            >
              {substatusAppointment.map((item) => (
                <SelectItem
                  title={translateSubstatus(item.name)}
                  key={item.name}
                />
              ))}
            </Select>

            <Button
              style={{ marginBottom: 20, marginTop: 20 }}
              onPress={handleSaveSubstatusAppointment}
            >
              Actualizar Estatus
            </Button>
          </Layout>
          {currentAppointment &&
            currentAppointment.substatus &&
            (currentAppointment.substatus._id === "605bd6c4bed49524ae40f886" ||
              currentAppointment.substatus._id ===
                "605bce8ba04514212f1fac67") && (
              <>
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
                    style={{ textAlign: "center", marginBottom: 20 }}
                  >
                    Elige el Estatus de la Visita
                  </Text>

                  <Input
                    style={{ minWidth: 300, marginBottom: 10 }}
                    value={textVisit}
                    onChangeText={(string) => setTextVisit(string)}
                  />

                  <Select
                    size="large"
                    style={{ marginBottom: 10 }}
                    onSelect={(index) => setSubstatusVisitIndex(index)}
                    selectedIndex={substatusVisitIndex}
                    value={displaySubstatusVisit && displaySubstatusVisit.name}
                  >
                    {substatusVisit.map((item) => (
                      <SelectItem
                        title={translateSubstatus(item.name)}
                        key={item.name}
                      />
                    ))}
                  </Select>
                </Layout>
                <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                  <Button onPress={handleSaveVisit}>Crear Visita</Button>
                </Layout>
              </>
            )}
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    margin: 2,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
  },
});

export default AppointmentDetail;
