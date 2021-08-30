import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Layout,
  Text,
  CheckBox,
  IndexPath,
  Select,
  SelectItem,
  Button,
  Input,
  Spinner,
} from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import useLead from "../../hooks/useLead";
import useUser from "../../hooks/useUser";
import _ from "lodash";
import HeaderTitle from "../../components/header/HeaderTitle";
import useAuth from "../../hooks/useAuth";
import useNotification from "../../hooks/useNotification"
import { CapitalizeNames } from "../../utils/Capitalize";
import { getMultiStoresIds } from "../../utils/storesUser";

const AddAgent = ({ navigation }) => {
  const { agents, getAgents } = useUser();
  const { user } = useAuth();
  const { createNotification } = useNotification();
  const [agentes, setAgentes] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(new IndexPath(0));
  const displayValue = agentes[selectedAgent.row];
  const { selectedLeads, tab, assignAgents, error } = useLead();

  let paddingTop = 0;

  if (Platform.OS === "android") {
    paddingTop = 30;
  }

  useFocusEffect(
    React.useCallback(() => {
      if (user && user.stores) {
        getAgents(`&stores[in]=${getMultiStoresIds(user.stores)}`);
      }
    }, [user])
  );

  useEffect(() => {
    if (agents) {
      let aux = [];
      agents.map((item) => {
        aux.push(CapitalizeNames(item.name));
      });
      setAgentes(aux);
    }
    //eslint-disable-next-line
  }, [agents]);

  const handleAssingAgent = async() => {
    await assignAgents(selectedLeads, agents[selectedAgent.row]._id, tab);

    if(error){
      Toast.show({
          text1: error,
          type: "error",
          position: "bottom",
        });
    }else{
      Toast.show({
        text1: "Leads asignados con exito",
        type: "success",
        position: "bottom",
      });

      for(let i = 0; i < selectedLeads.length; i++){
        await createNotification({ to: agents[selectedAgent.row]._id, type: 'assign', client: selectedLeads[i], message: `${CapitalizeNames(user.name)} has assigned you a client`})
      }

      navigation.navigate('LeadMain')
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop }}>
      <HeaderTitle title="Asignar Agente" />
      <ScrollView>
        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Layout>
            <Layout
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              level="1"
            >
              <Text category="s1" style={{ marginBottom: 10 }}>
                Agente
              </Text>
              <Select
                size="large"
                style={{ marginBottom: 10 }}
                onSelect={(index) => setSelectedAgent(index)}
                value="Selecciona"
                value={displayValue}
              >
                {agentes.map((action, i) => (
                  <SelectItem title={action} key={i} />
                ))}
              </Select>
              <Button
                style={{ marginBottom: 20, marginTop: 20 }}
                onPress={handleAssingAgent}
              >
                Asignar Agente
              </Button>
            </Layout>
          </Layout>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    margin: 2,
  },
  button: {
    marginTop: 20,
  },
});

export default AddAgent;
