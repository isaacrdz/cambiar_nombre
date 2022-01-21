import React, { useState } from "react";
import LeadsList from "../../components/leads/LeadsList";
import LeadSearch from '../../components/leads/LeadSearch'
import useAuth from "../../hooks/useAuth";
import { SafeAreaView } from "react-native";

const Lead = ({ navigation }) => {

  const [params, setParams] = useState({
    page: 1,
    query: '',
    search: {
      title: "Todos",
      value: "all",
      type: "all",
    }
  })
  const { user } = useAuth()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <LeadSearch params={params} setParams={setParams}/>
      <LeadsList
        params={params}
        setParams={setParams}
        user={user}
      />
    </SafeAreaView>
  );
};

export default Lead;
