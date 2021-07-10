import React, { useEffect, useState } from "react";
import { View, SafeAreaView, ScrollView, StyleSheet, Platform } from "react-native";
import HeaderTitle from "../../components/header/HeaderTitle";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker";
import useAppointment from "../../hooks/useAppointment";
import useVisit from "../../hooks/useVisit";
import useLead from "../../hooks/useLead";
import useAuth from "../../hooks/useAuth";
import useSubstatus from "../../hooks/useSubstatus";
import useComment from "../../hooks/useComment";
import {
  Layout,
  Divider,
  Text,
  Button,
  Icon,
  Input,
  Select,
  IndexPath,
  SelectItem,
} from "@ui-kitten/components";
import moment from "moment/min/moment-with-locales";
import { useFocusEffect } from "@react-navigation/native";
import { translateSubstatus } from "../../utils/tranlsateSubstatus";

const AppointmentDetail = ({ route, navigation }) => {
  const { item } = route.params;
  const { appointment, getAppointment, updateAppointment } = useAppointment();
  const { createVisit } = useVisit();

  const [open, setOpen] = useState(false)
  const { user } = useAuth();
  const { updateLead } = useLead()
  const { substatuses, getSubstatuses } = useSubstatus();
  const { updateComment, createComment } = useComment();
  const times = ["1 Hora", "2 Horas"];
  const [time, setTime] = useState({row: 0});
  const [textVisit, setTextVisit] = useState('');
  const displayValueTime = times[time.row];
  const [currentAppointment, setCurrentAppointment] = useState({
    startDate: new Date()
  });
  

  const [substatusAppointment, setSubstatusAppointment] = useState([]);
  const [substatusVisit, setSubstatusVisit] = useState([]);

  const [substatusAppointmentIndex, setSubstatusAppointmentIndex] = useState(new IndexPath(0));
  const displaySubstatusAppointment = substatusAppointment[substatusAppointmentIndex.row];

  const [substatusVisitIndex, setSubstatusVisitIndex] = useState(new IndexPath(0));
  const displaySubstatusVisit = substatusVisit[substatusVisitIndex.row];


  const handleSaveVisit = async () => {

    if(textVisit === ''){
      return Toast.show({
        text1: "Deja un comentario",
        type: "error",
        position: "bottom",
      });
    }
  
    if(currentAppointment && currentAppointment.lead && currentAppointment.lead.agent){

    let author = '';
    let userId = '';
    if(user && user.role && (user.role === 'rockstar' || user.role === 'admin' || user.role === 'super admin') && currentAppointment.lead.agent && currentAppointment.lead.agent._id){
        userId = currentAppointment.lead.agent._id;
        author = user._id;
    }

    if(user && user.role && user.role === 'user'){
      userId = user._id;
    }

    let BodyComment = {
      comment: textVisit,
      user: userId,
      action: ["visit"],
      pending: false,
      store: currentAppointment.lead.store._id
    }

    if(author !== ''){
      BodyComment.assignedBy = author;
    }

    await updateLead({status: "6064f8065b21e51052eed547", substatus: substatusVisit[substatusVisitIndex.row]._id}, currentAppointment.lead._id);
    await createComment(BodyComment, currentAppointment.lead._id)
    await createVisit({ substatus: substatusVisit[substatusVisitIndex.row]._id, lead: currentAppointment.lead._id, store: currentAppointment.lead.store._id, user: currentAppointment.lead.agent._id });
    await updateAppointment({status: false}, item._id);
    if(currentAppointment && currentAppointment.lead && currentAppointment.lead.comments && currentAppointment.lead.comments[0]){
      await updateComment({pending: false}, currentAppointment.lead.comments[currentAppointment.lead.comments.length - 1]._id);
    }
    navigation.pop();

    // await getAppointmentsByUser(user._id);

  }else{

    Toast.show({
      text1: "Agrega un agente primero",
      type: "error",
      position: "bottom",
    });
   
  }

  }

  const renderAndroidPicker = (state) => {

    if(state === true){
      return (
        <DateTimePicker
        value={currentAppointment.startDate}
        mode="date"
        display="spinner"
        onChange={onChangeAndroid}
        />
      )
    }
  }

  const handleSaveSubstatusAppointment = async() => {
    let bodyAppointment = {
      substatus: substatusAppointment[substatusAppointmentIndex.row]._id,
    }

    if(substatusAppointment[substatusAppointmentIndex.row]._id === '605bd729bed49524ae40f889' || substatusAppointment[substatusAppointmentIndex.row]._id === '605bd717bed49524ae40f888'){
      bodyAppointment.status = false;
    }

    await updateLead({status: "604f80222b372e0cb11966dc", substatus: substatusAppointment[substatusAppointmentIndex.row]._id}, currentAppointment.lead._id);

    await updateAppointment(bodyAppointment, item._id)

    Toast.show({
      text1: "Cita Actualizada",
      type: "success",
      position: "bottom",
    });
    if(substatusAppointment[substatusAppointmentIndex.row]._id === '605bd729bed49524ae40f889' || substatusAppointment[substatusAppointmentIndex.row]._id === '605bd717bed49524ae40f888'){
      navigation.pop();
    }


  }

  const handleSaveAppointment = async() => {
    if(currentAppointment.description === '' || currentAppointment.title === ''){
      return Toast.show({
        text1: "Por favor llena todos los campos",
        type: "error",
        position: "bottom",
      });
    }

    let endDate = moment(currentAppointment.startDate).add((time.row + 1), 'hours');
    await updateAppointment({
      title: currentAppointment.title, 
      description: currentAppointment.description, 
      startDate: currentAppointment.startDate, 
      endDate
    }, item._id);

    Toast.show({
      text1: "Cita Actualizada",
      type: "success",
      position: "bottom",
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      if (item && item._id) getAppointment(item._id);
    }, [item])
  );

  useFocusEffect(
    React.useCallback(() => {
      getSubstatuses()
    }, [])
  );


  useFocusEffect(
    React.useCallback(() => {
      if (substatuses && currentAppointment && currentAppointment.lead) {
        let sA = [];
        let sV = [];

        let cA = 0;
        let cV = 0;
        substatuses.map(item => {
          if(item.status === '604f80222b372e0cb11966dc'){
            sA.push(item);
            if(item._id.toString() === currentAppointment.substatus._id){
              setSubstatusAppointmentIndex(new IndexPath(cA))
            }
            cA ++;
          }

          if(item.status === '6064f8065b21e51052eed547' && item.name !== 'frontdesk'){
            sV.push(item);
            cV ++;
          }
        })
        setSubstatusAppointment(sA);
        setSubstatusVisit(sV);
      }
    }, [substatuses, currentAppointment])
  );

  useEffect(() => {
    if(appointment && appointment._id){
      let timeDif = moment(appointment.endDate).diff(appointment.startDate, 'hours');

      setTime({row: (timeDif-1)})

      setCurrentAppointment({ 
        substatus: appointment.substatus,
        lead: {
          agent: appointment.lead.agent,
          _id: appointment.lead._id,
          name: appointment.lead.name,
          email: appointment.lead.email,
          phone: appointment.lead.phone,
          store: appointment.lead.store,
          comments: appointment.lead.comments
        },
        title: appointment.title,
        description: appointment.description, 
        startDate: new Date(appointment.startDate)
      })
    }
  }, [appointment])

  moment.locale("es-mx");
 
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setCurrentAppointment({...currentAppointment, startDate: currentDate});
  };

  const onChangeAndroid = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      setCurrentAppointment({...currentAppointment, startDate: selectedDate});
      console.log(selectedDate)
    }
    setOpen(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderTitle title="Appointment Detail" /> 

      <ScrollView>
        <Layout style={{ marginBottom: 20 }}>
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
            level="1"
          >
            <Text category="s1">Nombre</Text>

            <Text category="s1" style={{ textTransform: "capitalize" }}>
              {currentAppointment.lead && currentAppointment.lead.name}
            </Text>
          </Layout>
          <Divider />
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
            level="1"
          >
            <Text category="s1">Email</Text>

            <Text category="s1">
              {currentAppointment.lead && currentAppointment.lead.email}
            </Text>
          </Layout>
          <Divider />
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
            level="1"
          >
            <Text category="s1">Teléfono</Text>

            <Text category="s1">
              {currentAppointment.lead && currentAppointment.lead.phone}
            </Text>
          </Layout>
          <Divider />
        </Layout>
        <Text
          category="s1"
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          Información de Cita
        </Text>
        <Layout>
          <Layout
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            level="1"
          >
            <Text category="s1" style={{ marginBottom: 10 }}>
              Título
            </Text>

            <Input style={{ minWidth: 300 }} onChangeText={(string) => setCurrentAppointment({...currentAppointment, title: string})} value={currentAppointment.title} />
          </Layout>
        </Layout>
        <Layout>
          <Layout
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            level="1"
          >
            <Text category="s1" style={{ marginBottom: 10 }}>
              Información
            </Text>

            <Input style={{ minWidth: 300 }} onChangeText={(string) => setCurrentAppointment({...currentAppointment, description: string})} value={currentAppointment.description} />
          </Layout>
          <Layout>
            <Layout
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              level="1"
            >
              <Text category="s1" style={{ marginBottom: 10 }}>
                Fecha de Inicio
              </Text>
              {
                Platform.OS === 'ios' &&
                <DateTimePicker
                  value={currentAppointment.startDate}
                  mode="ios"
                  onChange={onChange}
                  display="spinner"
                />
              }
              {
                Platform.OS === 'android' &&
                <Button style={{ marginBottom: 20, marginTop: 20 }} onPress={()=>setOpen(true)}>Seleccionar Fecha</Button>
              }
              {
                Platform.OS === 'android' &&
                renderAndroidPicker(open)
              }
              
            </Layout>
          </Layout>
          <Layout>
            <Layout
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              level="1"
            >
              <Text category="s1" style={{ marginBottom: 10 }}>
                Duración
              </Text>
              <Select size="large" style={{ marginBottom: 10 }} onSelect={(index) => setTime(index)} value="Selecciona" value={displayValueTime}>
                {times.map((action, i) => (
                  <SelectItem title={action} key={i}  />
                ))}
              </Select>
              {/* <Input style={{ minWidth: 300 }} value={"1 Hora"} /> */}
              <Button style={{ marginBottom: 20, marginTop: 20 }} onPress={handleSaveAppointment}>Guardar</Button>
            </Layout>
          </Layout>

          <Divider style={{ marginBottom: 20 }} />

          <Layout
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            level="1"
          >
            <Text
              category="s1"
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              Elige el Estatus de la Cita
            </Text>

            <Select
              size="large"
              style={{ marginBottom: 10 }}
              onSelect={(index) => setSubstatusAppointmentIndex(index)} 
              selectedIndex={substatusAppointmentIndex}  
              value={displaySubstatusAppointment && translateSubstatus(displaySubstatusAppointment.name)}
            >
              {
                substatusAppointment.map(item => 
                  <SelectItem title={translateSubstatus(item.name)} key={item.name}/>
                )
              }
             
            </Select>

            <Button style={{ marginBottom: 20, marginTop: 20 }}onPress={handleSaveSubstatusAppointment}>
              Actualizar Estatus
            </Button>
          </Layout>
          {
            currentAppointment && currentAppointment.substatus && (currentAppointment.substatus._id === "605bd6c4bed49524ae40f886" || currentAppointment.substatus._id === "605bce8ba04514212f1fac67") &&
          <>
          <Divider />
          <Layout
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}
            level="1"
          >
            <Text
              category="s1"
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              Elige el Estatus de la Visita
            </Text>

            <Input
              style={{ minWidth: 300, marginBottom: 10 }}
              value={textVisit}
              onChangeText={(string)=>setTextVisit(string)}
            />

            <Select
              size="large"
              style={{ marginBottom: 10 }}
              onSelect={(index) => setSubstatusVisitIndex(index)} 
              selectedIndex={substatusVisitIndex}  
              value={displaySubstatusVisit && displaySubstatusVisit.name}
            >
               {
                substatusVisit.map(item => 
                  <SelectItem title={translateSubstatus(item.name)} key={item.name}/>
                )
              }
            </Select>
          </Layout>
          <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
            <Button onPress={handleSaveVisit}>Crear Visita</Button>
          </Layout>
          </>
          }

        </Layout>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentDetail;
