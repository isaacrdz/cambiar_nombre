import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import Calendar from '../../components/SelectDate'
import moment from 'moment'
import Ionicons from "@expo/vector-icons/Ionicons";
import useChart from '../../hooks/useChart';
import useAuth from '../../hooks/useAuth';
import { CapitalizeNames } from "../../utils/Capitalize";

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

i18n.translations = {
  en: { welcome: 'Hello', name: 'Charlie' },
  es: { welcome: 'Hola' },
};

i18n.locale = "en";
i18n.fallbacks = true;

const Home = ({}) => {

  const { user } = useAuth();
  const { getTotalsDashboard, total, totalLeads, totalAppointments, totalVisits, totalSolds } = useChart();
  const [date, setDate] = useState(`&createdAt[gte]=${moment().startOf('month').format()}&createdAt[lt]=${moment().endOf('month').format()}`)

  const today = new Date();
  const curHr = today.getHours();

  let greeting;

  if (curHr < 12) {
    greeting = 'Good Morning';
  } else if (curHr < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  React.useEffect(() => {
    if(user && user._id)
    getTotalsDashboard(`${date}&agent=${user._id}`)
  },[date, user])

  return (
    <Layout style={styles.container}>
      <Layout style={styles.subContainer}>
        <Calendar setDate={setDate}/>
      </Layout>
      {/* <Divider /> */}
      <Layout style={styles.subContainerText}>
        <Text category="label" style={{marginBottom: 10, fontSize: 17}}>{`${greeting} ${user && CapitalizeNames(user.name)}`}</Text>
        <Text category="p1" appearance="hint" >{`You have a total of ${total} leads accumulated`}</Text>
{/*        
        <Text>
        {i18n.t('welcome')} {i18n.t('name')}
        </Text> */}

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
            <Text category="p1" style={styles.text}>{totalLeads}</Text>
          </Layout>
        </Layout>

        <Layout style={styles.card}>
          <Text category="p1" appearance="hint" >Appointments</Text>
          <Layout style={styles.data}>
            <Ionicons
              name="calendar-outline"
              size={25}
              color={"#33acee"}
            />
            <Text category="p1" style={styles.text}>{totalAppointments}</Text>
          </Layout>
        </Layout>
        
      </Layout>
      <Layout style={styles.subContainerCards}>

        <Layout style={styles.card}>
          <Text category="p1" appearance="hint" >Visits</Text>
          <Layout style={styles.data}>
            <Ionicons
              name="home-outline"
              size={25}
              color={"#d81b60"}
            />
            <Text category="p1" style={styles.text}>{totalVisits}</Text>
          </Layout>
        </Layout>

        <Layout style={styles.card}>
          <Text category="p1" appearance="hint" >Solds</Text>
          <Layout style={styles.data}>
            <Ionicons
              name="cash-outline"
              size={25}
              color={"#43a047"}
            />
            <Text category="p1" style={styles.text}>{totalSolds}</Text>
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

export default Home;
