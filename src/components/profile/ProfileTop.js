import React, { useState } from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { Layout, Text, Avatar, Button, Divider } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import ModalDelete from "../ModalDelete";
import useAuth from "../../hooks/useAuth";
import { CapitalizeNames } from "../../utils/Capitalize";
import { isRockstar, isSuper } from "../../utils/Authroles";

const ProfileTop = ({ navigation }) => {
  const { user, logout } = useAuth();

  let imageProfile;

  if (user && user.image) {
    imageProfile = `https://automotive-api.s3.us-east-2.amazonaws.com/${user.image}`;
  } else {
    imageProfile = "https://liberate.gg/wp-content/uploads/blankAvatar.jpg";
  }

  const [isVisible, setVisible] = useState(false);
  const Top = () => {
    return (
      <Layout style={{ padding: 15 }}>
        <Layout
          style={{
            marginRight: 15,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            style={{ width: 90, height: 90, marginRight: 15 }}
            source={{
              uri: imageProfile,
            }}
          />
          <Layout>
            <Text
              style={{
                textTransform: "capitalize",
                fontSize: 19,
                fontWeight: "bold",
                marginBottom: 5,
              }}
            >
              {user && user.name}
            </Text>
            <Text appearance="hint" style={{ textTransform: "capitalize" }}>
              {user && user.job}
            </Text>
          </Layout>
        </Layout>
      </Layout>
    );
  };

  const Middle = () => (
    <Layout
      flix={1}
      style={{
        paddingHorizontal: 40,
      }}
    >
      <Text style={{ marginBottom: 25, fontSize: 19, fontWeight: "bold" }}>
        Detalles del Contacto
      </Text>
      <Layout style={{ marginBottom: 10 }}>
        <Text style={{ fontWeight: "600", marginBottom: 5 }}>Correo</Text>
        <Text appearance="hint" style={{ marginBottom: 10 }}>
          {user && user.email}
        </Text>
      </Layout>
      <Divider style={{ marginBottom: 25 }} />
      <Layout style={{ marginBottom: 10 }}>
        <Text style={{ fontWeight: "600", marginBottom: 5 }}>Teléfono</Text>
        <Text appearance="hint" style={{ marginBottom: 10 }}>
          {user && user.phone}
        </Text>
      </Layout>

      <Divider style={{ marginBottom: 25 }} />
      <Layout style={{ marginBottom: 10 }}>
        <Text style={{ fontWeight: "600", marginBottom: 5 }}>Agencia</Text>
        <Text
          appearance="hint"
          style={{ marginBottom: 10, textTransform: "capitalize" }}
        >
          {user &&
          user.tier &&
          (isRockstar(user.tier._id) || isSuper(user.tier._id))
            ? "Global"
            : user && user.stores && user.stores.length > 1
            ? "Multiagencia"
            : user &&
              user.stores &&
              CapitalizeNames(user.stores[0].make.name) +
                " " +
                CapitalizeNames(user.stores[0].name)}
        </Text>
      </Layout>
      <Divider style={{ marginBottom: 25 }} />

      <Layout style={{ marginBottom: 10 }}>
        <Text style={{ fontWeight: "600", marginBottom: 5 }}>Rol</Text>
        <Text
          appearance="hint"
          style={{ marginBottom: 10, textTransform: "capitalize" }}
        >
          {user && user.tier && CapitalizeNames(user.tier.name)}
        </Text>
      </Layout>
      <ModalDelete isVisible={isVisible} setVisible={setVisible} />
      <Button
        appearance="ghost"
        style={{ marginBottom: 20 }}
        onPress={() => setVisible(true)}
        status="danger"
      >
        Desactivar Cuenta
      </Button>
      <Divider style={{ marginBottom: 25 }} />
      <Text style={{ fontWeight: "600", marginBottom: 5, textAlign: "center" }}>
        Code with <Ionicons name="heart" size={15} color="#f50357" /> by a
        human.
      </Text>
      <Text style={{ marginBottom: 5, textAlign: "center" }}>
        Ellyonsoft, Inc.
      </Text>
      <Text style={{ marginBottom: 5, textAlign: "center" }}>
        Version 2.0.0.0
      </Text>
    </Layout>
  );

  const Bottom = () => (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Layout
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingHorizontal: 40,
        }}
      >
        <Button
          appearance="ghost"
          style={{ marginBottom: 20 }}
          onPress={() => logout()}
        >
          Salir
        </Button>
      </Layout>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar barStyle="dark-content" />
      {Top()}
      <Divider style={{ marginBottom: 40 }} />
      {Middle()}
      {Bottom()}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    margin: 8,
  },
});

export default ProfileTop;
