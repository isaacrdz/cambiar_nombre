import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";

const HomeUser = ({navigation, style, title, serie}) => {

    /*
    data: [
        { name: 'Pan', population: Math.random() * 1000, color: '#8a85ff', legendFontColor: '#7F7F7F', legendFontSize: 15 }
    ]
    */
  return (
    <>
    <Layout style={style}>
        <Text category="label" style={{fontSize: 17}}>{title}</Text>
    </Layout>
    <Layout style={style}>     
        <PieChart
            data={serie}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
            fillShadowGradient: '#8a85ff',
            fillShadowGradientOpacity: 1,
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
        />
    </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default HomeUser;
