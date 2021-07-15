import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Input, Layout } from "@ui-kitten/components";

import useLead from "../../hooks/useLead";

const LeadSearch = ({
  query,
  setQuery,
  user,
  setpageCurrent,
  pageCurrent,
  currentSearch,
}) => {
  const renderInputIcon = (props) => <Icon {...props} name="search" />;

  const { getLeads, loading, clearState } = useLead();

  const handleSubmit = async(e) => {
    console.log('buscando desde leadSearch', currentSearch, query)
    setpageCurrent(1)
    await clearState();
    await getLeads(1, user._id, currentSearch, query);
  };

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
