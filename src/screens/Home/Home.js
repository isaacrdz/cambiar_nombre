import React from "react";
import useAuth from "../../hooks/useAuth";
import DashboardUser from "../../components/Dashboards/DashboardUser";
import DashboardAdmin from "../../components/Dashboards/DashboardAdmin";
import DashboardRockstar from "../../components/Dashboards/DashboardRockstar";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, Layout } from "@ui-kitten/components";
import { CapitalizeNames } from "../../utils/Capitalize";

const Home = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: 30 }}>
      {user && user.role === "user" ? (
        <DashboardUser />
      ) : user && user.role === "admin" ? (
        <DashboardAdmin />
      ) : user && (user.role === "rockstar" || user.role === "super admin") ? (
        <DashboardRockstar />
      ) : user ? (
        <Layout style={{ height: "100%" }}>
          <Text
            category="label"
            style={{ fontSize: 17, paddingTop: "50%", textAlign: "center" }}
          >
            El Rol "{CapitalizeNames(user.role)}" no ha sido añadido a la app
          </Text>
        </Layout>
      ) : (
        false
      )}
    </SafeAreaView>
  );
};

export default Home;
