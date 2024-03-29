import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { IndexPath, TopNavigationAction, OverflowMenu, MenuItem } from "@ui-kitten/components";
import useAuth from "../hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { isAdmin, isGeneralManager, isMarketing, isRockstar, isSalesManager, isSuper, isUser } from './../utils/Authroles';
const data = [
 'Todos',
  'Nuevos', 
  'Seminuevos'
];

const SelectCarType = ({ setCarType, setSearch, search }) => {

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


  const MenuIcon = (props) => <Ionicons style={{color: "#5764b8"}} name="car-outline" size={25} />;

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
          if(setCarType) {
            setCarType('all')
            setSearch({ ...search, carType: null })
          }
          return; 
      case 1:
          if(setCarType) {
            setCarType('nuevo')
            setSearch({ ...search, carType: 'Nuevos' })
          }
          return; 
      case 2:
          if(setCarType) {
            setCarType('seminuevo')
            setSearch({ ...search, carType: 'Seminuevos' })
          }
          return; 
      default:
          if(setCarType) {
            setCarType('nuevo')
            setSearch({ ...search, carType: 'Nuevos' })
          }
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
                    isGeneralManager(user.tier._id) ||
                    isSalesManager(user.tier._id) ||
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
