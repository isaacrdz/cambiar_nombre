import React, { useEffect, useState } from "react";
import { StyleSheet, Linking } from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";

import useActivity from "../../../../hooks/useActivity";
import useAuth from "../../../../hooks/useAuth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CapitalizeNames } from "../../../../utils/Capitalize";
import { Device } from "twilio-client";
import { useNavigation } from "@react-navigation/native";
import useLead from "../../../../hooks/useLead";

const LeadDetailInfoTop = ({ item, loading }) => {
  const navigation = useNavigation();
  const { createActivity } = useActivity();
  const { generateToken, callToken } = useLead();
  const [callStatus, setCallStatus] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    if (callToken) {
      try {
        device = new Device(callToken, {
          codecPreferences: ["opus", "pcmu"],
          fakeLocalDTMF: true,
          enableRingingState: true,
        });

        device.on("ready", function (device) {
          updateCallStatus(t("Leads.CallReady"));
        });

        device.on("error", function (error) {
          if (error.code === 31205) {
            generateToken(item);
            updateCallStatus(t("Leads.GeneratingToken"));
          } else {
            updateCallStatus("ERROR: " + error.message);
          }
        });

        device.on("connect", function (conn) {
          updateCallStatus(
            t("Leads.CallInCall") + " " + conn.message.phoneNumber
          );
        });

        device.on("disconnect", function (conn) {
          updateCallStatus(t("Leads.CallReady"));
        });

        device.on("ringing", function (hasEarlyMedia) {});
      } catch (err) {
        setCallStatus("ERROR: ", err.message);
      }
    } else {
      return;
    }
    //eslint-disable-next-line
  }, [callToken]);
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
            Linking.openURL(`http://api.whatsapp.com/send?phone=${item.phone}`);
          }}
        >
          <Ionicons name="logo-whatsapp" size={30} color="#4bd366" />
        </Button>
        {callToken ? (
          <Button
            style={styles.button}
            appearance="ghost"
            onPress={() => {
              navigation.navigate("Calling", { status: status });
            }}
          >
            <Ionicons name="phone-portrait-outline" size={30} color="#1299de" />
          </Button>
        ) : null}

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
