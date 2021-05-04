import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Layout, Text, Input, Button, Divider } from "@ui-kitten/components";

const data = new Array(20).fill({
  title: "Item",
  description: "Description for Item",
});

const numColumns = 1;
import useAuth from "../hooks/useAuth";

const Home = ({ navigation }) => {
  const { user, logout } = useAuth();
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user && <Text style={{ marginBottom: 40 }}>Hello, {user.name} </Text>}

      <Button onPress={() => logout()}>LOGOUT</Button>
    </Layout>
  );
};

const style = StyleSheet.create({});

export default Home;
