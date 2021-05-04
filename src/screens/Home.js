import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";
// import I18n from 'react-native-i18n'

const data = new Array(20).fill({
  title: "Item",
  description: "Description for Item",
});



import useAuth from "../hooks/useAuth";

const Home = ({ navigation }) => {
  const { user, logout } = useAuth();

  React.useEffect(()=>{
    // I18n.initAsync();
  },[])

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user && <Text style={{ marginBottom: 40 }}>Hello, {user.name} </Text>}

      <Button onPress={() => logout()}>LOGOUT</Button>
    </Layout>
  );
};

const style = StyleSheet.create({});

export default Home;
