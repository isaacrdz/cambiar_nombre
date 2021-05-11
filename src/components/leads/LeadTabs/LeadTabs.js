import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import {
  Layout,
  Tab,
  TabView,
  Text,
  Button,
  Icon,
} from "@ui-kitten/components";

import LeadsDetailInfo from "./LeadDetail/LeadsDetailInfo";
import LeadDetailInfoTop from "./LeadDetail/LeadDetailInfoTop";
import LeadDetailTask from "./LeadDetail/LeadDetailTask";
import useLead from "../../../hooks/useLead";

const LeadTabs = ({ route }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { item } = route.params;

  const { getLead, loading, clearState, lead } = useLead();

  React.useEffect(() => {
    getLead(item._id);
  }, []);
  return (
    <>
      <LeadDetailInfoTop item={lead} loading={loading} />

      <TabView
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        indicatorStyle={{ backgroundColor: "#5e72e4" }}
      >
        <Tab title="INFO" style={{ paddingVertical: 10 }}>
          <LeadsDetailInfo itemId={lead._id} />
        </Tab>
        <Tab title="TASK" style={{ paddingVertical: 10 }}>
          <LeadDetailTask tasks={lead.comments} />
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
export default LeadTabs;
