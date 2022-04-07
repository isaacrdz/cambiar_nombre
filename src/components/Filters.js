import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import moment from 'moment';
import useAuth from "../hooks/useAuth";
import SelectStore from "./SelectStore";
import SelectCarType from "./SelectCarType";
import SelectDate from "./SelectDate";

 


const Filters = ({filters, setQuery}) => {
	const [date, setDate] = useState(
		`&createdAt[gte]=${moment()
		  .startOf("year")
		  .format()}&createdAt[lt]=${moment().endOf("year").format()}`
	      );

 	const [selectedStores, setSelectedStores] = useState(false);
	const { user } = useAuth();

 	const [carType, setCarType] = useState(false);

	const [custom, setCustom] = useState({date: `&createdAt[gte]=${moment().startOf("year").format()}&createdAt[lt]=${moment().endOf("month").format()}`,filter: "MMM",});

	useFocusEffect(
		React.useCallback(() => {
			
		}, [user])
	);

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


	return(<>
	{filters.includes('stores') &&
        <SelectStore setSelectedStores={setSelectedStores}/>
	}
	{filters.includes('carType') &&
    	<SelectCarType carType={carType} setCarType={setCarType} />
	}
	{filters.includes('date') &&
        <SelectDate setDate={setDate} getFilter={setCustom} />
	}
	</>)
}
export default Filters;
