import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Tab, TabView, Text } from "@ui-kitten/components";
import LeadsDetail from "./LeadsDetail";

const LeadTabs = ({ route }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { itemId } = route.params;
  return (
    <TabView
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      <Tab title="INFO" style={{ paddingVertical: 10 }}>
        <LeadsDetail itemId={itemId} />
      </Tab>
      <Tab title="TASK" style={{ paddingVertical: 10 }}>
        <Layout style={styles.tabContainer}>
          <Text category="h5">ORDERS</Text>
        </Layout>
      </Tab>
      <Tab title="HISTORY" style={{ paddingVertical: 10 }}>
        <Layout style={styles.tabContainer}>
          <Text category="h5">TRANSACTIONS</Text>
        </Layout>
      </Tab>
      <Tab title="RECORD" style={{ paddingVertical: 10 }}>
        <Layout style={styles.tabContainer}>
          <Text category="h5">RECORD</Text>
        </Layout>
      </Tab>
    </TabView>
  );
};

export default LeadTabs;

const styles = StyleSheet.create({
  tabContainer: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
});
