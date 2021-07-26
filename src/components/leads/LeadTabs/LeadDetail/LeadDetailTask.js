import React from "react";
import { StyleSheet, View, ScrollView, InteractionManager } from "react-native";
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
import { CapitalizeNames } from "../../../../utils/Capitalize";
import moment from "moment/min/moment-with-locales";

const LeadDetailTask = ({ tasks }) => {
  const renderItem = ({ item, index }) => {
    moment.locale("es-mx");
    const createdAt = moment(item.createdAt).format("DD MMMM YYYY - hh:mm a");
    const nextTask = moment(item.reschedule).format("DD MMMM YYYY - hh:mm a");
    return (
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
        <Layout
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Layout>
            <Text
              category="c1"
              appearance="hint"
              style={{ textTransform: "capitalize", marginBottom: 2 }}
            >
              {CapitalizeNames(item.user.name)}
            </Text>

            <Text category="c1" appearance="hint">
              <Ionicons name="time-outline" size={13} />
              {createdAt}
            </Text>
          </Layout>

          <Layout>
            <Layout
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {item &&
                item.action.map((act, i) => (
                  <Ionicons
                    name={
                      act === "whatsapp"
                        ? "logo-whatsapp"
                        : act === "recall"
                        ? "call-outline"
                        : "document-outline"
                    }
                    size={20}
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
          </Layout>
        </Layout>
        <Divider style={{ marginBottom: 10 }} />
        <Layout style={{ marginBottom: 5 }}>
          <Text
            category="c1"
            appearance="hint"
            style={{ textTransform: "lowercase" }}
          >
            {item.comment}
          </Text>
        </Layout>
        {
          item.assignedBy &&
          <Layout style={{ marginBottom: 5 }}>
            <Text category="c1" appearance="hint">
              Asignado por: {CapitalizeNames(item.assignedBy.name)}
            </Text>
          </Layout>
        }
        <Layout>
          <Text category="c1" appearance="hint">
            Siguiente tarea: <Ionicons name="time-outline" size={13} />{" "}
            {nextTask}
          </Text>
        </Layout>
      </Layout>
    );
  };

  return (
    <List
      style={styles.container}
      data={tasks && tasks}
      renderItem={renderItem}
    />
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
