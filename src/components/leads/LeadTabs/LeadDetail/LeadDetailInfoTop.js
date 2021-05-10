import React from "react";
import { StyleSheet } from "react-native";
import {
  Layout,
  Tab,
  TabView,
  Text,
  Button,
  Icon,
} from "@ui-kitten/components";

const PhoneIcon = (props) => <Icon {...props} name="phone" />;
const EmailIcon = (props) => <Icon {...props} name="mail" />;
const LeadDetailInfoTop = ({ item }) => {
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
          }}
        >
          {item.name}
        </Text>
      </Layout>
      <Layout style={styles.ContainerTop}>
        <Button
          style={styles.button}
          appearance="ghost"
          accessoryLeft={PhoneIcon}
        />
        <Button
          style={styles.button}
          appearance="ghost"
          accessoryLeft={EmailIcon}
        />
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
