import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import LeadsList from "../../components/leads/LeadsList";

import useAuth from "../../hooks/useAuth";
import LeadSearch from "../../components/leads/LeadSearch";

const Lead = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <>
      <LeadSearch />
      <LeadsList user={user} />
    </>
  );
};

export default Lead;
