import React from "react";

import { StyleSheet, TouchableOpacity } from "react-native";
import { Layout, Divider, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

const HeaderTitle = ({ title }) => {
  const navigation = useNavigation();

  return (
    <Layout
      style={{
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text style={styles.text} category="h3">
        {title}
      </Text>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text category="h2">x</Text>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  text: {
    margin: 2,
  },
});

export default HeaderTitle;
