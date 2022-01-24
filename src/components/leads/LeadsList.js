import React, { Fragment, useState } from "react";
import { StyleSheet, View } from "react-native";
import { List, Divider } from "@ui-kitten/components";
import { useFocusEffect } from "@react-navigation/native";
import { Spinner } from "@ui-kitten/components";

import useLead from "../../hooks/useLead";
import LeadFilters from "../LeadFilters";
import LeadCard from "./LeadCard";
import { getOptions } from "../../utils/getOptionsLeads";

const LeadsList = ({
  user, 
  params,
  setParams
}) => {
  const {
    getLeadsAR,
    leads,
    loading,
    clearState,
    leadsSize,
  } = useLead();

  useFocusEffect(
    React.useCallback(() => {
      getLeadsAR(getOptions({ user, page: params.page, search: params.search, query: params.query }));
    }, [params])
  );

  useFocusEffect(
    React.useCallback(() => {
      return () => {

        setParams({
          ...params,
          page: 1,
          limit: 10
        })
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

  const handleMomentun = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (200 || 0);

    if (Math.abs(dif) > 0) {
      if (!loading && leadsSize !== 0) {
        setParams({...params, page:  params.page + 1});
      } 
    }

  }

  return (
    <Fragment>
      <LeadFilters params={params} setParams={setParams}/>
        <List
          style={styles.container}
          data={leads}
          renderItem={({ item }) => <LeadCard item={item} key={item._id} />}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={Divider}
          initialNumToRender={1}
          ListFooterComponent={renderFooter}
          onMomentumScrollBegin={handleMomentun}
        />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
    height: '100%'
  },
  loader: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },
});

export default LeadsList;
