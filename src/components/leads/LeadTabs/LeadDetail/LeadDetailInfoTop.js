import React, { useEffect, useState } from "react";
import { StyleSheet, Linking } from "react-native";
import { Layout, Text, Button, Icon } from "@ui-kitten/components";
import useActivity from "../../../../hooks/useActivity";
import useAuth from "../../../../hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { CapitalizeNames } from "../../../../utils/Capitalize";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import useLead from "../../../../hooks/useLead";
import { isAdmin, isGeneralManager, isRockstar, isSalesManager, isSuper, isUser } from "../../../../utils/Authroles";
import useComment from "../../../../hooks/useComment";
// import * as Contacts from "expo-contacts";

const LeadDetailInfoTop = ({ item, loading }) => {
  const navigation = useNavigation();
  const { createActivity } = useActivity();
  const { user } = useAuth();
  const [isReject, setReject] = useState(false)
  const { createComment } = useComment()
  const { updateLead, setRejected } = useLead();

  useFocusEffect(
    React.useCallback(() => {
      let enable = false;


      if(item && item.substatus && !(item.substatus._id === "60ae5d5f60638f03e9c629ce" || item.substatus._id === '605cbaafd5fc4809e161c526')){

        if( user && user.tier && (isRockstar(user.tier._id) || isSuper(user.tier._id) || isAdmin(user.tier._id))){
          enable = true;
        }
  
        if(user && user.tier && isUser(user.tier._id) && item && item.comments && item.comments.length >= 7)
        {
  
          item.comments.map(comment => aux.push( moment(comment.createdAt).format('DD MMMM YYYY') ))
  
          if(_.uniqBy(aux).length >= 7){
            enable = true
          }
  
        }

        
      }else{
        enable = false;
      }

      if(item && item.substatus && item.substatus._id && (item.substatus._id === "60ae5d5f60638f03e9c629ce" || item.substatus._id === '605cbaafd5fc4809e161c526')){
        setRejected(true)
      }

      setReject(enable)

      return () => { 
        setReject(false)
        setRejected(false)
      }
    
    },[user, item])
  );

  const handleReject = async(lead) => {
    
    let author = '';
    let userId = '';

    if(!lead.agent){
      return Toast.show({
        text1: "Primero asigna a un asesor",
        type: "error",
        position: "bottom",
      });
    }

    if(user && user.tier && (isRockstar(user.tier._id) || isAdmin(user.tier._id) || isSuper(user.tier._id)) && lead.agent && lead.agent._id){
        userId = lead.agent._id;
        author = user._id;
    }

    if(user && user.tier && isUser(user.tier._id)){
      userId = user._id;
    }

    let BodyComment = {
      comment: 'Lead rechazado desde el app',
      action: ["rejected"],
      pending: false,
      store: lead.store._id
    }

    if(userId === ''){
      BodyComment.user = user._id;
    }else{
      BodyComment.user = userId;
    }

    if(author !== ''){
      BodyComment.assignedBy = author;
    }

    await createComment(BodyComment, lead._id)

    let bodyStatus = {};

    if(lead.status._id === '6064f8065b21e51052eed547'){
      bodyStatus.status = '6064f8065b21e51052eed547';
      bodyStatus.substatus = '60ae5d5f60638f03e9c629ce';
    }else{
      bodyStatus.status = '605bd4e80a4330245535db3c';
      bodyStatus.substatus = '605cbaafd5fc4809e161c526';
    }
    await updateLead(bodyStatus, lead._id);
    return Toast.show({
      text1: "Lead rechazado con exito",
      type: "success",
      position: "bottom",
    });
  }

  const handleRecover = async() => {
    await updateLead({status: "605bd4e80a4330245535db3c", substatus: "605bd5e1bed49524ae40f883", isContacted: true}, item._id)
    return Toast.show({
      text1: "Lead recuperado con exito",
      type: "success",
      position: "bottom",
    });
  }

  // const AddContact = async (name, phone) => {
  //   const { data } = await Contacts.getContactsAsync({
  //     fields: [Contacts.Fields.PhoneNumbers],
  //   });

  //   const contact = {
  //     [Contacts.Fields.FirstName]: name,
  //     [Contacts.Fields.PhoneNumbers]: [
  //       {
  //         number: phone,
  //         isPrimary: true,
  //         digits: phone.replace("+", ""),
  //         countryCode: "mx",
  //         label: "main",
  //       },
  //     ],
  //   };

  //   let exists = false;
  //   data.map((item) => {
  //     item.phoneNumbers &&
  //       item.phoneNumbers.map((phoneContact) => {
  //         if (phoneContact.number === phone) {
  //           exists = true;
  //         }
  //       });
  //   });

  //   if (!exists) {
  //     await Contacts.addContactAsync(contact);
  //   }
  // };

  return (
    <>
      <Layout style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          category="s1"
          style={{
            fontSize: 25,
            marginTop: 25,
            marginBottom: 5,
            textTransform: "capitalize",
            textAlign: "center",
          }}
        >
          {item.name}
        </Text>
      </Layout>
      <Layout style={styles.ContainerTop}>
    
        <Layout style={styles.containerIcon}>
          <Ionicons name="logo-whatsapp" size={30} color="#4bd366" 
            onPress={() => {
              createActivity({
                action: "wsp",
                description: `${CapitalizeNames(
                  user.name
                )} has sent a whatsapp from mobile App`,
                lead: item._id,
              });

              // AddContact(CapitalizeNames(item.name), item.phone);

              Linking.openURL(`http://api.whatsapp.com/send?phone=${item.phone}`);
            }}
          />
        </Layout>
        <Layout style={styles.containerIcon}>
          <Ionicons name="phone-portrait-outline" size={30} color="#1299de" 
            onPress={() => {
              createActivity({
                action: "call",
                description: `${CapitalizeNames(
                  user.name
                )} has made a phone call to ${CapitalizeNames(
                  item.name
                )} from mobile App`,
                lead: item._id,
              });
              Linking.openURL(`tel:${item.phone}`);
            }}
          />
        </Layout>
        <Layout style={styles.containerIcon}>
          <Ionicons name="mail-outline" size={30} color="#d66836" onPress={() => { navigation.navigate("SendDocumentation") }} />
        </Layout>
        <Layout style={styles.containerIcon}>
          <Ionicons name="calendar-sharp" size={30} color="#535de2" onPress={() => navigation.navigate("AddAppointment")}/>
        </Layout>
        {
          isReject &&
          <Layout style={styles.containerIcon}>
            <Icon 
              style={styles.icon}
              fill='#b52d2d'
              name='slash'
              onPress={()=>handleReject(item)}
              />
          </Layout> 
        }


        {
          user && user.tier && (isRockstar(user.tier._id) || isSalesManager(user.tier._id) || isSuper(user.tier._id) || isAdmin(user.tier._id) || isGeneralManager(user.tier._id)) &&
          item && item.substatus && (item.substatus._id === "60ae5d5f60638f03e9c629ce" || item.substatus._id === '605cbaafd5fc4809e161c526') &&
          <Layout style={styles.containerIcon}>
            <Icon 
              style={styles.icon}
              fill='#3da644'
              name='checkmark-circle-outline'
              onPress={()=>handleRecover(item)}
              />
          </Layout> 
        }
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30
  },
  containerIcon: {
    width: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },  
  tabContainer: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  button:{
  },
  ContainerTop: {
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },


});

export default LeadDetailInfoTop;
