import React from "react";
import { View, StyleSheet } from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";
import useAuth from "../../hooks/useAuth";

const Settings = () => {
  const { user, logout } = useAuth();


  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user && <Text style={{ marginBottom: 40 }}>Hola, {user.name} </Text>}

      <Button onPress={() => logout()}>Salir</Button>
    </Layout>
  );
};
const style = StyleSheet.create({});

export default Settings;
