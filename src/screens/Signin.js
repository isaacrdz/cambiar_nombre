import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Layout, Text, Input, Button, Spinner } from "@ui-kitten/components";
import Toast from "react-native-toast-message";

import useAuth from "../hooks/useAuth";

const Signin = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { login, error, clearError, loading } = useAuth();

  useEffect(() => {
    if (error) {
      Toast.show({
        text1: error,
        type: "error",
        position: "bottom",
      });

      setTimeout(() => clearError(), 2000);
    }
  }, [error]);
  const onHandleSubmit = async () => {
    const data = {
      email,
      password,
    };
    await login(data);
  };

  return (
    <Layout style={{ flex: 1, justifyContent: "center" }}>
      <Layout style={{ alignItems: "center", marginBottom: 30 }}>
        <Text category="h1">DealerProX</Text>
        <Text category="p2" style={{ textAlign: "center" }}>
          A Business Intelligence + CRM Automotive Plattform with Conversations
        </Text>
      </Layout>
      {loading ? (
        <Layout
          style={{
            paddingHorizontal: 30,
            marginBottom: 15,
            alignSelf: "center",
          }}
        >
          <Spinner size="giant" />
        </Layout>
      ) : (
        <>
          <Layout style={{ paddingHorizontal: 30, marginBottom: 15 }}>
            <Input
              style={{ marginVertical: 2, width: "100%" }}
              size="large"
              placeholder="Correo"
              onChangeText={(email) => setEmail(email)}
              autoCapitalize="none"
            />
          </Layout>
          <Layout style={{ paddingHorizontal: 30, marginBottom: 15 }}>
            <Input
              style={{ marginVertical: 2, width: "100%" }}
              size="large"
              placeholder="Contraseña"
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
              Ingresar
            </Button>
          </Layout>
          <Layout style={{ paddingHorizontal: 30, margin: 2, marginTop: 40 }}>
            <Text
              category="p1"
              style={{ textAlign: "center" }}
              onPress={() => navigation.navigate("Register")}
            >
              ¿No tienes cuenta? Registrate!
            </Text>
          </Layout>
        </>
      )}
    </Layout>
  );
};

const style = StyleSheet.create({});

export default Signin;
