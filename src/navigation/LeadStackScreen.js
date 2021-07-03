import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";

import Lead from "../screens/Lead/Lead";
import LeadsDetail from "../components/leads/LeadTabs/LeadDetail/LeadsDetailInfo";
import LeadTabs from "../components/leads/LeadTabs/LeadTabs";
import { Icon } from "@ui-kitten/components";
import AddTask from "../components/leads/LeadTabs/LeadDetail/AddTask";

const LeadStack = createStackNavigator();
const LeadMainStack = createStackNavigator();

const LeadMainStackScreen = ({ navigation }) => {
  return (
    <LeadMainStack.Navigator>
      <LeadMainStack.Screen
        name="Leads"
        component={Lead}
        // options={{
        //   headerRight: () => (
        //     <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        //       <Icon
        //         style={{
        //           width: 25,
        //           height: 25,
        //           marginRight: 20,
        //           color: "#5764b8",
        //         }}
        //         fill="#5e72e4"
        //         name="settings"
        //       />
        //     </TouchableOpacity>
        //   ),
        // }}
      />
      <LeadMainStack.Screen
        name="LeadDetail"
        component={LeadsDetail}
        // options={{
        //   headerRight: () => (
        //     <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        //       <Icon
        //         style={{
        //           width: 25,
        //           height: 25,
        //           marginRight: 20,
        //           color: "#5764b8",
        //         }}
        //         fill="#5e72e4"
        //         name="settings"
        //       />
        //     </TouchableOpacity>
        //   ),
        // }}
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
  </LeadStack.Navigator>
);

export default LeadStackScreen;
