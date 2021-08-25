import React, { useEffect, useState } from "react";
import { StyleSheet, Linking } from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";

import useActivity from "../../../../hooks/useActivity";
import useAuth from "../../../../hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { CapitalizeNames } from "../../../../utils/Capitalize";
import { useNavigation } from "@react-navigation/native";
import useLead from "../../../../hooks/useLead";
import * as Contacts from "expo-contacts";

const LeadDetailInfoTop = ({ item, loading }) => {
  const navigation = useNavigation();
  const { createActivity } = useActivity();
  const { user } = useAuth();

  const AddContact = async (name, phone) => {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    const contact = {
      [Contacts.Fields.FirstName]: name,
      [Contacts.Fields.PhoneNumbers]: [
        {
          number: phone,
          isPrimary: true,
          digits: phone.replace("+", ""),
          countryCode: "mx",
          label: "main",
        },
      ],
    };

    let exists = false;
    data.map((item) => {
      item.phoneNumbers &&
        item.phoneNumbers.map((phoneContact) => {
          if (phoneContact.number === phone) {
            exists = true;
          }
        });
    });

    if (!exists) {
      await Contacts.addContactAsync(contact);
    }
  };

  return (
    <>
      <Layout style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          category="s1"
          style={{
            fontSize: 25,
            marginTop: 25,
            marginBottom: 5,
            textTransform: "capitalize",
            textAlign: "center",
          }}
        >
          {item.name}
        </Text>
      </Layout>
      <Layout style={styles.ContainerTop}>
        <Button
          style={styles.button}
          appearance="ghost"
          onPress={() => {
            createActivity({
              action: "wsp",
              description: `${CapitalizeNames(
                user.name
              )} has sent a whatsapp from mobile App`,
              lead: item._id,
            });

            AddContact(CapitalizeNames(item.name), item.phone);

            Linking.openURL(`http://api.whatsapp.com/send?phone=${item.phone}`);
          }}
        >
          <Ionicons name="logo-whatsapp" size={30} color="#4bd366" />
        </Button>
        <Button
          style={styles.button}
          appearance="ghost"
          onPress={() => {
            createActivity({
              action: "call",
              description: `${CapitalizeNames(
                user.name
              )} has made a phone call to ${CapitalizeNames(
                item.name
              )} from mobile App`,
              lead: item._id,
            });
            Linking.openURL(`tel:${item.phone}`);
          }}
        >
          <Ionicons name="phone-portrait-outline" size={30} color="#1299de" />
        </Button>
        <Button
          style={styles.button}
          appearance="ghost"
          onPress={() => {
            navigation.navigate("SendDocumentation");
          }}
        >
          <Ionicons name="mail-outline" size={30} color="#535de2" />
        </Button>
        <Button
          style={styles.button}
          appearance="ghost"
          onPress={() => navigation.navigate("AddAppointment")}
        >
          <Ionicons name="calendar-sharp" size={30} color="#535de2" />
        </Button>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },

  ContainerTop: {
    justifyContent: "center",
    flexDirection: "row",

    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default LeadDetailInfoTop;
