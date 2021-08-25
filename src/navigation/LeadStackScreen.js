import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";

import Lead from "../screens/Lead/Lead";
import LeadsDetail from "../components/leads/LeadTabs/LeadDetail/LeadsDetailInfo";
import LeadTabs from "../components/leads/LeadTabs/LeadTabs";
import { Icon } from "@ui-kitten/components";
import AddTask from "../components/leads/LeadTabs/LeadDetail/AddTask";
import AddAppointment from "../components/leads/LeadTabs/LeadDetail/AddAppointment";
import AddLead from "../components/leads/AddLead";
import AssignLead from "../components/leads/AssignLead";
import SendDocumentation from "../components/leads/documentation/SendDocumentation";
import Calling from "../components/leads/Calling";
import Ionicons from "@expo/vector-icons/Ionicons";
import useLead from '../hooks/useLead';

const LeadStack = createStackNavigator();
const LeadMainStack = createStackNavigator();

const LeadMainStackScreen = ({ navigation }) => {
  
  const { selectedLeads } = useLead()
  return (
    <LeadMainStack.Navigator>

      <LeadMainStack.Screen
        name="Leads"
        component={Lead}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => { navigation.navigate("AssignLead")}}
              disabled={selectedLeads.length < 1}
            >
              <Ionicons
                name="person-add-outline"
                size={25}
                style={{
                  width: 25,
                  height: 25,
                  marginLeft: 20,
                  color: selectedLeads.length === 0 ? "#bbb" : "#5764b8",
                }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("AddLead")}>
              <Ionicons
                name="add-circle-outline"
                size={25}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 20,
                  color: "#5764b8",
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <LeadMainStack.Screen
        name="LeadDetail"
        component={LeadsDetail}
      />

      <LeadMainStack.Screen
        name="LeadTabs"
        component={LeadTabs}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("AddTask")}>
              <Icon
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 20,
                  color: "#5764b8",
                }}
                fill="#5e72e4"
                name="plus-circle"
              />
            </TouchableOpacity>
          ),
        }}
      />
    </LeadMainStack.Navigator>
  );
};
const LeadStackScreen = () => (
  <LeadStack.Navigator mode="modal" headerMode="none">
    <LeadStack.Screen name="LeadMain" component={LeadMainStackScreen} />
    <LeadStack.Screen name="AddTask" component={AddTask} />
    <LeadStack.Screen name="AddAppointment" component={AddAppointment} />
    <LeadStack.Screen name="AddLead" component={AddLead} />
    <LeadStack.Screen name="AssignLead" component={AssignLead} />
    <LeadStack.Screen name="Calling" component={Calling} />
    <LeadStack.Screen name="SendDocumentation" component={SendDocumentation} />
  </LeadStack.Navigator>
);

export default LeadStackScreen;
