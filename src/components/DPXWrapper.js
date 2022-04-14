import React from "react";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { getMakesUser, getMultiStoresIds } from "..//utils/storesUser";

import useStore from "../hooks/useStore";
import useSource from "../hooks/useSource";
import useUser from "../hooks/useUser";
import useVehicle from "../hooks/useVehicle";
import useComment from "../hooks/useComment";
import useMake from "../hooks/useMake";
import useAppointment from "../hooks/useAppointment";
// import useFinancialInstitution from '../hooks/useFinancialInstitution';
import useDocument from "../hooks/useDocument";
import useCompany from "../hooks/useCompany";
import useList from "../hooks/useList";
// import useRole from '../hooks/useRole';
// import usePackage from '../hooks/usePackage';
import {
  isAdmin,
  isDigitalMkt,
  isGeneralManager,
  isMarketing,
  isRockstar,
  isSalesManager,
  isSuper,
  isUser,
} from "../utils/Authroles";
import moment from "moment";

const DPXWrapper = ({ children, props }) => {
  const { user } = useAuth();
  //This is where we use all functions to get the data from DB
  const { getSources } = useSource();
  const { getAgents, setAgent } = useUser();
  const { getStores, getStoresByGroup, getStoresByUser } = useStore();
  const { getMakes, setMakesUser } = useMake();
  const { getCompanies } = useCompany();
  const { getLists } = useList();
  // const { getPackages, } = usePackage();
  // const { getFinancialInstitutions } = useFinancialInstitution();
  const { getVehicles, getVehiclesByMultiStore, getAllVehicles } = useVehicle();
  const { getDocuments, getDocumentsByMultiStore } = useDocument();
  const { getCommentsByStore, getCommentsByUser } = useComment();
  const { getAppointmentsByStore, getAppointmentsByUser } = useAppointment();
  import AsyncStorage from "@react-native-async-storage/async-storage";

  // const { getAllRoles, getRolesByGroup } = useRole()

  //Functions that will pass through components and views
  //Every role (and special cases) are separated to get the proper data to each one
  //The response of the server is stored in ever state

  // const getPackagesDPX = async({role, make}) => {
  //   if(isRockstar(role)){
  //     await getPackages()
  //   }
  // }

  const getDocumentsDPX = async ({ role, store }) => {
    if (
      isSuper(role) ||
      isAdmin(role) ||
      isMarketing(role) ||
      isDigitalMkt(role)
    ) {
      await getDocumentsByMultiStore(`&store[in]=${getMultiStoresIds(store)}`);
    } else if (isRockstar(role)) {
      await getDocuments();
    }
  };

  const getAppointmentsDPX = async ({ role, id, store }) => {
    if (isUser(role) || role === "agent") {
      await getAppointmentsByUser(
        id,
        `&startDate[lt]=${moment(new Date()).add(15, "days").format("l")}`
      );
    } else if (isAdmin(role) || isSuper(role)) {
      await getAppointmentsByStore(
        `&store[in]=${getMultiStoresIds(store)}&startDate[lt]=${moment(
          new Date()
        )
          .add(15, "days")
          .format("l")}`
      );
    } else if (isRockstar(role)) {
      // await getAppointments()
    } else if (role === "store") {
      await getAppointmentsByStore(
        `&store[in]=${store}&startDate[lt]=${moment(new Date())
          .add(15, "days")
          .format("l")}`
      );
    }
  };

  // useEffect(()=>{

  //   if(makes && makes.length > 0){
  //     getVehiclesByMultiStore(`&make[in]=${getMultiMakesIds(makes)}`)
  //   }
  //   //eslint-disable-next-line
  // },[makes])

  const getVehiclesDPX = async ({ role, isActive, store }) => {
    let query = "";
    if (isActive) query = "&isActive=true";
    if (
      isUser(role) ||
      isAdmin(role) ||
      isSuper(role) ||
      isGeneralManager(role) || 
      isSalesManager(role) 
    ) {
      if (store) {
        await getVehiclesByMultiStore(`&make[in]=${store}${query}`);
      }
    } else if (isRockstar(role)) {
      await getVehicles(query);
    } else if (role === "seminuevos") {
      await getAllVehicles(query);
    } else if (role === "make") {
      if (store) {
        await getVehiclesByMultiStore(`&make[in]=${store}${query}`);
      }
    }
  };

  const getCommentsDPX = async ({ role, id, store, carType = false }) => {
    let query = "";
    if (carType) query = carType;
    if (isUser(role) || role === "agent") {
      await getCommentsByUser(
        id,
        `${query}&reschedule[lt]=${moment(new Date())
          .add(15, "days")
          .format("l")}`
      );
    } else if (isAdmin(role) || isSuper(role)) {
      await getCommentsByStore(
        `&store[in]=${getMultiStoresIds(store)}${query}&reschedule[lt]=${moment(
          new Date()
        )
          .add(15, "days")
          .format("l")}`
      );
    } else if (isRockstar(role)) {
      // await getComments(`${query}&reschedule[lt]=${moment(new Date()).add(15, 'days').format('l')}`)
    } else if (role === "store") {
      await getCommentsByStore(
        `&store[in]=${store}${query}&reschedule[lt]=${moment(new Date())
          .add(15, "days")
          .format("l")}`
      );
    }
  };

  const getAgentsDPX = async ({ role, store, type, typeLead }) => {
    let query = "";
    let queryLead = "";
    if (type) query = `&carType=${type}`;
    if (typeLead) queryLead = `&leadType=${typeLead}`;
    if (isAdmin(role) || isSuper(role) || isGeneralManager(role) || isSalesManager(role)) {
      await getAgents(
        `&stores[in]=${getMultiStoresIds(store)}${query}${queryLead}`
      );
    } else if (isRockstar(role)) {
      await getAgents();
    } else if (role === "store") {
      await getAgents(`&stores[in]=${store}${query}${queryLead}`);
    } else if (isUser(role)) {
      await setAgent(user);
    }
  };

  // const getFinancialInstitutionsDPX = async(role) => {
  //   if(isAdmin(role) || isUser(role) || isSuper(role) || isGeneralManager(role)){
  //     await getFinancialInstitutions(`&isActive=true&group=${user.group._id}`)
  //   }else if(isRockstar(role)){
  //     await getFinancialInstitutions(`&isActive=true`)
  //   }
  // }

  const getSourcesDPX = async (role, groupId) => {
    if (
      isAdmin(role) ||
      isUser(role) ||
      isSuper(role) ||
      isGeneralManager(role) ||
      isSalesManager(role) ||
      isMarketing(role) ||
      isDigitalMkt(role)
    ) {
      await getSources(`&isActive=true&group=${user.group._id}`);
    } else if (isRockstar(role)) {
      await getSources(`&isActive=true`);
    } else if (role === "group") {
      await getSources(`&isActive=true&group=${groupId}`);
    }
  };

  // const getRolesDPX = async({role, group}) => {
  //   if(isAdmin(role) || isUser(role) || isMarketing(role) || isSuper(role) || isDigitalMkt(role)){
  //     await getRolesByGroup(user.group._id);
  //   }else if(isRockstar(role)){
  //     await getAllRoles();
  //   }else if(role === 'group'){
  //     await getRolesByGroup(group);
  //   }
  // }

  const getStoresDPX = async (role, groupId) => {
    if (isAdmin(role) || isUser(role) || isMarketing(role)) {
      await getStoresByUser(user._id);
    } else if (isSuper(role) || isDigitalMkt(role) || isSalesManager(role) || isGeneralManager(role)) {
      await getStoresByGroup(user.group._id);
    } else if (isRockstar(role)) {
      await getStores(true);
    } else if (role === "group") {
      await getStoresByGroup(groupId);
    }
  };

  const getListsDPX = async ({ role, store }) => {
    if (isAdmin(role) || isMarketing(role) || isDigitalMkt(role)) {
      await getLists(`?multiStores=${getMultiStoresIds(store)}`);
    } else if (isSuper(role)) {
      await getLists(`?group=${user.group._id}`);
    } else if (isRockstar(role)) {
      await getLists();
    } else if (role === "store") {
      await getLists(`?multiStores=${store}`);
    }
  };

  const getMakesDPX = async (role, groupId) => {
    if (isAdmin(role) || isSalesManager(role) || isGeneralManager(role)) {
      await setMakesUser(getMakesUser(user.stores));
    } else if (isUser(role) || isSuper(role) || isDigitalMkt(role)) {
      await getMakes(`&isActive=true&group=${user.group._id}`);
    } else if (isRockstar(role)) {
      await getMakes();
    } else if (role === "group") {
      await getMakes(`&isActive=true&group=${groupId}`);
    }
  };

  const getCompaniesDpx = async (role) => {
    if (
      isSuper(role) ||
      isUser(role) ||
      isMarketing(role) ||
      isAdmin(role) ||
      isDigitalMkt(role)
    ) {
      await getCompanies(`&group=${user.group._id}`);
    } else if (isRockstar(role)) {
      await getCompanies();
    }
  };

  //We pass the functions of above to the componente
  //Every componente can use it from its props

  //Example:
  //getStores('id') => All the stores from database
  //getStores('id') => All stores from the group that the SA manages
  //getStores('id') => All the stores that the Admin manages
  //getStores('id') => All the stores where the user works

  //There are special cases as roles "store", "group", "seminuevos", "make"
  //Every case has a unique response
  //getVehicles('make') => All vehicles of that make
  //getVehicles('seminuevos') => All vehicles in "create lead"
  //getMakes('group') => All makes that the group has
  //Etc etc
  const childrenDpxProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...props,
        getStores: getStoresDPX,
        getMakes: getMakesDPX,
        getSources: getSourcesDPX,
        getAgents: getAgentsDPX,
        getVehicles: getVehiclesDPX,
        getComments: getCommentsDPX,
        getAppointments: getAppointmentsDPX,
        // getFinancialInstitutions: getFinancialInstitutionsDPX,
        getDocuments: getDocumentsDPX,
        getCompanies: getCompaniesDpx,
        getLists: getListsDPX,
        // getPackages: getPackagesDPX,
        // getRoles: getRolesDPX
      });
    }
    return child;
  });

  return <>{childrenDpxProps}</>;
};

DPXWrapper.propTypes = {
  children: PropTypes.node,
};

export default DPXWrapper;
