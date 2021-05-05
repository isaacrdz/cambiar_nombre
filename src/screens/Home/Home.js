import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";
// import I18n from 'react-native-i18n'

import useAuth from "../../hooks/useAuth";

const Home = ({ navigation }) => {
  const { user, logout } = useAuth();

  React.useEffect(() => {
    // I18n.initAsync();
  }, []);

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ marginBottom: 40 }}>Home </Text>
    </Layout>
  );
};

const style = StyleSheet.create({});

export default Home;
