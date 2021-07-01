import React, { useState } from "react";
import { StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import { List, Layout, Divider } from "@ui-kitten/components";
import { useFocusEffect } from '@react-navigation/native';

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

  React.useEffect(() => {
    console.log('esta buscando')

    getLeads(pageCurrent, user._id, currentSearch, query);
  }, [currentSearch, pageCurrent, search]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        console.log('saliendo del componente')
        clearState()
        setpageCurrent(1)
      }
    }, [])
  );

  const renderFooter = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    console.log('buscando: ', loading)
    if(!loading){
      setpageCurrent(pageCurrent + 1);
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
          initialNumToRender={10}
          // ListFooterComponent={renderFooter}
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
