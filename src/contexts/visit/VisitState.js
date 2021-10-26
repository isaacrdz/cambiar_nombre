import React, { useReducer } from 'react';
import VisitContext from './visitContext';
import VisitReducer from './visitReducer';
import AsyncStorage from "@react-native-community/async-storage";
import api from '../../api/api';
import { 
  GET_VISITS, 
  CREATE_VISIT, 
  GET_VISIT, 
  DELETE_VISIT, 
  UPDATE_VISIT, 
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING
} from '../types';

const VisitState = props => {
  const initialState = {
    visits: [],
    visit: {},
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(VisitReducer, initialState);

  //Get Visits
  const getVisits = async (all) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    setLoading();
    try {
      let actives = '';
      if(!all){
        actives = '&isActive=true';
      }
      const res = await api.get(`/visits?sort=name${actives}`,config);
      dispatch({ type: GET_VISITS, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

   //Get Visit
   const getVisit = async (visitId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
      },
    };
    clearVisitState();
    setLoading();
    try {
      const res = await api.get(`/visits/${visitId}`,config);
      dispatch({ type: GET_VISIT, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };

  //Delete Visit
  const deleteVisit = async (visitId) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    setLoading();
    try {
      
      const res = await api.delete(`/visits/${visitId}`, config);
      dispatch({ type: DELETE_VISIT, payload: res.data.deletedId })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  };


  //Create Visit
  const createVisit = async (visit) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    clearVisitState();
    setLoading();
    try {
      const res = await api.post(`/visits`, { ...visit }, config);
      dispatch({ type: CREATE_VISIT, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})

    }
  }

  //Update Visit
  const updateVisit = async (visit, visitId) => {
    const config =  {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    setLoading();
    try {
      
      const res = await api.put(`/visits/${visitId}`, {...visit} ,config);
      dispatch({ type: UPDATE_VISIT, payload: res.data.data })
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data})
    }
  };

  //Clear State
  const clearVisitState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <VisitContext.Provider
      value={{
        loading: state.loading,
        visits: state.visits,
        visit: state.visit,
        error: state.error,
        getVisits,
        createVisit,
        getVisit,
        deleteVisit,
        updateVisit,
        clearVisitState,
        setLoading
      }}
    >
      {props.children}
    </VisitContext.Provider>
  );
};

export default VisitState;
