import React from "react";
import moment from "moment/min/moment-with-locales";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  ScrollView,
  InteractionManager,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Card,
  Layout,
  Text,
  Divider,
  Icon,
  ListItem,
  List,
} from "@ui-kitten/components";

import Ionicons from "@expo/vector-icons/Ionicons";
import { translateSubstatus } from '../../utils/tranlsateSubstatus';

const AppointmentItem = ({ item }) => {
  const navigation = useNavigation();
  moment.locale("es-mx");
  const startDate = moment(item.startDate).format("DD MMMM YYYY");
  const time = moment(item.startDate).format("hh:mm a");

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("AppointmentDetail", { item: item })}
    >
      <Layout
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginBottom: 10,
          borderWidth: 1,
          borderColor: "#d8d8d8",
          margin: 5,
          borderRadius: 10,
        }}
      >
        <Layout>
          <Text
            category="c1"
            appearance="hint"
            style={{
              textTransform: "capitalize",
              marginBottom: 2,
              fontWeight: "600",
            }}
          >
            {item.lead.name}
          </Text>
        </Layout>

        <Layout>
          <Text
            category="c1"
            appearance="hint"
            style={{ textTransform: "capitalize", marginBottom: 2 }}
          >
            {item && item.lead && item.lead.substatus && translateSubstatus(item.lead.substatus.name)} - {item.title}
          </Text>
        </Layout>

        <Layout>
          <Text
            category="c1"
            appearance="hint"
            style={{ marginBottom: 2, textTransform: "capitalize" }}
          >
            <Ionicons name="calendar-outline" /> {startDate} -{" "}
            <Ionicons name="time-outline" /> {time}
          </Text>
        </Layout>
      </Layout>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionCall: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#5764b8",
    marginRight: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 100,
    alignItems: "center",
    textAlign: "center",
    textTransform: "capitalize",
    color: "#5764b8",
  },
  actionWhatsapp: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#48c357",
    marginRight: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 100,
    alignItems: "center",
    textAlign: "center",
    textTransform: "capitalize",
    color: "#48c357",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: 5,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerControl: {
    marginHorizontal: 2,
  },
});

export default AppointmentItem;
