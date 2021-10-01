import React, { useEffect, useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import DashboardUser from "../../components/Dashboards/DashboardUser";
import DashboardAdmin from "../../components/Dashboards/DashboardAdmin";
import DashboardRockstar from "../../components/Dashboards/DashboardRockstar";
import { SafeAreaView } from "react-native";
import { Text, Layout } from "@ui-kitten/components";
import { CapitalizeNames } from "../../utils/Capitalize";
import { isAdmin, isRockstar, isSuper, isUser } from "../../utils/Authroles";

const Home = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: 30 }}>
      {user && user.tier && isUser(user.tier._id) ? (
        <DashboardUser />
      ) : user && user.tier && isAdmin(user.tier._id) ? (
        <DashboardAdmin />
      ) : user && user.tier && (isRockstar(user.tier._id) || isSuper(user.tier._id)) ? (
        <DashboardRockstar />
      ) : user ? (
        <Layout style={{ height: "100%" }}>
          <Text
            category="label"
            style={{ fontSize: 17, paddingTop: "50%", textAlign: "center" }}
          >
            El Rol "{user && user.tier && CapitalizeNames(user.tier.name)}" no ha sido añadido a la app
          </Text>
        </Layout>
      ) : (
        false
      )}
    </SafeAreaView>
  );
};

export default Home;
