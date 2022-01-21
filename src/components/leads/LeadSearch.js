import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Input, Layout } from "@ui-kitten/components";

import useLead from "../../hooks/useLead";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const LeadSearch = ({
  params,
  setParams
}) => {
  const renderInputIcon = (props) => 
  <Ionicons
    name="search-outline"
    size={20}
    style={{color: "#5764b8" }}
  />;

  const [query, setQuery] = useState('')
  const { clearState } = useLead();

  const handleSubmit = async(e) => {
    clearState()
    setParams({ ...params, page: 1, query})
  };

  //delete here
  useFocusEffect(
    React.useCallback(() => {
      return () => setQuery('');
    }, [])
  );


  return (
    <Layout style={styles.inputContainer} level="1">
      <Input
        onSubmitEditing={handleSubmit}
        style={styles.input}
        placeholder="Búsqueda de Leads"
        value={query}
        onChangeText={setQuery}
        accessoryRight={renderInputIcon}
        autoCorrect={false}
        autoCapitalize="none"
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
