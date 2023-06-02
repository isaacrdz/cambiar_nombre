import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Layout, Text, Divider } from "@ui-kitten/components";
import useChart from "../../hooks/useChart";
import useAuth from "../../hooks/useAuth";
import { CapitalizeNames } from "../../utils/Capitalize";
import { Spinner } from "@ui-kitten/components";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import TopList from "./dashboardComponents/TopList";
import ChartsUser from "../Charts/ChartsUser";
import numeral from "numeral";
import Filters from "../Filters";

const HomeAdmin = () => {
  const { user } = useAuth();
  const {
    getAllHomeCharts,
    getTotalsDashboard,
    total,
    totalLeads,
    totalAppointments,
    totalVisits,
    totalSolds,
    loadingCharts,
    clearCharts,
    getClosureTopUsers,
    closureTopUsers,
    getLeadsMonthlyChart,
    leadsMonthlyChart,
    getPieStatusChart,
    pieStatus,
  } = useChart();

  const [query, setQuery] = useState(false);
  const today = new Date();
  const curHr = today.getHours();
  const [search, setSearch] = useState({
    store: null,
    carType: null,
    date: null,
    leadType: null,
    source: null,
  });

  let greeting;

  if (curHr < 12) {
    greeting = "Buenos Dias";
  } else if (curHr < 18) {
    greeting = "Buenas Tardes";
  } else {
    greeting = "Buenas Noches";
  }

  useFocusEffect(
    React.useCallback(() => {
      if (user && user._id && query) {
        getAllHomeCharts(`${query}`);
      }
    }, [query, user])
  );

  React.useEffect(() => {
    clearCharts();
  }, []);

  return (
    <ScrollView>
      <Layout style={styles.container}>
        <Layout style={styles.subContainerText}>
          <Layout
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Filters
              filters={["date", "carType", "stores", "leadType", "source"]}
              setQuery={setQuery}
              search={search}
              setSearch={setSearch}
            />
          </Layout>

          <Text category="label" style={{ fontSize: 28, overflow: "hidden" }}>
            {`${user && CapitalizeNames(user.name)}`}
          </Text>

          {loadingCharts ? (
            <Text category="p1" appearance="hint">{`. . .`}</Text>
          ) : (
            <Text category="p1" appearance="hint">
              {`Tienes ${numeral(total).format("0,0")} leads acumulados`}
            </Text>
          )}

          {!loadingCharts &&
            (search.store ||
              search.carType ||
              search.date ||
              search.leadType ||
              search.source) && (
              <Text category="p1" appearance="hint">
                Búsqueda: {`${search.carType ? search.carType : ""}`}{" "}
                {`${search.leadType ? search.leadType : ""}`}{" "}
                {`${search.store ? search.store : ""}`}{" "}
                {`${search.source ? search.source : ""}`}{" "}
                {`${search.date ? search.date : ""}`}
              </Text>
            )}
        </Layout>

        <Divider style={{ marginBottom: 15, marginTop: 15 }} />

        <Layout style={styles.subContainerCards}>
          <Layout style={styles.card}>
            <Text category="p1" appearance="hint">
              Leads
            </Text>
            <Layout style={styles.data}>
              {loadingCharts ? (
                <Layout style={{ paddingLeft: 10 }}>
                  <Spinner size="large" />
                </Layout>
              ) : (
                <Text category="h5" style={{ fontSize: 40 }}>
                  {numeral(totalLeads).format("0,0")}
                </Text>
              )}
            </Layout>
          </Layout>

          <Layout style={styles.card}>
            <Text category="p1" appearance="hint">
              Citas
            </Text>
            <Layout style={styles.data}>
              {loadingCharts ? (
                <Layout style={{ paddingLeft: 10 }}>
                  <Spinner size="large" />
                </Layout>
              ) : (
                <Text category="h5" style={{ fontSize: 40 }}>
                  {numeral(totalAppointments).format("0,0")}
                </Text>
              )}
            </Layout>
          </Layout>
        </Layout>

        <Layout style={styles.subContainerCards}>
          <Layout style={styles.card}>
            <Text category="p1" appearance="hint">
              Visitas
            </Text>
            <Layout style={styles.data}>
              {loadingCharts ? (
                <Layout style={{ paddingLeft: 10 }}>
                  <Spinner size="large" />
                </Layout>
              ) : (
                <Text category="h5" style={{ fontSize: 40 }}>
                  {numeral(totalVisits).format("0,0")}
                </Text>
              )}
            </Layout>
          </Layout>

          <Layout style={styles.card}>
            <Text category="p1" appearance="hint">
              Ventas
            </Text>
            <Layout style={styles.data}>
              {loadingCharts ? (
                <Layout style={{ paddingLeft: 10 }}>
                  <Spinner size="large" />
                </Layout>
              ) : (
                <Text category="h5" style={{ fontSize: 40 }}>
                  {numeral(totalSolds).format("0,0")}
                </Text>
              )}
            </Layout>
          </Layout>
        </Layout>

        <Layout style={styles.subContainerDivider}>
          {loadingCharts || !leadsMonthlyChart || !pieStatus ? (
            <Layout style={styles.center}>
              <Spinner size="giant" />
            </Layout>
          ) : (
            <>
              <Divider />
              <ChartsUser leads={leadsMonthlyChart} status={pieStatus} />
            </>
          )}
        </Layout>
      </Layout>

      <TopList data={closureTopUsers} title="Top 10 Ventas" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "400",
    marginLeft: 15,
  },
  container: {
    marginBottom: 20,
  },
  subContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  subContainerDivider: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  subContainerText: {
    paddingHorizontal: 20,
  },
  subContainerCards: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: 20,
    paddingLeft: 20,
  },
  card: {
    width: "50%",
    borderWidth: 1,
    flex: 1,
    borderColor: "#d8d8d8",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  select: {
    flex: 1,
    margin: 2,
  },
  data: {
    display: "flex",
    flexDirection: "row",
    textAlignVertical: "center",
  },
  center: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
  },
});

export default HomeAdmin;
