import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import Toast from "react-native-toast-message";
import useAuth from "../../hooks/useAuth";

const Register = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { register, error, clearError } = useAuth();

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

  const onHandleSubmit = () => {
    if (password !== confirmPassword) {
      return Toast.show({
        text1: "Las contraseñas son diferentes",
        type: "error",
        position: "bottom",
      });
    }
    const data = {
      email,
      password,
      stores: ["60f5890cf852df12c8d10591"],
      store: "60f5890cf852df12c8d10591",
      role: "user",
      name,
    };

    register(data);
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
          placeholder="Nombre"
          onChangeText={(name) => setName(name)}
          autoCapitalize="none"
        />
      </Layout>
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
      <Layout style={{ paddingHorizontal: 30, marginBottom: 15 }}>
        <Input
          style={{ marginVertical: 2, width: "100%" }}
          size="large"
          placeholder="Confirmar Contraseña"
          secureTextEntry
          onChangeText={(password) => setConfirmPassword(password)}
          autoCapitalize="none"
        />
      </Layout>

      <Layout style={{ paddingHorizontal: 30, margin: 2 }}>
        <Button
          style={{ backgroundColor: "#5764b8", borderColor: "#5764b8" }}
          size="large"
          onPress={() => onHandleSubmit()}
        >
          Registrarse
        </Button>
      </Layout>
      <Layout style={{ paddingHorizontal: 30, margin: 2, marginTop: 40 }}>
        <Text
          category="p1"
          style={styles.select}
          onPress={() => navigation.navigate("Signin")}
        >
          Ya tengo cuenta
        </Text>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  select: {
    textAlign: "center",
  },
});

export default Register;
