import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { Agenda } from "react-native-calendars";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import {
  translateStatus,
  translateSubstatus,
} from "../../../../utils/tranlsateSubstatus";
import {
  Layout,
  Text,
  CheckBox,
  IndexPath,
  Select,
  SelectItem,
  Button,
  Input,
  Spinner,
} from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import useSubstatus from "../../../../hooks/useSubstatus";
import useLead from "../../../../hooks/useLead";
import useAuth from "../../../../hooks/useAuth";
import useComment from "../../../../hooks/useComment";
import _ from "lodash";
import moment from "moment/min/moment-with-locales";
import HeaderTitle from "../../../header/HeaderTitle";
import {
  isAdmin,
  isRockstar,
  isSuper,
  isUser,
} from "../../../../utils/Authroles";
import DatePicker from "react-native-modern-datepicker";

const contactedStatus = [
  "605cbaafd5fc4809e161c526", // 'rejected',
  "605bd712bed49524ae40f887", // 'visited',
  "605bce8ba04514212f1fac67", // 'confirmed',
  "605bd6b0bed49524ae40f885", // 'confirm',
  "605bd6c4bed49524ae40f886", // 'visit_tracking',
  "605bd717bed49524ae40f888", // 'reschedule',
  "605bd729bed49524ae40f889", // 'client_na',
  "605ce990c053b6162cf1c2ac", // 'documentation',
  "605bd5e1bed49524ae40f883", // 'followup',
  "605d10cf448ecc1d69de49aa", // 'sold',
  "606e22fcc00bcb15b5e70822", // 'application',
  "606e2319c00bcb15b5e70823", // 'approved_application',
  "606e233bc00bcb15b5e70824", // 'conditioned_application',
  "606e2367c00bcb15b5e70825", // 'rejected_application',
  "606e2394c00bcb15b5e70826", // 'separated'
];

