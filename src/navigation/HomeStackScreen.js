import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home/Home";
import { Icon } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native";
import Settings from "../screens/Home/Settings";

const EditIcon = (props) => <Icon {...props} name="edit" />;

const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="DPX"
      component={Home}
      options={{
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
            <Icon
              style={{
                width: 25,
                height: 25,
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
    <HomeStack.Screen name="Settings" component={Settings} />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
