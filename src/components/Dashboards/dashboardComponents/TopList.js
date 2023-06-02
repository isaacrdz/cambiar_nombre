import React from "react";
import { Layout, Text, Divider } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { CapitalizeNames } from "../../../utils/Capitalize";

const TopList = ({ data, title }) => {
  return (
    <Layout>
      <Text category="h5" style={{ textAlign: "center" }}>
        {title}
      </Text>
      <Divider style={{ marginTop: 10 }} />

      {data.length >= 1 ? (
        data.map((item, i) => (
          <Layout
            key={i}
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Layout
              style={{
                padding: 10,
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Layout
                style={{
                  width: "10%",
                  display: "flex",
                  alignSelf: "center",
                  flexDirection: "row",
                }}
              >
                <Text category={"s1"}>{`${i + 1}`}</Text>
              </Layout>

              <Layout style={{ width: "70%", padding: 10 }}>
                <Text category="s1">{CapitalizeNames(item.info.name)}</Text>
                <Text category="c1">
                  {`${item.make.slug} ${CapitalizeNames(item.store.name)}`}
                </Text>
              </Layout>

              <Layout
                style={{
                  width: "20%",
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <Text category="c2">{`${item.sales} `} ventas</Text>
              </Layout>
            </Layout>

            <Divider />
          </Layout>
        ))
      ) : (
        <Layout style={styles.noSales}>
          <Text category="h6" style={{ textAlign: "center" }}>
            sin ventas
          </Text>
        </Layout>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 20,
    display: "flex",
    borderWidth: 1,
  },
  noSales: {
    margin: 15,
  },
  number: {
    marginRight: 10,
  },
  marginleft: {
    marginLeft: 20,
  },
  marginRight: {
    marginRight: 20,
  },
});

export default TopList;
