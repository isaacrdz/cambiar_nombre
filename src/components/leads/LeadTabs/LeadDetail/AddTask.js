import React, { Fragment, useState } from "react";
import { Layout, Divider, Text, Button, Icon, Input, Select, IndexPath, SelectItem, CheckBox } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import _ from "lodash"

const AddTask = ({ navigation }) => {
  
  const data = [
    { title: "Whatsapp", value: "whatsapp", icon: <Ionicons name="logo-whatsapp" size={20} color="#4bd366" style={{padding: 1000}}/> }, 
    { title: "Documentation", value: "documentation", icon: <Ionicons name="mail-outline" size={20} color="#535de2" style={{padding: 1000}}/> },
    { title: "Call again", value: "recall", icon: <Ionicons name="phone-portrait-outline" size={20} color="#1299de" style={{padding: 1000}}/> }
  ];

  const [selectedActions, setSelectedActions] = useState([]);

  const handleSetAction = (item) => {
    if(selectedActions.includes(item)){
      let indexA = _.findIndex(selectedActions, function(o) { return o === item; });
      let aux = _.filter(selectedActions, (el, index) => { return index !== indexA; });
      setSelectedActions(aux)

    }else{
      setSelectedActions([...selectedActions, item])
    }
  }

  return (
    <Layout
      style={{
        flex: 1,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Layout style={{ alignItems: "center", marginBottom: 30 }}>
        <Text category="h1">Create Task</Text>
        <Text category="p1" style={{ textAlign: "center" }}>
          1. Choose an action
        </Text>
      </Layout>
      <Layout>
        {
          data.map((item, index) => 
            <Layout style={styles.selectItem}>
              <CheckBox
                key={index}
                checked={selectedActions.includes(item.value)}
                onChange={() => handleSetAction(item.value)}
                >
                <Text category="p2">
                  { item.title }{' '}
                </Text>
                  { item.icon }
              </CheckBox>
            </Layout>
          )
        }
      </Layout>

      <Button onPress={() => navigation.goBack()} title="Dismiss">
        Go Back
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  selectItem: {
    display: 'flex',
    flexDirection: "row",
    padding: 5
  }
});

export default AddTask;