const AddTask = ({ navigation }) => {
  const [selectedSubstatus, setSelectedSubstatus] = useState(new IndexPath(0));
  const [hour, setHour] = useState("");
  const [date, setDate] = React.useState("");
  const { substatuses, getSubstatuses } = useSubstatus();
  const { createComment, updateComment, loading } = useComment();
  const { user } = useAuth();
  const { lead, updateLead, getLead } = useLead();
  const [substatusArray, setSubstatusArray] = useState([]);
  const [substatusArrayIds, setSubstatusArrayIds] = useState([]);
  const [selectedActions, setSelectedActions] = useState([]);
  const [statusButton, setStatusButton] = useState(false);
  const displayValue = substatusArray[selectedSubstatus.row];
  const currentId = substatusArrayIds[selectedSubstatus.row];
  const [text, setText] = useState("");

  moment.locale("es-mx");

  let paddingTop = 0;

  if (Platform.OS === "android") {
    paddingTop = 30;
  }

  const now = new Date();
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1
  );

  const handleSubmit = async () => {
    setStatusButton(true);

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
    if (text === "") {
      setStatusButton(false);

      return Toast.show({
        text1: "Por favor deja un comentario",
        type: "error",
        position: "bottom",
      });
    } else if (selectedActions.length === 0) {
      setStatusButton(false);
      return Toast.show({
        text1: "Selecciona al menos una accion",
        type: "error",
        position: "bottom",
      });
    } else if (selectedActions.length > 3) {
      setStatusButton(false);

      return Toast.show({
        text1: "Selecciona máximo 3 acciones",
        type: "error",
        position: "bottom",
      });
    } else {
      let bodyLead = {
        substatus: currentId,
      };

      let userId = "";
      let author = "";

      if (
        user &&
        user.tier &&
        (isRockstar(user.tier._id) ||
          isAdmin(user.tier._id) ||
          isSuper(user.tier._id)) &&
        lead.agent &&
        lead.agent._id
      ) {
        userId = lead.agent._id;
        author = user._id;
      }

      if (user && user.tier && isUser(user.tier._id)) {
        userId = user._id;
      }

      let BodyComment = {
        comment: text,
        user: userId,
        action: selectedActions,
      };

      BodyComment.reschedule = moment(`${date} ${hour}`).format();

      if (author !== "") {
        BodyComment.assignedBy = author;
      }

      if (userId === "") {
        Toast.show({
          text1: "Por favor asigna un agente primero",
          type: "error",
          position: "bottom",
        });
      } else {
        BodyComment.store = lead.store._id;

        if (contactedStatus.includes(currentId)) {
          bodyLead.isContacted = true;
        }

        if (!lead.firstTask) {
          bodyLead.firstTask = new Date();
        }

        if (lead.comments && lead.comments[0]) {
          //Actualizar ultimo comment
          await updateComment({ pending: false }, lead.comments[0]._id);
        }

        await updateLead(bodyLead, lead._id);
        await createComment(BodyComment, lead._id);
        await getLead(lead._id);
        navigation.navigate("LeadTabs", { item: lead });
      }
    }
    setStatusButton(false);
  };

  const handleSetAction = (item) => {
    if (selectedActions.includes(item)) {
      let indexA = _.findIndex(selectedActions, function (o) {
        return o === item;
      });
      let aux = _.filter(selectedActions, (el, index) => {
        return index !== indexA;
      });
      setSelectedActions(aux);
    } else {
      setSelectedActions([...selectedActions, item]);
    }
  };

  const actions = [
    { value: "whatsapp", icon: <Ionicons name="logo-whatsapp" size={20} /> },
    { value: "recall", icon: <Ionicons name="call-outline" size={20} /> },
    {
      value: "documentation",
      icon: <Ionicons name="document-outline" size={20} />,
    },
  ];

  useEffect(() => {
    getSubstatuses();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (substatuses) {
      let aux = [];
      let auxIds = [];
      substatuses.map((item) => {
        if (
          item.status === lead.status._id &&
          item.name !== "new" &&
          item.name !== "rejected" &&
          item.name !== "rsi" &&
          item.name !== "new_service" &&
          item.name !== "visit_rejected"
        ) {
          aux.push(translateSubstatus(item.name));
          auxIds.push(item._id);
        }
        return false;
      });
      setSubstatusArray(aux);
      setSubstatusArrayIds(auxIds);
    }
    //eslint-disable-next-line
  }, [substatuses, lead]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop }}>
      <HeaderTitle title="Agregar Tarea" />
      <ScrollView>
        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          {loading ? (
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
                  Creando comentario...
                </Text>
              </Layout>
            </Layout>
          ) : (
            <>
              <Layout style={{ marginBottom: 30 }} level="1">
                <Text
                  style={{ ...styles.text, marginBottom: 20 }}
                  category="s1"
                >
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
              <Layout style={{ marginBottom: 30 }} level="1">
                <Text
                  style={{ ...styles.text, marginBottom: 20 }}
                  category="s1"
                >
                  2. Elige una acción
                </Text>
                <Layout
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                  }}
                  level="1"
                >
                  {actions.map((item) => (
                    <CheckBox
                      key={item.value}
                      status="primary"
                      onChange={() => handleSetAction(item.value)}
                      checked={selectedActions.includes(item.value)}
                    >
                      {" "}
                      {item.icon}
                    </CheckBox>
                  ))}
                </Layout>
              </Layout>
              <Layout>
                <Text
                  style={{ ...styles.text, marginBottom: 20 }}
                  category="s1"
                >
                  3. Elige un Estatus
                </Text>
                <Layout
                  level="1"
                  style={{
                    minHeight: 128,
                  }}
                >
                  <Select
                    size="large"
                    style={{ marginBottom: 10 }}
                    value={
                      lead && lead.status && translateStatus(lead.status.name)
                    }
                  >
                    <SelectItem
                      title={
                        lead && lead.status && translateStatus(lead.status.name)
                      }
                    />
                  </Select>
                  <Select
                    size="large"
                    selectedIndex={selectedSubstatus}
                    onSelect={(index) => {
                      setSelectedSubstatus(index);
                    }}
                    value={displayValue}
                  >
                    {substatusArray.map((substatus) => (
                      <SelectItem key={substatus} title={substatus} />
                    ))}
                  </Select>
                </Layout>
              </Layout>
              <Layout>
                <Text
                  style={{ ...styles.text, marginBottom: 20 }}
                  category="s1"
                >
                  4. Elige una Fecha
                </Text>
                <Layout
                  level="1"
                  style={{
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

                  <Layout>
                    <Button style={styles.button} onPress={handleSubmit}>
                      Crear Tarea
                    </Button>
                  </Layout>
                </Layout>
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
  },
  button: {
    marginTop: 20,
  },
});

export default AddTask;
