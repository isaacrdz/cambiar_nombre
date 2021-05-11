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

import Ionicons from "@expo/vector-icons/Ionicons";

const PhoneIcon = (props) => <Icon {...props} name="phone" />;
const EmailIcon = (props) => <Icon {...props} name="mail" />;
const LeadDetailInfoTop = ({ item, loading }) => {
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
          {loading ? <ActivityIndicator size="large" /> : item.name}
        </Text>
      </Layout>
      <Layout style={styles.ContainerTop}>
        <Button
          style={styles.button}
          appearance="ghost"
          onPress={() =>
            Linking.openURL(`http://api.whatsapp.com/send?phone=${item.phone}`)
          }
        >
          <Ionicons name="logo-whatsapp" size={30} color="#4bd366" />
        </Button>
        <Button
          style={styles.button}
          appearance="ghost"
          onPress={() => Linking.openURL(`tel:${item.phone}`)}
        >
          <Ionicons name="phone-portrait-outline" size={30} color="#1299de" />
        </Button>
        <Button
          style={styles.button}
          appearance="ghost"
          onPress={() => Linking.openURL(`mailto: ${item.email}`)}
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
