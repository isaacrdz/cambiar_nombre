import React, { useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import HeaderTitle from "../../../header/HeaderTitle";
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

const AddAppointment = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const actions = ["information", "documentation", "driving test"];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderTitle title="Add Appointment" />
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
            1. Leave a comment
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
              value={text}
              onChangeText={(string) => {
                setText(string);
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
            2. Leave a Description
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
              value={text}
              onChangeText={(string) => {
                setText(string);
              }}
            />
          </Layout>
        </Layout>

        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
            3. Choose an Action
          </Text>
          <Select size="large" style={{ marginBottom: 10 }} value="Selecciona">
            {actions.map((action, i) => (
              <SelectItem title={action} key={i} />
            ))}
          </Select>
        </Layout>

        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
            4. Pick up Date
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
            4. Pick up Time
          </Text>
          <Select size="large" style={{ marginBottom: 10 }} value="Selecciona">
            <SelectItem title="1 Hora" />
            <SelectItem title="2 Horas" />
          </Select>
        </Layout>
        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Button style={styles.button}>Create Appointment</Button>
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
