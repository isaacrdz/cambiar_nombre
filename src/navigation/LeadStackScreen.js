import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Lead from "../screens/Lead/Lead";
import LeadsDetail from "../components/leads/LeadTabs/LeadDetail/LeadsDetailInfo";
import LeadTabs from "../components/leads/LeadTabs/LeadTabs";

const LeadStack = createStackNavigator();

const LeadStackScreen = () => (
  <LeadStack.Navigator>
    <LeadStack.Screen name="Leads" component={Lead} />
    <LeadStack.Screen name="LeadDetail" component={LeadsDetail} />
    <LeadStack.Screen name="LeadTabs" component={LeadTabs} />
  </LeadStack.Navigator>
);

export default LeadStackScreen;
