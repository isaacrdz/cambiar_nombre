import React, { useState, useEffect } from "react";

import { StyleSheet, View, ActivityIndicator } from "react-native";

import moment from "moment";

import {
  Icon,
  List,
  ListItem,
  Layout,
  Divider,
  Text,
} from "@ui-kitten/components";

const Leads = ({ user }) => {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [pageCurrent, setpageCurrent] = useState(1);

  useEffect(() => {
    setisLoading(true);
    getData();

    return () => {};
  }, [pageCurrent]);

  const getData = async () => {
    const apiURL = `https://dealerproxapi.com/api/v1/leads?page=${pageCurrent}&limit=10&searchIndex=name-email-make-phone-agent-source-vehicle-store&searchText=&agent=${user._id}&searchType=or&validation=1`;
    fetch(apiURL)
      .then((res) => res.json())
      .then((resData) => resData.data)
      .then((resJson) => {
        setData(data.concat(resJson));
        setisLoading(false);
      });
  };

  const StarIcon = (props) => <Icon {...props} name="user" />;

  const renderItem = ({ item }) => {
    const createdAt = moment(item.createdAt).format("MMMM D, YYYY");
    return (
      <ListItem
        title={(evaProps) => (
          <Layout {...evaProps}>
            <Text appearance="hint" style={styles.ItemText}>
              {item.status.name}
            </Text>
            <Text style={styles.ItemTextName}>{item.name} </Text>

            <Text appearance="hint" style={styles.ItemText}>
              {createdAt}
            </Text>
          </Layout>
        )}
        accessoryLeft={StarIcon}
        accessoryRight={() => (
          <Layout style={styles.controlContainer}>
            <Text style={styles.ItemText}>{item.substatus.name}</Text>
          </Layout>
        )}
      />
    );
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const handleLoadMore = () => {
    setpageCurrent(pageCurrent + 1);
    setisLoading(true);
  };

  const filters = ["Nuevo", "Vendido", "Visita", "Cita", "Lead", "Asignado"];

  return (
    <Layout>
      <Layout style={{ marginTop: 20 }} level="4">
        <List
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(index) => index.toString()}
          data={filters}
          renderItem={({ item }) => (
            <Layout style={styles.controlContainerFilters}>
              <Text style={styles.ItemText}>{item}</Text>
            </Layout>
          )}
        />
      </Layout>
      <Layout>
        <List
          style={styles.container}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
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

export default Leads;
