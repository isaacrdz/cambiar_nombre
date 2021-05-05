import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { List, Layout, Divider } from "@ui-kitten/components";

import useLead from "../../hooks/useLead";
import LeadFilters from "../LeadFilters";
import LeadCard from "./LeadCard";
import Header from "../header/Header";

const LeadsList = ({
  user,
  query,
  pageCurrent,
  currentSearch,
  setCurrentSearch,
  setpageCurrent,
  search,
}) => {
  const { getLeads, leads, loading, clearState } = useLead();
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);

  useEffect(() => {
    getLeads(pageCurrent, user._id, currentSearch, query);
  }, [currentSearch, pageCurrent, search]);

  useEffect(() => {
    return () => clearState();
  }, []);

  const renderFooter = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentum) {
      setpageCurrent(pageCurrent + 1);
      setOnEndReachedCalledDuringMomentum(true);
    }
  };

  return (
    <Layout>
      <LeadFilters
        page={pageCurrent}
        setPage={setpageCurrent}
        setCurrent={setCurrentSearch}
        id={user._id}
        current={currentSearch}
      />
      <Layout>
        <List
          style={styles.container}
          data={leads}
          renderItem={({ item }) => <LeadCard item={item} key={item._id} />}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={Divider}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() =>
            setOnEndReachedCalledDuringMomentum(false)
          }
        />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: "20%",
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
