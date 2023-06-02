import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import HeaderTitle from "../../components/header/HeaderTitle";
import Toast from "react-native-toast-message";
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
  CheckBox,
  Spinner,
} from "@ui-kitten/components";
import moment from "moment/min/moment-with-locales";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { translateSubstatus } from "../../utils/tranlsateSubstatus";
import { isAdmin, isRockstar, isSuper, isUser } from "../../utils/Authroles";
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

const TaskDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const { user } = useAuth();
  const { updateComment, createComment, getComment, comment, loading } =
    useComment();
  const [currentComment, setCurrentComment] = useState({
    startDate: new Date(),
  });
  const [substatusComment, setSubstatusComment] = useState([]);
  const [substatusVisit, setSubstatusVisit] = useState([]);
  const [statusButton, setStatusButton] = useState(false);
  ////////

  const [selectedSubstatus, setSelectedSubstatus] = useState(new IndexPath(0));
  const [hour, setHour] = useState("");
  const [date, setDate] = React.useState("");
  const { substatuses, getSubstatuses } = useSubstatus();
  const { lead, updateLead, getLead } = useLead();
  const [substatusArray, setSubstatusArray] = useState([]);
  const [substatusArrayIds, setSubstatusArrayIds] = useState([]);
  const [selectedActions, setSelectedActions] = useState([]);
  const displayValue = substatusArray[selectedSubstatus.row];
  const currentId = substatusArrayIds[selectedSubstatus.row];
  const [text, setText] = useState("");
  moment.locale("es-mx");

  const actions = [
    { value: "whatsapp", icon: <Ionicons name="logo-whatsapp" size={20} /> },
    { value: "recall", icon: <Ionicons name="call-outline" size={20} /> },
    {
      value: "documentation",
      icon: <Ionicons name="document-outline" size={20} />,
    },
  ];

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

        await createComment(BodyComment, lead._id);
        await updateLead(bodyLead, lead._id);
        await getLead(lead._id);

        navigation.navigate("TaskMain");
      }
    }
  };

  useEffect(() => {
    if (comment && comment.lead) {
      getLead(comment.lead._id);
    }
  }, [comment]);

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

  useEffect(() => {
    if (substatuses && comment && comment.lead) {
      let aux = [];
      let auxIds = [];
      substatuses.map((item) => {
        if (
          item.status === comment.lead.status._id &&
          item.name !== "new" &&
          item.name !== "rejected" &&
          item.name !== "visit_rejected" &&
          item.name !== "rsi" &&
          item.name !== "new_service"
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
  }, [substatuses, comment]);

  ////////

  useFocusEffect(
    React.useCallback(() => {
      if (item && item._id) getComment(item._id);
    }, [item])
  );

  useFocusEffect(
    React.useCallback(() => {
      getSubstatuses();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      if (substatuses && currentComment && currentComment.lead) {
        let sA = [];
        let sV = [];

        let cA = 0;
        let cV = 0;
        substatuses.map((item) => {
          if (item.status === "604f80222b372e0cb11966dc") {
            sA.push(item);
            if (item._id.toString() === currentComment.substatus) {
              setSubtatusCommentIndex(new IndexPath(cA));
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
        setSubstatusComment(sA);
        setSubstatusVisit(sV);
      }
    }, [substatuses, currentComment])
  );

  useEffect(() => {
    if (comment && comment._id) {
      setCurrentComment({
        substatus: comment.substatus,
        status: comment.lead.status,
        lead: {
          agent: comment.lead.agent,
          _id: comment.lead._id,
          name: comment.lead.name,
          email: comment.lead.email,
          phone: comment.lead.phone,
          store: comment.lead.store,
          comments: comment.lead.comments,
        },
        reschedule: comment.reschedule
          ? new Date(comment.reschedule)
          : new Date(),
      });
    }
  }, [comment]);

  moment.locale("es-mx");
  let paddingTop = 0;

  if (Platform.OS === "android") {
    paddingTop = 30;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop }}>
      <HeaderTitle title="Detalle de la Tarea" />

      <ScrollView>
        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
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
              {currentComment.lead && currentComment.lead.name}
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
              {currentComment.lead && currentComment.lead.email}
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
              {currentComment.lead && currentComment.lead.phone}
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
            <Text category="s1" style={{}}>
              Descripcion
            </Text>
            <Text style={{ flexShrink: 1, marginLeft: 55 }} category="s1">
              {item.comment && item.comment}
            </Text>
          </Layout>
        </Layout>
        <Text
          category="h6"
          style={{
            textAlign: "center",
            marginBottom: 20,
            marginTop: 20,
            paddingTop: 20,
          }}
        >
          Crear Nueva Tarea
        </Text>
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

export default TaskDetail;
