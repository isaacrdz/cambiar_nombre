import React, { useEffect, useState } from "react";
import { StyleSheet, Linking } from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";

import useActivity from "../../../../hooks/useActivity";
import useAuth from "../../../../hooks/useAuth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CapitalizeNames } from "../../../../utils/Capitalize";
import { useNavigation } from "@react-navigation/native";
import useLead from "../../../../hooks/useLead";

const LeadDetailInfoTop = ({ item, loading }) => {
  const navigation = useNavigation();
  const { createActivity } = useActivity();
  const { generateToken, callToken } = useLead();
  const [callStatus, setCallStatus] = useState("");
  const { user } = useAuth();
  const [deviceState, setDevice] = useState();

  // useEffect(() => {
  //   if (callToken) {
  //     try {
  //       console.log('aca ando', new Device(callToken, {
  //         codecPreferences: ["opus", "pcmu"],
  //         fakeLocalDTMF: true,
  //         enableRingingState: true,
  //       }))

  //       setDevice( new Device(callToken, {
  //         codecPreferences: ["opus", "pcmu"],
  //         fakeLocalDTMF: true,
  //         enableRingingState: true,
  //       }))

  //       deviceState.on("ready", function (device) {
  //         updateCallStatus("Listo");
  //       });

  //       deviceState.on("error", function (error) {
  //         if (error.code === 31205) {
  //           generateToken(item);
  //           updateCallStatus("Generando Token");
  //         } else {
  //           updateCallStatus("ERROR: " + error.message);
  //         }
  //       });

  //       deviceState.on("connect", function (conn) {
  //         updateCallStatus(
  //           "Llamada con" + " " + conn.message.phoneNumber
  //         );
  //       });

  //       deviceState.on("disconnect", function (conn) {
  //         updateCallStatus("Listo");
  //       });

  //       deviceState.on("ringing", function (hasEarlyMedia) {});
  //     } catch (err) {
  //       console.log(err)
  //       setCallStatus("ERROR: ", err.message);
  //     }
  //   }
  //   //eslint-disable-next-line
  // }, [callToken]);

  // const removeSubscription = TwilioVoice.on("connect", connectedCall => call = connectedCall)

  useEffect(() => {
    console.log("state", deviceState);
  }, [deviceState]);

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
