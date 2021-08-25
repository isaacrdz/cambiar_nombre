import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Input, Layout } from "@ui-kitten/components";

import useLead from "../../hooks/useLead";
import useAuth from "../../hooks/useAuth";
import { getMultiStoresIds } from "../../utils/storesUser";
import { Ionicons } from "@expo/vector-icons";

const LeadSearch = ({
  query,
  setQuery,
  setpageCurrent,
  pageCurrent,
  currentSearch,
}) => {
  const renderInputIcon = (props) => 
  <Ionicons
    name="search-outline"
    size={20}
    style={{color: "#5764b8" }}
  />;

  const { getLeads, loading, clearState, getLeadsByStore } = useLead();
  const { user } = useAuth()

  const handleSubmit = async(e) => {
    setpageCurrent(1)
    await clearState();
    if(user && user.role === 'user'){
      await getLeads(1, user._id, currentSearch, query);
    }else if(user && user.role === 'admin'){
      await getLeadsByStore(1, `&multiStores=${getMultiStoresIds(user.stores)}`, currentSearch, query);
    }
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
