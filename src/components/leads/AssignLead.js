import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  Layout,
  Text,
  IndexPath,
  Select,
  SelectItem,
  Button,
  Input,
} from "@ui-kitten/components";
import _ from "lodash";
import moment from "moment";
import HeaderTitle from "../header/HeaderTitle";
import { useFocusEffect } from "@react-navigation/native";
import { isEmail, isPhoneNumber, isYear, justLetters, justNumbers } from "../../utils/Validations";
import { CapitalizeNames } from "../../utils/Capitalize";
import useStore from "../../hooks/useStore";

// Rockstar
// import useStore from '../../hooks/useStore';
import useAuth from "../../hooks/useAuth";
import useVehicle from '../../hooks/useVehicle';
import useSource from "../../hooks/useSource";
import useCompany from "../../hooks/useCompany";
import useList from "../../hooks/useList";
import useLead from "../../hooks/useLead";
const AssignLead = ({ navigation }) => {


    //States
    //Rockstar
    // const { stores, getStores } = useStore();
    const { user } = useAuth();
    const { vehicles, getVehiclesByMake } = useVehicle();
    const { sources, getSources } = useSource();
    const { companies, getCompanies } = useCompany();
    const { stores, getStores } = useStore();
    const { lists, getListsByStore } = useList();
    const { createLead, error, clearError, selectedLeads, assignAgents} = useLead();

    //CarType
    const carTypes = ["Nuevo", "Seminuevo"];
    const [carTypeSelect, setCarTypeSelect] = useState(new IndexPath(0))
    const displayCarType = carTypes[carTypeSelect.row];

    //Stores
    const [tiendas, setTiendas] = useState([""]);
    const [storeSelect, setStoreSelect] = useState(new IndexPath(0))
    const displayStore = tiendas[storeSelect.row];

    //Models
    const [models, setModels] = useState([""]);
    const [modelSelect, setModelSelect] = useState(new IndexPath(0))
    const displayModel = models[modelSelect.row];

    //Timeframes
    const timeframes = ["Solo Información", "1 Mes o Menos", "2 Meses", "3 Meses o Más"];
    const [timeframeSelect, setTimeframeSelect] = useState(new IndexPath(0))
    const displayTimeframe = timeframes[timeframeSelect.row];

    //Sources
    const [fuentes, setFuentes] = useState([""]);
    const [fuentesSelect, setFuentesSelect] = useState(new IndexPath(0))
    const displayFuente = fuentes[fuentesSelect.row];
    
    //Company
    const [companias, setcompanias] = useState([""]);
    const [companySelect, setCompanySelect] = useState(new IndexPath(0))
    const displayCompany = companias[companySelect.row];

    //List
    const [listas, setListas] = useState([""]);
    const [listaSelect, setListaSelect] = useState(new IndexPath(0))
    const displayLista = listas[listaSelect.row];
    const [disableButton, setDisableButton] = useState(false)

    const [currentLead, setCurrentLead] = useState({
        name: '',
        email: '',
        phone: '',
        year: '',
        downPayment: '',
        comment: ''
    })

    const handleSubmit = async() => {
        return;
        if(!justLetters(currentLead.name)){
            return Toast.show({
                text1: "Agrega un nombre válido.",
                type: "error",
                position: "bottom",
              });
        }

        if(!isEmail(currentLead.email)){
            return Toast.show({
                text1: "Agrega un correo válido. Ejemplo@ejemplo.com",
                type: "error",
                position: "bottom",
              });
        }

        if(!isPhoneNumber(currentLead.phone)){
            return Toast.show({
                text1: "Agrega un numero de teléfono válido (10 Digitos).",
                type: "error",
                position: "bottom",
              });
        }

        if(!isYear(currentLead.year)){
            return Toast.show({
                text1: "Agrega un año válido.",
                type: "error",
                position: "bottom",
              });
        }

        if(!justNumbers(currentLead.downPayment)){
            return Toast.show({
                text1: "Agrega un enganche válido.",
                type: "error",
                position: "bottom",
              });
        }

        if(!vehicles || vehicles.length === 0){
            return Toast.show({
                text1: "Agrega un vehículo",
                type: "error",
                position: "bottom",
              });
        }

        let data = {
            name: currentLead.name,
            email: currentLead.email,
            phone: currentLead.phone,
            carType: displayCarType,
            vehicle: vehicles[modelSelect.row]._id,
            year: currentLead.year,
            downPayment: currentLead.downPayment,
            source: sources[fuentesSelect.row]._id,
        }

        if(user && (user.role === 'user' || user.role === 'admin')){
            data.store = user.stores[storeSelect.row]._id
        }

        if(user && (user.role === 'rockstar' || user.role === 'super admin')){
            data.store = stores[storeSelect.row]._id
        }

        let timeFrame = new Date();

        if(user && user.role === 'user'){
            data.agent = user._id
        }
        if(timeframeSelect.row === 0){
            timeFrame = moment(0).format();

        }else if(timeframeSelect.row === 1){
            timeFrame = moment(timeFrame).add(1, 'month');

        }else if(timeframeSelect.row === 2){
            timeFrame = moment(timeFrame).add(2, 'months');

        }else if(timeframeSelect.row === 3){
            timeFrame = moment(timeFrame).add(3, 'months');

        }

        data.timeFrame = timeFrame;

        if(companySelect.row !== 0){
            data.company = companies[companySelect.row - 1]._id;
        }

        if(listaSelect.row !== 0){
            data.lists = [lists[listaSelect.row - 1]._id];
        }

        if(currentLead.comment !== ""){
            data.comment = currentLead.comment;
        }

        await createLead(data);

        if(error){
            Toast.show({
                text1: error,
                type: "error",
                position: "bottom"
            });
        
            setTimeout(() => clearError(), 2000);
        }else{
            Toast.show({
                text1: "Lead Creado",
                type: "success",
                position: "bottom"
            });

            navigation.pop();

        }

    }

    //Esto servira si metemos rockstar
    // useFocusEffect(
    //     React.useCallback(() => {
    //       if (user && user.role && (user.role === 'rockstar' || user.role === 'super admin')) getStores();
    //     }, [])
    // );

    useFocusEffect(
        React.useCallback(() => {
            if (user && user.role && (user.role === 'admin' || user.role === 'user') && user.stores ){
                getVehiclesByMake(user.stores[0].make._id);
                getListsByStore(user.stores[0]._id)
            }

            if (user && user.role && (user.role === 'rockstar' || user.role === 'super admin')){
                getStores();
            }

            getSources()
            getCompanies()
        }, [])
    );


    useEffect(()=>{
        if(user.role === 'user'){
            setDisableButton(true)
        }

        if(user.role === 'admin' && user.stores && user.stores.length <= 1 ){
            setDisableButton(true)
        }


    },[user])

    useEffect(()=>{
        if(user.stores && user.role !== 'rockstar' && user.role !== 'super admin'){
            let aux = [];
            user.stores.map(item => aux.push(CapitalizeNames(item.make.name + ' ' + item.name)))
            setTiendas(aux);
        }
    },[user])

    useEffect(()=>{
        if(stores && (user.role === 'rockstar' || user.role === 'super admin')){
            let aux = [];
            stores.map(item => aux.push(CapitalizeNames(item.make.name + ' ' + item.name)))
            setTiendas(aux);
        }
    },[stores])


    useEffect(()=>{
        if(vehicles){
            let aux = [];
            vehicles.map(item => aux.push(CapitalizeNames(item.model)))
            setModels(aux);
        }
    },[vehicles])

    useEffect(()=>{
        if(sources){
            let aux = [];
            sources.map(item => aux.push(CapitalizeNames(item.name)))
            setFuentes(aux);
        }
    },[sources])

    useEffect(()=>{
        if(companies){
            let aux = ["Selecciona una compañía"];
            companies.map(item => aux.push(CapitalizeNames(item.name)))
            setcompanias(aux);
        }
    },[companies])

    useEffect(()=>{
        if(lists){
            let aux = ["Selecciona una lista"];
            lists.map(item => aux.push(CapitalizeNames(item.name)))
            setListas(aux);
        }
    },[lists])

    let paddingTop = 0;

    if(Platform.OS === 'android'){
      paddingTop = 30;
    }
 
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop }}>
        <HeaderTitle title="Asignar Lead" />
      
        </SafeAreaView>
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

export default AssignLead;
