import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { IndexPath, Select, SelectItem, TopNavigationAction, OverflowMenu, MenuItem } from "@ui-kitten/components";
import moment from 'moment';
import useAuth from "../hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { isAdmin, isMarketing, isRockstar, isSuper, isUser } from './../utils/Authroles';
const data = [
 'all',
  'nuevo', 
  'seminuevo'
];

const SelectCarType = ({ carType, setCarType, }) => {

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(1));
  const displayValue = data[selectedIndex.row];
  const { user } = useAuth();

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


  const MenuIcon = (props) => <Ionicons name="car-outline" size={25} />;

  useEffect(() => {
    if(user && user.tier){
      if(user.carType){
        if(user.carType === 'ambos'){
          setCarType('nuevo')
        }else{
          setCarType(user.carType)
        }
      }
    }
    //eslint-disable-next-line
  }, [user]);

  useEffect(()=>{
    switch(selectedIndex.row){
      case 0:
          if(setCarType) setCarType('all')
          return; 
      case 1:
          if(setCarType) setCarType('nuevo')
          return; 
      case 2:
          if(setCarType) setCarType('seminuevo')
          return; 
    
      default:
          if(setCarType) setCarType('nuevo')
          return; 
    }
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
        {data.map((title, i) => (
                                 <MenuItem title={title} key={i}  />
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

export default SelectCarType;
