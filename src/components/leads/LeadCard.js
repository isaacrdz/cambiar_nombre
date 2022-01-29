import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import moment from "moment/min/moment-with-locales";
import { Icon, ListItem, Layout, Text } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";

import {
  translateStatus,
  translateSubstatus,
} from "../../utils/tranlsateSubstatus";
import { useNavigation } from "@react-navigation/native";
import { setSubstatusColor } from "../../utils/colorsSubstatus";
import { CheckBox } from "@ui-kitten/components";
import useLead from "../../hooks/useLead";
import { CapitalizeNames } from "../../utils/Capitalize";
import useAuth from "../../hooks/useAuth";
import { isUser } from "../../utils/Authroles";

const LeadCard = ({ item }) => {
  moment.locale("es-mx");
  const navigation = useNavigation();
  const {
    setSelectedLeads,
    setSelectedStores,
    setSelectedCarTypes,
    selectedLeads,
    selectedStores,
    selectedCarTypes,
    checkBox,
    x,
  } = useLead();
  const [selected, setSelected] = useState([]);
  const [stores, setStores] = useState([]);
  const [carTypes, setCarTypes] = useState([]);
  const { user } = useAuth();

  const handleSelectedLeads = (leadId, add, store, carType) => {
    if (add) {
      let aux = selectedLeads;
      aux.push(leadId);
      setSelected(aux);

      let aux2 = selectedStores;
      aux2.push(store);
      setStores(aux2);

      let aux3 = selectedCarTypes;
      aux3.push(carType);
      setCarTypes(aux3);
    } else {
      let aux = selectedLeads;
      aux = aux.filter((id) => id !== leadId);
      setSelected(aux);

      let aux2 = selectedStores;
      aux2 = aux2.filter((id) => id !== store);
      setStores(aux2);

      let aux3 = selectedCarTypes;
      aux3 = aux3.filter((id) => id !== carType);
      setCarTypes(aux3);
    }
  };

  useEffect(() => {
    setSelectedLeads(selected);
  }, [selected]);

  useEffect(() => {
    setSelectedStores(stores);
  }, [stores]);

  useEffect(() => {
    setSelectedCarTypes(carTypes);
  }, [carTypes]);

  return (
    <ListItem
      onPress={() => navigation.navigate("LeadTabs", { item: item })}
      title={(evaProps) => (
        <Layout {...evaProps} style={{ position: "relative", marginLeft: 5 }}>
          <Text appearance="hint" style={styles.ItemText}>
            {translateStatus(item.status.name)}
          </Text>

          <Text style={styles.ItemTextName}>{item.name} </Text>
          <Text appearance="hint" style={styles.ItemText}>
            {moment(item.arrivalDate).format("MMMM D, YYYY")}
          </Text>
        </Layout>
      )}
      accessoryLeft={() =>
        checkBox ? (
          <CheckBox
            style={{
              marginRight: 10,
              marginLeft: 10,
              display:
                user && user.tier && !isUser(user.tier._id) ? "flex" : "none",
            }}
            checked={selected.includes(item._id.toString())}
            onChange={(nextChecked) => {
              handleSelectedLeads(
                item._id,
                nextChecked,
                `${item._id}/${item.store._id}`,
                `${item._id}/${item.carType}`
              );
            }}
          />
        ) : (
          <></>
        )
      }
      accessoryRight={() => (
        <>
          {user && user.stores && user.stores.length > 1 && (
            <>
              <Text
                appearance="hint"
                style={{ position: "absolute", right: 10, top: 5 }}
              >
                {CapitalizeNames(item.store.name)}
              </Text>
            </>
          )}

          <Layout
            style={{ alignItems: "flex-end", position: "relative" }}
            style={{
              ...styles.controlContainer,
              borderColor: setSubstatusColor(item.substatus.name),
            }}
          >
            <Text
              style={styles.ItemText}
              style={{
                color: setSubstatusColor(item.substatus.name),
              }}
            >
              {translateSubstatus(item.substatus.name)}
            </Text>
          </Layout>
        </>
      )}
    />
  );
};
const styles = StyleSheet.create({


  itemText: {
    fontSize: 16,
    padding: 5,
  },
  loader: {
    marginTop: 10,
    alignItems: "center",
  },

  ItemText: {
    textTransform: "capitalize",
  },

  ItemTextName: {
    textTransform: "capitalize",
    marginTop: 5,
    marginBottom: 5,
  },
  itemLayout: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
  controlContainer: {
    borderRadius: 4,
    margin: 4,
    padding: 4,
    borderWidth: 1,
    width: 150,
    alignItems: "center",
  },
  controlContainerFilters: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#5764b8",
    marginRight: 10,
    marginLeft: 10,
    padding: 5,
    minWidth: 100,
    alignItems: "center",
  },
});
export default LeadCard;
