import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import {
  Button,
  Icon,
  Input,
  Layout,
  MenuItem,
  OverflowMenu,
  Select,
  SelectItem,
  Tooltip,
} from "@ui-kitten/components";

const LeadSearch = () => {
  const [value, setValue] = React.useState("");
  const renderInputIcon = (props) => <Icon {...props} name="search" />;

  return (
    <Layout style={styles.inputContainer} level="1">
      <Input
        style={styles.input}
        placeholder="Busqueda de Leads"
        value={value}
        onChangeText={setValue}
        accessoryRight={renderInputIcon}
      />
    </Layout>
  );
};

export default LeadSearch;
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    margin: 2,
  },
  button: {
    margin: 2,
  },
});
