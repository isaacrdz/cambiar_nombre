import React, { useEffect } from "react";

import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

import { Layout, Divider, Text } from "@ui-kitten/components";
import NumberFormat from "react-number-format";

import moment from "moment";

import useLead from "../../hooks/useLead";

const LeadsDetail = ({ itemId }) => {
  const { getLead, lead, loading, clearState } = useLead();

  useEffect(() => {
    getLead(itemId);
  }, []);

  const createdAt = moment(lead.createdAt).format("MMMM D, YYYY");

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <ScrollView
      style={{ marginBottom: 150 }}
      showsVerticalScrollIndicator={false}
      // onScrollEndDrag={() =>  getLead(itemId);}
    >
      {/* Lead Top */}
      <Layout style={styles.container}>
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Name
          </Text>
          <Text style={[styles.mr, styles.textCapitalize]}>{lead.name}</Text>
        </Layout>
        <Divider />
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

      {/* Lead Car Info */}
      <Layout style={styles.container}>
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Make
          </Text>
          <Text style={[styles.mr, styles.textCapitalize]}>
            {lead.vehicle && lead.vehicle.make.name}
          </Text>
        </Layout>
        <Divider />
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Model
          </Text>
          <Text style={[styles.mr, styles.textCapitalize]}>
            {lead.vehicle && lead.vehicle.model}
          </Text>
        </Layout>
        <Divider />
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Year
          </Text>
          <Text style={styles.mr}>{lead.vehicle && lead.vehicle.year}</Text>
        </Layout>
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
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Year
          </Text>
          <Text style={styles.mr}>{lead.vehicle && lead.vehicle.year}</Text>
        </Layout>
      </Layout>

      <Layout>
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Down Payment
          </Text>

          <Text style={styles.mr}>{lead.downPayment}</Text>
        </Layout>
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Timeframe
          </Text>
          <Text style={styles.mr}>{lead.timeFrame}</Text>
        </Layout>
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Temperature
          </Text>
          <Text style={styles.mr}>{lead.rating}</Text>
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

  mr: {
    marginRight: 20,
  },

  textCapitalize: {
    textTransform: "capitalize",
  },
});

export default LeadsDetail;
