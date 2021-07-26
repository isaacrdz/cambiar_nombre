import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import Calendar from '../../components/SelectDate'
import moment from 'moment'
import Ionicons from "@expo/vector-icons/Ionicons";
import useChart from '../../hooks/useChart';
import useAuth from '../../hooks/useAuth';
import { CapitalizeNames } from "../../utils/Capitalize";
import { Spinner } from '@ui-kitten/components';
import { useFocusEffect } from "@react-navigation/native";

const HomeUser = ({navigation}) => {

  const { user } = useAuth();
  const { 
    getTotalsDashboard, 
    total, 
    totalLeads, 
    totalAppointments, 
    totalVisits, 
    totalSolds,
    loadingCharts,
  } = useChart();
  const [date, setDate] = useState(`&createdAt[gte]=${moment().startOf('month').format()}&createdAt[lt]=${moment().endOf('month').format()}`)

  const today = new Date();
  const curHr = today.getHours();

  let greeting;

  if (curHr < 12) {
    greeting = 'Buenos Dias';
  } else if (curHr < 18) {
    greeting = 'Buenas Tardes';
  } else {
    greeting = 'Buenas Noches';
  }

  useFocusEffect(
    React.useCallback(() => {
      if(user && user._id){
        getTotalsDashboard(`${date}&agent=${user._id}`)
      }
    }, [date, user])
  );


  return (
    <Layout style={styles.container}>
      <Layout style={styles.subContainer}>
        <Calendar setDate={setDate}/>
      </Layout>
      {/* <Divider /> */}
      <Layout style={styles.subContainerText}>
        <Text category="label" style={{marginBottom: 10, fontSize: 17}}>{`${greeting} ${user && CapitalizeNames(user.name)}`}</Text>
        {
          loadingCharts ? 
          <Text category="p1" appearance="hint" >{`. . .`}</Text>
          :
          <Text category="p1" appearance="hint" >{`Tienes un total de ${total} leads acumulados`}</Text>
        }
      </Layout>
      <Layout style={styles.subContainerCards}>

      <Layout style={styles.card}>
          <Text category="p1" appearance="hint" >Leads</Text>
          <Layout style={styles.data}>
            <Ionicons
              name="person-outline"
              size={25}
              color={"#673ab7"}
            />
            {
              loadingCharts ? 
              <Layout style={{paddingLeft: 10}}>
                <Spinner size='small'/> 
              </Layout>
                : 
              <Text category="p1" style={styles.text}>{totalLeads}</Text>
            }
          </Layout>
        </Layout>

      <Layout style={styles.card}>
        <Text category="p1" appearance="hint" >Citas</Text>
        <Layout style={styles.data}>
          <Ionicons
            name="calendar-outline"
            size={25}
            color={"#33acee"}
          />
          {
            loadingCharts ? 
            <Layout style={{paddingLeft: 10}}>
              <Spinner size='small'/> 
            </Layout>
              : 
            <Text category="p1" style={styles.text}>{totalAppointments}</Text>
          }
        </Layout>
      </Layout>

      </Layout>

      <Layout style={styles.subContainerCards}>

      <Layout style={styles.card}>
        <Text category="p1" appearance="hint" >Visitas</Text>
        <Layout style={styles.data}>
          <Ionicons
            name="home-outline"
            size={25}
            color={"#d81b60"}
          />
          {
            loadingCharts ? 
            <Layout style={{paddingLeft: 10}}>
              <Spinner size='small'/> 
            </Layout>
              : 
            <Text category="p1" style={styles.text}>{totalVisits}</Text>
          }
        </Layout>
      </Layout>

      <Layout style={styles.card}>
        <Text category="p1" appearance="hint" >Ventas</Text>
        <Layout style={styles.data}>
          <Ionicons
            name="cash-outline"
            size={25}
            color={"#43a047"}
          />
          {
            loadingCharts ? 
            <Layout style={{paddingLeft: 10}}>
              <Spinner size='small'/> 
            </Layout>
              : 
            <Text category="p1" style={styles.text}>{totalSolds}</Text>
          }
        </Layout>
      </Layout>

      </Layout>


    </Layout>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "400",
    marginLeft: 15
  },
  container: {
    marginBottom: 20,
    flex: 1
  },
  subContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 20,
  },
  subContainerText: {
    justifyContent: "space-between",
    paddingRight: 20,
    paddingLeft: 25,
    paddingBottom: 10
  },
  subContainerCards: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: 20,
    paddingLeft: 20,
  },
  card: {
    width: '50%',
    borderWidth: 1,
    flex: 1,
    borderColor: "#d8d8d8",
    borderRadius: 5,
    padding: 10,
    margin: 5
  },
  select: {
    flex: 1,
    margin: 2,
  },
  data: {
    display: 'flex',
    flexDirection: 'row',
    textAlignVertical: "center"
  },
  
});

export default HomeUser;
