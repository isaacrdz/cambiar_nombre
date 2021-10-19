import React from "react";
import { StyleSheet } from "react-native";
import { Icon, Input, Layout } from "@ui-kitten/components";

import useLead from "../../hooks/useLead";
import useAuth from "../../hooks/useAuth";
import { getMultiStoresIds } from "../../utils/storesUser";
import { Ionicons } from "@expo/vector-icons";
import { isAdmin, isGeneralManager, isRockstar, isSuper, isUser } from "../../utils/Authroles";

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

  const { getLeads, loading, clearState, getLeadsByStore, getLeadsRockstar } = useLead();
  const { user } = useAuth()

  const handleSubmit = async(e) => {
    setpageCurrent(1)
    await clearState();
    if(user && user.tier && isUser(user.tier._id)){
      await getLeads(1, user._id, currentSearch, query);
    }else if(user && user.tier && isAdmin(user.tier._id)){
      await getLeadsByStore(1, `&multiStores=${getMultiStoresIds(user.stores)}${user && user.carType && user.carType !== 'ambos' ? `&carType=${user.carType}` : ''}`, currentSearch, query);
    }else if (user && user.tier && (isSuper(user.tier._id) || isGeneralManager(user.tier._id))) {
      getLeadsByStore(
        pageCurrent,
        `&multiStores=${getMultiStoresIds(user.group.stores)}`,
        currentSearch,
        query
      );
    } else if (user && user.tier && isRockstar(user.tier._id)) {
      getLeadsRockstar(pageCurrent, currentSearch, query);
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
