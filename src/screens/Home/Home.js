import React from "react";
import useAuth from "../../hooks/useAuth";
import DashboardUser from "../../components/Dashboards/DashboardUser";
import DashboardAdmin from "../../components/Dashboards/DashboardAdmin";
import DashboardRockstar from "../../components/Dashboards/DashboardRockstar";
import { SafeAreaView } from "react-native";
import { Text, Layout } from "@ui-kitten/components";
import { CapitalizeNames } from "../../utils/Capitalize";
import {
  isAdmin,
  isGeneralManager,
  isRockstar,
  isSalesManager,
  isSuper,
  isUser,
} from "../../utils/Authroles";
import * as Updates from "expo-updates";

const Home = () => {
  // updates on the fly
  React.useEffect(() => {
    reactToUpdates();
  }, []);

  const reactToUpdates = async () => {
    Updates.addListener((event) => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        Updates.reloadAsync();
      }
    });
  };

  const NoRole = (
    <Layout style={{ height: "100%" }}>
      <Text
        category="label"
        style={{ fontSize: 17, paddingTop: "50%", textAlign: "center" }}
      >
        El Rol "{user && user.tier && CapitalizeNames(user.tier.name)}" no ha
        sido añadido a la app
      </Text>
    </Layout>
  );

  const { user } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: 30 }}>
      {user && user.tier && isUser(user.tier._id) && <DashboardUser />}
      {user &&
        user.tier &&
        (isGeneralManager(user.tier._id) ||
          isAdmin(user.tier._id) ||
          isSalesManager(user.tier._id)) && <DashboardAdmin />}
      {user &&
        user.tier &&
        (isRockstar(user.tier._id) || isSuper(user.tier._id)) && (
          <DashboardRockstar />
        )}
      {user &&
        user.tier &&
        !isUser(user.tier._id) &&
        !isGeneralManager(user.tier._id) &&
        !isSalesManager(user.tier._id) &&
        !isAdmin(user.tier._id) &&
        !isRockstar(user.tier._id) &&
        !isSuper(user.tier._id) &&
        NoRole}
      {!user ||
        (!user._id && (
          <Layout style={{ height: "100%" }}>
            <Text
              category="label"
              style={{ fontSize: 17, paddingTop: "50%", textAlign: "center" }}
            >
              Sesión expirada, por favor ingrese de nuevo a su cuenta
            </Text>
          </Layout>
        ))}
    </SafeAreaView>
  );
};

export default Home;
