import React from "react";
import {
  Layout,
  Text,
  Divider,
  Icon,
  List,
  ListItem,
  Button,
} from "@ui-kitten/components";
import { StyleSheet, ScrollView } from "react-native";

const TopList = ({ data, title }) => {
  return (
    <Layout>
      <Text category="h5" style={{ textAlign: "center" }}>
        {title}
      </Text>
      <Divider style={{ marginTop: 10 }} />

      {data.map((user, i) => (
        <Layout key={i}>
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <Text category="s1" style={styles.marginleft}>
              {`${i + 1}. `} {user.name}
            </Text>
            <Text category="p1" style={styles.marginRight}>
              {`${user.results} `}
            </Text>
          </Layout>
          <Divider />
        </Layout>
      ))}
    </Layout>
  );
};

const styles = StyleSheet.create({
  marginleft: {
    marginLeft: 20,
  },
  marginRight: {
    marginRight: 20,
  },
});

export default TopList;
