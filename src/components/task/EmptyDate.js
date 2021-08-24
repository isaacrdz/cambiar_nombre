import React from "react";

import { StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";

const EmpyDate = ({ item }) => {
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
      <Layout>
        <Text
          category="c1"
          appearance="hint"
          style={{
            marginBottom: 2,
            fontWeight: "600",
          }}
        >
          No tienes ninguna tarea hoy :)
        </Text>
      </Layout>
    </Layout>
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

export default EmpyDate;
