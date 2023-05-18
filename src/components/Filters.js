import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import SelectStore from "./SelectStore";
import SelectCarType from "./SelectCarType";
import SelectLeadType from "./SelectLeadType";
import SelectSource from "./SelectSource";
import SelectDate from "./SelectDate";

const Filters = ({ filters, setQuery, setSearch, search }) => {
  const [date, setDate] = useState(
    `&createdAt[gte]=${moment()
      .startOf("month")
      .format()}&createdAt[lt]=${moment().endOf("month").format()}`
  );

  const [selectedStores, setSelectedStores] = useState(false);

  const [carType, setCarType] = useState(false);

  const [leadType, setLeadType] = useState(false);

  const [source, setSource] = useState(false);

  const [custom, setCustom] = useState({
    date: `&createdAt[gte]=${moment()
      .startOf("month")
      .format()}&createdAt[lt]=${moment().endOf("month").format()}`,
    filter: "DD MMMM YYYY",
  });

  const generateQuery = () => {
    let car = "";
    let lead = "";
    let sourceFlt = "";

    if (carType) {
      if (carType === "all") car = "";
      else if (carType !== "all") car = `${carType}`;
    }

    if (leadType) {
      if (leadType === "all") lead = "";
      else if (leadType !== "all") lead = `${leadType}`;
    }

    if (source) {
      if (source === "all") sourceFlt = "";
      else if (source !== "all") sourceFlt = `${source}`;
    }

    if (!filters.includes("leadType")) {
      lead = "digital";
    }

    let newQuery = "";
    newQuery += date ? date : "";
    newQuery += `&carType=${car}`;
    newQuery += `&leadType=${lead}`;

    if (sourceFlt !== "") {
      newQuery += `&source=${sourceFlt}`;
    }

    newQuery += selectedStores ? `&store[in]=${selectedStores}` : "";

    setQuery(newQuery.length >= 1 ? newQuery : false);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (carType && selectedStores && selectedStores.length >= 1)
        generateQuery();
    }, [date, carType, leadType, selectedStores, source])
  );

  return (
    <>
      {filters.includes("stores") && (
        <SelectStore
          setSelectedStores={setSelectedStores}
          setSearch={setSearch}
          search={search}
        />
      )}
      {filters.includes("carType") && (
        <SelectCarType
          setCarType={setCarType}
          setSearch={setSearch}
          search={search}
        />
      )}
      {filters.includes("leadType") && (
        <SelectLeadType
          setLeadType={setLeadType}
          setSearch={setSearch}
          search={search}
        />
      )}
      {filters.includes("source") && (
        <SelectSource
          setSource={setSource}
          setSearch={setSearch}
          search={search}
        />
      )}
      {filters.includes("date") && (
        <SelectDate
          setDate={setDate}
          getFilter={setCustom}
          setSearch={setSearch}
          search={search}
        />
      )}
    </>
  );
};
export default Filters;
