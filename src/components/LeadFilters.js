import React from "react";
import { StyleSheet } from "react-native";
import useLead from "../hooks/useLead";
import useAuth from "../hooks/useAuth";

import { List, ListItem, Layout, Text } from "@ui-kitten/components";
import { getMultiStoresIds } from "../utils/storesUser";
import {
  isAdmin,
  isGeneralManager,
  isRockstar,
  isSuper,
  isUser,
} from "../utils/Authroles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const filters = [
  {
    title: "Todos",
    value: "all",
    type: "all",
  },

  {
    title: "Lead",
    value: "605bd4e80a4330245535db3c",
    type: "status",
  },

  {
    title: "Cita",
    value: "604f80222b372e0cb11966dc",
    type: "status",
  },

  {
    title: "Visita",
    value: "6064f8065b21e51052eed547",
    type: "status",
  },

  {
    title: "Vendido",
    value: "5d7a514b5dac12c7449ce043",
    type: "status",
  },
  {
    title: "Sin Asignar",
    value: "Unassigned",
    type: "unassigned",
  },
];

const LeadFilters = ({ current, setCurrent, setPage, query }) => {
  const { clearState, getLeads, getLeadsByStore, getLeadsRockstar, setTab } =
    useLead();
  const { user } = useAuth();

  const handleSearch = async (item) => {
    await clearState();
    if (user && user.tier && isUser(user.tier._id)) {
      await getLeads(1, user._id, item, query);
    } else if (user && user.tier && isAdmin(user.tier._id)) {
      await getLeadsByStore(
        1,
        `&multiStores=${getMultiStoresIds(user.stores)}${
          user && user.carType && user.carType !== "ambos"
            ? `&carType=${user.carType}`
            : ""
        }`,
        item,
        query
      );
    } else if (
      user &&
      user.tier &&
      (isSuper(user.tier._id) || isGeneralManager(user.tier._id))
    ) {
      getLeadsByStore(
        1,
        `&multiStores=${getMultiStoresIds(user.group.stores)}`,
        item,
        query
      );
    } else if (user && user.tier && isRockstar(user.tier._id)) {
      getLeadsRockstar(1, item, query);
    }
  };

  return (
    <Layout style={{ marginTop: 20 }} level="4">
      <List
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item) => item.value}
        data={filters}
        renderItem={({ item }) => (
          <ListItem
            title={(evaProps) => (
              <Layout
                style={
                  item.value === current.value
                    ? styles.controlContainerFiltersActive
                    : styles.controlContainerFilters
                }
              >
                <Text
                  style={styles.ItemText}
                  style={{
                    color: item.value === current.value ? "white" : "#5764b8",
                  }}
                >
                  {item.title}
                </Text>
              </Layout>
            )}
            onPress={() => {
              if (item !== current) {
                setTab(`${item.type}.${item.value}`);
                setCurrent(item);
                setPage(1);
                handleSearch(item);
              }
            }}
          />
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
    // marginRight: 10,
    // marginLeft: 10,
    padding: 5,
    minWidth: 100,
    alignItems: "center",
  },
  controlContainerFiltersActive: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#5764b8",
    backgroundColor: "#5764b8",
    padding: 5,
    minWidth: 100,
    alignItems: "center",
  },
});

export default LeadFilters;
