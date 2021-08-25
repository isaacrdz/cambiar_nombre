import React from "react";
import { StyleSheet } from "react-native";
import {
  Layout,
  Text,
  Button,
  Icon,
  Avatar,
  ListItem,
  List,
  Divider,
} from "@ui-kitten/components";
import moment from "moment/min/moment-with-locales";

import { Ionicons } from "@expo/vector-icons";
import { translateHistory } from "../../../../../utils/tranlsateSubstatus";

const LeadDetailHistory = ({ activities }) => {
  const renderItem = ({ item, index }) => {
    moment.locale("es-mx");
    const createdAt = moment(item.createdAt).format("DD MMMM YYYY - hh:mm a");

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
            justifyContent: "flex-start",
            alignItems: "center",
            paddingBottom: 5,
            marginBottom: 5,
          }}
        >
          <Text category="c1" appearance="hint">
            {translateHistory(item.description)}
          </Text>
        </Layout>
        <Divider style={{ marginBottom: 5 }} />
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",

            paddingVertical: 1,
          }}
        >
          <Ionicons
            name={
              item.action === "update"
                ? "cloud-upload-outline"
                : item.action === "comment"
                ? "construct-outline"
                : item.action === "wsp"
                ? "logo-whatsapp"
                : item.action === "mailing"
                ? "mail-outline"
                : "document-outline"
            }
            size={20}
            color={
              item.action === "update"
                ? "#1299de"
                : item.action === "comment"
                ? "#535de2"
                : item.action === "wsp"
                ? "#4bd366"
                : item.action === "mailing"
                ? "#f06292"
                : "red"
            }
            style={{ paddingRight: 5 }}
          />
          <Ionicons
            name="time-outline"
            size={20}
            color="#01bcd4"
            style={{ paddingRight: 5 }}
          />
          <Text category="c1" appearance="hint">
            {createdAt}
          </Text>
        </Layout>
      </Layout>
    );
  };

  return (
    <List
      style={styles.container}
      data={activities && activities}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default LeadDetailHistory;
