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
import { CapitalizeNames } from "../../../utils/Capitalize";

const TopList = ({ data, title }) => {
  return (
    <Layout>
      <Text category="h5" style={{ textAlign: "center" }}>
        {title}
      </Text>
      <Divider style={{ marginTop: 10 }} />

      {data.map((item, i) => (
        <Layout
          key={i}
          style={{
            flexDirection: "row",

            alignItems: "center",
          }}
        >
          <Layout
            style={{
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            <Text category="s1" style={styles.marginleft}>
              {`${i + 1}. `} {CapitalizeNames(item.info[0].name)}
            </Text>
            <Text
              category="c1"
              style={{
                marginLeft: 40,
              }}
            >
              Chevrolet Las Torres
            </Text>
          </Layout>

          <Layout>
            <Text>10</Text>
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
