import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { IndexPath, Select, SelectItem, TopNavigationAction, OverflowMenu, MenuItem } from "@ui-kitten/components";
import moment from 'moment';
import useAuth from "../hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { isAdmin, isMarketing, isRockstar, isSuper, isUser } from './../utils/Authroles';
import useMake from '../hooks/useMake';
import { CapitalizeNames } from "../utils/Capitalize";



const SelectMake = ({ carType, setCarType, }) => {
const data = ['uno'];
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(1));
//   const displayValue = data[selectedIndex.row];
  const { user } = useAuth();
  const {makes, getMakes} = useMake();

  const [menuVisible, setMenuVisible] = React.useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const onItemSelect = (index) => {
    setSelectedIndex(index);
    toggleMenu();
  };


useEffect(()=>{
	// console.log('hereeeeeeeee',makes[0]);
},[makes]);
  useEffect(()=>{
        //We find the resources here by role
        if(user && user.tier){
	// console.log(user);

        //     if(getSources) getSources(user.tier._id);
            if(getMakes) getMakes(user.tier._id);
        //     if(getStores) getStores(user.tier._id);

        //     if(isSuper(user.tier._id) || isMarketing(user.tier._id) || isGeneralManager(user.tier._id)) if(getAgents) getAgents({role: user.tier._id, store: user.group.stores});
        //     if(isAdmin(user.tier._id)) if(getAgents) getAgents({role: user.tier._id, store: user.stores});
        //     if(isRockstar(user.tier._id)) if(getAgents) getAgents({role: user.tier._id});
            
        }

        //eslint-disable-next-line
    },[user])


  const MenuIcon = (props) => <Ionicons style={{color: "#5764b8"}} name="logo-octocat" size={25} />;

  useEffect(() => {
    if(user && user.tier){
      if(user.carType){
        if(user.carType === 'ambos'){
        //   setCarType('nuevo')
        }else{
        //   setCarType(user.carType)
        }
      }
    }
    //eslint-disable-next-line
  }, [user]);

  useEffect(()=>{
//     switch(selectedIndex.row){
//       case 0:
//           if(setCarType) setCarType('all')
//           return; 
//       case 1:
//           if(setCarType) setCarType('nuevo')
//           return; 
//       case 2:
//           if(setCarType) setCarType('seminuevo')
//           return; 
    
//       default:
//           if(setCarType) setCarType('nuevo')
//           return; 
//     }
},[selectedIndex])

  return (
    <>
    {
      user && user.tier && (
        isRockstar(user.tier._id) || 
        isSuper(user.tier._id) || 
        isMarketing(user.tier._id) ||
            (
                (
                    isAdmin(user.tier._id) ||
                    isUser(user.tier._id) 
                ) && 
                user.carType && 
                user.carType === 'ambos'
            )
        ) && 
         <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}
        onSelect={onItemSelect}
      >
        {makes.map((make, i) => (
                                 <MenuItem title={`${CapitalizeNames(make.name)}`} key={i}  />
                                ))}
      </OverflowMenu>
    }
    </>

        
  );
};

const styles = StyleSheet.create({
  select: {
    flex: 1,
    margin: 2,
  },
});

export default SelectMake;
