import React, { useEffect } from "react";

import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

import { Layout, Divider, Text, Button, Icon } from "@ui-kitten/components";
import NumberFormat from "react-number-format";
import Ionicons from "@expo/vector-icons/Ionicons";

import moment from "moment";

import useLead from "../../../../hooks/useLead";

const LeadDetailInfo = ({ itemId }) => {
  const { getLead, lead, loading, clearCurrentLead } = useLead();

  useEffect(() => {
    getLead(itemId);

    return () => clearCurrentLead();
  }, []);

  const createdAt = moment(lead.createdAt).format("MMMM D, YYYY ");

  const leadInformation = () => (
    <Layout style={styles.container}>
      <Layout style={styles.ContainerDetail}>
        <Text category="p1" appearance="hint">
          Email
        </Text>

        <Text style={styles.mr}>{lead && lead.email}</Text>
      </Layout>
      <Divider />
      <Layout style={styles.ContainerDetail}>
        <Text category="p1" appearance="hint">
          Phone Number
        </Text>
        <Text style={styles.mr}>{lead.phone}</Text>
      </Layout>
    </Layout>
  );

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <ScrollView
      showsVerticalScrollIndicator={false}
      // onScrollEndDrag={() =>  getLead(itemId);}
    >
      {/* Lead Top */}
      {leadInformation()}

      {/* Lead Car Info */}
      <Layout style={[styles.container]}>
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Vehicle
          </Text>
          <Text style={[styles.mr, styles.textUppercase]}>
            {lead.vehicle && lead.vehicle.make.name}{" "}
            {lead.vehicle && lead.vehicle.model}{" "}
            {lead.vehicle && lead.vehicle.year}
          </Text>
        </Layout>
        <Divider />
      </Layout>

      {/* Bottom Info */}
      <Layout style={styles.container}>
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Source
          </Text>
          <Text style={[styles.mr, styles.textCapitalize]}>
            {lead.source && lead.source.name}
          </Text>
        </Layout>
        <Divider />
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Date
          </Text>
          <Text style={styles.mr}>{createdAt}</Text>
        </Layout>
        <Divider />
      </Layout>

      <Layout style={{ marginBottom: 300 }}>
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Down Payment
          </Text>

          <Text style={styles.mr}>{lead.downPayment}</Text>
        </Layout>
        <Divider />
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Timeframe
          </Text>
          <Text style={styles.mr}>
            {lead && lead.timeFrame && lead.timeFrame
              ? moment(moment(lead.timeFrame).format("YYYY-MM-DD")).isSame(
                  moment(0).format("YYYY-MM-DD")
                )
                ? "Just asking for information"
                : moment(lead.timeFrame).diff(
                    moment(lead.createdAt),
                    "months"
                  ) < 1
                ? "1 Month or Less"
                : moment(lead.timeFrame).diff(
                    moment(lead.createdAt),
                    "months"
                  ) >= 1 &&
                  moment(lead.timeFrame).diff(
                    moment(lead.createdAt),
                    "months"
                  ) < 2
                ? "2 Months"
                : moment(lead.timeFrame).diff(
                    moment(lead.createdAt),
                    "months"
                  ) >= 2
                ? "3 Months or More"
                : "? ? ?"
              : "None"}
          </Text>
        </Layout>
        <Divider />
        <Layout style={[styles.ContainerDetail]}>
          <Text category="p1" appearance="hint">
            Temperature
          </Text>
          <Text style={[styles.mr, styles.textCapitalize]}>
            {lead.rating !== "none" && (
              <Ionicons
                name="thermometer-outline"
                size={25}
                color={
                  lead.rating === "hot"
                    ? "#f43e55"
                    : lead.rating === "cold"
                    ? "#33acee"
                    : "orange"
                }
              />
            )}

            {lead.rating}
          </Text>
        </Layout>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  ContainerDetail: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },

  ContainerTop: {
    justifyContent: "center",
    flexDirection: "row",

    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },

  mr: {
    marginRight: 20,
  },

  bottomMargin: {
    marginBottom: 70,
  },
  textCapitalize: {
    textTransform: "capitalize",
  },
  textUppercase: {
    textTransform: "uppercase",
  },
});

export default LeadDetailInfo;
