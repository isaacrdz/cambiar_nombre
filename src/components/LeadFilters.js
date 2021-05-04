import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

import {
  Icon,
  List,
  ListItem,
  Layout,
  Divider,
  Text,
} from "@ui-kitten/components";

const filters = ["New", "Sold", "Visit", "Appointment", "Lead", "Assigned"];

const LeadFilters = () => {
  return (
    <Layout style={{ marginTop: 20 }} level="4">
      <List
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(index) => index.toString()}
        data={filters}
        renderItem={({ item }) => (
          <Layout style={styles.controlContainerFilters}>
            <Text style={styles.ItemText} style={{ color: "#5764b8" }}>
              {item}
            </Text>
          </Layout>
        )}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "#f5fcff",
  },

  itemContainer: {},

  itemRow: {
    borderBottomColor: "#ccc",
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  itemImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },

  itemText: {
    fontSize: 16,
    padding: 5,
  },
  loader: {
    marginTop: 10,
    alignItems: "center",
  },

  ItemText: {
    textTransform: "capitalize",
  },

  ItemTextName: {
    textTransform: "capitalize",
    marginTop: 5,
    marginBottom: 5,
  },

  itemLayout: {
    paddingLeft: 20,
    paddingVertical: 10,
  },

  controlContainer: {
    borderRadius: 4,
    margin: 4,
    padding: 4,
    borderWidth: 1,
    borderColor: "#5764b8",
    width: 100,
    alignItems: "center",
  },
  controlContainerFilters: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#5764b8",
    marginRight: 10,
    marginLeft: 10,
    padding: 5,
    minWidth: 100,
    alignItems: "center",
  },
});

export default LeadFilters;
