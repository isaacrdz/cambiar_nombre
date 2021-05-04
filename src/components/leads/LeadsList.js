import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { List, Layout, Divider } from "@ui-kitten/components";

import useLead from "../../hooks/useLead";
import LeadFilters from "../LeadFilters";
import LeadCard from "./LeadCard";

const LeadsList = ({ user }) => {
  const [pageCurrent, setpageCurrent] = useState(1);
  const { getLeads, leads, loading } = useLead();

  useEffect(() => {
    getLeads(pageCurrent, user._id);
  }, [pageCurrent]);

  const renderFooter = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    setpageCurrent(pageCurrent + 1);
  };

  return (
    <Layout>
      <LeadFilters />
      <Layout>
        <List
          style={styles.container}
          data={leads}
          renderItem={({ item }) => <LeadCard item={item} />}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={Divider}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
        />
      </Layout>
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

export default LeadsList;
