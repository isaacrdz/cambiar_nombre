import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import moment from 'moment'
const data = ["Hoy", "Ayer", "Este Mes", "Mes Anterior"];

const SelectDate = ({ setDate, getFilter }) => {

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(2));
  const displayValue = data[selectedIndex.row];

  useEffect(()=>{
      switch(selectedIndex.row){
        case 0:
            if(getFilter) getFilter('HH:00 a')
            return setDate(`&createdAt[gte]=${moment().startOf('day').format()}&createdAt[lt]=${moment().add('1', 'days').startOf('day').format()}`) 
        case 1:
            if(getFilter) getFilter('HH:00 a')
            return setDate(`&createdAt[gte]=${moment().subtract('1','days').startOf('day').format()}&createdAt[lt]=${moment().startOf('day').format()}`)
        case 2:
            if(getFilter) getFilter('DD MMMM YYYY')
            return setDate(`&createdAt[gte]=${moment().startOf('month').format()}&createdAt[lt]=${moment().endOf('month').format()}`)
        case 3:
            if(getFilter) getFilter('DD MMMM YYYY')
            return setDate(`&createdAt[gte]=${moment().subtract('1', 'months').startOf('month').format()}&createdAt[lt]=${moment().subtract('1', 'months').endOf('month').format()}`)
        default:
            if(getFilter) getFilter('DD MMMM YYYY')
            return setDate(`&createdAt[gte]=${moment().startOf('month').format()}&createdAt[lt]=${moment().endOf('month').format()}`)
      }
  },[selectedIndex])

  return (
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
  );
};

const styles = StyleSheet.create({
  select: {
    flex: 1,
    margin: 2,
  },
});

export default SelectDate;
