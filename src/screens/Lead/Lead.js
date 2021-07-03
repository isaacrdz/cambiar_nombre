import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import LeadsList from "../../components/leads/LeadsList";

import useAuth from "../../hooks/useAuth";
import LeadSearch from "../../components/leads/LeadSearch";
import Header from "../../components/header/Header";
import { useFocusEffect } from '@react-navigation/native';

const Lead = ({ navigation }) => {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [pageCurrent, setpageCurrent] = useState(1);
  const [currentSearch, setCurrentSearch] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      setQuery('')
     setCurrentSearch({
      title: "All",
      value: "all",
      type: "all",
    })
    }, [])
  );

  return (
    <>
      <LeadSearch
        user={user}
        setQuery={setQuery}
        query={query}
        pageCurrent={pageCurrent}
        setpageCurrent={setpageCurrent}
        currentSearch={currentSearch}
      />

      <LeadsList
        user={user}
        query={query}
        pageCurrent={pageCurrent}
        setpageCurrent={setpageCurrent}
        currentSearch={currentSearch}
        setCurrentSearch={setCurrentSearch}
      />
    </>
  );
};

export default Lead;
