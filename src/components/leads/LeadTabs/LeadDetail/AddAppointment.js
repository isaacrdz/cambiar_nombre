import React, { useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import HeaderTitle from "../../../header/HeaderTitle";
import useAppointment from "../../../../hooks/useAppointment";
import useComment from "../../../../hooks/useComment";
import useAuth from "../../../../hooks/useAuth";
import moment from "moment/min/moment-with-locales";
import {
  Layout,
  Divider,
  Text,
  CheckBox,
  IndexPath,
  Select,
  SelectItem,
  Button,
  Calendar,
  Input,
  Spinner
} from "@ui-kitten/components";
import DatePicker from 'react-native-modern-datepicker';
import useLead from "../../../../hooks/useLead";
import { translateActions } from "../../../../utils/tranlsateSubstatus";
import { isAdmin, isRockstar, isSuper } from "../../../../utils/Authroles";

const AddAppointment = ({ navigation }) => {
  const { createAppointment, loading } = useAppointment();
  const { createComment, updateComment } = useComment();
  const { lead, updateLead } = useLead();
  const { user } = useAuth();
  const [finalDate, setFinalDate] = useState("");
  const [selectedAction, setSelectedAction] = useState(new IndexPath(0));
  const actions = ["information", "documentation", "driving test"];
  const times = ["1 Hora", "2 Horas"];
  const [time, setTime] = useState(({ row: 0 }));
  const displayValue = actions[selectedAction.row];
  const displayValueTime = times[time.row];
  const [statusButton, setStatusButton] = useState(false)
  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');

  moment.locale("es-mx");
  const handleSubmit = async () => {

    setStatusButton(true)
    if (values.description === "" || values.title === "") {
      setStatusButton(false)

      return Toast.show({
        text1: "Completa todos los campos",
        type: "error",
        position: "bottom",
      });
    }

    if (!lead.agent) {
      setStatusButton(false)

      return Toast.show({
        text1: "Primero asigna un agente",
        type: "error",
        position: "bottom",
      });
    }

    if(date === '') {
      setStatusButton(false)

      return Toast.show({
        text1: "Elige una fecha",
        type: "error",
        position: "bottom",
      });
    }

    if(hour === '') {
      setStatusButton(false)

      return Toast.show({
        text1: "Elige una hora",
        type: "error",
        position: "bottom",
      });
    }
    let startDate = moment(`${date} ${hour}`);
    let endDate = moment(startDate).add(time.row + 1, "hours");

    ////
    let BodyComment = {
      comment: values.description,
      action: ["appointment"],
      store: lead.store._id,
      user: lead.agent._id
    };

    if(user && user.tier && (isAdmin(user.tier._id) || isSuper(user.tier._id) || isRockstar(user.tier._id))){
      BodyComment.assignedBy = user._id
    }



    await createComment(BodyComment, lead._id);

    if (lead && lead.comments && lead.comments.length > 0) {
      await updateComment({ pending: false }, lead.comments[0]._id);
    }

    let BodyApp = {
      ...values,
      startDate,
      endDate,
      action: displayValue,
      substatus: "605bd6b0bed49524ae40f885",
      store: lead.store._id,
      user: lead.agent._id,
      lead: lead._id,
      email: lead.email,
      customer: lead.name,
    }

 

    await createAppointment(BodyApp);

    let updateLeadBody = {
      status: "604f80222b372e0cb11966dc",
      substatus: "605bd6b0bed49524ae40f885",
      isContacted: true,
    };

    if (!lead.firstTask) {
      updateLeadBody.firstTask = new Date();
    }

    await updateLead(updateLeadBody, lead._id);
    setStatusButton(false)

    Toast.show({
      text1: "Cita Creada",
      type: "success",
      position: "bottom",
    });

    navigation.navigate("LeadTabs", {item: lead});
  };

  React.useEffect(() => {
    if (hour && date) {
      let finalDate = date.toString().split(" ");
      let finalHour = hour.toString().split(" ");
      let postDate = `${finalDate[0]} ${finalDate[1]} ${finalDate[2]} ${finalDate[3]} ${finalHour[4]} ${finalDate[5]} ${finalDate[6]}`;
      setFinalDate(postDate);
    }
  }, [hour]);


  let paddingTop = 0;

  if (Platform.OS === "android") {
    paddingTop = 30;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop }}>
      <HeaderTitle title="Agregar Cita" />
      <ScrollView>
      {
        loading ? (
            <Layout style={{ paddingHorizontal: 15, paddingVertical: "50%" }}>
              <Layout
                style={{
                  paddingHorizontal: 30,
                  marginBottom: 50,
                  alignSelf: "center",
                }}
              >
                <Spinner size="giant" />
              </Layout>
              <Layout
                style={{ marginBottom: 30, alignSelf: "center" }}
                level="1"
              >
                <Text style={styles.text} category="h3">
                  Creando cita...
                </Text>
              </Layout>
            </Layout>
          ) : (
      <>
        <Layout
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            marginBottom: 10,
          }}
          level="1"
        >
          <Text style={{...styles.text, marginBottom: 20}} category="s1">
            1. Deja un comentario
          </Text>
          <Layout
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            level="1"
          >
            <Input
              placeholder="Comentario"
              style={{ minWidth: '100%' }}
              value={values.title}
              onChangeText={(string) => {
                setValues({ ...values, title: string });
              }}
            />
          </Layout>
        </Layout>

        <Layout
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            marginBottom: 20,
          }}
          level="1"
        >
          <Text style={{...styles.text, marginBottom: 20}} category="s1">
            2. Deja una descripción
          </Text>
          <Layout
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
            }}
            level="1"
          >
            <Input
              multiline={true}
              placeholder="Descripción"
              style={{ minWidth: '100%' }}
              value={values.description}
              onChangeText={(string) => {
                setValues({ ...values, description: string });
              }}
            />
          </Layout>
        </Layout>

        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Text style={{...styles.text, marginBottom: 20}} category="s1">
            3. Elige una acción
          </Text>
          <Select
            size="large"
            style={{ marginBottom: 10 }}
            selectedIndex={selectedAction}
            value={translateActions(displayValue)}
            onSelect={(index) => setSelectedAction(index)}
          >
            {actions.map((action, i) => (
              <SelectItem title={translateActions(action)} key={i} />
            ))}
          </Select>
        </Layout>

        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Text style={{...styles.text, marginBottom: 20}} category="s1">
            4. Elige una Fecha
          </Text>
          <DatePicker 
            minimumDate={moment().add(1, 'day').format('YYYY-MM-DD')}
            onTimeChange={time => {
              let h = time.split(':')[0];
              if(parseInt(h) < 8 || parseInt(h) > 21) {
                Toast.show({
                  text1: "Elige un horario laboral (8:00am - 9:00pm)",
                  type: "error",
                  position: "bottom",
                });
              }else{  
                setHour(time)
              }
            }}
            onDateChange={date => {
              setDate(date)
            }}
            />
        </Layout>

        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Text style={{...styles.text, marginBottom: 20}} category="s1">
            5. Elige el tiempo de la cita
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
        </Layout>
        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Button style={styles.button} disabled={statusButton} onPress={handleSubmit}>
            Crear Cita
          </Button>
        </Layout>
        </>
      )
    }
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
  },
  button: {
    marginTop: 20,
  },
});

export default AddAppointment;
