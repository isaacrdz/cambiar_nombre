import React from "react";
import { Dimensions, ScrollView } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";

import { Layout, Text } from "@ui-kitten/components";

const ChartsAdmin = () => {
  const width = Dimensions.get("window").width - 40;

  const data = [
    {
      name: "Lead",
      population: 305,
      color: "rgb(127,123,228)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Appointment",
      population: 184,
      color: "rgb(0,188,212)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Visit",
      population: 87,
      color: "rgb(240,98,146)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Sold",
      population: 22,
      color: "rgb(123,198,126)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Layout style={{ marginTop: 10 }}>
          <Text category="h5" style={{ textAlign: "center" }}>
            Leads
          </Text>
          <LineChart
            data={{
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={width} // from react-native
            height={180}
            yAxisLabel={"$"}
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
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </Layout>
        <Layout style={{ marginTop: 10 }}>
          <Text category="h5" style={{ textAlign: "center" }}>
            Leads por Status
          </Text>
          <PieChart
            data={data}
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
        </Layout>
      </ScrollView>
    </>
  );
};

export default ChartsAdmin;
