import React, { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  Layout,
  Button,
  Text,
  Input,
} from "@ui-kitten/components";
import _ from "lodash";
import HeaderTitle from "../../header/HeaderTitle";
import { useFocusEffect } from "@react-navigation/native";
import Documents from "./Documents";
import useLead from "../../../hooks/useLead";
import useDocument from "../../../hooks/useDocument";
import { CapitalizeNames } from "../../../utils/Capitalize";
import useMail from "../../../hooks/useMail";
import { AppLoading } from "expo";

const SendDocumentation = ({ navigation }) => {
  const [currentDocuments, setCurrentDocuments] = useState([])
  const { lead } = useLead();
  const { getDocumentsByStore } = useDocument();
  const { createMailAttachment, error, clearError} = useMail();

  const handleSubmit = async() => {
    let email = {
      email: lead.email,
      lead: lead._id,
      store: lead.store,
      template: `documentation_${lead.store._id}`,
      message: `Estimado ${CapitalizeNames(lead.name)}, aquí le hago llegar toda la información del ${CapitalizeNames(lead.vehicle.make.name)} ${CapitalizeNames(lead.vehicle.model)} ${lead.year} del cual está usted interesado.`,
      subject: 'Documentación',
      type: 'lead'
    }

    let attachments = [];
    let documentsNames = [];
    currentDocuments.map(item => {
      attachments.push(item.file)
      documentsNames.push(item.title)
    })

    console.log(attachments, documentsNames)

    await createMailAttachment(email, attachments, documentsNames);

    if(error){
      Toast.show({
          text1: error,
          type: "error",
          position: "bottom"
      });
  
      setTimeout(() => clearError(), 2000);
    }else{
        Toast.show({
            text1: "Email Enviado",
            type: "success",
            position: "bottom"
        });

        navigation.pop();
    }

  }

  useFocusEffect(
    React.useCallback(() => {
        if (lead && lead.store){
          getDocumentsByStore(lead.store._id);
        }
    }, [lead])
  );

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderTitle title="Enviar Documentación" />
      <ScrollView>
        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Documents currents={currentDocuments} setCurrents={setCurrentDocuments}/>
        </Layout>
        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Input
            placeholder={`Para: ${lead.email}`}
            style={{ minWidth: 400 }}
            disabled
          />
        </Layout>
        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Input
            placeholder="Asunto: Documentación"
            style={{ minWidth: 400 }}
            disabled
          />
        </Layout>
        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Input
            disabled
            multiline={true}
            placeholder={`Estimado ${CapitalizeNames(lead && lead.name)}, aquí le hago llegar toda la información del ${CapitalizeNames(lead && lead.vehicle && lead.vehicle.make.name)} ${CapitalizeNames(lead && lead.vehicle && lead.vehicle.model)} ${lead.year} del cual está usted interesado.`}
            textStyle={{ minHeight: 80 }}
          />
        </Layout>
        <Layout style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Button style={styles.button} onPress={handleSubmit}>Enviar Correo</Button>
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

export default SendDocumentation;