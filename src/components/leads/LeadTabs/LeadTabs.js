import React, { useEffect, useState } from "react";

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
import LeadDetailHistory from "./LeadDetail/history/LeadDetailHistory";
import Records from "./LeadDetail/record/Records";
import useAuth from "../../../hooks/useAuth";

const LeadTabs = ({ route }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { item } = route.params;
  const { user } = useAuth();

  const { getLead, loading, clearState, lead, generateToken, callToken } =
    useLead();

  const [isTokenGenerated, setTokenGenerated] = useState(false);

  React.useEffect(() => {
    getLead(item._id);
  }, []);

  useEffect(() => {
    if (user && user._id && !isTokenGenerated && lead && lead.store) {
      setTokenGenerated(true);
      generateToken(lead);
    }
    //eslint-disable-next-line
  }, [lead]);
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
        <Tab title="TAREAS" style={{ paddingVertical: 10 }}>
          <LeadDetailTask tasks={lead.comments} />
        </Tab>
        <Tab title="HISTORIAL" style={{ paddingVertical: 10 }}>
          <LeadDetailHistory activities={lead.activities} />
        </Tab>
        {/* <Tab title="RECORD" style={{ paddingVertical: 10 }}>
          <Records />
        </Tab> */}
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
