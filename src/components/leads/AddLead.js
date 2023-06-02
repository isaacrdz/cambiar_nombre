import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
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
import {
  isEmail,
  isPhoneNumber,
  isYear,
  justLetters,
  justNumbers,
} from "../../utils/Validations";
import { CapitalizeNames } from "../../utils/Capitalize";
import useStore from "../../hooks/useStore";

// Rockstar
// import useStore from '../../hooks/useStore';
import useAuth from "../../hooks/useAuth";
import useVehicle from "../../hooks/useVehicle";
import useSource from "../../hooks/useSource";
import useCompany from "../../hooks/useCompany";
import useList from "../../hooks/useList";
import useLead from "../../hooks/useLead";
import { isAdmin, isRockstar, isSuper, isUser } from "../../utils/Authroles";

const AddLead = ({ navigation }) => {
  //States
  //Rockstar
  // const { stores, getStores } = useStore();
  const { user } = useAuth();
  const { vehicles, getVehiclesByMake } = useVehicle();
  const { sources, getSources } = useSource();
  const { companies, getCompanies } = useCompany();
  const { stores, getStores } = useStore();
  const { lists, getListsByStore } = useList();
  const { createLead, error, clearError } = useLead();

  //CarType
  const carTypes = ["Nuevo", "Seminuevo"];
  const [carTypeSelect, setCarTypeSelect] = useState(new IndexPath(0));
  const displayCarType = carTypes[carTypeSelect.row];

  //Stores
  const [tiendas, setTiendas] = useState([""]);
  const [storeSelect, setStoreSelect] = useState(new IndexPath(0));
  const displayStore = tiendas[storeSelect.row];

  //Models
  const [models, setModels] = useState([""]);
  const [modelSelect, setModelSelect] = useState(new IndexPath(0));
  const displayModel = models[modelSelect.row];

  //Timeframes
  const timeframes = [
    "Solo Información",
    "1 Mes o Menos",
    "2 Meses",
    "3 Meses o Más",
  ];
  const [timeframeSelect, setTimeframeSelect] = useState(new IndexPath(0));
  const displayTimeframe = timeframes[timeframeSelect.row];

  //Sources
  const [fuentes, setFuentes] = useState([""]);
  const [fuentesSelect, setFuentesSelect] = useState(new IndexPath(0));
  const displayFuente = fuentes[fuentesSelect.row];

  //Company
  const [companias, setcompanias] = useState([""]);
  const [companySelect, setCompanySelect] = useState(new IndexPath(0));
  const displayCompany = companias[companySelect.row];

  //List
  const [listas, setListas] = useState([""]);
  const [listaSelect, setListaSelect] = useState(new IndexPath(0));
  const displayLista = listas[listaSelect.row];
  const [disableButton, setDisableButton] = useState(false);

  const [currentLead, setCurrentLead] = useState({
    name: "",
    email: "",
    phone: "",
    year: "",
    downPayment: "",
    comment: "",
  });

  const handleSubmit = async () => {
    if (!justLetters(currentLead.name)) {
      return Toast.show({
        text1: "Agrega un nombre válido.",
        type: "error",
        position: "bottom",
      });
    }

    if (!isEmail(currentLead.email)) {
      return Toast.show({
        text1: "Agrega un correo válido. Ejemplo@ejemplo.com",
        type: "error",
        position: "bottom",
      });
    }

    if (!isPhoneNumber(currentLead.phone)) {
      return Toast.show({
        text1: "Agrega un numero de teléfono válido (10 Digitos).",
        type: "error",
        position: "bottom",
      });
    }

    if (!isYear(currentLead.year)) {
      return Toast.show({
        text1: "Agrega un año válido.",
        type: "error",
        position: "bottom",
      });
    }

    if (!justNumbers(currentLead.downPayment)) {
      return Toast.show({
        text1: "Agrega un enganche válido.",
        type: "error",
        position: "bottom",
      });
    }

    if (!vehicles || vehicles.length === 0) {
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
    };

    if (
      user &&
      user.tier &&
      (isUser(user.tier._id) || isAdmin(user.tier._id))
    ) {
      data.store = user.stores[storeSelect.row]._id;
    }

    if (
      user &&
      user.tier &&
      (isRockstar(user.tier._id) || isSuper(user.tier._id))
    ) {
      data.store = stores[storeSelect.row]._id;
    }

    let timeFrame = new Date();

    if (user && user.tier && isUser(user.tier._id)) {
      data.agent = user._id;
    }
    if (timeframeSelect.row === 0) {
      timeFrame = moment(0).format();
    } else if (timeframeSelect.row === 1) {
      timeFrame = moment(timeFrame).add(1, "month");
    } else if (timeframeSelect.row === 2) {
      timeFrame = moment(timeFrame).add(2, "months");
    } else if (timeframeSelect.row === 3) {
      timeFrame = moment(timeFrame).add(3, "months");
    }

    data.timeFrame = timeFrame;

    if (companySelect.row !== 0) {
      data.company = companies[companySelect.row - 1]._id;
    }

    if (listaSelect.row !== 0) {
      data.lists = [lists[listaSelect.row - 1]._id];
    }

    if (currentLead.comment !== "") {
      data.comment = currentLead.comment;
    }

    await createLead(data);

    if (error) {
      Toast.show({
        text1: error,
        type: "error",
        position: "bottom",
      });

      setTimeout(() => clearError(), 2000);
    } else {
      Toast.show({
        text1: "Lead Creado",
        type: "success",
        position: "bottom",
      });

      navigation.pop();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (
        user &&
        user.tier &&
        (isAdmin(user.tier._id) || isUser(user.tier._id)) &&
        user.stores
      ) {
        getVehiclesByMake(user.stores[0].make._id);
        getListsByStore(user.stores[0]._id);
      }

      if (
        user &&
        user.tier &&
        (isRockstar(user.tier._id) || isSuper(user.tier._id))
      ) {
        getStores();
      }

      getSources();
      getCompanies();
    }, [])
  );

  useEffect(() => {
    if (user.tier && isUser(user.tier._id)) {
      setDisableButton(true);
    }

    if (
      user.tier &&
      isAdmin(user.tier._id) &&
      user.stores &&
      user.stores.length <= 1
    ) {
      setDisableButton(true);
    }
  }, [user]);

  useEffect(() => {
    if (
      user.stores &&
      user.tier &&
      !isRockstar(user.tier._id) &&
      !isSuper(user.tier._id)
    ) {
      let aux = [];
      user.stores.map((item) =>
        aux.push(CapitalizeNames(item.make.name + " " + item.name))
      );
      setTiendas(aux);
    }
  }, [user]);

  useEffect(() => {
    if (
      stores &&
      user.tier &&
      (isRockstar(user.tier._id) || isSuper(user.tier._id))
    ) {
      let aux = [];
      stores.map((item) =>
        aux.push(CapitalizeNames(item.make.name + " " + item.name))
      );
      setTiendas(aux);
    }
  }, [stores]);

  useEffect(() => {
    if (vehicles) {
      let aux = [];
      vehicles.map((item) => aux.push(CapitalizeNames(item.model)));
      setModels(aux);
    }
  }, [vehicles]);

  useEffect(() => {
    if (sources) {
      let aux = [];
      sources.map((item) => aux.push(CapitalizeNames(item.name)));
      setFuentes(aux);
    }
  }, [sources]);

  useEffect(() => {
    if (companies) {
      let aux = ["Selecciona una compañía"];
      companies.map((item) => aux.push(CapitalizeNames(item.name)));
      setcompanias(aux);
    }
  }, [companies]);

  useEffect(() => {
    if (lists) {
      let aux = ["Selecciona una lista"];
      lists.map((item) => aux.push(CapitalizeNames(item.name)));
      setListas(aux);
    }
  }, [lists]);

  let paddingTop = 0;

  if (Platform.OS === "android") {
    paddingTop = 30;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop }}>
      <HeaderTitle title="Crear Lead" />
      <ScrollView>
        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Layout style={{ marginBottom: 20 }} level="1">
            <Text style={{ ...styles.text, marginBottom: 20 }} category="s1">
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
                style={{ width: "100%" }}
                onChangeText={(name) =>
                  setCurrentLead({ ...currentLead, name })
                }
              />
            </Layout>
          </Layout>
          <Layout style={{ marginBottom: 20 }} level="1">
            <Text style={{ ...styles.text, marginBottom: 20 }} category="s1">
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
                style={{ width: "100%" }}
                onChangeText={(email) =>
                  setCurrentLead({ ...currentLead, email })
                }
              />
            </Layout>
          </Layout>
          <Layout style={{ marginBottom: 20 }} level="1">
            <Text style={{ ...styles.text, marginBottom: 20 }} category="s1">
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
                style={{ width: "100%" }}
                onChangeText={(phone) =>
                  setCurrentLead({ ...currentLead, phone })
                }
              />
            </Layout>
          </Layout>
          <Layout style={{ marginBottom: 20 }} level="1">
            <Text style={{ ...styles.text, marginBottom: 20 }} category="s1">
              Tipo de Unidad
            </Text>
            <Select
              size="large"
              style={{ marginBottom: 10 }}
              onSelect={(index) => setCarTypeSelect(index)}
              value={displayCarType}
            >
              {carTypes.map((item) => (
                <SelectItem title={item} key={item} />
              ))}
            </Select>
          </Layout>
          <Layout style={{ marginBottom: 20 }} level="1">
            <Text style={{ ...styles.text, marginBottom: 20 }} category="s1">
              Agencia
            </Text>
            <Select
              size="large"
              style={{ marginBottom: 10 }}
              disabled={disableButton}
              onSelect={(index) => {
                setStoreSelect(index);
                if (
                  user &&
                  user.tier &&
                  (isSuper(user.tier._id) || isRockstar(user.tier._id))
                ) {
                  getVehiclesByMake(stores[index].make._id);
                }
              }}
              value={displayStore}
            >
              {tiendas.map((item) => (
                <SelectItem title={CapitalizeNames(item)} key={item} />
              ))}
            </Select>
          </Layout>
          <Layout style={{ marginBottom: 20 }} level="1">
            <Text style={{ ...styles.text, marginBottom: 20 }} category="s1">
              Modelo
            </Text>

            <Select
              size="large"
              style={{ marginBottom: 10 }}
              onSelect={(index) => setModelSelect(index)}
              value={displayModel}
            >
              {vehicles.map((item) => (
                <SelectItem
                  title={CapitalizeNames(item.model)}
                  key={item._id}
                />
              ))}
            </Select>
          </Layout>
          <Layout style={{ marginBottom: 20 }} level="1">
            <Text style={{ ...styles.text, marginBottom: 20 }} category="s1">
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
                style={{ width: "100%" }}
                onChangeText={(year) =>
                  setCurrentLead({ ...currentLead, year })
                }
              />
            </Layout>
          </Layout>
          <Layout style={{ marginBottom: 20 }} level="1">
            <Text style={{ ...styles.text, marginBottom: 20 }} category="s1">
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
                style={{ width: "100%" }}
                onChangeText={(downPayment) =>
                  setCurrentLead({ ...currentLead, downPayment })
                }
              />
            </Layout>
          </Layout>
          <Layout style={{ marginBottom: 20 }} level="1">
            <Text style={{ ...styles.text, marginBottom: 20 }} category="s1">
              Tiempo de Compra
            </Text>

            <Select
              size="large"
              style={{ marginBottom: 10 }}
              onSelect={(index) => setTimeframeSelect(index)}
              value={displayTimeframe}
            >
              {timeframes.map((item) => (
                <SelectItem title={item} key={item} />
              ))}
            </Select>
          </Layout>
          <Layout style={{ marginBottom: 20 }} level="1">
            <Text style={{ ...styles.text, marginBottom: 20 }} category="s1">
              Fuente
            </Text>

            <Select
              size="large"
              style={{ marginBottom: 10 }}
              onSelect={(index) => setFuentesSelect(index)}
              value={displayFuente}
            >
              {fuentes.map((item) => (
                <SelectItem title={CapitalizeNames(item)} key={item} />
              ))}
            </Select>
          </Layout>
          <Layout style={{ marginBottom: 20 }} level="1">
            <Text style={{ ...styles.text, marginBottom: 20 }} category="s1">
              Compañía
            </Text>

            <Select
              size="large"
              style={{ marginBottom: 10 }}
              onSelect={(index) => setCompanySelect(index)}
              value={displayCompany}
            >
              {companias.map((item) => (
                <SelectItem title={CapitalizeNames(item)} key={item} />
              ))}
            </Select>
          </Layout>
          <Layout style={{ marginBottom: 20 }} level="1">
            <Text style={{ ...styles.text, marginBottom: 20 }} category="s1">
              Lista
            </Text>

            <Select
              size="large"
              style={{ marginBottom: 10 }}
              onSelect={(index) => setListaSelect(index)}
              value={displayLista}
            >
              {listas.map((item) => (
                <SelectItem title={CapitalizeNames(item)} key={item} />
              ))}
            </Select>
          </Layout>
          <Layout style={{ marginBottom: 20 }} level="1">
            <Text style={{ ...styles.text, marginBottom: 20 }} category="s1">
              Comentario
            </Text>

            <Input
              multiline={true}
              placeholder="Comentario"
              textStyle={{ minHeight: 64 }}
              style={{ width: "100%" }}
              value={currentLead.comment}
              onChangeText={(comment) =>
                setCurrentLead({ ...currentLead, comment: comment })
              }
            />
          </Layout>
          <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
            <Button style={styles.button} onPress={handleSubmit}>
              Crear Lead
            </Button>
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
