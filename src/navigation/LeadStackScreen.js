import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";

import Lead from "../screens/Lead/Lead";
import LeadsDetail from "../components/leads/LeadTabs/LeadDetail/LeadsDetailInfo";
import LeadTabs from "../components/leads/LeadTabs/LeadTabs";
import { Icon } from "@ui-kitten/components";

const EditIcon = (props) => <Icon {...props} name="edit" />;

const LeadStack = createStackNavigator();

const LeadStackScreen = () => (
  <LeadStack.Navigator>
    <LeadStack.Screen
      name="Leads"
      component={Lead}
      options={{
        headerRight: () => (
          <TouchableOpacity onPress={() => console.log("Open drawer")}>
            <Icon
              style={{
                width: 20,
                height: 20,
                marginRight: 20,
                color: "#5764b8",
              }}
              fill="#5e72e4"
              name="settings"
            />
          </TouchableOpacity>
        ),
      }}
    />
    <LeadStack.Screen name="LeadDetail" component={LeadsDetail} />
    <LeadStack.Screen name="LeadTabs" component={LeadTabs} />
  </LeadStack.Navigator>
);

export default LeadStackScreen;
