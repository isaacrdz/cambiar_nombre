import React, { useReducer } from 'react';
import CompanyContext from './companyContext';
import CompanyReducer from './companyReducer';
import AsyncStorage from "@react-native-community/async-storage";
import api from '../../api/api';
import {
  GET_COMPANIES,
  CREATE_COMPANY,
  GET_COMPANY,
  DELETE_COMPANY,
  UPDATE_COMPANY,
  SET_ERROR,
  CLEAR_STATE,
  SET_LOADING
} from '../types';

const CompanyState = props => {
  const initialState = {
    companies: [],
    company: {},
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(CompanyReducer, initialState);

  //Get Companies
  const getCompanies = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    clearState();
    setLoading();
    try {
      const res = await api.get(`/companies?sort=name`,config);
      dispatch({ type: GET_COMPANIES, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Get Company
  const getCompany = async companyId => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    clearState();
    setLoading();
    try {
      const res = await api.get(`/companies/${companyId}`,config);
      dispatch({ type: GET_COMPANY, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Delete Company
  const deleteCompany = async companyId => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    clearState();
    setLoading();
    try {
      const res = await api.delete(`/companies/${companyId}`, config);
      dispatch({ type: DELETE_COMPANY, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Create Company
  const createCompany = async company => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    clearState();
    setLoading();
    try {
      const res = await api.post(`/companies`, { ...company }, config);
      dispatch({ type: CREATE_COMPANY, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Update Company
  const updateCompany = async (company, companyId) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await AsyncStorage.getItem("token")}`
      }
    };
    clearState();
    setLoading();
    try {
      const res = await api.put(
        `/companies/${companyId}`,
        { ...company },
        config
      );
      dispatch({ type: UPDATE_COMPANY, payload: res.data.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };

  //Clear State
  const clearState = () => dispatch({ type: CLEAR_STATE });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <CompanyContext.Provider
      value={{
        loading: state.loading,
        companies: state.companies,
        company: state.company,
        error: state.error,
        getCompanies,
        createCompany,
        getCompany,
        deleteCompany,
        updateCompany,
        clearState,
        setLoading
      }}
    >
      {props.children}
    </CompanyContext.Provider>
  );
};

export default CompanyState;
