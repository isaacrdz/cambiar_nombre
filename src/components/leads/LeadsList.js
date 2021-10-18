import React, { useState } from "react";
import { StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import { List, Layout, Divider } from "@ui-kitten/components";
import { useFocusEffect } from "@react-navigation/native";
import { Spinner } from "@ui-kitten/components";

import useLead from "../../hooks/useLead";
import LeadFilters from "../LeadFilters";
import LeadCard from "./LeadCard";
import Header from "../header/Header";
import { getMultiStoresIds } from "../../utils/storesUser";
import { Ionicons } from "@expo/vector-icons";
import { isAdmin, isRockstar, isSuper, isUser } from "../../utils/Authroles";

const LeadsList = ({
  user,
  query,
  pageCurrent,
  currentSearch,
  setCurrentSearch,
  setpageCurrent,
}) => {
  const {
    getLeads,
    getLeadsByStore,
    getLeadsRockstar,
    leads,
    loading,
    clearState,
    leadsSize,
  } = useLead();

  const [size, setSize] = useState(-1);

  useFocusEffect(
    React.useCallback(() => {
      clearState();
      if (user && user.tier && isUser(user.tier._id)) {
        getLeads(1, user._id, { type: "all", value: "all" }, "");
      } else if (user && user.tier && isAdmin(user.tier._id)) {
        getLeadsByStore(
          1,
          `&multiStores=${getMultiStoresIds(user.stores)}`,
          { type: "all", value: "all" },
          ""
        );
      } else if (user.tier && isSuper(user.tier._id)) {
        getLeadsByStore(
          1,
          `&multiStores=${getMultiStoresIds(user.group.stores)}`,
          { type: "all", value: "all" },
          ""
        );
      } else if (user && user.tier && isRockstar(user.tier._id)) {
        getLeadsRockstar(1, { type: "all", value: "all" }, "");
      }
    }, [])
  );

  React.useEffect(() => {
    if (size !== 0 && pageCurrent !== 1) {
      if (user && user.tier && isUser(user.tier._id)) {
        getLeads(pageCurrent, user._id, currentSearch, query);
      } else if (user && user.tier && isAdmin(user.tier._id)) {
        getLeadsByStore(
          pageCurrent,
          `&multiStores=${getMultiStoresIds(user.stores)}`,
          currentSearch,
          query
        );
      } else if (user && user.tier && isSuper(user.tier._id)) {
        getLeadsByStore(
          pageCurrent,
          `&multiStores=${getMultiStoresIds(user.group.stores)}`,
          currentSearch,
          query
        );
      } else if (user && user.tier && isRockstar(user.tier._id)) {
        getLeadsRockstar(pageCurrent, currentSearch, query);
      }
    }
  }, [pageCurrent]);

  React.useEffect(() => {
    setSize(leadsSize);
  }, [leadsSize]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setpageCurrent(1);
        setSize(-1);
        clearState();
      };
    }, [])
  );

  const renderFooter = () => {
    return loading ? (
      <View style={styles.loader}>
        <Spinner size="giant" />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    if (!loading) {
      setpageCurrent(pageCurrent + 1);
    }
  };

  return (
    <Layout>
      <LeadFilters
        page={pageCurrent}
        setPage={setpageCurrent}
        setCurrent={setCurrentSearch}
        id={user && user._id}
        current={currentSearch}
        query={query}
      />
      <Layout>
        <List
          style={styles.container}
          data={leads}
          renderItem={({ item }) => <LeadCard item={item} key={item._id} />}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={Divider}
          initialNumToRender={10}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          // onMomentumScrollBegin={() =>{
          //   setOnEndReachedCalledDuringMomentum(false)
          // }
          // }
        />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: "50%",
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
    marginTop: 20,
    marginBottom: 20,
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
