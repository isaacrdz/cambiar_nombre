import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Layout, Button, Text, Input } from "@ui-kitten/components";
import HeaderTitle from "../header/HeaderTitle";
import useLead from "../../hooks/useLead";

const Calling = ({ route, navigation }) => {
  const { status } = route.params;

  let paddingTop = 0;

  if (Platform.OS === "android") {
    paddingTop = 30;
  }

  const callCustomer = async (obj) => {
    updateCallStatus(t("Leads.CallCalling") + obj.phoneNumber + "...");

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

    device.connect(params);
    createActivity(obj);

    let author = "";
    let userId = "";
    if (
      user &&
      user.role &&
      (user.role === "rockstar" ||
        user.role === "admin" ||
        user.role === "super admin") &&
      lead.agent &&
      lead.agent._id
    ) {
      userId = lead.agent._id;
      author = user._id;
    }

    if (user && user.role && user.role === "user") {
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
        <Button>Calling</Button>
        <Button>Hangup</Button>
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
