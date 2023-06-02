import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const HomeUser = ({ style, title, categories, serie }) => {
  return (
    <>
      <Layout style={style}>
        <Text category="label" style={{ fontSize: 17 }}>
          {title}
        </Text>
      </Layout>
      <Layout style={style}>
        <BarChart
          style={{
            marginVertical: 8,
            borderRadius: 16,
            borderColor: "#d8d8d8",
            color: "red",
          }}
          data={{
            labels: categories,
            datasets: [
              {
                data: serie,
              },
            ],
          }}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            fillShadowGradient: "#8a85ff",
            fillShadowGradientOpacity: 1,
            backgroundGradientFrom: "#FFF",
            backgroundGradientTo: "#FFF",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
        />
      </Layout>
    </>
  );
};

export default HomeUser;
