import React from "react";
import { Layout, Divider, Text, Button, Icon } from "@ui-kitten/components";

const AddTask = ({ navigation }) => {
  return (
    <Layout
      style={{
        flex: 1,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Text>AddTask</Text>

      <Button onPress={() => navigation.goBack()} title="Dismiss">
        Go Back
      </Button>
    </Layout>
  );
};

export default AddTask;
