import React, { useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import HeaderTitle from "../../../header/HeaderTitle";
import useAppointment from '../../../../hooks/useAppointment';
import useComment from '../../../../hooks/useComment';
import useAuth from '../../../../hooks/useAuth';
import moment from 'moment'
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
} from "@ui-kitten/components";
import DateTimePicker from "@react-native-community/datetimepicker";
import useLead from "../../../../hooks/useLead";

const AddAppointment = ({ navigation }) => {
  const { createAppointment } = useAppointment();
  const { createComment, updateComment } = useComment();
  const { lead, updateLead } = useLead(); 
  const { user } = useAuth(); 
  const [date, setDate] = useState(new Date());
  const [selectedAction, setSelectedAction] = useState(new IndexPath(0));
  const actions = ["information", "documentation", "driving test"];
  const times = ["1 Hora", "2 Horas"];
  const [time, setTime] = useState({row: 0});
  const displayValue = actions[selectedAction.row];
  const displayValueTime = times[time.row];
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [values, setValues] = useState({
    title: '',
    description: '',
  });

  const handleSubmit = async() =>{
    if(values.description === '' || values.title === ''){
      return Toast.show({
        text1: "Fill all the fields",
        type: "error",
        position: "bottom",
      });
    }
    let endDate = moment(date).add((time.row + 1), 'hours');

    ////
    let BodyComment = {
      comment: values.description,
      user: user._id,
      action: ["appointment"],
      store: lead.store._id
    }

    await createComment(BodyComment, lead._id)

    if(lead && lead.comments && lead.comments.length > 0){
      await updateComment({pending: false}, lead.comments[0]._id)
    }
    /////

    await createAppointment({
      ...values, 
      startDate: date, 
      endDate, 
      action: displayValue, 
      substatus: "605bd6b0bed49524ae40f885", 
      store: lead.store._id, 
      user: lead.agent._id, 
      lead: lead._id,
      email: lead.email,
      customer: lead.name,
    });

    let updateLeadBody = {
      status: '604f80222b372e0cb11966dc', 
      substatus: '605bd6b0bed49524ae40f885', 
      isContacted: true, 
    }

    if(!lead.firstTask){
      updateLeadBody.firstTask = new Date()
    }

    await updateLead(updateLeadBody, lead._id);
    navigation.navigate("LeadTabs");

  }


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderTitle title="Agregar Cita" />
      <ScrollView>
        <Layout
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            marginBottom: 10,
          }}
          level="1"
        >
          <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
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
              placeholder="Multiline"
              style={{ minWidth: 400 }}
              value={values.title}
              onChangeText={(string) => {
                setValues({...values, title: string});
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
          <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
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
              placeholder="Multiline"
              textStyle={{ minHeight: 64 }}
              style={{ minWidth: 400 }}
              value={values.description}
              onChangeText={(string) => {
                setValues({...values, description: string});
              }}
            />
          </Layout>
        </Layout>

        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
            3. Elige una acción
          </Text>
          <Select size="large" 
            style={{ marginBottom: 10 }} 
            value="Selecciona" 
            selectedIndex={selectedAction} 
            value={displayValue}
            onSelect={(index) => setSelectedAction(index)}>
            {actions.map((action, i) => (
              <SelectItem title={action} key={i}  />
            ))}
          </Select>
        </Layout>

        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
            4. Elige una Fecha
          </Text>
          <DateTimePicker
            value={date}
            mode={Platform.OS === "ios" ? "datetime" : "date"}
            display="default"
            onChange={onChange}
            display="spinner"
          />
        </Layout>

        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
            4. Elige una Hora
          </Text>
          <Select size="large" style={{ marginBottom: 10 }} onSelect={(index) => setTime(index)} value="Selecciona" value={displayValueTime}>
            {times.map((action, i) => (
              <SelectItem title={action} key={i}  />
            ))}
          </Select>
        </Layout>
        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Button style={styles.button} onPress={handleSubmit}>Crear Cita</Button>
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
  },
  button: {
    marginTop: 20,
  },
});

export default AddAppointment;
