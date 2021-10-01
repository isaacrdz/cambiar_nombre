import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Layout, Button, Text, Input } from "@ui-kitten/components";
import HeaderTitle from "../header/HeaderTitle";
import useLead from "../../hooks/useLead";
import useAuth from "../../hooks/useAuth";
import useComment from "../../hooks/useComment";
import { CapitalizeNames } from "../../utils/Capitalize"
import { isAdmin, isRockstar, isSuper, isUser } from "../../utils/Authroles";

const Calling = ({ route, navigation }) => {

  const { device, updateCallStatus, handleCallUser } = route.params;
  const { user } = useAuth()
  const { updateLead, lead } = useLead()
  const { updateComment, createComment } = useComment()

  let paddingTop = 0;

  if (Platform.OS === "android") {
    paddingTop = 30;
  }

  const callCustomer = async () => {

    let obj = {
      callerdId: lead.store.twilioNumber,
      phoneNumber: lead.phone,
      description: `${CapitalizeNames(
        user.name
      )} has made a phone call to  ${CapitalizeNames(lead.name)}`,
      action: 'call',
      lead: lead._id
    };

    updateCallStatus("Llamando" + obj.phoneNumber + "...");

    let params = {
      phoneNumber: obj.phoneNumber,
    };

    params.storePhone = lead.store.twilioNumber;

    params.lead = lead._id;
    params.user = user._id;
    params.type = lead.store.isRecording;

    if (lead.store) {
      params.store = lead.store._id;
    } else {
      params.store = "---";
    }

    handleCallUser(params);
    createActivity(obj);

    let author = "";
    let userId = "";
    if (user && user.tier && (isRockstar(user.tier._id) || isAdmin(user.tier._id) || isSuper(user.tier._id)) && lead.agent && lead.agent._id) {
      userId = lead.agent._id;
      author = user._id;
    }

    if (user && user.tier && isUser(user.tier._id)) {
      userId = user._id;
    }

    let BodyComment = {
      comment: `Se ha realizado una llamada con ${CapitalizeNames(lead.name)}`,
      user: userId,
      action: ["call"],
      pending: false,
      store: lead.store._id,
    };

    if (author !== "") {
      BodyComment.assignedBy = author;
    }

    if (lead && lead.comments && lead.comments[0]) {
      await updateComment({ pending: false }, lead.comments[0]._id);
    }
    createComment(BodyComment, lead._id);

    if (!lead.firstTask) {
      updateLead({ firstTask: new Date() }, lead._id);
    }
  };

  /* End a call */
  const hangUp = () => {
    device.disconnectAll();
    device.on("disconnect", function (conn) {});
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop }}>
      <HeaderTitle title="Calling" />

      <Layout style={styles.container}>
        <Button onPress={callCustomer}>Calling</Button>
        <Button onPress={hangUp}>Hangup</Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 30,
  },
  text: {
    marginHorizontal: 8,
  },
});

export default Calling;
