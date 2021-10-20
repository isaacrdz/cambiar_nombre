import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import moment from 'moment';
import useAuth from "../hooks/useAuth";
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
        <Select
          style={styles.select}
          placeholder="Default"
          value={displayValue}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          {data.map((title, i) => (
            <SelectItem title={title} key={i} />
          ))}
        </Select>
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
