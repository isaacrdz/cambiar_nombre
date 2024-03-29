import React, { Fragment, useState } from "react";
import { Agenda } from "react-native-calendars";
import AppointmentItem from "../../components/appointment/AppointmentItem";
import moment from "moment";
import EmpyDate from "../../components/appointment/EmptyDate";
import useAppointment from "../../hooks/useAppointment";
import useAuth from "../../hooks/useAuth";
import { useFocusEffect } from "@react-navigation/native";
import { getMultiStoresIds } from "../../utils/storesUser";
import { isAdmin, isRockstar, isSuper, isUser } from "../../utils/Authroles";
import { Text } from "react-native-paper";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import { StyleSheet } from 'react-native'
import useStore from "../../hooks/useStore";
import { CapitalizeNames } from "../../utils/Capitalize";
import useUser from "../../hooks/useUser";

const Appointment = () => {
  const [items, setItems] = React.useState({});
  const [marked, setMarked] = React.useState({});
  const { agents, getAgents } = useUser();
  const { getAppointmentsByUser, getAppointmentsByStore, appointments, loading, clearState } = useAppointment();
  const { user } = useAuth();
  const { getStoresByGroup, stores, getStoresByUser } = useStore()

  const [tiendas, setTiendas] = useState([""]);
  const [storeSelect, setStoreSelect] = useState(new IndexPath(0));
  const displayStore = tiendas[storeSelect.row];

  const [agentes, setAgentes] = useState([""]);
  const [agenteSelect, setAgenteSelect] = useState(new IndexPath(0));
  const displayAgente = agentes[agenteSelect.row];

  React.useEffect(() => {
    let mark = [];

    if (appointments) {
      const mappedData = appointments.map((appointment) => {
        const date = appointment.startDate;

        let color = ''
        if(moment(date).format('YYYY-MM-DD') > moment().format('YYYY-MM-DD')){
          color = '#388e3c'
        }else if( moment(date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) {
          color = '#d32f2f'
        } else {
          color = '#f9a825'
        }
        
        mark.push({
          date: moment(date).format("YYYY-MM-DD"),
          selectedColor: color,
          selected: true,
        })

        return{
            ...appointment,
            date: moment(date).format("YYYY-MM-DD"),
          }
      });


      const reduced = mappedData.reduce((acc, currentItem) => {
        const { date, ...app } = currentItem;

        acc[date] = [app];

        return acc;
      }, {});

      const reducedMarked = mark.reduce((acc, currentItem) => {
        const { date, ...app } = currentItem;

        acc[date] = app;

        return acc;
      }, {});

      setItems(reduced);
      setMarked(reducedMarked);
    }
  }, [appointments]);

  React.useEffect(() => {

    if(stores && stores.length > 0){
      let aux = stores.map((item) => CapitalizeNames(item.make.name + " " + item.name));
      setTiendas(['Selecciona una agencia', ...aux]);
    }
  },[stores])

  React.useEffect(() => {

    if(agents && agents.length > 0){
      let aux = agents.map((item) => CapitalizeNames(item.name));
      setAgentes(['Selecciona un agente', ...aux]);
    }
  },[agents])

  useFocusEffect(
    React.useCallback(() => {
      if (user && user.tier && isUser(user.tier._id)) {
        getAppointmentsByUser(user._id)
        getStoresByUser(user._id)
      }else if(user && user.tier && isAdmin(user.tier._id) && user.stores){
        getStoresByUser(user._id)
        getAppointmentsByStore(`&store[in]=${getMultiStoresIds(user.stores)}`)
      }else if(user && user.tier && (isRockstar(user.tier._id) || isSuper(user.tier._id))){
        getStoresByGroup('61003180d1cd3b1299a82fd0')
      }
    }, [user])
  );

  React.useEffect(() => {
    if(stores && stores.length > 0){
      let string = storeSelect.row !== 0 ? `&store[in]=${stores[storeSelect.row - 1]._id}` : '';
      if(agenteSelect.row !== 0) string += `&user=${agents[agenteSelect.row - 1]._id}`
      if(string !== '')getAppointmentsByStore(string)
      else clearState()
    }
  }, [storeSelect, agenteSelect])

  React.useEffect(() => {
    if(storeSelect.row !== 0){
      getAgents(`&stores[in]=${stores[storeSelect.row - 1]._id}`);
    }
  }, [storeSelect])

  const renderEmptyDate = () => {
    return <EmpyDate />;
  };

  const renderItem = (item) => {
    return <AppointmentItem item={item} />;
  };

  const handleRefresh = () => {
    if (user && user.tier && isUser(user.tier._id)) {
      getAppointmentsByUser(user._id)
    }else if(user && user.tier && isAdmin(user.tier._id) && user.stores){
      getAppointmentsByStore(`&store[in]=${getMultiStoresIds(user.stores)}`)
    }
  };

  return (
    <Fragment>
      {
        user && user.tier &&
        (
          (
            isRockstar(user.tier._id) || isSuper(user.tier._id)
          ) ||
          (
            (isAdmin(user.tier._id) || isUser(user.tier._did)) && user.stores && user.stores.length > 1 
          ) 
        ) &&
       <Layout style={{ paddingHorizontal: 15, paddingVertical: 5 }} level="1">
        <Text style={{...styles.text, marginBottom: 10}} category="s1">
          Agencia
        </Text>
        <Select
          size="large"
          onSelect={(index) => setStoreSelect(index)}
          placeholder='Selecciona una agencia'
          value={displayStore}
          >
          {
            tiendas.map((item) => <SelectItem title={CapitalizeNames(item)} key={item} />)
          }
        </Select>
      </Layout>
      }
      {
        user && user.tier && !isUser(user.tier._id) &&
        <Layout style={{ paddingHorizontal: 15, paddingVertical: 5 }} level="1">
          <Text style={{...styles.text, marginBottom: 10}} category="s1">
            Agente
          </Text>
          <Select
            size="large"
            onSelect={(index) => setAgenteSelect(index)}
            placeholder='Selecciona una agente'
            value={displayAgente}
            >
            {
              agentes.map((item) => <SelectItem title={CapitalizeNames(item)} key={item} />)
            }
          </Select>
        </Layout>
      }
      <Agenda
        items={items}
        renderItem={renderItem}
        renderEmptyData={renderEmptyDate}
        markedDates={marked}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        onRefresh={() => handleRefresh()}
        refreshing={loading}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        // minDate={moment().format()}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={"2025-05-30"}
        showClosingKnob={true}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    margin: 2,
  },
  button: {
    marginTop: 20,
  },
});

export default Appointment;
