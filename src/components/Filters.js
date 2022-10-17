import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import moment from 'moment';
import SelectStore from "./SelectStore";
import SelectCarType from "./SelectCarType";
import SelectDate from "./SelectDate";

const Filters = ({filters, setQuery, setSearch, search}) => {
	const [date, setDate] = useState(`&createdAt[gte]=${moment().startOf('month').format()}&createdAt[lt]=${moment().endOf('month').format()}`);

 	const [selectedStores, setSelectedStores] = useState(false);

 	const [carType, setCarType] = useState(false);

	 //YEAR
	// const [custom, setCustom] = useState({date: `&createdAt[gte]=${moment().startOf("year").format()}&createdAt[lt]=${moment().endOf("month").format()}`,filter: "MMM",});
	const [custom, setCustom] = useState({date: `&createdAt[gte]=${moment().startOf('month').format()}&createdAt[lt]=${moment().endOf('month').format()}`,filter: "DD MMMM YYYY",});

	const generateQuery = ()=>{
		let car = 'nuevo';

		if(carType){
			if(carType === 'ambos' || carType === 'nuevo') car ='nuevo'
			if(carType === 'seminuevo') car ='seminuevo'
		}
		
		let newQuery = '';
		newQuery += (date)?date:'';
		newQuery += `&carType=${car}`;
		newQuery += (selectedStores)?`&store[in]=${selectedStores}`:'';

		setQuery((newQuery.length>=1)?newQuery:false);
	};

	useFocusEffect(
		React.useCallback(() => {
		  if(carType && selectedStores && selectedStores.length>=1)generateQuery();
		}, [date,carType,selectedStores])
	);


	return(
	<>
		{ filters.includes('stores') && <SelectStore setSelectedStores={setSelectedStores} setSearch={setSearch} search={search}/> }
		{ filters.includes('carType') && <SelectCarType carType={carType} setCarType={setCarType} setSearch={setSearch} search={search}/> }
		{ filters.includes('date') && <SelectDate setDate={setDate} getFilter={setCustom} setSearch={setSearch} search={search}/> }
	</>)
}
export default Filters;
