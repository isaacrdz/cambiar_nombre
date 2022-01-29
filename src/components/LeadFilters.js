import React, { useEffect, useState } from "react";
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
} from "../utils/Authroles";

const LeadFilters = ({ params, setParams }) => {
  const { clearState } = useLead();
  const { user } = useAuth()

  const [current, setCurrent] = useState({
    title: "Todos",
    value: "all",
    type: "all",
  })

  const [filters, setFilters] = useState([
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
  ])

  useEffect(()=>{
    if(user && user.tier && (isRockstar(user.tier._id) || isSuper(user.tier._id) || isAdmin(user.tier._id) || isGeneralManager(user.tier._id))){
      let aux = filters;

      aux.push({
        title: "Sin Asignar",
        value: "Unassigned",
        type: "unassigned",
      })

      setFilters(aux)
      
    }
  },[user])


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
                clearState()
                setCurrent(item)
                setParams({...params, search: item, page: 1})
              
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
