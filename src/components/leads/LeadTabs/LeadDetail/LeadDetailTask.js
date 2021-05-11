import React from "react";
import moment from "moment";

import { StyleSheet, View, ScrollView } from "react-native";
import {
  Button,
  Card,
  Layout,
  Text,
  Divider,
  Icon,
} from "@ui-kitten/components";

import Ionicons from "@expo/vector-icons/Ionicons";

const Header = ({ user, createdAt, action }) => {
  return (
    <Layout
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <Layout
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        {action &&
          action.map((act, i) => (
            <Ionicons
              name={
                act === "whatsapp"
                  ? "logo-whatsapp"
                  : act === "recall"
                  ? "call-outline"
                  : "document-outline"
              }
              size={25}
              color={
                act === "whatsapp"
                  ? "#4bd366"
                  : act === "recall"
                  ? "#1299de"
                  : "#f43e55"
              }
              key={i}
              style={{ marginLeft: 10 }}
            />
          ))}
      </Layout>
      <Text
        style={{
          marginBottom: 5,
          fontSize: 15,
          fontWeight: "bold",
          textTransform: "capitalize",
        }}
      >
        {user.name}
      </Text>
      <Text appearance="hint">
        <Icon
          style={{ width: 15, height: 15, color: "#a5a5a5" }}
          name="clock"
        />{" "}
        {moment(createdAt).format(`DD MMMM YYYY - hh:mm a`)}
      </Text>
    </Layout>
  );
};

const iconClock = () => (
  <Icon
    style={{
      width: 15,
      height: 15,

      marginRight: 5,
      marginLeft: 5,
      position: "relative",
      top: 2,
    }}
    name="clock"
  />
);

const Footer = ({ reschedule }) => (
  <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
    <Text>
      Siguiente Tarea: {iconClock()}
      {moment(reschedule).format(`DD MMMM YYYY - hh:mm a`)}
    </Text>
  </View>
);

const LeadDetailTask = ({ tasks }) => {
  return (
    <ScrollView>
      {tasks &&
        tasks.map((task) => (
          <Card
            style={styles.card}
            header={() => Header(task)}
            footer={() => Footer(task)}
            key={task._id}
          >
            <Text>{task.comment}</Text>
          </Card>
        ))}
    </ScrollView>
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

export default LeadDetailTask;
