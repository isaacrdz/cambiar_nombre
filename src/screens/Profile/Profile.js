import React from "react";
import { View, StyleSheet } from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";

import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user && <Text style={{ marginBottom: 10 }}> {user.name} </Text>}
      {user && <Text style={{ marginBottom: 10 }}> {user.phone} </Text>}
      {user && <Text style={{ marginBottom: 10 }}> {user.job} </Text>}
      {user && (
        <Text style={{ marginBottom: 10 }}>
          {user.store.make.name} {user.store.name}{" "}
        </Text>
      )}
      {user && <Text style={{ marginBottom: 10 }}> {user.role} </Text>}
    </Layout>
  );
};
const style = StyleSheet.create({});

export default Profile;
