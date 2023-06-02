import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const HomeUser = ({ style, title, serie }) => {
  return (
    <>
      <Layout style={style}>
        <Text category="label" style={{ fontSize: 17 }}>
          {title}
        </Text>
      </Layout>
      <Layout style={style}>
        <PieChart
          data={serie}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            fillShadowGradient: "#8a85ff",
            fillShadowGradientOpacity: 1,
            backgroundGradientFrom: "#FFF",
            backgroundGradientTo: "#FFF",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </Layout>
    </>
  );
};

export default HomeUser;
