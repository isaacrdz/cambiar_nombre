import React from "react";
import { StyleSheet, Linking, ActivityIndicator } from "react-native";
import {
  Layout,
  Tab,
  TabView,
  Text,
  Button,
  Icon,
} from "@ui-kitten/components";

import useActivity from "../../../../hooks/useActivity";
import useAuth from "../../../../hooks/useAuth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CapitalizeNames } from "../../../../utils/Capitalize";

const PhoneIcon = (props) => <Icon {...props} name="phone" />;
const EmailIcon = (props) => <Icon {...props} name="mail" />;

const LeadDetailInfoTop = ({ item, loading }) => {
  const { createActivity } = useActivity();
  const { user } = useAuth();

  return (
    <>
      <Layout style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          category="s1"
          style={{
            fontSize: 25,
            marginTop: 25,
            marginBottom: 5,
            textTransform: "capitalize",
            textAlign: "center",
          }}
        >
          {item.name}
        </Text>
      </Layout>
      <Layout style={styles.ContainerTop}>
        <Button
          style={styles.button}
          appearance="ghost"
          onPress={() => {
            console.log({
              action: "wsp",
              description: `${CapitalizeNames(
                user.name
              )} has sent a whatsapp from mobile App`,
              lead: item._id,
            });
            createActivity({
              action: "wsp",
              description: `${CapitalizeNames(
                user.name
              )} has sent a whatsapp from mobile App`,
              lead: item._id,
            });
            Linking.openURL(`http://api.whatsapp.com/send?phone=${item.phone}`);
          }}
        >
          <Ionicons name="logo-whatsapp" size={30} color="#4bd366" />
        </Button>
        <Button
          style={styles.button}
          appearance="ghost"
          onPress={() => {
            console.log({
              action: "call",
              description: `${CapitalizeNames(
                user.name
              )} has made a phone call to ${CapitalizeNames(
                item.name
              )} from mobile App`,
              lead: item._id,
            });
            createActivity({
              action: "call",
              description: `${CapitalizeNames(
                user.name
              )} has made a phone call to ${CapitalizeNames(
                item.name
              )} from mobile App`,
              lead: item._id,
            });
            Linking.openURL(`tel:${item.phone}`);
          }}
        >
          <Ionicons name="phone-portrait-outline" size={30} color="#1299de" />
        </Button>
        <Button
          style={styles.button}
          appearance="ghost"
          onPress={() => {
            console.log({
              action: "mailing",
              description: `${CapitalizeNames(
                user.name
              )} has sent an email from mobile App`,
              lead: item._id,
            });
            createActivity({
              action: "mailing",
              description: `${CapitalizeNames(
                user.name
              )} has sent an email from mobile App`,
              lead: item._id,
            });
            Linking.openURL(`mailto: ${item.email}`);
          }}
        >
          <Ionicons name="mail-outline" size={30} color="#535de2" />
        </Button>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },

  ContainerTop: {
    justifyContent: "center",
    flexDirection: "row",

    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default LeadDetailInfoTop;
