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
import { justNumbers } from "../../utils/Validations";
import { CapitalizeNames } from "../../utils/Capitalize";

// Rockstar
// import useStore from '../../hooks/useStore';
import useAuth from "../../hooks/useAuth";
import useVehicle from '../../hooks/useVehicle';
import useSource from "../../hooks/useSource";
import useCompany from "../../hooks/useCompany";
import useList from "../../hooks/useList";
import useLead from "../../hooks/useLead";

const AddLead = ({ navigation }) => {

    //States
    //Rockstar
    // const { stores, getStores } = useStore();
    const { user } = useAuth();
    const { vehicles, getVehiclesByMake } = useVehicle();
    const { sources, getSources } = useSource();
    const { companies, getCompanies } = useCompany();
    const { lists, getListsByStore } = useList();

    //CarType
    const carTypes = ["Nuevo", "Seminuevo"];
    const [carTypeSelect, setCarTypeSelect] = useState(new IndexPath(0))
    const displayCarType = carTypes[carTypeSelect.row];

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

    const [currentLead, setCurrentLead] = useState({
        name: '',
        email: '',
        phone: '',
        carType: 'nuevo',
        store: '',
        model: '',
        year: '',
        downPayment: 0,
        timeFrame: '',
        company: '',
        list: '',
        comment: ''
    })

    const handleSubmit = () => {

        return Toast.show({
            text1: "Aun no crea el lead, estoy haciendo las validaciones de los campos",
            type: "error",
            position: "bottom",
          });
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
            getSources()
            getCompanies()
        }, [])
    );

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
            let aux = [];
            companies.map(item => aux.push(CapitalizeNames(item.name)))
            setcompanias(aux);
        }
    },[companies])

    useEffect(()=>{
        if(lists){
            let aux = [""];
            lists.map(item => aux.push(CapitalizeNames(item.name)))
            setListas(aux);
        }
    },[lists])
 
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <HeaderTitle title="Crear Lead" />
        <ScrollView>
            <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                <Layout style={{ marginBottom: 20 }} level="1">
                    <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
                        Nombre
                    </Text>
                    <Layout
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                    }}
                    level="1"
                    >
                    <Input
                        multiline={true}
                        placeholder="Nombre"
                        style={{ minWidth: 400 }}
                        onChangeText={(name) => setCurrentLead({...currentLead, name})}
                    />
                    </Layout>
                </Layout>
                <Layout style={{ marginBottom: 20 }} level="1">
                    <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
                        Correo Eléctronico
                    </Text>
                    <Layout
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                    }}
                    level="1"
                    >
                    <Input
                        multiline={true}
                        placeholder="Correo Eléctronico"
                        style={{ minWidth: 400 }}
                        onChangeText={(email) => setCurrentLead({...currentLead, email})}
                    />
                    </Layout>
                </Layout>
                <Layout style={{ marginBottom: 20 }} level="1">
                    <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
                        Teléfono
                    </Text>
                    <Layout
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                    }}
                    level="1"
                    >
                    <Input
                        multiline={true}
                        placeholder="Teléfono"
                        style={{ minWidth: 400 }}
                        onChangeText={(phone) => setCurrentLead({...currentLead, phone})}
                    />
                    </Layout>
                </Layout>
                <Layout style={{ marginBottom: 20 }} level="1">
                    <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
                        Tipo de Unidad
                    </Text>
                    <Select
                        size="large"
                        style={{ marginBottom: 10 }}
                        onSelect={(index)=>setCarTypeSelect(index)}
                        value={displayCarType}
                    >
                        {
                            carTypes.map(item => <SelectItem title={item} key={item}/>)
                        }
                    </Select>
                </Layout>
                <Layout style={{ marginBottom: 20 }} level="1">
                    <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
                        Agencia
                    </Text>
                   
                    <Select
                        size="large"
                        style={{ marginBottom: 10 }}
                        disabled={user && user.role && (user.role === 'user' || user.role === 'admin')}
                        onSelect={(index)=>setCarTypeSelect(index)}
                        value={user && user.stores && user.stores[0] && CapitalizeNames(user.stores[0].make.name + ' ' + user.stores[0].name)}
                    >
                        {/*Rockstar*
                        {
                            stores.map(item => <SelectItem title={CapitalizeNames(item.make.name + ' ' + item.name)} />)
                        } */}
                    </Select>
                </Layout>
                <Layout style={{ marginBottom: 20 }} level="1">
                    <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
                        Modelo
                    </Text>
                   
                    <Select
                        size="large"
                        style={{ marginBottom: 10 }}
                        onSelect={(index)=>setModelSelect(index)}
                        value={displayModel}
                    >
                        {
                            vehicles.map(item => <SelectItem title={CapitalizeNames(item.model)} key={item._id}/>)
                        } 
                    </Select>
                </Layout>
                <Layout style={{ marginBottom: 20 }} level="1">
                    <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
                        Año
                    </Text>
                    <Layout
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                    }}
                    level="1"
                    >
                    <Input
                        multiline={true}
                        placeholder="Año"
                        style={{ minWidth: 400 }}
                        onChangeText={(year) => setCurrentLead({...currentLead, year})}
                    />
                    </Layout>
                </Layout>
                <Layout style={{ marginBottom: 20 }} level="1">
                    <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
                        Enganche
                    </Text>
                    <Layout
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                    }}
                    level="1"
                    >
                    <Input
                        multiline={true}
                        placeholder="Enganche"
                        style={{ minWidth: 400 }}
                        onChangeText={(downPayment) => setCurrentLead({...currentLead, downPayment})}
                    />
                    </Layout>
                </Layout>
                <Layout style={{ marginBottom: 20 }} level="1">
                    <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
                        Tiempo de Compra
                    </Text>
                   
                    <Select
                        size="large"
                        style={{ marginBottom: 10 }}
                        onSelect={(index)=>setTimeframeSelect(index)}
                        value={displayTimeframe}
                    >
                        {
                            timeframes.map(item => <SelectItem title={item} key={item}/>)
                        } 
                    </Select>
                </Layout>
                <Layout style={{ marginBottom: 20 }} level="1">
                    <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
                        Fuente
                    </Text>
                   
                    <Select
                        size="large"
                        style={{ marginBottom: 10 }}
                        onSelect={(index)=>setFuentesSelect(index)}
                        value={displayFuente}
                    >
                        {
                            fuentes.map(item => <SelectItem title={CapitalizeNames(item)} key={item}/>)
                        } 
                    </Select>
                </Layout>
                <Layout style={{ marginBottom: 20 }} level="1">
                    <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
                        Compañía
                    </Text>
                   
                    <Select
                        size="large"
                        style={{ marginBottom: 10 }}
                        onSelect={(index)=>setCompanySelect(index)}
                        value={displayCompany}
                    >
                        {
                            companias.map(item => <SelectItem title={CapitalizeNames(item)} key={item}/>)
                        } 
                    </Select>
                </Layout>
                <Layout style={{ marginBottom: 20 }} level="1">
                    <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
                        Lista
                    </Text>
                   
                    <Select
                        size="large"
                        style={{ marginBottom: 10 }}
                        onSelect={(index)=>setListaSelect(index)}
                        value={displayLista}
                    >
                        {
                            listas.map(item => <SelectItem title={CapitalizeNames(item)} key={item}/>)
                        } 
                    </Select>
                </Layout>
                <Layout style={{ marginBottom: 20 }} level="1">
                    <Text style={styles.text} category="s1" style={{ marginBottom: 20 }}>
                        Comentario
                    </Text>
                   
                    <Input
                        multiline={true}
                        placeholder="Comentario"
                        textStyle={{ minHeight: 64 }}
                        style={{ minWidth: 400 }}
                        value={currentLead.description}
                        onChangeText={(comment) => setCurrentLead({...currentLead, description: comment})}
                    />
                </Layout>
                <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
                    <Button style={styles.button} onPress={handleSubmit}>Crear Lead</Button>
                </Layout>
            </Layout>
        </ScrollView>
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

export default AddLead;
