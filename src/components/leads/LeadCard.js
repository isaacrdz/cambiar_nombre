import React from "react";
import { StyleSheet } from "react-native";
import moment from "moment/min/moment-with-locales";
import { Icon, ListItem, Layout, Text } from "@ui-kitten/components";
<<<<<<< HEAD
import { translateSubstatus } from "../../utils/tranlsateSubstatus";
=======
import { translateStatus, translateSubstatus } from '../../utils/tranlsateSubstatus';
>>>>>>> f97c8a4eead8f3e890a980155150ac691190b3cc
import { useNavigation } from "@react-navigation/native";
import { setSubstatusColor } from "../../utils/colorsSubstatus";

const LeadIcon = (props) => <Icon {...props} name="user" />;

const LeadCard = ({ item }) => {
  moment.locale("es-mx");
  const navigation = useNavigation();
  const createdAt = moment(item.createdAt).format("MMMM D, YYYY");

  return (
    <ListItem
      onPress={() => navigation.navigate("LeadTabs", { item: item })}
      title={(evaProps) => (
        <Layout {...evaProps}>
          <Text appearance="hint" style={styles.ItemText}>
            {translateStatus(item.status.name)}
          </Text>
          <Text style={styles.ItemTextName}>{item.name} </Text>

          <Text appearance="hint" style={styles.ItemText}>
            {moment(item.createdA).format("MMMM D, YYYY")}
          </Text>
        </Layout>
      )}
      accessoryLeft={LeadIcon}
      accessoryRight={() => (
        <Layout
          style={{ alignItems: "flex-end" }}
          style={{
            ...styles.controlContainer,
            borderColor: setSubstatusColor(item.substatus.name),
          }}
        >
          <Text
            style={styles.ItemText}
            style={{
              color: setSubstatusColor(item.substatus.name),
              textAlign: "center",
            }}
          >
            {translateSubstatus(item.substatus.name)}
          </Text>
        </Layout>
      )}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "#f5fcff",
  },

  itemContainer: {},

  itemRow: {
    borderBottomColor: "#ccc",
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  itemImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },

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
