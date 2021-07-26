import React, { useReducer } from "react";
import LeadContext from "./leadContext";
import LeadReducer from "./leadReducer";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../api/api";
import {
  GET_LEADS,
  GET_LEAD,
  CLEAR_STATE,
  SET_LOADING,
  SET_ERROR,
  CLEAR_CURRENT_LEAD,
  UPDATE_LEAD,
  CREATE_LEAD
} from "../types";
import { Value } from "react-native-reanimated";

const LeadState = (props) => {
  const initialState = {
    leads: [],
    lead: {},
    loading: false,
    error: null,
    leadsSize: -1,
  };

  const [state, dispatch] = useReducer(LeadReducer, initialState);

  const clearError = () => dispatch({ type: SET_ERROR })

  const clearCurrentLead = () => dispatch({ type: CLEAR_CURRENT_LEAD });

    //Update Lead
    const updateLead = async (lead, leadId) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
        }
      };
      setLoading();
      try {
        const res = await api.put(`/leads/${leadId}`, { ...lead }, config);
        dispatch({ type: UPDATE_LEAD, payload: res.data.data });
      } catch (err) {
        dispatch({ type: SET_ERROR, payload: err.response.data });
      }
    };

  //Create Lead
  const createLead = async lead => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    clearState();
    setLoading();
    try {
      const res = await api.post(`/leads`, { ...lead }, config);
      dispatch({ type: CREATE_LEAD, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data.error });
    }
  };

  
   //Get Leads
   const getLeadsRockstar = async (pageCurrent, { type, value }, query) => {
    setLoading();
    try {
      let leads;
      if (!query) query = '';

      switch(type){
        case 'status':
          leads = await api.get(
            `/leads?page=${pageCurrent}&limit=10&status=${value}&searchIndex=name-email-make-phone-agent-source-vehicle-store&searchText=${query}&searchType=or&validation=1`
          );
          break;
        case 'subStatus':
          leads = await api.get(
            `/leads?page=${pageCurrent}&limit=10&substatus=${value}&searchIndex=name-email-make-phone-agent-source-vehicle-store&searchText=${query}&searchType=or&validation=1`
          );
          break;
        case 'all':
          leads = await api.get(
            `/leads?page=${pageCurrent}&limit=10&searchIndex=name-email-make-phone-agent-source-vehicle-store&searchText=${query}&searchType=or&validation=1`
          );
            break;
      }

      dispatch({
        type: GET_LEADS,
        payload: leads.data.data,
        count: leads.data.pagination.total
      });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Get Leads
  const getLeadsByStore = async (pageCurrent, multiStore, { type, value }, query ) => {
    setLoading();
    try {
      let leads;
      if (!query) query = '';

      switch(type){
        case 'status':
          leads = await api.get(
            `/leads?page=${pageCurrent}&limit=10&searchIndex=name-email-make-phone-agent-source-vehicle-store&status=${value}&searchText=${query}&searchType=or&validation=1${multiStore}`
          );
        break;
        case 'subStatus':
          leads = await api.get(
            `/leads?page=${pageCurrent}&limit=10&searchIndex=name-email-make-phone-agent-source-vehicle-store&substatus=${value}&searchText=${query}&searchType=or&validation=1${multiStore}`
          );
        break;
        case 'all':
          leads = await api.get(
            `/leads?page=${pageCurrent}&limit=10&searchIndex=name-email-make-phone-agent-source-vehicle-store&searchText=${query}&searchType=or&validation=1${multiStore}`
          );
        break;
      }
    
      dispatch({
        type: GET_LEADS,
        payload: leads.data.data,
      });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  const getLeads = async (pageCurrent, userId, {type, value}, query) => {
    setLoading();

    try {
      let leads;
      switch(type){
        case 'status':
          leads = await api.get(
            `/leads?page=${pageCurrent}&limit=10&searchIndex=name-email-make-phone-agent-source-vehicle-store&status=${value}&searchText=${query}&agent=${userId}&searchType=or&validation=1`
          );
        break;
        case 'substatus':
          leads = await api.get(
            `/leads?page=${pageCurrent}&limit=10&searchIndex=name-email-make-phone-agent-source-vehicle-store&substatus=${value}&searchText=${query}&agent=${userId}&searchType=or&validation=1`
          );
        break;
        case 'all':
          leads = await api.get(
            `/leads?page=${pageCurrent}&limit=10&searchIndex=name-email-make-phone-agent-source-vehicle-store&searchText=${query}&agent=${userId}&searchType=or&validation=1`
          );
        break;
        
      }

      dispatch({
        type: GET_LEADS,
        payload: leads.data.data,
      });
    } catch (err) {
      dispatch({ type: SET_ERROR });
    }
  };

  //Get Single Item by ID
  const getLead = async (leadId) => {
    setLoading();
    try {
      const res = await api.get(`/leads/${leadId}`);
      dispatch({
        type: GET_LEAD,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Clear State
  const clearState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <LeadContext.Provider
      value={{
        leads: state.leads,
        leadsSize: state.leadsSize,
        lead: state.lead,
        loading: state.loading,
        error: state.error,
        clearState,
        setLoading,
        getLeads,
        getLead,
        clearCurrentLead,
        updateLead,
        clearError,
        createLead,
        getLeadsByStore,
        getLeadsRockstar
      }}
    >
      {props.children}
    </LeadContext.Provider>
  );
};

export default LeadState;
