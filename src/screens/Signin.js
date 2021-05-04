import React from "react";
import { View, StyleSheet } from "react-native";
import { Layout, Text, Input, Button } from "@ui-kitten/components";

import useAuth from "../hooks/useAuth";

const Signin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { login } = useAuth();

  const onHandleSubmit = () => {
    const data = {
      email,
      password,
    };
    login(data);
  };

  return (
    <Layout style={{ flex: 1, justifyContent: "center" }}>
      <Layout style={{ alignItems: "center", marginBottom: 30 }}>
        <Text category="h1">DealerProX</Text>
        <Text category="p2" style={{ textAlign: "center" }}>
          A Business Intelligence + CRM Automotive Plattform with Conversations
        </Text>
      </Layout>
      <Layout style={{ paddingHorizontal: 30, marginBottom: 15 }}>
        <Input
          style={{ marginVertical: 2, width: "100%" }}
          size="large"
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
        />
      </Layout>
      <Layout style={{ paddingHorizontal: 30, marginBottom: 15 }}>
        <Input
          style={{ marginVertical: 2, width: "100%" }}
          size="large"
          placeholder="Pasword"
          secureTextEntry
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
        />
      </Layout>
      <Layout style={{ paddingHorizontal: 30, margin: 2 }}>
        <Button
          style={{ backgroundColor: "#5764b8", borderColor: "#5764b8" }}
          size="large"
          onPress={() => onHandleSubmit()}
        >
          LOGIN
        </Button>
      </Layout>
    </Layout>
  );
};

const style = StyleSheet.create({});

export default Signin;
