import React, { useEffect } from "react";

import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

import { Layout, Divider, Text, Button, Icon } from "@ui-kitten/components";
import numeral from "numeral";
import { Ionicons } from "@expo/vector-icons";

import moment from "moment/min/moment-with-locales";

import useLead from "../../../../hooks/useLead";
import { translateTemperature } from "../../../../utils/tranlsateSubstatus";
import useAuth from "../../../../hooks/useAuth";
import { CapitalizeNames } from "../../../../utils/Capitalize";
import { isAdmin, isRockstar, isSuper } from "../../../../utils/Authroles";

const LeadDetailInfo = ({ itemId }) => {
  const { getLead, lead, loading, clearCurrentLead } = useLead();
  moment.locale("es-mx");
  const { user } = useAuth();

  useEffect(() => {
    return () => clearCurrentLead();
  }, []);

  const createdAt = moment(lead.createdAt).format("DD MMMM YYYY ");

  const leadInformation = () => (
    <Layout style={styles.container}>
      <Layout style={styles.ContainerDetail}>
        <Text category="p1" appearance="hint">
          Correo
        </Text>

        <Text style={styles.mr}>{lead && lead.email}</Text>
      </Layout>
      <Divider />
      <Layout style={styles.ContainerDetail}>
        <Text category="p1" appearance="hint">
          Teléfono
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
            Vehículo
          </Text>
          <Text style={[styles.mr, styles.textUppercase]}>
            {lead.vehicle && lead.vehicle.make.name}{" "}
            {lead.vehicle && lead.vehicle.model} {lead && lead.year}
          </Text>
        </Layout>
        <Divider />
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Tipo
          </Text>
          <Text style={[styles.mr, styles.textCapitalize]}>
            {lead.carType && lead.carType}
          </Text>
        </Layout>
      </Layout>

      {/* Bottom Info */}
      <Layout style={styles.container}>
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Fuente
          </Text>
          <Text style={[styles.mr, styles.textCapitalize]}>
            {lead.source && lead.source.name}
          </Text>
        </Layout>
        <Divider />
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Fecha
          </Text>
          <Text style={styles.mr}>{createdAt}</Text>
        </Layout>
        <Divider />
      </Layout>

      <Layout style={styles.container}>
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Enganche
          </Text>
          <Text style={styles.mr}>
            ${numeral(lead.downPayment).format("0,0")}
          </Text>
        </Layout>
        <Divider />
        <Layout style={styles.ContainerDetail}>
          <Text category="p1" appearance="hint">
            Tiempo de Compra
          </Text>
          <Text style={styles.mr}>
            {lead && lead.timeFrame && lead.timeFrame
              ? moment(moment(lead.timeFrame).format("YYYY-MM-DD")).isSame(
                  moment(0).format("YYYY-MM-DD")
                )
                ? "Solo información"
                : moment(lead.timeFrame).diff(
                    moment(lead.createdAt),
                    "months"
                  ) < 1
                ? "1 Mes o Menos"
                : moment(lead.timeFrame).diff(
                    moment(lead.createdAt),
                    "months"
                  ) >= 1 &&
                  moment(lead.timeFrame).diff(
                    moment(lead.createdAt),
                    "months"
                  ) < 2
                ? "2 Meses"
                : moment(lead.timeFrame).diff(
                    moment(lead.createdAt),
                    "months"
                  ) >= 2
                ? "3 Meses o Más"
                : "? ? ?"
              : "None"}
          </Text>
        </Layout>
        <Divider />
        <Layout style={[styles.ContainerDetail]}>
          <Text category="p1" appearance="hint">
            Temperatura
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

            {translateTemperature(lead.rating)}
          </Text>
        </Layout>
      </Layout>

      {/* Lead Agent */}
      {user &&
        user.tier &&
        (isAdmin(user.tier._id) ||
          isSuper(user.tier._id) ||
          isRockstar(user.tier._id)) && (
          <Layout style={{ marginBottom: 300 }}>
            <Layout style={styles.ContainerDetail}>
              <Text category="p1" appearance="hint">
                Agente
              </Text>
              <Text style={[styles.mr]}>
                {lead && lead.agent
                  ? CapitalizeNames(lead.agent.name)
                  : "Sin Asignar"}
              </Text>
            </Layout>
            <Divider />
          </Layout>
        )}
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
