import React from "react";
import { StyleSheet } from "react-native";

import { List, ListItem, Layout, Text } from "@ui-kitten/components";
import useDocument from "../../../hooks/useDocument";
import { CapitalizeNames } from "../../../utils/Capitalize";

const DocumentsTabs = ({ setCurrents, currents }) => {
  const { documents } = useDocument();

  const handleAddDocument = (item) => {
    let aux = [...currents];
    if (currents.includes(item)) {
      aux = aux.filter((i) => i._id !== item._id);
    } else {
      aux.push(item);
    }
    setCurrents(aux);
  };

  const TITLES_DOCUMENTS = {
    Quote: "Cotización",
    TechnicalSheet: "Ficha Técnica",
    CreditsRequirements: "Requisitos de Crédito",
    MaintenanceCosts: "Costo de Mantenimiento",
    Location: "Ubicación",
    Catalogue: "Catálogo",
    GalleryVersions: "Versiones",
    CreditRequest: "Petición de Crédito",
  };

  return (
    <Layout style={{ marginTop: 20 }} level="4">
      <List
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyExtractor={(item) => item._id}
        data={documents}
        renderItem={({ item }) => (
          <ListItem
            title={(evaProps) => (
              <Layout
                style={
                  currents.includes(item)
                    ? styles.controlContainerFiltersActive
                    : styles.controlContainerFilters
                }
              >
                <Text
                  style={{
                    ...styles.ItemText,
                    color: currents.includes(item) ? "white" : "#5764b8",
                  }}
                >
                  {TITLES_DOCUMENTS[item.title]
                    ? TITLES_DOCUMENTS[item.title]
                    : CapitalizeNames(item.title)}{" "}
                  {item.vehicle
                    ? `(${CapitalizeNames(item.vehicle.model)})`
                    : ""}
                </Text>
              </Layout>
            )}
            onPress={() => handleAddDocument(item)}
          />
        )}
      />
    </Layout>
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
    borderColor: "#5764b8",
    width: 100,
    alignItems: "center",
  },
  controlContainerFilters: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#5764b8",
    // marginRight: 10,
    // marginLeft: 10,
    padding: 5,
    minWidth: 100,
    alignItems: "center",
  },
  controlContainerFiltersActive: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#5764b8",
    backgroundColor: "#5764b8",
    padding: 5,
    minWidth: 100,
    alignItems: "center",
  },
});

export default DocumentsTabs;
