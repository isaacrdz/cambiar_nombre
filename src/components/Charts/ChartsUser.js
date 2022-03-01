import React from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import {
  Layout,
  Text,
  Divider,
  Button,
  Icon,
  List,
  ListItem,
} from "@ui-kitten/components";

const ChartsUser = ({ leads, status }) => {
  const width = Dimensions.get("window").width - 40;
  // const screen = Dimensions.get("screen").width;

  React.useEffect(() => {
    if (status) {
    }
  }, [status]);

React.useEffect(() => {
    if (leads) {
    }
  }, [leads]);
  return (
    <>
      {<ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Layout style={{ marginTop: 10 }}>
          {(leads && leads.categories && leads.serie && (leads.categories.length > 0) && (leads.serie.length > 0))? (
            <>
              <Text category="h5" style={{ textAlign: "center" }}>
                Leads
              </Text>
              <LineChart
                data={{
                  labels: leads.categories,
                  datasets: [
                    {
                      data: leads.serie,
                    },
                  ],
                }}
                width={width} // from react-native
                height={180}
                yAxisLabel={""}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </>
          ) : (
            <></>
          )}
        </Layout>
        <Layout style={{ marginTop: 10 }}>
          {status ? (
            <>
              <Text category="h5" style={{ textAlign: "center" }}>
                Leads por Status
              </Text>
              <PieChart
                data={[
                  {
                    name: "Lead",
                    population: status.series[0],
                    color: "rgb(127,123,228)",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                  },
                  {
                    name: "cita",
                    population: status.series[1],
                    color: "rgb(0,188,212)",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                  },
                  {
                    name: "Visita",
                    population: status.series[2],
                    color: "rgb(240,98,146)",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                  },
                  {
                    name: "Venta",
                    population: status.series[3],
                    color: "rgb(123,198,126)",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                  },
                ]}
                width={width}
                height={220}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </>
          ) : (
            <></>
          )}
        </Layout>
      </ScrollView> }
    </>
  );
};

export default ChartsUser;
