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
  React.useEffect(() => {
    if (data) console.log("top", data.length);
  }, [data]);
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
            style={styles.main}
          >
            <Layout
            style={styles.left}
            >
              <Layout style={styles.number}>
                <Text>
                {`   ${i + 1}`}
                </Text>
              </Layout>
             <Layout style={styles.info}>
             <Text category="s1" >
                 {CapitalizeNames(item.info.name)}
              </Text>
              <Text
                category="c1"
              >
                {`${item.make.slug} ${CapitalizeNames(item.store.name)}`}
              </Text>
             </Layout>
            </Layout>

            <Layout
            style={styles.rigth}
            >
              <Text
                category="c1"
                style={{
                  marginLeft: 40,
                }}
              >
                {`${item.sales} `} ventas
              </Text>
            </Layout>
          </Layout>

          <Divider />
        </Layout>
      ))}
    </Layout>
  );
};

const styles = StyleSheet.create({
  main:{
    flexDirection: "row",
              justifyContent:'space-between',
              alignItems:'center',
              marginBottom: 10,
              marginTop: 20,
              display: "flex",
              width: "100%",
              
  },
  number:{
  marginRight:10
  },
  info:{

  },
  left:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',

  },
  rigth:{
    display:'flex',
    textAlign:'right',
    marginRight: 20,
},
  marginleft: {
    marginLeft: 20,
  },
  marginRight: {
    marginRight: 20,
  },
});

export default TopList;
